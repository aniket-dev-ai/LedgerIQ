"""
generators/vendor_generator.py

Generates the vendor master list. Each vendor gets a category-driven
behavior profile (typical amount, invoice frequency, tax rate) so downstream
invoice generation produces category-appropriate, non-identical vendors —
mirroring how a real ERP vendor master looks.
"""

from __future__ import annotations

import random
from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List

from faker import Faker

import config
from src.utils.helper import (
    random_date_between,
    round_to_currency,
    weighted_choice,
)


@dataclass
class Vendor:
    """Represents a single vendor master record."""

    vendor_id: str
    vendor_name: str
    category: str
    country: str
    city: str
    payment_terms: int
    average_invoice_amount: float
    monthly_invoice_frequency: int
    tax_rate: float
    risk_level: str
    created_date: str  # ISO date string

    def to_dict(self) -> dict:
        return asdict(self)


def _generate_vendor_name(faker: Faker, category: str) -> str:
    """Build a plausible company name, occasionally category-flavored."""
    base = faker.company()
    suffix_pool = ["Pvt Ltd", "Inc", "LLC", "& Co", "Enterprises", "Industries", "Traders"]
    if random.random() < 0.5:
        return f"{base} {random.choice(suffix_pool)}"
    return base


def generate_vendors(faker: Faker, num_vendors: int = config.NUM_VENDORS) -> List[Vendor]:
    """
    Generate the vendor master list.

    Each vendor is assigned a category, and the category's CategoryProfile
    (see config.py) determines realistic ranges for invoice amount,
    frequency, and tax rate. A per-vendor random draw within that range
    ensures vendors in the same category still differ from one another.
    """
    vendors: List[Vendor] = []

    for _ in range(num_vendors):
        category = random.choice(config.VENDOR_CATEGORIES)
        profile = config.CATEGORY_PROFILES[category]

        country = weighted_choice(
            list(config.COUNTRY_WEIGHTS.keys()), list(config.COUNTRY_WEIGHTS.values())
        )

        # Vendor-specific average anchored inside the category's typical range,
        # using a log-uniform draw so both small and large vendors appear
        # without everyone clustering at the midpoint.
        low, high = profile.amount_range
        avg_amount = round_to_currency(
            float(low) * ((high / low) ** random.random())
        )

        freq_low, freq_high = profile.monthly_frequency_range
        frequency = random.randint(freq_low, freq_high)

        tax_low, tax_high = profile.tax_rate_range
        tax_rate = round(random.uniform(tax_low, tax_high), 4)

        risk_level = weighted_choice(config.RISK_LEVELS, config.RISK_LEVEL_WEIGHTS)

        created_date = random_date_between(
            config.VENDOR_CREATION_START, config.VENDOR_CREATION_END
        )

        vendor = Vendor(
            vendor_id=f"VEND-{uuid_suffix()}",
            vendor_name=_generate_vendor_name(faker, category),
            category=category,
            country=country,
            city=faker.city(),
            payment_terms=random.choice(config.PAYMENT_TERMS_DAYS),
            average_invoice_amount=avg_amount,
            monthly_invoice_frequency=frequency,
            tax_rate=tax_rate,
            risk_level=risk_level,
            created_date=created_date.date().isoformat(),
        )
        vendors.append(vendor)

    return vendors


def uuid_suffix() -> str:
    """Local import-free short unique suffix generator for vendor IDs."""
    import uuid

    return uuid.uuid4().hex[:8].upper()