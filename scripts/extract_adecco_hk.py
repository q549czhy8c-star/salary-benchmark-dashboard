from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF = Path("/private/tmp/adecco-hong-kong-salary-guide-2026.pdf")
OUT = ROOT / "data" / "adecco-hong-kong-2026.js"

SECTIONS = [
    (18, 20, "Accounting & Finance"),
    (22, 23, "Construction & Engineering"),
    (25, 26, "Corporate Support"),
    (28, 28, "Customer Service"),
    (30, 31, "Education"),
    (33, 44, "Information Technology"),
    (46, 48, "Legal and Compliance"),
    (50, 50, "Life Science & Pharmaceutical"),
    (52, 55, "Marketing"),
    (57, 57, "Retail"),
    (59, 60, "Sales"),
    (62, 69, "Supply Chain, Logistics & Engineering"),
]

HEADER_WORDS = {
    "Job Positions",
    "職位",
    "Qualification",
    "條件要求",
    "Experience (In Years)",
    "所需年資 (年)",
    "Monthly Salary in HK$",
    "月薪 (港幣)",
    "min.",
    "max.",
    "最低薪資",
    "最高薪資",
    "Hong Kong Salary Guide 2026",
}

SECTION_LABELS = {
    "Accounting",
    "Audit",
    "Finance",
    "Financial Planning & Analysis",
    "Treasury",
    "Data Analytics / Data Management",
    "C- Level Executive Leadership",
    "Senior Appointments in Technology / Management-Grade",
    "Application Development",
    "Cloud & DevOps",
    "Cybersecurity",
    "Data & Analytics",
    "Infrastructure & Networking",
    "Project & Change Management",
    "ERP / CRM / Business Systems",
    "Legal",
    "Compliance",
    "Life Science & Pharmaceutical",
    "Marketing",
    "Retail",
    "Sales",
    "Merchandising",
    "Quality Control",
    "Logistics",
    "Supply Chain",
    "Engineering",
}

NUM_RE = re.compile(r"\d{2,3},\d{3}\+?")
EXP_RE = re.compile(r"(<\s*\d+|\d+\s*\+|\d+\s*-\s*\d+\+?|\d+)\s*$")
CJK_RE = re.compile(r"[\u3400-\u9fff]")


def section_for(page_no: int) -> str | None:
    for start, end, name in SECTIONS:
        if start <= page_no <= end:
            return name
    return None


def as_int(value: str) -> int:
    return int(re.sub(r"[^\d]", "", value))


def clean_role(role: str) -> str:
    role = role.replace("T echnology", "Technology")
    role = re.sub(r"\s+", " ", role)
    return role.strip(" /")


def extract_page(reader: PdfReader, page_no: int) -> list[dict]:
    section = section_for(page_no)
    if not section:
        return []

    items: list[dict] = []

    def visitor(text, cm, tm, font, font_size):
        value = " ".join(text.strip().split())
        if value:
            items.append({"y": round(tm[5], 1), "x": round(tm[4], 1), "text": value})

    reader.pages[page_no - 1].extract_text(visitor_text=visitor)
    items = [item for item in items if item["x"] > 135 and 28 < item["y"] < 462]

    salary_items = []
    for item in items:
        nums = NUM_RE.findall(item["text"])
        if len(nums) >= 2 and item["x"] >= 390:
            salary_items.append((item, nums[-2:]))

    rows = []
    for item, nums in salary_items:
        y = item["y"]
        low, high = as_int(nums[0]), as_int(nums[1])
        if low > high:
            low, high = high, low

        # The experience value, when present, usually appears immediately
        # before the salary numbers in the qualification text.
        prefix = item["text"].split(nums[0], 1)[0].strip()
        exp_match = EXP_RE.search(prefix)
        seniority = exp_match.group(1).replace(" ", "") if exp_match else "Not specified"

        band = [
            candidate
            for candidate in items
            if 145 <= candidate["x"] <= 390
            and y - 18 <= candidate["y"] <= y + 18
            and candidate["text"] not in HEADER_WORDS
        ]

        role_parts = []
        zh_parts = []
        for candidate in sorted(band, key=lambda row: (-row["y"], row["x"])):
            text = candidate["text"].strip()
            if text in SECTION_LABELS:
                continue
            if CJK_RE.search(text) and not re.search(r"[A-Za-z]", text) and not NUM_RE.search(text):
                if text not in zh_parts:
                    zh_parts.append(text)
                continue
            if not re.search(r"[A-Za-z]", text):
                continue
            if any(word in text for word in ["Degree", "Diploma", "CPA", "MBA", "PhD", "Bachelors", "Bachelor"]):
                continue
            if NUM_RE.search(text):
                continue
            if text not in role_parts:
                role_parts.append(text)

        if not role_parts:
            continue
        role = clean_role(" ".join(role_parts))
        if len(role) < 3 or role in SECTION_LABELS:
            continue

        rows.append({
            "country": "hk",
            "role": role,
            "roleZh": clean_role(" ".join(zh_parts)),
            "function": section,
            "seniority": seniority,
            "low": low,
            "mid": round((low + high) / 2),
            "high": high,
            "period": "monthly",
            "source": "adeccoHk",
            "sourceUrl": "https://image.marketing.info.adecco.com/lib/fe32117175640474731478/m/1/044fa74e-de92-456e-b352-a498fecd27fa.pdf",
            "coverage": "Direct salary guide",
            "page": page_no,
        })
    return rows


def main() -> None:
    reader = PdfReader(str(PDF))
    rows = []
    for page_no in range(1, len(reader.pages) + 1):
        rows.extend(extract_page(reader, page_no))

    seen = set()
    unique = []
    for row in rows:
        key = (row["role"], row["function"], row["seniority"], row["low"], row["high"], row["page"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(row)

    OUT.write_text("window.adeccoHongKongRows = " + json.dumps(unique, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Wrote {len(unique)} rows to {OUT}")


if __name__ == "__main__":
    main()
