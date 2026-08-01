"""
config.py

Central configuration for the LedgerIQ synthetic invoice dataset generator.
All tunable parameters live here so the rest of the codebase never hardcodes
magic numbers. Change values here to reshape the dataset without touching
generator logic.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, List, Tuple

# ---------------------------------------------------------------------------
# Reproducibility
# ---------------------------------------------------------------------------
RANDOM_SEED: int = 42

# ---------------------------------------------------------------------------
# Overall dataset sizing
# ---------------------------------------------------------------------------
NUM_VENDORS: int = 500
TOTAL_INVOICES: int = 15_000
FRAUD_RATIO: float = 0.2  # ~20% of invoices are fraudulent

# Number of fraudulent / genuine rows derived from the above
NUM_FRAUD_INVOICES: int = int(TOTAL_INVOICES * FRAUD_RATIO)
NUM_GENUINE_INVOICES: int = TOTAL_INVOICES - NUM_FRAUD_INVOICES

# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------
OUTPUT_DIR: str = "output"
OUTPUT_FILENAME: str = "synthetic_invoice_dataset.csv"

# ---------------------------------------------------------------------------
# Date ranges
# ---------------------------------------------------------------------------
# Vendors were "onboarded" (created_date) any time in this historical window.
VENDOR_CREATION_START = "2019-01-01"
VENDOR_CREATION_END = "2023-01-01"

# Invoices (both genuine and fraudulent) are generated within this window.
INVOICE_WINDOW_START = "2023-01-01"
INVOICE_WINDOW_END = "2024-12-31"

# Standard payment terms offered across vendors (in days).
PAYMENT_TERMS_DAYS: List[int] = [15, 30, 45, 60, 90]

# ---------------------------------------------------------------------------
# Currency / geography
# ---------------------------------------------------------------------------
# Vendor country pool with rough weighting (India-heavy since amounts are in INR
# by default, but a handful of overseas vendors are included for realism).
COUNTRY_WEIGHTS: Dict[str, float] = {
    "India": 0.75,
    "USA": 0.08,
    "Germany": 0.05,
    "China": 0.05,
    "UAE": 0.04,
    "Singapore": 0.03,
}

CURRENCY_BY_COUNTRY: Dict[str, str] = {
    "India": "INR",
    "USA": "USD",
    "Germany": "EUR",
    "China": "CNY",
    "UAE": "AED",
    "Singapore": "SGD",
}

# ---------------------------------------------------------------------------
# Departments that raise POs / receive invoices
# ---------------------------------------------------------------------------
DEPARTMENTS: List[str] = [
    "Procurement",
    "Operations",
    "IT",
    "Finance",
    "Facilities",
    "Production",
    "Logistics",
    "Marketing",
    "HR",
    "R&D",
]

# ---------------------------------------------------------------------------
# Vendor category behavior profiles
# ---------------------------------------------------------------------------
# Each category defines the *natural* business behavior of vendors in that
# category: typical invoice amount range, monthly invoice frequency range,
# and typical tax rate range. This is what makes the dataset behave like a
# real company instead of uniform random noise.


@dataclass(frozen=True)
class CategoryProfile:
    amount_range: Tuple[float, float]          # typical single-invoice amount (INR)
    monthly_frequency_range: Tuple[int, int]    # invoices per month for a vendor
    tax_rate_range: Tuple[float, float]         # fraction, e.g. 0.18 = 18%
    amount_variance_pct: float                  # natural +/- variance around vendor avg


CATEGORY_PROFILES: Dict[str, CategoryProfile] = {
    "Office Supplies": CategoryProfile((5_000, 25_000), (40, 80), (0.05, 0.12), 0.15),
    "Electronics": CategoryProfile((15_000, 150_000), (5, 20), (0.12, 0.18), 0.20),
    "Machinery": CategoryProfile((200_000, 800_000), (2, 8), (0.12, 0.18), 0.10),
    "IT Services": CategoryProfile((25_000, 300_000), (3, 15), (0.18, 0.18), 0.18),
    "Consulting": CategoryProfile((50_000, 500_000), (1, 6), (0.18, 0.18), 0.12),
    "Raw Materials": CategoryProfile((30_000, 400_000), (10, 30), (0.05, 0.12), 0.22),
    "Maintenance": CategoryProfile((3_000, 60_000), (10, 40), (0.05, 0.12), 0.25),
    "Transportation": CategoryProfile((5_000, 100_000), (15, 50), (0.05, 0.12), 0.20),
    "Packaging": CategoryProfile((4_000, 50_000), (20, 60), (0.05, 0.12), 0.18),
    "Furniture": CategoryProfile((10_000, 200_000), (2, 10), (0.12, 0.18), 0.15),
}

VENDOR_CATEGORIES: List[str] = list(CATEGORY_PROFILES.keys())

# ---------------------------------------------------------------------------
# Vendor risk levels (internal-only signal; not a leakage column but used to
# subtly bias which vendors are more likely to be selected for fraud
# injection, mimicking how riskier vendors are more often implicated).
# ---------------------------------------------------------------------------
RISK_LEVELS: List[str] = ["LOW", "MEDIUM", "HIGH"]
RISK_LEVEL_WEIGHTS: List[float] = [0.70, 0.22, 0.08]

# ---------------------------------------------------------------------------
# Invoice status pool
# ---------------------------------------------------------------------------
INVOICE_STATUSES: List[str] = ["PAID", "PENDING", "APPROVED", "REJECTED", "OVERDUE"]
INVOICE_STATUS_WEIGHTS: List[float] = [0.55, 0.15, 0.20, 0.03, 0.07]

PO_STATUSES: List[str] = ["OPEN", "CLOSED", "PARTIALLY_BILLED", "CANCELLED"]
PO_STATUS_WEIGHTS: List[float] = [0.35, 0.45, 0.15, 0.05]

# ---------------------------------------------------------------------------
# Fraud injection configuration
# ---------------------------------------------------------------------------
# Relative weights across fraud scenarios. These are normalized internally
# to sum to NUM_FRAUD_INVOICES. Keeping them here means adding a new fraud
# type is a one-line change.
FRAUD_TYPE_WEIGHTS: Dict[str, float] = {
    "DUPLICATE": 0.12,
    "AMOUNT_INFLATION": 0.14,
    "PO_MISMATCH": 0.12,
    "DUPLICATE_PO": 0.10,
    "BURST": 0.10,
    "TAX": 0.10,
    "WEEKEND": 0.10,
    "ROUNDED": 0.08,
    "NEW_VENDOR": 0.08,
    "SEQUENTIAL": 0.06,
}

FRAUD_TYPE_NONE: str = "NONE"

# Amount-inflation fraud: multiply vendor's average by a factor in this range.
INFLATION_MULTIPLIER_RANGE: Tuple[float, float] = (5.0, 12.0)

# PO mismatch fraud: invoice exceeds PO amount by this percentage range.
PO_MISMATCH_OVERAGE_PCT_RANGE: Tuple[float, float] = (0.15, 0.60)

# Burst fraud: number of invoices created within the burst window.
BURST_INVOICE_COUNT_RANGE: Tuple[int, int] = (4, 9)
BURST_WINDOW_DAYS: int = 2

# Tax anomaly fraud: either abnormally low or abnormally high tax fraction.
TAX_ANOMALY_LOW_RANGE: Tuple[float, float] = (0.0, 0.01)
TAX_ANOMALY_HIGH_RANGE: Tuple[float, float] = (0.35, 0.55)

# Rounded-amount fraud: candidate suspiciously "round" amounts (INR).
ROUNDED_AMOUNT_CANDIDATES: List[int] = [
    50_000, 100_000, 150_000, 200_000, 250_000, 300_000, 500_000, 1_000_000,
]

# New-vendor-high-value fraud: multiplier applied to the category's max
# typical amount to simulate a suspiciously large first invoice.
NEW_VENDOR_MULTIPLIER_RANGE: Tuple[float, float] = (2.0, 5.0)

# Sequential invoice spam: number of invoices in the rapid sequence and the
# time gap (minutes) between each.
SEQUENTIAL_COUNT_RANGE: Tuple[int, int] = (3, 6)
SEQUENTIAL_GAP_MINUTES_RANGE: Tuple[int, int] = (1, 5)

# ---------------------------------------------------------------------------
# Faker locale
# ---------------------------------------------------------------------------
FAKER_LOCALE: str = "en_IN"