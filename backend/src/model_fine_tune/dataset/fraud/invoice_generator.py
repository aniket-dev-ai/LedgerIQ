"""
generators/invoice_generator.py

Generates GENUINE invoices and maintains per-vendor historical statistics as
generation proceeds. These historical stats (previous invoice count,
lifetime spend, running average/std-dev, last invoice date, etc.) are kept on
a VendorHistory object per vendor. The fraud generator later reuses these
same histories so fraud can be injected *relative to* what "normal" already
looks like for that vendor.
"""

from __future__ import annotations

import random
import uuid
from dataclasses import dataclass, field, asdict
from datetime import datetime
from typing import Dict, List, Optional

import numpy as np

import config
from src.model_fine_tune.dataset.fraud.po_generator import PurchaseOrder
from src.model_fine_tune.dataset.fraud.vendor_generator import Vendor
from src.utils.helper import (
    random_business_datetime,
    round_to_currency,
    sample_lognormal_around,
    weighted_choice,
)


@dataclass
class VendorHistory:
    """
    Running historical statistics for a single vendor, updated as each new
    invoice is generated. Used both to make genuine invoices behave
    consistently over time, and as the "baseline" fraud scenarios deviate
    from.
    """

    vendor_id: str
    invoice_count: int = 0
    lifetime_spend: float = 0.0
    amounts: List[float] = field(default_factory=list)
    last_invoice_date: Optional[datetime] = None
    monthly_spend: Dict[str, float] = field(default_factory=dict)  # "YYYY-MM" -> spend
    billed_po_numbers: set = field(default_factory=set)

    def record_invoice(self, amount: float, invoice_dt: datetime, po_number: str) -> None:
        self.invoice_count += 1
        self.lifetime_spend += amount
        self.amounts.append(amount)
        self.last_invoice_date = invoice_dt
        month_key = invoice_dt.strftime("%Y-%m")
        self.monthly_spend[month_key] = self.monthly_spend.get(month_key, 0.0) + amount
        self.billed_po_numbers.add(po_number)

    @property
    def average_amount(self) -> float:
        if not self.amounts:
            return 0.0
        return float(np.mean(self.amounts))

    @property
    def std_amount(self) -> float:
        if len(self.amounts) < 2:
            return 0.0
        return float(np.std(self.amounts))

    def snapshot(self) -> dict:
        """Point-in-time snapshot of history stats, for embedding into a row."""
        return {
            "prev_invoice_count": self.invoice_count,
            "prev_lifetime_spend": round_to_currency(self.lifetime_spend),
            "prev_avg_amount": round_to_currency(self.average_amount),
            "prev_std_amount": round_to_currency(self.std_amount),
            "prev_last_invoice_date": (
                self.last_invoice_date.isoformat() if self.last_invoice_date else ""
            ),
        }


@dataclass
class Invoice:
    """A single invoice row, genuine or fraudulent."""

    invoice_number: str
    vendor_id: str
    vendor_name: str
    vendor_category: str
    country: str
    city: str
    po_number: str
    department: str
    invoice_date: str
    due_date: str
    payment_terms: int
    currency: str
    amount: float
    tax_rate: float
    tax_amount: float
    invoice_status: str
    created_timestamp: str
    is_fraud: int
    fraud_type: str

    def to_dict(self) -> dict:
        return asdict(self)


def _new_invoice_number(counter: int) -> str:
    """Sequential-looking but unique invoice numbers, e.g. INV-000123-AB12."""
    return f"INV-{counter:06d}-{uuid.uuid4().hex[:4].upper()}"


def _pick_po_for_vendor(
    vendor_pos: List[PurchaseOrder], history: VendorHistory
) -> Optional[PurchaseOrder]:
    """
    Prefer a PO that has not yet been billed, mimicking how one PO is
    normally consumed by one invoice. Falls back to any PO if all are used.
    """
    unbilled = [po for po in vendor_pos if po.po_number not in history.billed_po_numbers]
    pool = unbilled if unbilled else vendor_pos
    if not pool:
        return None
    return random.choice(pool)


def generate_genuine_invoices(
    vendors: List[Vendor],
    purchase_orders: List[PurchaseOrder],
    histories: Dict[str, VendorHistory],
    num_invoices: int = config.NUM_GENUINE_INVOICES,
) -> List[Invoice]:
    """
    Generate genuine invoices, distributed across vendors proportionally to
    each vendor's monthly_invoice_frequency (busier vendors naturally
    contribute more invoices), and updates the shared `histories` dict as it
    goes so later fraud injection can build on realistic vendor context.
    """
    invoices: List[Invoice] = []

    pos_by_vendor: Dict[str, List[PurchaseOrder]] = {}
    for po in purchase_orders:
        pos_by_vendor.setdefault(po.vendor_id, []).append(po)

    # Weight vendor selection by frequency so busy vendors (e.g. Office
    # Supplies) get many more invoices than low-frequency ones (e.g. Machinery).
    weights = [v.monthly_invoice_frequency for v in vendors]

    counter = 1
    for _ in range(num_invoices):
        vendor = random.choices(vendors, weights=weights, k=1)[0]
        history = histories[vendor.vendor_id]
        vendor_pos = pos_by_vendor.get(vendor.vendor_id, [])
        po = _pick_po_for_vendor(vendor_pos, history)

        category_profile = config.CATEGORY_PROFILES[vendor.category]
        amount = sample_lognormal_around(
            vendor.average_invoice_amount, category_profile.amount_variance_pct
        )

        invoice_dt = random_business_datetime(
            config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END
        )
        due_dt = invoice_dt + __import__("datetime").timedelta(days=vendor.payment_terms)

        tax_amount = round_to_currency(amount * vendor.tax_rate)
        status = weighted_choice(config.INVOICE_STATUSES, config.INVOICE_STATUS_WEIGHTS)

        invoice = Invoice(
            invoice_number=_new_invoice_number(counter),
            vendor_id=vendor.vendor_id,
            vendor_name=vendor.vendor_name,
            vendor_category=vendor.category,
            country=vendor.country,
            city=vendor.city,
            po_number=po.po_number if po else "",
            department=po.department if po else random.choice(config.DEPARTMENTS),
            invoice_date=invoice_dt.date().isoformat(),
            due_date=due_dt.date().isoformat(),
            payment_terms=vendor.payment_terms,
            currency=config.CURRENCY_BY_COUNTRY[vendor.country],
            amount=amount,
            tax_rate=vendor.tax_rate,
            tax_amount=tax_amount,
            invoice_status=status,
            created_timestamp=invoice_dt.isoformat(),
            is_fraud=0,
            fraud_type=config.FRAUD_TYPE_NONE,
        )
        invoices.append(invoice)
        counter += 1

        if po:
            history.record_invoice(amount, invoice_dt, po.po_number)
        else:
            history.record_invoice(amount, invoice_dt, "")

    return invoices


def initialize_histories(vendors: List[Vendor]) -> Dict[str, VendorHistory]:
    """Create a fresh VendorHistory tracker for every vendor."""
    return {vendor.vendor_id: VendorHistory(vendor_id=vendor.vendor_id) for vendor in vendors}