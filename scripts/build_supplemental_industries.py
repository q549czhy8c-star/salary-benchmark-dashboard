from __future__ import annotations

import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "supplemental-industries-2026.js"

COUNTRIES = {
    "hk": ("hong-kong", "HKD"),
    "cn": ("china", "CNY"),
    "tw": ("taiwan", "TWD"),
    "kr": ("south-korea", "KRW"),
    "th": ("thailand", "THB"),
}

ROLES = [
    ("Doctor", "Medical"),
    ("Physician", "Medical"),
    ("Nurse", "Medical"),
    ("Dentist", "Medical"),
    ("Pharmacist", "Medical"),
    ("Teacher", "Education"),
    ("Professor", "Education"),
    ("School Principal", "Education"),
    ("Hotel Manager", "Hotel"),
    ("Housekeeper", "Hotel"),
    ("Restaurant Manager", "Restaurant"),
    ("Chef", "Restaurant"),
    ("Cook", "Restaurant"),
    ("Waiter Waitress", "Restaurant"),
    ("Food Service Worker", "小販 / Hawker Proxy"),
    ("Cashier", "小販 / Hawker Proxy"),
    ("Trader", "Trading"),
    ("Merchandiser", "Trading"),
    ("Buyer", "Trading"),
    ("Purchasing Manager", "Trading"),
    ("Procurement Manager", "Trading"),
    ("Logistics Coordinator", "Trading"),
    ("Sales Representative", "Trading"),
]

TAIWAN_DGBAS_HAWKER_ROWS = [
    {
        "country": "tw",
        "role": "Market Stall Vendor / 小販 / 攤商 - Average revenue",
        "function": "小販 / Hawker",
        "seniority": "Self-employed vendor revenue proxy",
        "low": 141167,
        "mid": 141167,
        "high": 141167,
        "period": "monthly",
        "source": "dgbasHawkerTw",
        "sourceUrl": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=233388",
        "coverage": "DGBAS 112 hawker survey / average annual revenue converted monthly"
    },
    {
        "country": "tw",
        "role": "Market Stall Vendor / 小販 / 攤商 - Average profit",
        "function": "小販 / Hawker",
        "seniority": "Self-employed vendor profit proxy",
        "low": 44417,
        "mid": 44417,
        "high": 44417,
        "period": "monthly",
        "source": "dgbasHawkerTw",
        "sourceUrl": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=233388",
        "coverage": "DGBAS 112 hawker survey / average annual profit converted monthly"
    },
]


def slugify(role: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", role.lower()).strip("-")


def fetch(url: str) -> str:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=25) as response:
        return response.read().decode("utf-8", "ignore")


def money_to_int(value: str) -> int:
    return int(re.sub(r"[^\d]", "", value))


def fetch_role(country_id: str, country_slug: str, role: str, function: str) -> dict | None:
    url = f"https://worldsalaries.com/average-{slugify(role)}-salary-in-{country_slug}/"
    try:
        html = fetch(url)
    except Exception:
        return None
    if "Average Annual Salary" not in html:
        return None

    text = BeautifulSoup(html, "lxml").get_text(" ")
    low_match = re.search(r"Average Lowest Salary\s*([\d,]+)\s*[A-Z]+", text)
    avg_match = re.search(r"Average Annual Salary\s*([\d,]+)\s*[A-Z]+", text)
    high_match = re.search(r"Average Highest Salary\s*([\d,]+)\s*[A-Z]+", text)
    if not (low_match and avg_match and high_match):
        return None

    low = money_to_int(low_match.group(1))
    mid = money_to_int(avg_match.group(1))
    high = money_to_int(high_match.group(1))
    return {
        "country": country_id,
        "role": role,
        "function": function,
        "seniority": "Average market range",
        "low": low,
        "mid": mid,
        "high": high,
        "period": "annual",
        "source": "worldSalariesGlobal",
        "sourceUrl": url,
        "coverage": "Supplemental market average"
    }


def main() -> None:
    rows = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = []
        for country_id, (country_slug, _currency) in COUNTRIES.items():
            for role, function in ROLES:
                futures.append(pool.submit(fetch_role, country_id, country_slug, role, function))
        for future in as_completed(futures):
            row = future.result()
            if row:
                rows.append(row)

    rows.extend(TAIWAN_DGBAS_HAWKER_ROWS)
    rows.sort(key=lambda item: (item["country"], item["function"], item["role"]))
    OUT.write_text("window.supplementalIndustryRows = " + json.dumps(rows, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Wrote {len(rows)} supplemental rows to {OUT}")
    by_country = {}
    by_function = {}
    for row in rows:
        by_country[row["country"]] = by_country.get(row["country"], 0) + 1
        by_function[row["function"]] = by_function.get(row["function"], 0) + 1
    print("By country", by_country)
    print("By function", by_function)


if __name__ == "__main__":
    main()
