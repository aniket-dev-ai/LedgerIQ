"""
utils/helpers.py

Small, reusable helper functions shared across generators. Kept free of any
business-specific fraud/vendor logic so it stays generic and testable.
"""

from __future__ import annotations

import random
import uuid
from datetime import datetime, timedelta
from typing import List, Sequence, Tuple, TypeVar

import numpy as np

T = TypeVar("T")


def set_global_seed(seed: int) -> None:
    """Seed every RNG we use so the whole pipeline is reproducible."""
    random.seed(seed)
    np.random.seed(seed)


def random_date_between(start: str, end: str) -> datetime:
    """Return a random datetime uniformly between two ISO date strings."""
    start_dt = datetime.fromisoformat(start)
    end_dt = datetime.fromisoformat(end)
    delta_seconds = int((end_dt - start_dt).total_seconds())
    offset = random.randint(0, max(delta_seconds, 0))
    return start_dt + timedelta(seconds=offset)


def random_business_datetime(start: str, end: str) -> datetime:
    """
    Return a random datetime between two ISO dates, biased toward normal
    business hours (9am-7pm) on weekdays. Used for GENUINE invoices so that
    "weekend / odd hour" billing remains a distinguishing fraud signal.
    """
    while True:
        candidate = random_date_between(start, end)
        if candidate.weekday() < 5:  # Monday-Friday
            hour = random.randint(9, 18)
            candidate = candidate.replace(
                hour=hour,
                minute=random.randint(0, 59),
                second=random.randint(0, 59),
            )
            return candidate
        # weekend candidate drawn -> retry


def random_weekend_or_offhour_datetime(start: str, end: str) -> datetime:
    """
    Return a datetime that is either on a weekend, or on a weekday but at an
    unusual hour (before 7am or after 9pm). Used for WEEKEND fraud injection.
    """
    if random.random() < 0.6:
        # Force a weekend date.
        while True:
            candidate = random_date_between(start, end)
            if candidate.weekday() >= 5:
                candidate = candidate.replace(
                    hour=random.randint(0, 23),
                    minute=random.randint(0, 59),
                )
                return candidate
    else:
        # Weekday but odd hour.
        while True:
            candidate = random_date_between(start, end)
            if candidate.weekday() < 5:
                off_hour = random.choice(
                    list(range(0, 7)) + list(range(21, 24))
                )
                candidate = candidate.replace(hour=off_hour, minute=random.randint(0, 59))
                return candidate


def generate_uuid_id(prefix: str) -> str:
    """Generate a short, prefixed, unique identifier."""
    return f"{prefix}-{uuid.uuid4().hex[:10].upper()}"


def weighted_choice(options: Sequence[T], weights: Sequence[float]) -> T:
    """Thin wrapper around random.choices returning a single element."""
    return random.choices(options, weights=weights, k=1)[0]


def clamp(value: float, low: float, high: float) -> float:
    """Clamp a numeric value to the inclusive [low, high] range."""
    return max(low, min(high, value))


def round_to_currency(value: float) -> float:
    """Round a monetary amount to 2 decimal places."""
    return round(float(value), 2)


def sample_lognormal_around(mean: float, variance_pct: float) -> float:
    """
    Sample a positive value clustered around `mean` with natural,
    right-skewed variance (amounts rarely go negative, and large positive
    deviations are more plausible than large negative ones — this mimics
    real invoice amount distributions better than a plain normal).
    """
    sigma = max(variance_pct, 0.01)
    # Solve for lognormal params so the distribution's mean equals `mean`.
    normal_sigma = np.sqrt(np.log(1 + sigma ** 2))
    normal_mu = np.log(mean) - 0.5 * normal_sigma ** 2
    value = np.random.lognormal(mean=normal_mu, sigma=normal_sigma)
    return round_to_currency(value)


def business_days_after(start: datetime, days: int) -> datetime:
    """Add a number of calendar days (used for due dates / delivery dates)."""
    return start + timedelta(days=days)


def split_index_pool(total: int, seed: int) -> List[int]:
    """Return a shuffled list of row indices [0, total) for later use."""
    indices = list(range(total))
    rng = random.Random(seed)
    rng.shuffle(indices)
    return indices