from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF = Path("/private/tmp/adecco-taiwan-salary-guide-2026.pdf")
OUT = ROOT / "data" / "adecco-taiwan-2026.js"

SECTIONS = [
    (20, 22, "Accounting & Finance"),
    (24, 25, "Banking & Financial Services"),
    (27, 27, "Human Resources"),
    (29, 29, "Administrative Professionals"),
    (31, 31, "Legal"),
    (33, 35, "Procurement & Supply Chain"),
    (37, 45, "Biotechnology & Healthcare"),
    (47, 49, "Marketing & Digitalization"),
    (51, 53, "Sales"),
    (55, 60, "Engineering & Manufacturing"),
    (62, 62, "Semiconductors"),
    (65, 68, "Information Technology"),
]

HEADER_WORDS = {
    "職位",
    "Position",
    "條件要求",
    "Qualification",
    "所需年資",
    "Experience",
    "( In Years )",
    "最低薪資",
    "Min.",
    "Taiwan (",
    "月薪",
    "新台幣）",
}

SECTION_LABELS = {
    "Accounting",
    "會計",
    "Audit",
    "審計",
    "Consumer",
    "Retail Banking",
    "消費金融",
    "Corporate Banking",
    "企業金融",
    "Commercial",
    "商業",
    "General",
    "一般",
}

ZH_QUALIFICATION_TERMS = ("學位", "大專", "專科", "高中", "相關者優", "領域者優", "科系", "以上", "證照")

NUM_RE = re.compile(r"\d{2,3},\d{3}\+?")
CJK_RE = re.compile(r"[\u3400-\u9fff]")
EXP_RE = re.compile(r"(<\s*\d+|\d+\s*\+|\d+\s*-\s*\d+\+?|\d+)\s*$")


def section_for(page_no: int) -> str | None:
    for start, end, name in SECTIONS:
        if start <= page_no <= end:
            return name
    return None


def as_int(value: str) -> int:
    return int(re.sub(r"[^\d]", "", value))


def clean_role(role: str) -> str:
    role = role.replace(" ⁄ ", " / ")
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
    items = [item for item in items if item["x"] > 175 and 35 < item["y"] < 505]

    salary_rows: dict[float, list[str]] = {}
    for item in items:
        nums = NUM_RE.findall(item["text"])
        if not nums:
            continue
        if len(nums) >= 2 and item["x"] >= 320:
            key = round(item["y"] * 2) / 2
            salary_rows.setdefault(key, []).extend(nums[-2:])
        elif item["x"] >= 560:
            key = round(item["y"] * 2) / 2
            salary_rows.setdefault(key, []).extend(nums)

    rows = []
    for y, nums in sorted(salary_rows.items(), reverse=True):
        if len(nums) == 1:
            near = [
                other
                for other in items
                if other["x"] >= 560
                and abs(other["y"] - y) <= 1.6
                and NUM_RE.findall(other["text"])
            ]
            nums = []
            for other in sorted(near, key=lambda row: row["x"]):
                nums.extend(NUM_RE.findall(other["text"]))
        if not nums:
            continue

        values = [as_int(num) for num in nums]
        low = min(values)
        high = max(values)
        mid = round((low + high) / 2)

        exp_candidates = []
        for candidate in items:
            if 500 <= candidate["x"] <= 590 and y - 5 <= candidate["y"] <= y + 5:
                exp_candidates.append(candidate["text"])
            elif 315 <= candidate["x"] <= 560 and y - 5 <= candidate["y"] <= y + 5 and "," not in candidate["text"]:
                match = EXP_RE.search(candidate["text"].strip())
                if match:
                    exp_candidates.append(match.group(1))
        seniority = exp_candidates[0].replace(" ", "") if exp_candidates else "Not specified"

        band = [
            candidate
            for candidate in items
            if 205 <= candidate["x"] <= 318
            and y - 9 <= candidate["y"] <= y + 10.5
            and candidate["text"] not in HEADER_WORDS
        ]

        role_parts = []
        zh_parts = []
        for candidate in sorted(band, key=lambda row: (-row["y"], row["x"])):
            text = candidate["text"].strip()
            if text in SECTION_LABELS or NUM_RE.search(text):
                continue
            if CJK_RE.search(text) and not re.search(r"[A-Za-z]", text):
                if any(term in text for term in ZH_QUALIFICATION_TERMS):
                    continue
                if text not in zh_parts:
                    zh_parts.append(text)
                continue
            if not re.search(r"[A-Za-z]", text):
                continue
            if text in {"Degree", "Diploma", "Bachelor", "B.S", "MS/MBA/PhD"}:
                continue
            if text not in role_parts:
                role_parts.append(text)

        if not role_parts:
            continue

        role = clean_role(" ".join(role_parts))
        role_zh = clean_role(" ".join(zh_parts))
        if len(role) < 3 or role in SECTION_LABELS:
            continue

        rows.append({
            "country": "tw",
            "role": role,
            "roleZh": role_zh,
            "function": section,
            "seniority": seniority,
            "low": low,
            "mid": mid,
            "high": high,
            "period": "monthly",
            "source": "adeccoTw",
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

    OUT.write_text("window.adeccoTaiwanRows = " + json.dumps(unique, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Wrote {len(unique)} rows to {OUT}")


if __name__ == "__main__":
    main()
