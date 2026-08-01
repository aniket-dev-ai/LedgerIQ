"""
generators/po_generator.py

Generates Purchase Orders (POs). Each PO is tied to a vendor and department,
and carries an amount close to that vendor's typical invoice amount, since in
a real procurement flow the PO is raised in anticipation of the invoice that
will follow it.
"""

from __future__ import annotations

import random
import uuid
from dataclasses import dataclass, asdict
from datetime import timedelta
from typing import List

import config
from src.model_fine_tune.dataset.fraud.vendor_generator import Vendor
from src.utils.helper import (
    random_date_between,
    round_to_currency,
    sample_lognormal_around,
    weighted_choice,
)


@dataclass
class PurchaseOrder:
    """Represents a single Purchase Order record."""

    po_number: str
    vendor_id: str
    department: str
    po_amount: float
    po_date: str
    expected_delivery: str
    currency: str
    status: str

    def to_dict(self) -> dict:
        return asdict(self)


def _new_po_number() -> str:
    return f"PO-{uuid.uuid4().hex[:8].upper()}"


def generate_purchase_orders(
    vendors: List[Vendor], pos_per_vendor_range: tuple = (3, 12)
) -> List[PurchaseOrder]:
    """
    Generate a pool of Purchase Orders across all vendors.

    We generate more POs than invoices so that:
      - most genuine invoices can reference a fresh, unbilled PO
      - some POs remain open/partially billed (realistic ERP state)
      - fraud generators can later pick an *already billed* PO to simulate
        DUPLICATE_PO fraud.
    """
    purchase_orders: List[PurchaseOrder] = []

    for vendor in vendors:
        currency = config.CURRENCY_BY_COUNTRY[vendor.country]
        num_pos = random.randint(*pos_per_vendor_range)

        for _ in range(num_pos):
            po_date = random_date_between(
                config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END
            )
            delivery_days = random.randint(5, 45)
            expected_delivery = po_date + timedelta(days=delivery_days)

            # PO amount is drawn around the vendor's average with modest
            # variance, since the PO is meant to approximate the eventual bill.
            po_amount = sample_lognormal_around(
                vendor.average_invoice_amount, variance_pct=0.15
            )

            status = weighted_choice(config.PO_STATUSES, config.PO_STATUS_WEIGHTS)

            po = PurchaseOrder(
                po_number=_new_po_number(),
                vendor_id=vendor.vendor_id,
                department=random.choice(config.DEPARTMENTS),
                po_amount=round_to_currency(po_amount),
                po_date=po_date.date().isoformat(),
                expected_delivery=expected_delivery.date().isoformat(),
                currency=currency,
                status=status,
            )
            purchase_orders.append(po)

    return purchase_orders