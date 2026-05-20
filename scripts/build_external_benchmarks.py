from __future__ import annotations

import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "external-benchmarks-2026.js"


MORGAN_PAGES = [
    ("hk", "Accounting & Finance", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/accounting-finance/permanent-salaries"),
    ("hk", "Banking & Financial Services", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/banking-financial-services/permanent-salaries"),
    ("hk", "Human Resources", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/hr/permanent-salaries"),
    ("hk", "Information Technology", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/technology/permanent-salaries"),
    ("hk", "Legal", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/legal-risk-compliance/permanent-salaries"),
    ("hk", "Marketing & Sales", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/sales-marketing/permanent-salaries"),
    ("hk", "Procurement & Supply Chain", "mmhk", "https://www.morganmckinley.com/hk/salary-guide/supply-chain-procurement/permanent-salaries"),
    ("cn", "Accounting & Finance", "mmcn", "https://www.morganmckinley.com.cn/en/salary-guide/accounting-finance/permanent-salaries"),
    ("cn", "Banking & Financial Services", "mmcn", "https://www.morganmckinley.com.cn/en/salary-guide/banking-financial-services/permanent-salaries"),
    ("cn", "Human Resources", "mmcn", "https://www.morganmckinley.com.cn/en/2026-salary-guide/human-resources/permanent-salaries"),
    ("cn", "Information Technology", "mmcn", "https://www.morganmckinley.com.cn/en/salary-guide/technology/permanent-salaries"),
    ("cn", "Legal", "mmcn", "https://www.morganmckinley.com.cn/en/2026-salary-guide/legal-compliance/permanent-salaries"),
    ("cn", "Marketing & Sales", "mmcn", "https://www.morganmckinley.com.cn/en/salary-guide/sales-marketing/permanent-salaries"),
    ("cn", "Procurement & Supply Chain", "mmcn", "https://www.morganmckinley.com.cn/en/2026-salary-guide/supply-chain-engineering/permanent-salaries"),
]

THAI_CATEGORIES = [
    "Banking and Insurance",
    "Customer Service and Admin",
    "Engineering and Technical",
    "Finance and Accounting",
    "Healthcare and Life Science",
    "HR and Legal",
    "Information Technology",
    "Marketing, Media and Design",
    "Real Estate and Property",
    "Retail and Hospitality",
    "Sales and Business Development",
    "Supply Chain and Logistics",
    "Top Management",
]

KOREA_ROLES = [
    "Accountant",
    "Accounting Manager",
    "Administrative Assistant",
    "Auditor",
    "Branch Manager",
    "Business Analyst",
    "Chief Financial Officer",
    "Chief Information Officer",
    "Cloud Architect",
    "Cloud Engineer",
    "Compliance Manager",
    "Customer Service Representative",
    "Data Analyst",
    "Data Engineer",
    "Data Scientist",
    "Database Administrator",
    "Electrical Engineer",
    "Engineer",
    "Engineering Manager",
    "Finance Manager",
    "Financial Analyst",
    "Front End Developer",
    "General Counsel",
    "Human Resources Manager",
    "Internal Auditor",
    "Legal Counsel",
    "Marketing Manager",
    "Mechanical Engineer",
    "Network Engineer",
    "Operations Manager",
    "Paralegal",
    "Plant Manager",
    "Procurement Manager",
    "Product Manager",
    "Production Manager",
    "Project Manager",
    "QA Engineer",
    "Quality Manager",
    "Research Scientist",
    "Sales Engineer",
    "Sales Manager",
    "Software Developer",
    "Software Engineer",
    "Supply Chain Manager",
    "Systems Administrator",
    "Systems Analyst",
    "Systems Engineer",
    "Tax Manager",
    "Technical Manager",
    "Technician",
    "UX Designer",
]


def fetch(url: str) -> str:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=25) as response:
        return response.read().decode("utf-8", "ignore")


def money_to_int(value: str) -> int:
    return int(re.sub(r"[^\d]", "", value))


def parse_morgan_page(country: str, function: str, source: str, url: str) -> list[dict]:
    html = fetch(url)
    soup = BeautifulSoup(html, "lxml")
    lines = [unescape(line.strip()) for line in soup.get_text("\n").splitlines() if line.strip()]
    rows: list[dict] = []
    rate_tokens = {"Monthly rate": "monthly", "Annual rate": "annual"}
    for index, line in enumerate(lines):
        if line not in rate_tokens or index == 0:
            continue
        role = lines[index - 1].strip()
        if role in {"Job Title", "Search job title"} or len(role) < 3:
            continue
        window = lines[index + 1:index + 14]
        amounts = [money_to_int(item) for item in window if re.fullmatch(r"(?:HK)?\$?¥?[\d,]+|RMB[\d,]+", item)]
        if len(amounts) < 3:
            amounts = [money_to_int(item) for item in window if re.search(r"[\$¥]|RMB", item)]
        if len(amounts) < 3:
            continue
        low, mid, high = amounts[:3]
        if not (low <= mid <= high):
            continue
        rows.append({
            "country": country,
            "role": role,
            "function": function,
            "seniority": "Market guide",
            "low": low,
            "mid": mid,
            "high": high,
            "period": rate_tokens[line],
            "source": source,
            "sourceUrl": url,
            "coverage": "Direct salary guide"
        })
    if rows:
        return rows

    # Mainland China pages render annual salary rows as either:
    # Job Title
    # Sub Sector Location ¥Low ¥Average ¥High
    # or split across individual text nodes:
    # Job Title / Sub Sector / Location / ¥Low / ¥Average / ¥High
    # Keep the previous line as the role; do not mistake sub-sector for role.
    locations = ("Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Mainland China")
    table_headers = {"Job Title", "Sector", "Sub Sector", "Location", "Low", "Average", "High", "Search job title"}
    for index, line in enumerate(lines):
        amounts = [money_to_int(item) for item in re.findall(r"¥[\d,]+", line)]
        role = ""
        sub_sector = ""
        location = ""

        if len(amounts) >= 3:
            location = next((place for place in locations if re.search(rf"\b{re.escape(place)}\b", line)), "")
            if not location:
                continue
            role_index = index - 1
            while role_index > 0 and (not lines[role_index].strip() or lines[role_index] in table_headers):
                role_index -= 1
            role = lines[role_index].strip()
            sub_sector = line.split(location, 1)[0].strip()
        elif (
            index >= 3
            and index + 2 < len(lines)
            and re.fullmatch(r"¥[\d,]+", line)
            and re.fullmatch(r"¥[\d,]+", lines[index + 1])
            and re.fullmatch(r"¥[\d,]+", lines[index + 2])
            and lines[index - 1] in locations
        ):
            amounts = [money_to_int(line), money_to_int(lines[index + 1]), money_to_int(lines[index + 2])]
            location = lines[index - 1]
            cursor = index - 2
            fields = []
            while cursor >= 0 and lines[cursor] not in table_headers and not re.fullmatch(r"¥[\d,]+", lines[cursor]):
                fields.append(lines[cursor].strip())
                cursor -= 1
            fields = list(reversed(fields))
            if not fields:
                continue
            role = fields[0]
            middle = []
            for field in fields[1:]:
                if field and field != role and field not in middle:
                    middle.append(field)
            sub_sector = middle[-1] if middle else function
        else:
            continue

        low, mid, high = amounts[:3]
        if not (low <= mid <= high):
            continue

        if (
            len(role) < 3
            or role in table_headers
            or re.search(r"¥[\d,]+", role)
        ):
            continue

        sub_sector = re.sub(r"\s+", " ", sub_sector)

        rows.append({
            "country": country,
            "role": role,
            "function": sub_sector or function,
            "seniority": "Market guide",
            "low": low,
            "mid": mid,
            "high": high,
            "period": "annual",
            "source": source,
            "sourceUrl": url,
            "coverage": f"Direct salary guide - {location}"
        })
    return rows


def get_thai_positions(category: str) -> list[dict]:
    url = f"https://www.adecco.com/en-th/salary-guide/SearchPosition?category={quote(category)}"
    return json.loads(fetch(url))


def parse_salary_bands(html: str) -> list[dict]:
    match = re.search(r"var salaryBands\s*=\s*\[(.*?)\];", html, re.S)
    if not match:
        return []
    bands = []
    for item in re.finditer(r'\{\s*id:\s*"([^"]+)".*?label:\s*"([^"]+)".*?level:\s*"([^"]+)".*?min:\s*(\d+).*?max:\s*(\d+)', match.group(1), re.S):
        bands.append({
            "id": item.group(1),
            "label": item.group(2).replace("–", "-"),
            "level": item.group(3),
            "min": int(item.group(4)),
            "max": int(item.group(5)),
        })
    return bands


def fetch_thai_result(position: str, category: str) -> list[dict]:
    url = f"https://www.adecco.com/en-th/salary-guide/results?position={quote(position)}&category={quote(category)}"
    try:
        bands = parse_salary_bands(fetch(url))
    except Exception:
        return []
    rows = []
    for band in bands:
        low, high = band["min"], band["max"]
        if low <= 0 or high <= 0:
            continue
        rows.append({
            "country": "th",
            "role": position,
            "function": category,
            "seniority": f'{band["level"]} ({band["label"]})',
            "low": low,
            "mid": round((low + high) / 2),
            "high": high,
            "period": "monthly",
            "source": "adeccoTh",
            "sourceUrl": url,
            "coverage": "Direct salary guide"
        })
    if not rows and bands:
        rows.extend(fetch_world_salary(
            "th",
            "thailand",
            position,
            category,
            "Fallback market average - Adecco Thailand listed role without salary band",
        ))
    return rows


def slugify_role(role: str) -> str:
    text = role.lower()
    text = re.sub(r"\([^)]*\)", "", text)
    text = text.replace("&", "and")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def fetch_world_salary(country_id: str, country_slug: str, role: str, function: str, coverage: str) -> list[dict]:
    slug = slugify_role(role)
    url = f"https://worldsalaries.com/average-{slug}-salary-in-{country_slug}/"
    try:
        html = fetch(url)
    except Exception:
        return []
    if "Average Annual Salary" not in html:
        return []
    soup = BeautifulSoup(html, "lxml")
    text = soup.get_text(" ")
    low_match = re.search(r"Average Lowest Salary\s*([\d,]+)\s*[A-Z]+", text)
    avg_match = re.search(r"Average Annual Salary\s*([\d,]+)\s*[A-Z]+", text)
    high_match = re.search(r"Average Highest Salary\s*([\d,]+)\s*[A-Z]+", text)
    if not (low_match and avg_match and high_match):
        return []
    low = money_to_int(low_match.group(1))
    mid = money_to_int(avg_match.group(1))
    high = money_to_int(high_match.group(1))
    return [{
        "country": country_id,
        "role": role,
        "function": function,
        "seniority": "Average market range",
        "low": low,
        "mid": mid,
        "high": high,
        "period": "annual",
        "source": "worldSalariesGlobal" if country_id != "kr" else "worldSalariesKr",
        "sourceUrl": url,
        "coverage": coverage
    }]


def fetch_korea_role(role: str) -> list[dict]:
    return fetch_world_salary("kr", "south-korea", role, "Taiwan taxonomy match", "Fallback market average")


def existing_external_rows() -> list[dict]:
    if not OUT.exists():
        return []
    match = re.search(r"window\.externalBenchmarkRows\s*=\s*(\[.*\]);\s*$", OUT.read_text(encoding="utf-8"), re.S)
    if not match:
        return []
    return json.loads(match.group(1))


def dedupe(rows: list[dict]) -> list[dict]:
    seen = set()
    unique = []
    for row in rows:
        key = (row["country"], row["role"], row["function"], row["seniority"], row["low"], row["high"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(row)
    return unique


def main() -> None:
    previous_rows = existing_external_rows()
    rows: list[dict] = []

    for country, function, source, url in MORGAN_PAGES:
        try:
            parsed = parse_morgan_page(country, function, source, url)
            print(f"Morgan {country} {function}: {len(parsed)}")
            rows.extend(parsed)
            time.sleep(0.2)
        except Exception as exc:
            print(f"FAILED Morgan {url}: {exc}")

    thai_positions = []
    for category in THAI_CATEGORIES:
        try:
            items = get_thai_positions(category)
            print(f"Thai positions {category}: {len(items)}")
            thai_positions.extend((item["name"], item["category"]) for item in items)
            time.sleep(0.1)
        except Exception as exc:
            print(f"FAILED Thai category {category}: {exc}")

    thai_positions = sorted(set(thai_positions))
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(fetch_thai_result, position, category) for position, category in thai_positions]
        for future in as_completed(futures):
            rows.extend(future.result())
    print(f"Thai salary rows: {sum(1 for row in rows if row['country'] == 'th')}")

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch_korea_role, role) for role in KOREA_ROLES]
        for future in as_completed(futures):
            rows.extend(future.result())
    if previous_rows and not any(row["country"] == "kr" for row in rows):
        fallback_kr = [row for row in previous_rows if row["country"] == "kr"]
        rows.extend(fallback_kr)
        print(f"Korea salary rows restored from existing data: {len(fallback_kr)}")
    print(f"Korea salary rows: {sum(1 for row in rows if row['country'] == 'kr')}")

    rows = dedupe(rows)
    OUT.write_text("window.externalBenchmarkRows = " + json.dumps(rows, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
