const countries = [
  {
    id: "hk",
    name: "香港",
    english: "Hong Kong",
    currency: "HKD",
    color: "#2f7d5c",
    savingRate: 28.3,
    savingDate: "Sep 2025",
    savingNote: "CEIC gross national saving rate, quarterly.",
    note: "2026 年招聘仍偏審慎，Morgan McKinley 指出多數年度調薪約 3-5%，入門數碼財務人才競爭較強。"
  },
  {
    id: "cn",
    name: "中國",
    english: "Mainland China",
    currency: "CNY",
    color: "#247b83",
    savingRate: 43.4,
    savingDate: "Dec 2024",
    savingNote: "CEIC gross domestic saving rate, yearly.",
    note: "Morgan McKinley 2026 指出固定薪酬大致持平，企業更重視績效薪酬、海外擴張與成本控制能力。"
  },
  {
    id: "tw",
    name: "台灣",
    english: "Taiwan",
    currency: "TWD",
    color: "#bc7b24",
    savingRate: 43.6,
    savingDate: "Sep 2025",
    savingNote: "CEIC gross national saving rate, quarterly.",
    note: "DGBAS 2025 全體受僱員工經常性薪資平均 NT$47,884；高科技、金融與 ICT 行業明顯高於平均。"
  },
  {
    id: "kr",
    name: "南韓",
    english: "South Korea",
    currency: "KRW",
    color: "#b45a61",
    savingRate: 35.2,
    savingDate: "Jun 2025",
    savingNote: "CEIC gross national saving rate, quarterly.",
    note: "技術與大型企業職位薪酬差距大；軟體、AI、半導體和財務職能仍是高競爭區。"
  },
  {
    id: "th",
    name: "泰國",
    english: "Thailand",
    currency: "THB",
    color: "#416b9b",
    savingRate: 21.2,
    savingDate: "Sep 2025",
    savingNote: "CEIC gross domestic saving rate, quarterly.",
    note: "Adecco Thailand 2026 指出招聘轉趨穩定但審慎，IT、數據、AI、網安、ESG 和財務仍有薪酬溢價。"
  }
];

const sources = {
  mmhk: {
    label: "Morgan McKinley HK 2026",
    url: "https://www.morganmckinley.com/hk/salary-guide/accounting-finance/permanent-salaries"
  },
  adeccoHk: {
    label: "Adecco Hong Kong Salary Guide 2026 PDF",
    url: "https://image.marketing.info.adecco.com/lib/fe32117175640474731478/m/1/044fa74e-de92-456e-b352-a498fecd27fa.pdf"
  },
  mmcn: {
    label: "Morgan McKinley China 2026",
    url: "https://www.morganmckinley.com.cn/en/salary-guide/accounting-finance/permanent-salaries"
  },
  adeccoTw: {
    label: "Adecco Taiwan Salary Guide 2026 PDF",
    url: "https://www.adecco.com/-/media/Project/Adecco/AdeccoTW/Adecco%20Taiwan%20Salary%20Guide%202026.pdf"
  },
  dgbas: {
    label: "DGBAS Taiwan Earnings Statistics 2025",
    url: "https://eng.dgbas.gov.tw/News_Content.aspx?n=4438&s=235868"
  },
  nodeflairTw: {
    label: "NodeFlair Taiwan Tech Salary 2026",
    url: "https://nodeflair.com/salaries/taiwan-software-engineer-salary"
  },
  salaryRunTw: {
    label: "Salary.run Taiwan Engineering Manager 2026",
    url: "https://www.salary.run/es/salaries/country/taiwan/software-engineering-manager"
  },
  rwKr: {
    label: "Robert Walters Korea Salary Survey 2026",
    url: "https://www.robertwalters.co.kr/en/our-services/salary-survey.html"
  },
  employsomeKr: {
    label: "Employsome South Korea Average Salary 2026",
    url: "https://employsome.com/hire/south-korea/average-salary-south-korea/"
  },
  glassdoorKr: {
    label: "Glassdoor South Korea HR Manager 2026",
    url: "https://www.glassdoor.com/Salaries/south-korea-hr-manager-salary-SRCH_IL.0%2C11_IN135_KO12%2C22.htm"
  },
  worldSalariesKr: {
    label: "World Salaries South Korea 2026",
    url: "https://worldsalaries.com/average-salary-in-south-korea/"
  },
  worldSalariesGlobal: {
    label: "World Salaries 2026",
    url: "https://worldsalaries.com/"
  },
  dgbasHawkerTw: {
    label: "CENS report citing DGBAS hawker study",
    url: "https://www.cens.com/cens/html/en/news/news_inner_27615.html"
  },
  adeccoTh: {
    label: "Adecco Thailand Salary Guide 2026",
    url: "https://www.adecco.com/en-th/insights/download-adecco-thailand-salary-guide-2026"
  },
  adeccoThData: {
    label: "Adecco Thailand 2026 Online Guide",
    url: "https://www.adecco.com/-/jssmedia/Project/Adecco/AdeccoTH/adeccothailand_salaryguide2026"
  },
  ceic: {
    label: "CEIC Gross Savings Rate",
    url: "https://www.ceicdata.com/en/indicator/gross-savings-rate"
  }
};

const baseSalaryRows = [
  ["hk", "Accounts Assistant", "Accounting & Finance", "Entry", 20000, 22000, 24000, "monthly", "mmhk"],
  ["hk", "Accounts Payable Specialist", "Accounting & Finance", "Specialist", 22000, 27000, 32000, "monthly", "mmhk"],
  ["hk", "Financial Analyst", "Accounting & Finance", "Analyst", 38000, 46000, 50000, "monthly", "mmhk"],
  ["hk", "Senior Finance Analyst", "Accounting & Finance", "Senior", 40000, 50000, 55000, "monthly", "mmhk"],
  ["hk", "Finance Manager", "Accounting & Finance", "Manager", 60000, 70000, 80000, "monthly", "mmhk"],
  ["hk", "Financial Controller", "Accounting & Finance", "Senior Manager", 90000, 110000, 130000, "monthly", "mmhk"],
  ["hk", "Chief Financial Officer", "Accounting & Finance", "Executive", 180000, 220000, 350000, "monthly", "mmhk"],
  ["hk", "Fund Accountant", "Financial Services", "Specialist", 28000, 40000, 52000, "monthly", "mmhk"],
  ["hk", "Product Controller", "Financial Services", "Specialist", 42000, 63000, 85000, "monthly", "mmhk"],
  ["hk", "Vice President - Regulatory Reporting", "Financial Services", "VP", 65000, 90000, 120000, "monthly", "mmhk"],

  ["cn", "Finance Supervisor", "Overall Finance", "Supervisor", 180000, 225000, 280000, "annual", "mmcn"],
  ["cn", "Finance Manager", "Overall Finance", "Manager", 280000, 350000, 500000, "annual", "mmcn"],
  ["cn", "Senior Finance Manager", "Overall Finance", "Senior Manager", 500000, 650000, 800000, "annual", "mmcn"],
  ["cn", "Financial Controller", "Overall Finance", "Senior Manager", 800000, 1000000, 1200000, "annual", "mmcn"],
  ["cn", "Financial Director", "Overall Finance", "Director", 1200000, 1500000, 1700000, "annual", "mmcn"],
  ["cn", "VP / CFO", "Overall Finance", "Executive", 1500000, 2000000, 3000000, "annual", "mmcn"],
  ["cn", "Analyst - FP&A", "Financial Planning Analysis", "Analyst", 150000, 200000, 250000, "annual", "mmcn"],
  ["cn", "Manager - FP&A", "Financial Planning Analysis", "Manager", 450000, 500000, 650000, "annual", "mmcn"],
  ["cn", "Director - FP&A", "Financial Planning Analysis", "Director", 900000, 1200000, 1600000, "annual", "mmcn"],
  ["cn", "Director - Tax", "Tax", "Director", 700000, 1500000, 2000000, "annual", "mmcn"],

  ["tw", "All Employees - Regular Earnings", "All Industries", "Market Average", 47884, 47884, 47884, "monthly", "dgbas"],
  ["tw", "Financial & Insurance Industry", "Industry Benchmark", "Industry Average", 70997, 70997, 70997, "monthly", "dgbas"],
  ["tw", "Publishing, Audio-Visual & ICT", "Industry Benchmark", "Industry Average", 69595, 69595, 69595, "monthly", "dgbas"],
  ["tw", "Professional, Scientific & Technical Services", "Industry Benchmark", "Industry Average", 58377, 58377, 58377, "monthly", "dgbas"],
  ["tw", "Electronic Components Manufacturing", "Industry Benchmark", "Industry Average", 57096, 57096, 57096, "monthly", "dgbas"],
  ["tw", "Software Engineer", "Technology", "Mixed", 40000, 73125, 160000, "monthly", "nodeflairTw"],
  ["tw", "Software Engineering Manager", "Technology", "Manager", 65000, 109000, 161000, "monthly", "salaryRunTw"],

  ["kr", "Software Engineer", "Technology", "Mixed", 45000000, 65000000, 120000000, "annual", "employsomeKr"],
  ["kr", "Senior Software Engineer", "Technology", "Senior", 90000000, 110000000, 130000000, "annual", "employsomeKr"],
  ["kr", "ML Engineer", "AI & Data", "Senior", 70000000, 95000000, 125000000, "annual", "rwKr"],
  ["kr", "HR Manager", "Human Resources", "Manager", 65000000, 80500000, 100000000, "annual", "glassdoorKr"],
  ["kr", "Finance Professional", "Finance", "Professional", 60000000, 85000000, 120000000, "annual", "rwKr"],

  ["th", "Software Engineer", "Software Development", "Junior", 40000, 50000, 60000, "monthly", "adeccoThData"],
  ["th", "Software Engineer", "Software Development", "Middle", 60000, 80000, 100000, "monthly", "adeccoThData"],
  ["th", "Software Engineer", "Software Development", "Senior", 60000, 90000, 120000, "monthly", "adeccoThData"],
  ["th", "Software Engineer", "Software Development", "Top Management", 150000, 175000, 200000, "monthly", "adeccoThData"],
  ["th", "QA Engineer / Software Tester", "Software Development", "Senior", 60000, 70000, 80000, "monthly", "adeccoThData"],
  ["th", "Programmer / Software Developer", "Software Development", "Junior", 30000, 50000, 70000, "monthly", "adeccoThData"],
  ["th", "Data Scientist / Data Engineer", "AI & Data", "Junior", 50000, 65000, 80000, "monthly", "adeccoTh"],
  ["th", "Chief Artificial Intelligence Officer", "AI & Data", "Executive", 300000, 550000, 800000, "monthly", "adeccoThData"]
].map(([country, role, fn, seniority, low, mid, high, period, source]) => ({
  country,
  role,
  function: fn,
  seniority,
  low,
  mid,
  high,
  period,
  source
}));

const salaries = [
  ...baseSalaryRows.filter((row) => row.country === "tw"),
  ...(window.adeccoTaiwanRows || []),
  ...(window.adeccoHongKongRows || []),
  ...(window.externalBenchmarkRows || []),
  ...(window.supplementalIndustryRows || [])
];

const state = {
  query: "",
  selectedCountry: "all",
  selectedFunction: "all",
  page: 1,
  pageSize: 50
};

const countryById = Object.fromEntries(countries.map((country) => [country.id, country]));
const money = (value, currency) => `${currency} ${new Intl.NumberFormat("en-US").format(value)}`;

function sourceLink(key) {
  const source = sources[key];
  return `<a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`;
}

function sourceCell(row) {
  const source = sources[row.source];
  const url = row.sourceUrl || source.url;
  return `
    <a class="source-link" href="${url}" target="_blank" rel="noreferrer">${source.label}</a>
    ${row.page ? `<span class="page-ref">p.${row.page}</span>` : ""}
    ${row.coverage ? `<span class="coverage-ref">${row.coverage}</span>` : ""}
  `;
}

function renderSavings() {
  const average = countries.reduce((sum, country) => sum + country.savingRate, 0) / countries.length;
  document.getElementById("savingAverage").textContent = `${average.toFixed(1)}%`;
  document.getElementById("topSaving").textContent = `${countries.reduce((top, current) => current.savingRate > top.savingRate ? current : top).name} ${Math.max(...countries.map((country) => country.savingRate)).toFixed(1)}%`;

  document.getElementById("savingBars").innerHTML = countries.map((country) => `
    <div class="saving-row">
      <div class="saving-label">
        <span>${country.name}</span>
        <strong>${country.savingRate.toFixed(1)}% · ${country.savingDate}</strong>
      </div>
      <div class="bar-track" title="${country.savingNote}">
        <div class="bar-fill" style="width:${Math.min(country.savingRate / 50 * 100, 100)}%"></div>
      </div>
    </div>
  `).join("");
}

function renderFilters() {
  const filters = [{ id: "all", name: "All" }, ...countries];
  document.getElementById("countryFilters").innerHTML = filters.map((country) => `
    <button type="button" data-country="${country.id}" class="${state.selectedCountry === country.id ? "active" : ""}">
      ${country.name}
    </button>
  `).join("");

  const functionSelect = document.getElementById("functionFilter");
  const currentValue = state.selectedFunction;
  const functions = [...new Set(salaries.map((row) => row.function))].sort((a, b) => a.localeCompare(b));
  functionSelect.innerHTML = [
    `<option value="all">All industries</option>`,
    ...functions.map((fn) => `<option value="${fn}">${fn}</option>`)
  ].join("");
  functionSelect.value = functions.includes(currentValue) ? currentValue : "all";
}

function renderMarkets() {
  document.getElementById("marketCards").innerHTML = countries.map((country) => `
    <article class="market-card">
      <h3>${country.name} <span lang="en">(${country.english})</span></h3>
      <p><strong>Saving rate:</strong> ${country.savingRate.toFixed(1)}% (${country.savingDate}). ${country.note}</p>
    </article>
  `).join("");
}

function filterRows() {
  const query = state.query.trim().toLowerCase();
  return salaries.filter((row) => {
    const country = countryById[row.country];
    const haystack = [
      country.name,
      country.english,
      country.currency,
      row.role,
      row.function,
      row.seniority,
      sources[row.source].label,
      row.coverage || ""
    ].join(" ").toLowerCase();

    const countryMatch = state.selectedCountry === "all" || row.country === state.selectedCountry;
    const functionMatch = state.selectedFunction === "all" || row.function === state.selectedFunction;
    const queryMatch = !query || haystack.includes(query);
    return countryMatch && functionMatch && queryMatch;
  });
}

function renderTable() {
  const rows = filterRows();
  const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
  state.page = Math.min(state.page, totalPages);
  const startIndex = (state.page - 1) * state.pageSize;
  const pageRows = rows.slice(startIndex, startIndex + state.pageSize);

  document.getElementById("roleCount").textContent = rows.length;
  document.getElementById("countryCount").textContent = new Set(rows.map((row) => row.country)).size || 0;
  document.getElementById("emptyState").style.display = rows.length ? "none" : "block";
  document.getElementById("resultRange").textContent = rows.length
    ? `Showing ${startIndex + 1}-${Math.min(startIndex + state.pageSize, rows.length)} of ${rows.length} records`
    : "No records";

  document.getElementById("salaryRows").innerHTML = pageRows.map((row) => {
    const country = countryById[row.country];
    const isPoint = row.low === row.high;
    return `
      <tr>
        <td><span class="country-tag" style="background:${country.color}">${country.name}</span></td>
        <td><strong>${row.role}</strong></td>
        <td>${row.function}</td>
        <td>${row.seniority}</td>
        <td class="range">${isPoint ? money(row.mid, country.currency) : `${money(row.low, country.currency)} - ${money(row.high, country.currency)}`}</td>
        <td class="range">${money(row.mid, country.currency)}</td>
        <td>${row.period === "monthly" ? "Monthly" : "Annual"}</td>
        <td>${sourceCell(row)}</td>
      </tr>
    `;
  }).join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const pageButtons = [];
  const start = Math.max(1, state.page - 2);
  const end = Math.min(totalPages, state.page + 2);
  for (let page = start; page <= end; page += 1) {
    pageButtons.push(`<button type="button" data-page="${page}" class="${page === state.page ? "active" : ""}">${page}</button>`);
  }

  pagination.innerHTML = `
    <button type="button" data-page="${Math.max(1, state.page - 1)}" ${state.page === 1 ? "disabled" : ""}>Prev</button>
    ${start > 1 ? `<button type="button" data-page="1">1</button><span>...</span>` : ""}
    ${pageButtons.join("")}
    ${end < totalPages ? `<span>...</span><button type="button" data-page="${totalPages}">${totalPages}</button>` : ""}
    <button type="button" data-page="${Math.min(totalPages, state.page + 1)}" ${state.page === totalPages ? "disabled" : ""}>Next</button>
  `;
}

function renderSources() {
  const usedSources = ["adeccoHk", "mmhk", "mmcn", "adeccoTw", "dgbas", "dgbasHawkerTw", "nodeflairTw", "salaryRunTw", "worldSalariesKr", "worldSalariesGlobal", "adeccoTh", "adeccoThData", "ceic"];
  document.getElementById("sourcesList").innerHTML = usedSources.map((key) => `<li>${sourceLink(key)}</li>`).join("");
}

function render() {
  renderSavings();
  renderFilters();
  renderMarkets();
  renderTable();
  renderSources();
}

document.getElementById("searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  state.page = 1;
  renderTable();
});

document.getElementById("countryFilters").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-country]");
  if (!button) return;
  state.selectedCountry = button.dataset.country;
  state.page = 1;
  renderFilters();
  renderTable();
});

document.getElementById("functionFilter").addEventListener("change", (event) => {
  state.selectedFunction = event.target.value;
  state.page = 1;
  renderTable();
});

document.getElementById("pageSizeSelect").addEventListener("change", (event) => {
  state.pageSize = Number(event.target.value);
  state.page = 1;
  renderTable();
});

document.getElementById("pagination").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;
  state.page = Number(button.dataset.page);
  renderTable();
  document.querySelector(".salary-section").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("resetButton").addEventListener("click", () => {
  state.query = "";
  state.selectedCountry = "all";
  state.selectedFunction = "all";
  state.page = 1;
  state.pageSize = 50;
  document.getElementById("searchInput").value = "";
  document.getElementById("pageSizeSelect").value = "50";
  render();
});

render();
