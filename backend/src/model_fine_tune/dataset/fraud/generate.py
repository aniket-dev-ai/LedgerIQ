"""
generate_dataset.py

Entry point for the LedgerIQ synthetic invoice dataset generator.

Pipeline:
    1. Generate vendor master list (with category-driven behavior profiles).
    2. Generate Purchase Orders per vendor.
    3. Generate genuine invoices (~95%), tracking per-vendor history as we go.
    4. Inject fraudulent invoices (~5%) across 10 realistic fraud scenarios,
       built on top of the same vendor/PO/history context.
    5. Merge, shuffle, and write out synthetic_invoice_dataset.csv.

Run:
    python generate_dataset.py
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

import pandas as pd
from faker import Faker

import config
from src.model_fine_tune.dataset.fraud.fraud_generator import generate_fraud_invoices
from src.model_fine_tune.dataset.fraud.invoice_generator import generate_genuine_invoices, initialize_histories
from src.model_fine_tune.dataset.fraud.po_generator import generate_purchase_orders
from src.model_fine_tune.dataset.fraud.vendor_generator import generate_vendors
from src.utils.helper import set_global_seed, split_index_pool


def build_dataset() -> pd.DataFrame:
    """Run the full generation pipeline and return the final DataFrame."""
    set_global_seed(config.RANDOM_SEED)
    faker = Faker(config.FAKER_LOCALE)
    Faker.seed(config.RANDOM_SEED)

    print(f"[1/5] Generating {config.NUM_VENDORS} vendors...")
    vendors = generate_vendors(faker, config.NUM_VENDORS)

    print("[2/5] Generating purchase orders...")
    purchase_orders = generate_purchase_orders(vendors)
    print(f"        -> {len(purchase_orders)} POs created")

    print(f"[3/5] Generating {config.NUM_GENUINE_INVOICES} genuine invoices...")
    histories = initialize_histories(vendors)
    genuine_invoices = generate_genuine_invoices(
        vendors, purchase_orders, histories, config.NUM_GENUINE_INVOICES
    )

    print(f"[4/5] Injecting {config.NUM_FRAUD_INVOICES} fraudulent invoices "
          f"across {len(config.FRAUD_TYPE_WEIGHTS)} scenarios...")
    fraud_invoices, new_vendors = generate_fraud_invoices(
        vendors, purchase_orders, genuine_invoices, histories, faker,
        config.NUM_FRAUD_INVOICES,
    )
    vendors.extend(new_vendors)  # shell vendors created during NEW_VENDOR fraud

    print("[5/5] Merging, shuffling, and finalizing dataset...")
    all_invoices = genuine_invoices + fraud_invoices
    records = [inv.to_dict() for inv in all_invoices]
    df = pd.DataFrame.from_records(records)

    # Shuffle rows so fraud isn't clustered at the end of the file.
    shuffled_order = split_index_pool(len(df), config.RANDOM_SEED)
    df = df.iloc[shuffled_order].reset_index(drop=True)

    # Enforce final column order for a clean, predictable CSV schema.
    column_order = [
        "invoice_number",
        "vendor_id",
        "vendor_name",
        "vendor_category",
        "country",
        "city",
        "po_number",
        "department",
        "invoice_date",
        "due_date",
        "payment_terms",
        "currency",
        "amount",
        "tax_rate",
        "tax_amount",
        "invoice_status",
        "created_timestamp",
        "is_fraud",
        "fraud_type",
    ]
    df = df[column_order]

    return df


def print_summary(df: pd.DataFrame) -> None:
    """Print a quick sanity-check summary of the generated dataset."""
    total = len(df)
    fraud_count = int(df["is_fraud"].sum())
    fraud_pct = 100 * fraud_count / total

    print("\n" + "=" * 60)
    print("DATASET SUMMARY")
    print("=" * 60)
    print(f"Total invoices        : {total}")
    print(f"Genuine invoices      : {total - fraud_count}")
    print(f"Fraudulent invoices   : {fraud_count} ({fraud_pct:.2f}%)")
    print("\nFraud type breakdown:")
    print(
        df.loc[df["is_fraud"] == 1, "fraud_type"]
        .value_counts()
        .to_string()
    )
    print("=" * 60)


def main() -> None:
    start = time.time()
    df = build_dataset()

    output_dir = Path(config.OUTPUT_DIR)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / config.OUTPUT_FILENAME

    df.to_csv(output_path, index=False)
    elapsed = time.time() - start

    print_summary(df)
    print(f"\nSaved dataset to: {output_path.resolve()}")
    print(f"Done in {elapsed:.2f}s")


if __name__ == "__main__":
    sys.exit(main())