"""
generators/fraud_generator.py

Injects realistic fraudulent invoices into the dataset. Each fraud scenario
is implemented as its own function that builds on real vendor/PO/history
context (never pure random label flipping), so the resulting fraud signal
is learnable and mirrors real-world procurement fraud patterns.

Fraud types implemented:
    DUPLICATE          - reuse of an existing invoice number/amount/PO
    AMOUNT_INFLATION    - invoice amount far above vendor's normal average
    PO_MISMATCH         - invoice amount exceeds its PO's amount
    DUPLICATE_PO        - a second invoice billed against an already-billed PO
    BURST               - many invoices from one vendor within a short window
    TAX                 - abnormally low or high tax rate applied
    WEEKEND             - invoice created on a weekend / unusual hour
    ROUNDED             - suspiciously round invoice amount
    NEW_VENDOR          - brand-new vendor's first invoice is unusually large
    SEQUENTIAL          - a rapid-fire sequence of near-identical invoice numbers
"""

from __future__ import annotations

import random
import uuid
from datetime import timedelta
from typing import Dict, List, Optional

import config
from src.model_fine_tune.dataset.fraud.invoice_generator import Invoice, VendorHistory, _new_invoice_number
from src.model_fine_tune.dataset.fraud.po_generator import PurchaseOrder
from src.model_fine_tune.dataset.fraud.vendor_generator import Vendor
from src.utils.helper import (
    random_date_between,
    random_weekend_or_offhour_datetime,
    round_to_currency,
    weighted_choice,
)


def _base_invoice_fields(
    vendor: Vendor, po: Optional[PurchaseOrder], invoice_number: str, counter_seed: int
) -> dict:
    """Shared boilerplate fields common to every fraud scenario's invoice."""
    return {
        "invoice_number": invoice_number,
        "vendor_id": vendor.vendor_id,
        "vendor_name": vendor.vendor_name,
        "vendor_category": vendor.category,
        "country": vendor.country,
        "city": vendor.city,
        "po_number": po.po_number if po else "",
        "department": po.department if po else random.choice(config.DEPARTMENTS),
        "payment_terms": vendor.payment_terms,
        "currency": config.CURRENCY_BY_COUNTRY[vendor.country],
        "invoice_status": weighted_choice(
            config.INVOICE_STATUSES, config.INVOICE_STATUS_WEIGHTS
        ),
    }


def _pick_vendor_with_history(
    vendors: List[Vendor], histories: Dict[str, VendorHistory], require_invoices: bool = True
) -> Vendor:
    """
    Pick a vendor to target for fraud, biased toward HIGH/MEDIUM risk vendors
    (mirroring how riskier vendors are more frequently implicated in fraud),
    optionally requiring that vendor to already have invoice history.
    """
    risk_bias = {"LOW": 1.0, "MEDIUM": 2.5, "HIGH": 4.0}
    candidates = [
        v for v in vendors
        if (not require_invoices or histories[v.vendor_id].invoice_count > 0)
    ]
    if not candidates:
        candidates = vendors
    weights = [risk_bias[v.risk_level] for v in candidates]
    return random.choices(candidates, weights=weights, k=1)[0]


def _pos_for_vendor(purchase_orders: List[PurchaseOrder], vendor_id: str) -> List[PurchaseOrder]:
    return [po for po in purchase_orders if po.vendor_id == vendor_id]


# ---------------------------------------------------------------------------
# Individual fraud scenarios
# ---------------------------------------------------------------------------


def fraud_duplicate_invoice(
    genuine_invoices: List[Invoice], counter: int
) -> Invoice:
    """
    DUPLICATE: Reuse an existing invoice's number, amount, and PO exactly,
    but resubmit it (classic double-billing fraud).
    """
    original = random.choice(genuine_invoices)
    dup_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
    due_dt = dup_dt + timedelta(days=original.payment_terms)

    return Invoice(
        invoice_number=original.invoice_number,  # exact reuse -> the fraud signal
        vendor_id=original.vendor_id,
        vendor_name=original.vendor_name,
        vendor_category=original.vendor_category,
        country=original.country,
        city=original.city,
        po_number=original.po_number,  # same PO reused
        department=original.department,
        invoice_date=dup_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        payment_terms=original.payment_terms,
        currency=original.currency,
        amount=original.amount,  # same amount reused
        tax_rate=original.tax_rate,
        tax_amount=original.tax_amount,
        invoice_status="PENDING",
        created_timestamp=dup_dt.isoformat(),
        is_fraud=1,
        fraud_type="DUPLICATE",
    )


def fraud_amount_inflation(
    vendor: Vendor, po: PurchaseOrder, invoice_dt, counter: int
) -> Invoice:
    """AMOUNT_INFLATION: invoice amount is several times the vendor's normal average."""
    multiplier = random.uniform(*config.INFLATION_MULTIPLIER_RANGE)
    amount = round_to_currency(vendor.average_invoice_amount * multiplier)
    tax_amount = round_to_currency(amount * vendor.tax_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=vendor.tax_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="AMOUNT_INFLATION",
    )


def fraud_po_mismatch(vendor: Vendor, po: PurchaseOrder, invoice_dt, counter: int) -> Invoice:
    """PO_MISMATCH: invoice amount exceeds the referenced PO's approved amount."""
    overage_pct = random.uniform(*config.PO_MISMATCH_OVERAGE_PCT_RANGE)
    base_amount = po.po_amount if po else vendor.average_invoice_amount
    amount = round_to_currency(base_amount * (1 + overage_pct))
    tax_amount = round_to_currency(amount * vendor.tax_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=vendor.tax_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="PO_MISMATCH",
    )


def fraud_duplicate_po(
    vendor: Vendor, history: VendorHistory, purchase_orders: List[PurchaseOrder],
    invoice_dt, counter: int
) -> Invoice:
    """
    DUPLICATE_PO: bill against a PO that has already been fully billed once,
    simulating someone re-submitting an invoice against a closed PO.
    """
    billed_pos = [
        po for po in purchase_orders
        if po.vendor_id == vendor.vendor_id and po.po_number in history.billed_po_numbers
    ]
    vendor_pos = _pos_for_vendor(purchase_orders, vendor.vendor_id)
    po = random.choice(billed_pos) if billed_pos else (
        random.choice(vendor_pos) if vendor_pos else None
    )

    amount = round_to_currency(
        (po.po_amount if po else vendor.average_invoice_amount)
        * random.uniform(0.9, 1.05)
    )
    tax_amount = round_to_currency(amount * vendor.tax_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=vendor.tax_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="DUPLICATE_PO",
    )


def fraud_burst(
    vendor: Vendor, po: PurchaseOrder, counter_start: int
) -> List[Invoice]:
    """
    BURST: a vendor that normally invoices at a modest cadence suddenly
    produces many invoices within a 1-2 day window.
    """
    burst_count = random.randint(*config.BURST_INVOICE_COUNT_RANGE)
    window_start = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)

    invoices: List[Invoice] = []
    for i in range(burst_count):
        offset_hours = random.uniform(0, config.BURST_WINDOW_DAYS * 24)
        invoice_dt = window_start + timedelta(hours=offset_hours)
        due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

        amount = round_to_currency(
            vendor.average_invoice_amount * random.uniform(0.8, 1.3)
        )
        tax_amount = round_to_currency(amount * vendor.tax_rate)

        fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter_start + i), counter_start + i)
        invoices.append(
            Invoice(
                **fields,
                invoice_date=invoice_dt.date().isoformat(),
                due_date=due_dt.date().isoformat(),
                amount=amount,
                tax_rate=vendor.tax_rate,
                tax_amount=tax_amount,
                created_timestamp=invoice_dt.isoformat(),
                is_fraud=1,
                fraud_type="BURST",
            )
        )
    return invoices


def fraud_tax_anomaly(vendor: Vendor, po: PurchaseOrder, invoice_dt, counter: int) -> Invoice:
    """TAX: apply an implausibly low or high tax rate relative to vendor norm."""
    if random.random() < 0.5:
        anomalous_rate = round(random.uniform(*config.TAX_ANOMALY_LOW_RANGE), 4)
    else:
        anomalous_rate = round(random.uniform(*config.TAX_ANOMALY_HIGH_RANGE), 4)

    amount = round_to_currency(
        vendor.average_invoice_amount * random.uniform(0.85, 1.2)
    )
    tax_amount = round_to_currency(amount * anomalous_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=anomalous_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="TAX",
    )


def fraud_weekend_billing(vendor: Vendor, po: PurchaseOrder, counter: int) -> Invoice:
    """WEEKEND: invoice created on a weekend or at an unusual hour."""
    invoice_dt = random_weekend_or_offhour_datetime(
        config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END
    )
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    amount = round_to_currency(
        vendor.average_invoice_amount * random.uniform(0.9, 1.4)
    )
    tax_amount = round_to_currency(amount * vendor.tax_rate)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=vendor.tax_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="WEEKEND",
    )


def fraud_rounded_amount(vendor: Vendor, po: PurchaseOrder, invoice_dt, counter: int) -> Invoice:
    """ROUNDED: use a suspiciously "clean" round amount instead of a natural one."""
    amount = float(random.choice(config.ROUNDED_AMOUNT_CANDIDATES))
    tax_amount = round_to_currency(amount * vendor.tax_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    fields = _base_invoice_fields(vendor, po, _new_invoice_number(counter), counter)
    return Invoice(
        **fields,
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        amount=amount,
        tax_rate=vendor.tax_rate,
        tax_amount=tax_amount,
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="ROUNDED",
    )


def fraud_new_vendor_high_value(
    faker, counter: int
) -> "tuple[Vendor, Invoice]":
    """
    NEW_VENDOR: create a brand-new vendor (created just before the invoice)
    whose very first invoice is unusually large for its category — a common
    shell-vendor fraud pattern.
    """
    from src.model_fine_tune.dataset.fraud.vendor_generator import _generate_vendor_name, uuid_suffix

    category = random.choice(config.VENDOR_CATEGORIES)
    profile = config.CATEGORY_PROFILES[category]
    country = weighted_choice(
        list(config.COUNTRY_WEIGHTS.keys()), list(config.COUNTRY_WEIGHTS.values())
    )

    invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
    created_date = invoice_dt - timedelta(days=random.randint(0, 5))

    _, high = profile.amount_range
    multiplier = random.uniform(*config.NEW_VENDOR_MULTIPLIER_RANGE)
    amount = round_to_currency(high * multiplier)

    tax_rate = round(random.uniform(*profile.tax_rate_range), 4)

    vendor = Vendor(
        vendor_id=f"VEND-{uuid_suffix()}",
        vendor_name=_generate_vendor_name(faker, category),
        category=category,
        country=country,
        city=faker.city(),
        payment_terms=random.choice(config.PAYMENT_TERMS_DAYS),
        average_invoice_amount=round_to_currency(high),
        monthly_invoice_frequency=random.randint(1, 3),
        tax_rate=tax_rate,
        risk_level="HIGH",
        created_date=created_date.date().isoformat(),
    )

    tax_amount = round_to_currency(amount * tax_rate)
    due_dt = invoice_dt + timedelta(days=vendor.payment_terms)

    invoice = Invoice(
        invoice_number=_new_invoice_number(counter),
        vendor_id=vendor.vendor_id,
        vendor_name=vendor.vendor_name,
        vendor_category=vendor.category,
        country=vendor.country,
        city=vendor.city,
        po_number="",  # no PO yet -- brand new relationship
        department=random.choice(config.DEPARTMENTS),
        invoice_date=invoice_dt.date().isoformat(),
        due_date=due_dt.date().isoformat(),
        payment_terms=vendor.payment_terms,
        currency=config.CURRENCY_BY_COUNTRY[vendor.country],
        amount=amount,
        tax_rate=tax_rate,
        tax_amount=tax_amount,
        invoice_status="PENDING",
        created_timestamp=invoice_dt.isoformat(),
        is_fraud=1,
        fraud_type="NEW_VENDOR",
    )
    return vendor, invoice


def fraud_sequential_spam(vendor: Vendor, po: PurchaseOrder, counter_start: int) -> List[Invoice]:
    """
    SEQUENTIAL: a rapid-fire sequence of invoices submitted minutes apart,
    with visibly sequential invoice numbers -- mimicking spam/script-generated
    fraudulent submissions.
    """
    count = random.randint(*config.SEQUENTIAL_COUNT_RANGE)
    start_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
    base_num = random.randint(100000, 999999)

    invoices: List[Invoice] = []
    current_dt = start_dt
    for i in range(count):
        gap = random.randint(*config.SEQUENTIAL_GAP_MINUTES_RANGE)
        current_dt = current_dt + timedelta(minutes=gap)
        due_dt = current_dt + timedelta(days=vendor.payment_terms)

        amount = round_to_currency(
            vendor.average_invoice_amount * random.uniform(0.95, 1.1)
        )
        tax_amount = round_to_currency(amount * vendor.tax_rate)

        invoice_number = f"INV-SEQ-{base_num + i}"
        fields = _base_invoice_fields(vendor, po, invoice_number, counter_start + i)
        invoices.append(
            Invoice(
                **fields,
                invoice_date=current_dt.date().isoformat(),
                due_date=due_dt.date().isoformat(),
                amount=amount,
                tax_rate=vendor.tax_rate,
                tax_amount=tax_amount,
                created_timestamp=current_dt.isoformat(),
                is_fraud=1,
                fraud_type="SEQUENTIAL",
            )
        )
    return invoices


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------


def _allocate_fraud_counts(total_fraud: int) -> Dict[str, int]:
    """Convert FRAUD_TYPE_WEIGHTS into concrete per-type row-count targets."""
    weights = config.FRAUD_TYPE_WEIGHTS
    total_weight = sum(weights.values())
    counts = {
        ftype: max(1, round(total_fraud * (w / total_weight)))
        for ftype, w in weights.items()
    }
    return counts


def generate_fraud_invoices(
    vendors: List[Vendor],
    purchase_orders: List[PurchaseOrder],
    genuine_invoices: List[Invoice],
    histories: Dict[str, VendorHistory],
    faker,
    total_fraud: int = config.NUM_FRAUD_INVOICES,
) -> "tuple[List[Invoice], List[Vendor]]":
    """
    Orchestrate fraud injection across all scenario types. Returns the list
    of fraudulent Invoice rows plus any brand-new vendors created along the
    way (for NEW_VENDOR fraud), so the caller can append them to the vendor
    master list too.
    """
    counts = _allocate_fraud_counts(total_fraud)
    fraud_invoices: List[Invoice] = []
    new_vendors: List[Vendor] = []
    counter = 900_000  # high range so fraud invoice numbers don't collide with genuine ones

    def _choose_po(vendor: Vendor) -> PurchaseOrder:
        vendor_pos = _pos_for_vendor(purchase_orders, vendor.vendor_id)
        if vendor_pos:
            return random.choice(vendor_pos)
        return random.choice(purchase_orders)

    # --- DUPLICATE -----------------------------------------------------
    for _ in range(counts["DUPLICATE"]):
        fraud_invoices.append(fraud_duplicate_invoice(genuine_invoices, counter))
        counter += 1

    # --- AMOUNT_INFLATION ------------------------------------------------
    for _ in range(counts["AMOUNT_INFLATION"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
        fraud_invoices.append(fraud_amount_inflation(vendor, po, invoice_dt, counter))
        counter += 1

    # --- PO_MISMATCH -----------------------------------------------------
    for _ in range(counts["PO_MISMATCH"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
        fraud_invoices.append(fraud_po_mismatch(vendor, po, invoice_dt, counter))
        counter += 1

    # --- DUPLICATE_PO ------------------------------------------------
    for _ in range(counts["DUPLICATE_PO"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        history = histories[vendor.vendor_id]
        invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
        fraud_invoices.append(
            fraud_duplicate_po(vendor, history, purchase_orders, invoice_dt, counter)
        )
        counter += 1

    # --- BURST -------------------------------------------------------
    remaining_burst = counts["BURST"]
    while remaining_burst > 0:
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        batch = fraud_burst(vendor, po, counter)
        batch = batch[:remaining_burst] if len(batch) > remaining_burst else batch
        fraud_invoices.extend(batch)
        counter += len(batch)
        remaining_burst -= len(batch)

    # --- TAX -----------------------------------------------------------
    for _ in range(counts["TAX"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
        fraud_invoices.append(fraud_tax_anomaly(vendor, po, invoice_dt, counter))
        counter += 1

    # --- WEEKEND ---------------------------------------------------------
    for _ in range(counts["WEEKEND"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        fraud_invoices.append(fraud_weekend_billing(vendor, po, counter))
        counter += 1

    # --- ROUNDED -----------------------------------------------------
    for _ in range(counts["ROUNDED"]):
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        invoice_dt = random_date_between(config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END)
        fraud_invoices.append(fraud_rounded_amount(vendor, po, invoice_dt, counter))
        counter += 1

    # --- NEW_VENDOR --------------------------------------------------
    for _ in range(counts["NEW_VENDOR"]):
        vendor, invoice = fraud_new_vendor_high_value(faker, counter)
        new_vendors.append(vendor)
        fraud_invoices.append(invoice)
        histories[vendor.vendor_id] = VendorHistory(vendor_id=vendor.vendor_id)
        counter += 1

    # --- SEQUENTIAL ----------------------------------------------------
    remaining_seq = counts["SEQUENTIAL"]
    while remaining_seq > 0:
        vendor = _pick_vendor_with_history(vendors, histories)
        po = _choose_po(vendor)
        batch = fraud_sequential_spam(vendor, po, counter)
        batch = batch[:remaining_seq] if len(batch) > remaining_seq else batch
        fraud_invoices.extend(batch)
        counter += len(batch)
        remaining_seq -= len(batch)

    # Trim/pad to exact target count (rounding in _allocate_fraud_counts can
    # drift by a couple of rows).
    if len(fraud_invoices) > total_fraud:
        fraud_invoices = fraud_invoices[:total_fraud]
    elif len(fraud_invoices) < total_fraud:
        shortfall = total_fraud - len(fraud_invoices)
        for _ in range(shortfall):
            vendor = _pick_vendor_with_history(vendors, histories)
            po = _choose_po(vendor)
            invoice_dt = random_date_between(
                config.INVOICE_WINDOW_START, config.INVOICE_WINDOW_END
            )
            fraud_invoices.append(fraud_amount_inflation(vendor, po, invoice_dt, counter))
            counter += 1

    return fraud_invoices, new_vendors