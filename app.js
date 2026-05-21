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
  pageSize: 10
};

const countryById = Object.fromEntries(countries.map((country) => [country.id, country]));
const money = (value, currency) => `${currency} ${new Intl.NumberFormat("en-US").format(value)}`;
const roleTranslationCache = new WeakMap();
const searchTextCache = new WeakMap();
let searchRenderFrame = 0;

const roleZhGlossaries = {
  hk: {
    "account": "會計",
    "accountant": "會計師",
    "accounts assistant": "會計助理",
    "accounting manager": "會計經理",
    "accounting officer": "會計主任",
    "audit": "審計",
    "financial analyst": "財務分析師",
    "finance manager": "財務經理",
    "financial controller": "財務總監",
    "chief financial officer": "財務總監",
    "human resources": "人力資源",
    "hr manager": "人力資源經理",
    "hr business partner": "人力資源業務夥伴",
    "legal counsel": "法律顧問",
    "compliance": "合規",
    "procurement": "採購",
    "supply chain": "供應鏈",
    "logistics": "物流",
    "software engineer": "軟件工程師",
    "software developer": "軟件開發員",
    "data analyst": "數據分析師",
    "data scientist": "數據科學家",
    "doctor": "醫生",
    "physician": "醫生",
    "nurse": "護士",
    "teacher": "教師",
    "education": "教育",
    "hotel": "酒店",
    "restaurant": "餐廳",
    "food service": "餐飲服務",
    "hawker": "小販"
  },
  cn: {
    "account": "会计",
    "accountant": "会计",
    "accounts assistant": "会计助理",
    "accounting manager": "会计经理",
    "audit": "审计",
    "financial analyst": "财务分析师",
    "finance manager": "财务经理",
    "financial controller": "财务总监",
    "chief financial officer": "首席财务官",
    "human resources": "人力资源",
    "hr manager": "人力资源经理",
    "hr business partner": "人力资源业务伙伴",
    "legal counsel": "法律顾问",
    "compliance": "合规",
    "procurement": "采购",
    "supply chain": "供应链",
    "logistics": "物流",
    "software engineer": "软件工程师",
    "software developer": "软件开发工程师",
    "data analyst": "数据分析师",
    "data scientist": "数据科学家",
    "doctor": "医生",
    "physician": "医师",
    "nurse": "护士",
    "teacher": "教师",
    "education": "教育",
    "hotel": "酒店",
    "restaurant": "餐厅",
    "food service": "餐饮服务",
    "hawker": "小贩"
  },
  tw: {
    "account": "帳務／會計",
    "accountant": "會計人員",
    "accounts assistant": "會計助理",
    "accounting manager": "會計經理",
    "audit": "稽核",
    "financial analyst": "財務分析師",
    "finance manager": "財務經理",
    "financial controller": "財務長／財務主管",
    "chief financial officer": "財務長",
    "human resources": "人資",
    "hr manager": "人資經理",
    "hr business partner": "人資事業夥伴",
    "legal counsel": "法務顧問",
    "compliance": "法遵",
    "procurement": "採購",
    "supply chain": "供應鏈",
    "logistics": "物流",
    "software engineer": "軟體工程師",
    "software developer": "軟體開發工程師",
    "data analyst": "資料分析師",
    "data scientist": "資料科學家",
    "doctor": "醫師",
    "physician": "醫師",
    "nurse": "護理師",
    "teacher": "教師",
    "education": "教育",
    "hotel": "飯店",
    "restaurant": "餐廳／餐飲",
    "food service": "餐飲服務",
    "hawker": "小販／攤商"
  }
};

roleZhGlossaries.kr = roleZhGlossaries.hk;
roleZhGlossaries.th = roleZhGlossaries.hk;
roleZhGlossaries.cn = roleZhGlossaries.hk;

const localeRoleTerms = {
  hk: {
    and: "及",
    titleFallback: "職位",
    englishAuthoritative: "以英文職位為準",
    exact: {
      "avp": "助理副總裁",
      "vp": "副總裁",
      "chro": "首席人力資源官",
      "hrvp": "人力資源副總裁",
      "hrbp": "人力資源業務夥伴",
      "aml": "反洗錢",
      "fcc": "金融犯罪合規",
      "fig": "金融機構組",
      "cto": "首席技術官",
      "coo": "首席營運官",
      "cio": "首席資訊官",
      "ciso": "首席資訊安全官",
      "qa": "品質保證",
      "qc": "品質控制",
      "ux": "用戶體驗",
      "ui": "用戶介面",
      "ba": "美容顧問",
      "cashier": "收銀員",
      "chef": "廚師",
      "cook": "廚師",
      "barista": "咖啡師",
      "bartender": "調酒師",
      "waiter waitress": "侍應",
      "housekeeper": "房務員",
      "teacher": "教師",
      "dentist": "牙醫",
      "doctor": "醫生",
      "physician": "醫生",
      "nurse": "護士",
      "pharmacist": "藥劑師",
      "paralegal": "法律助理",
      "general counsel": "總法律顧問",
      "company secretary": "公司秘書",
      "trader": "交易員",
      "dealer": "交易員",
      "buyer": "採購員",
      "merchandiser": "採購跟單員",
      "architect": "建築師",
      "creative": "創意"
    },
    domains: {
      "information technology": "資訊科技",
      "it ": "資訊科技",
      "infrastructure": "基礎架構",
      "application": "應用程式",
      "software": "軟件",
      "front end": "前端",
      "front-end": "前端",
      "backend": "後端",
      "back end": "後端",
      "data": "數據",
      "database": "數據庫",
      "algorithm": "演算法",
      "ai": "人工智能",
      "machine learning": "機器學習",
      "cybersecurity": "網絡安全",
      "information security": "資訊安全",
      "security": "安全",
      "finance": "財務",
      "financial": "財務",
      "accounting": "會計",
      "accounts payable": "應付帳款",
      "accounts receivable": "應收帳款",
      "audit": "審計",
      "tax": "稅務",
      "treasury": "庫務",
      "credit": "信貸",
      "risk": "風險",
      "compliance": "合規",
      "legal": "法律",
      "human resources": "人力資源",
      "hr": "人力資源",
      "talent acquisition": "人才招聘",
      "learning": "學習發展",
      "compensation": "薪酬福利",
      "benefit": "福利",
      "employee": "員工關係",
      "admin": "行政",
      "administrative": "行政",
      "business support": "業務支援",
      "sales": "銷售",
      "business development": "業務拓展",
      "customer service": "客戶服務",
      "customer success": "客戶成功",
      "marketing": "市場推廣",
      "brand": "品牌",
      "digital marketing": "數碼市場推廣",
      "public relations": "公關",
      "pr": "公關",
      "event": "活動",
      "media": "媒體",
      "communications": "傳訊",
      "product": "產品",
      "project": "項目",
      "operation": "營運",
      "operations": "營運",
      "supply chain": "供應鏈",
      "procurement": "採購",
      "purchasing": "採購",
      "sourcing": "採購",
      "logistics": "物流",
      "shipping": "船務",
      "warehouse": "倉務",
      "engineering": "工程",
      "engineer": "工程",
      "manufacturing": "製造",
      "production": "生產",
      "quality": "品質",
      "construction": "建築",
      "facility": "設施",
      "retail": "零售",
      "wholesale": "批發",
      "hotel": "酒店",
      "restaurant": "餐廳",
      "food service": "餐飲服務",
      "medical": "醫療",
      "healthcare": "醫療保健",
      "pharmaceutical": "製藥",
      "clinical": "臨床",
      "research": "研究",
      "education": "教育"
    },
    titles: {
      "chief": "首席",
      "head": "主管",
      "director": "總監",
      "manager": "經理",
      "supervisor": "主任",
      "team leader": "團隊主管",
      "lead": "主管",
      "specialist": "專員",
      "analyst": "分析師",
      "accountant": "會計師",
      "engineer": "工程師",
      "developer": "開發員",
      "programmer": "程式員",
      "architect": "架構師",
      "consultant": "顧問",
      "advisor": "顧問",
      "representative": "代表",
      "officer": "主任",
      "executive": "行政人員",
      "administrator": "行政員",
      "assistant": "助理",
      "coordinator": "協調員",
      "clerk": "文員",
      "secretary": "秘書",
      "designer": "設計師",
      "scientist": "科學家",
      "technician": "技術員",
      "controller": "總監",
      "partner": "夥伴",
      "operator": "操作員",
      "staff": "員工",
      "planner": "規劃師",
      "allocator": "配貨員"
    },
    seniority: {
      "senior": "資深",
      "sr.": "資深",
      "sr ": "資深",
      "junior": "初級",
      "assistant": "助理",
      "associate": "助理",
      "deputy": "副",
      "regional": "區域",
      "country": "國家",
      "group": "集團",
      "global": "全球"
    }
  }
};

localeRoleTerms.cn = {
  ...localeRoleTerms.hk,
  and: "及",
  titleFallback: "职位",
  englishAuthoritative: "以英文职位为准",
  exact: {
    ...localeRoleTerms.hk.exact,
    "chro": "首席人力资源官",
    "hrvp": "人力资源副总裁",
    "hrbp": "人力资源业务伙伴",
    "aml": "反洗钱",
    "fcc": "金融犯罪合规",
    "qa": "质量保证",
    "qc": "质量控制",
    "ux": "用户体验",
    "ui": "用户界面",
    "cashier": "收银员",
    "housekeeper": "客房服务员",
    "doctor": "医生",
    "physician": "医师",
    "nurse": "护士",
    "pharmacist": "药剂师",
    "paralegal": "律师助理",
    "general counsel": "总法律顾问",
    "trader": "交易员",
    "buyer": "采购员",
    "merchandiser": "商品专员"
  },
  domains: {
    ...localeRoleTerms.hk.domains,
    "information technology": "信息技术",
    "it ": "信息技术",
    "software": "软件",
    "data": "数据",
    "database": "数据库",
    "algorithm": "算法",
    "ai": "人工智能",
    "cybersecurity": "网络安全",
    "information security": "信息安全",
    "security": "安全",
    "finance": "财务",
    "financial": "财务",
    "accounting": "会计",
    "accounts payable": "应付账款",
    "accounts receivable": "应收账款",
    "audit": "审计",
    "tax": "税务",
    "treasury": "资金管理",
    "credit": "信用",
    "risk": "风险",
    "compliance": "合规",
    "legal": "法律",
    "human resources": "人力资源",
    "hr": "人力资源",
    "talent acquisition": "人才招聘",
    "learning": "学习发展",
    "compensation": "薪酬福利",
    "benefit": "福利",
    "employee": "员工关系",
    "admin": "行政",
    "administrative": "行政",
    "business support": "业务支持",
    "sales": "销售",
    "business development": "业务拓展",
    "customer service": "客户服务",
    "customer success": "客户成功",
    "marketing": "市场营销",
    "brand": "品牌",
    "digital marketing": "数字营销",
    "public relations": "公关",
    "pr": "公关",
    "event": "活动",
    "media": "媒体",
    "communications": "传播",
    "project": "项目",
    "operation": "运营",
    "operations": "运营",
    "supply chain": "供应链",
    "procurement": "采购",
    "purchasing": "采购",
    "sourcing": "采购",
    "logistics": "物流",
    "shipping": "船务",
    "warehouse": "仓储",
    "engineering": "工程",
    "engineer": "工程",
    "manufacturing": "制造",
    "production": "生产",
    "quality": "质量",
    "construction": "建筑",
    "facility": "设施",
    "retail": "零售",
    "wholesale": "批发",
    "hotel": "酒店",
    "restaurant": "餐厅",
    "food service": "餐饮服务",
    "medical": "医疗",
    "healthcare": "医疗健康",
    "pharmaceutical": "制药",
    "clinical": "临床",
    "research": "研究",
    "education": "教育"
  },
  titles: {
    ...localeRoleTerms.hk.titles,
    "director": "总监",
    "manager": "经理",
    "supervisor": "主管",
    "team leader": "团队主管",
    "lead": "负责人",
    "specialist": "专员",
    "developer": "开发工程师",
    "programmer": "程序员",
    "advisor": "顾问",
    "officer": "专员",
    "executive": "执行专员",
    "administrator": "管理员",
    "coordinator": "协调员",
    "clerk": "文员",
    "secretary": "秘书",
    "technician": "技术员",
    "controller": "总监",
    "partner": "伙伴"
  },
  seniority: {
    ...localeRoleTerms.hk.seniority,
    "senior": "高级",
    "sr.": "高级",
    "sr ": "高级",
    "junior": "初级",
    "regional": "区域",
    "country": "国家",
    "group": "集团",
    "global": "全球"
  }
};

localeRoleTerms.tw = {
  ...localeRoleTerms.hk,
  titleFallback: "職位",
  englishAuthoritative: "以英文職位為準",
  exact: {
    ...localeRoleTerms.hk.exact,
    "chro": "人資長",
    "hrvp": "人資副總裁",
    "hrbp": "人資事業夥伴",
    "qa": "品質保證",
    "qc": "品質管制",
    "cashier": "收銀員",
    "housekeeper": "房務員",
    "doctor": "醫師",
    "physician": "醫師",
    "nurse": "護理師",
    "pharmacist": "藥師",
    "paralegal": "法務助理",
    "buyer": "採購人員",
    "merchandiser": "商品企劃"
  },
  domains: {
    ...localeRoleTerms.hk.domains,
    "information technology": "資訊科技",
    "software": "軟體",
    "data": "資料",
    "database": "資料庫",
    "compliance": "法遵",
    "legal": "法務",
    "human resources": "人資",
    "hr": "人資",
    "business support": "業務支援",
    "digital marketing": "數位行銷",
    "public relations": "公關",
    "communications": "傳播",
    "project": "專案",
    "operation": "營運",
    "operations": "營運",
    "quality": "品質",
    "hotel": "飯店",
    "restaurant": "餐廳",
    "healthcare": "醫療照護"
  },
  titles: {
    ...localeRoleTerms.hk.titles,
    "officer": "專員",
    "executive": "專員",
    "administrator": "管理員",
    "controller": "主管"
  }
};

const traditionalExactRoleTranslations = {
  "all employees - regular earnings": "全體受僱員工－經常性薪資",
  "financial and insurance industry": "金融及保險業",
  "publishing audio-visual and ict": "出版、影音及資訊通訊業",
  "professional scientific and technical services": "專業、科學及技術服務業",
  "electronic components manufacturing": "電子零組件製造業",
  "software engineering manager": "軟體工程經理",
  "vp cfo": "副總裁／財務總監",
  "analyst fp and a": "財務規劃與分析分析師",
  "senior analyst supervisor fp and a": "資深財務規劃與分析分析師／主任",
  "manager fp and a": "財務規劃與分析經理",
  "senior manager fp and a": "資深財務規劃與分析經理",
  "director fp and a": "財務規劃與分析總監",
  "vp svp corporate": "副總裁／高級副總裁－企業銀行",
  "vp svp fx bond derivatives": "副總裁／高級副總裁－外匯、債券及衍生品",
  "associates internal audit and control": "內部審計與控制助理",
  "manager internal audit and control": "內部審計與控制經理",
  "senior executives internal audit and control": "資深內部審計與控制行政人員",
  "devops": "開發營運工程師",
  "tech vp": "技術副總裁",
  "mid level ip": "中級知識產權專員",
  "senior manager new retail and o2o": "資深新零售／線上線下經理",
  "director new retail and o2o": "新零售／線上線下總監",
  "flagship store gm": "旗艦店總經理",
  "luxury gm": "奢侈品業務總經理",
  "merchandising planner": "商品企劃規劃師",
  "allocator": "配貨員",
  "demand planner": "需求規劃師",
  "cost accountant": "成本會計師",
  "management accountant": "管理會計師",
  "revenue accountant": "收入會計師",
  "systems accountant": "系統會計師",
  "expense accountant": "支出會計師",
  "fund accountant": "基金會計師",
  "learning development": "學習與發展",
  "learning and development": "學習與發展",
  "merchandising buying": "商品企劃與採購",
  "merchandising and buying": "商品企劃與採購",
  "qa qc": "品質保證／品質控制",
  "internal audit control": "內部審計與控制",
  "internal audit and control": "內部審計與控制",
  "compliance testing and reviews": "合規測試與審查",
  "franchisee account management": "加盟商與客戶管理",
  "franchisee and account management": "加盟商與客戶管理",
  "key account": "大客戶",
  "new retail and o2o": "新零售／線上線下",
  "interpreter": "傳譯員",
  "producer": "製作人",
  "strategic planner": "策略策劃師",
  "therapist": "治療師",
  "visual effects artist": "視覺特效師",
  "customer success - it": "資訊科技客戶成功",
  "vice president regulatory policy": "監管政策副總裁",
  "vice president regulatory reporting": "監管申報副總裁",
  "client onboarding": "客戶開戶／入職流程",
  "collateral management": "抵押品管理",
  "settlements": "結算",
  "trade support": "交易支援",
  "asset servicing": "資產服務",
  "cash management": "現金管理",
  "client services": "客戶服務",
  "corporate trust": "企業信託",
  "custody": "託管",
  "equities": "股票",
  "fixed income": "固定收益",
  "fx mm": "外匯／貨幣市場",
  "loans": "貸款",
  "otc derivatives": "場外衍生產品",
  "performance analysis": "績效分析",
  "reconciliations": "對帳",
  "shareholder services transfer agency": "股東服務／過戶代理",
  "relationship management": "客戶關係管理",
  "investment": "投資",
  "fund portfolio": "基金／投資組合",
  "investor relations": "投資者關係",
  "automation tester": "自動化測試員",
  "uat tester": "用戶驗收測試員",
  "devsecops": "開發安全營運",
  "helpdesk support": "技術支援",
  "in-house solicitor": "企業內部律師",
  "documentation negotiator": "文件談判專員",
  "dmlro": "副洗錢報告主任",
  "mlro": "洗錢報告主任",
  "periodic reviews": "定期審查",
  "agency": "代理業務",
  "costing": "成本核算",
  "financial control reporting": "財務控制／報告",
  "fundamental": "基本面分析",
  "quantitative": "量化分析",
  "local institutions": "本地機構",
  "wfoes": "外商獨資企業",
  "multinational securities firms": "跨國證券公司",
  "learning development": "學習與發展",
  "talent management": "人才管理",
  "organizational development": "組織發展",
  "shared service": "共享服務",
  "front-end": "前端",
  "front end": "前端",
  "testing": "測試",
  "digital": "數碼化",
  "non us international law firms": "非美國國際律師事務所",
  "research insight": "研究及洞察",
  "e-commerce": "電子商務",
  "e commerce": "電子商務",
  "crm": "客戶關係管理",
  "new retail o2o": "新零售／線上線下",
  "store management": "店舖管理",
  "sales operation rtm": "銷售營運／通路策略",
  "merchandising buying": "商品企劃與採購",
  "ehs": "環境健康安全",
  "call center": "呼叫中心",
  "driver": "司機",
  "editor": "編輯",
  "lawyer": "律師",
  "attorney": "律師",
  "motion graphic": "動態圖像設計",
  "messenger dispatch bill collector": "外勤派送／收款員",
  "neurologist": "腦神經科醫生",
  "photographer videographer": "攝影／錄影師",
  "pretty mc": "活動主持／司儀",
  "receptionist": "接待員",
  "service engineer technical support": "服務工程師／技術支援",
  "server": "服務員",
  "medical product specialist expert": "醫療產品專員／專家"
};

const simplifiedExactRoleTranslations = {
  ...traditionalExactRoleTranslations,
  "all employees - regular earnings": "全体受雇员工－经常性工资",
  "financial and insurance industry": "金融及保险业",
  "publishing audio-visual and ict": "出版、影音及信息通信业",
  "professional scientific and technical services": "专业、科学及技术服务业",
  "electronic components manufacturing": "电子零组件制造业",
  "software engineering manager": "软件工程经理",
  "cost accountant": "成本会计",
  "management accountant": "管理会计",
  "revenue accountant": "收入会计",
  "systems accountant": "系统会计",
  "expense accountant": "费用会计",
  "fund accountant": "基金会计",
  "learning development": "学习与发展",
  "learning and development": "学习与发展",
  "merchandising buying": "商品企划与采购",
  "merchandising and buying": "商品企划与采购",
  "qa qc": "质量保证／质量控制",
  "internal audit control": "内部审计与控制",
  "internal audit and control": "内部审计与控制",
  "compliance testing and reviews": "合规测试与审查",
  "franchisee account management": "加盟商与客户管理",
  "franchisee and account management": "加盟商与客户管理",
  "key account": "大客户",
  "new retail and o2o": "新零售／线上线下",
  "interpreter": "口译员",
  "producer": "制作人",
  "strategic planner": "策略策划师",
  "therapist": "治疗师",
  "visual effects artist": "视觉特效师",
  "customer success - it": "信息技术客户成功",
  "vice president regulatory policy": "监管政策副总裁",
  "vice president regulatory reporting": "监管申报副总裁",
  "client onboarding": "客户开户／入职流程",
  "trade support": "交易支持",
  "asset servicing": "资产服务",
  "corporate trust": "企业信托",
  "custody": "托管",
  "equities": "股票",
  "fixed income": "固定收益",
  "fx mm": "外汇／货币市场",
  "loans": "贷款",
  "otc derivatives": "场外衍生品",
  "performance analysis": "绩效分析",
  "reconciliations": "对账",
  "shareholder services transfer agency": "股东服务／过户代理",
  "relationship management": "客户关系管理",
  "fund portfolio": "基金／投资组合",
  "investor relations": "投资者关系",
  "automation tester": "自动化测试员",
  "uat tester": "用户验收测试员",
  "devsecops": "开发安全运营",
  "helpdesk support": "技术支持",
  "in-house solicitor": "企业内部律师",
  "documentation negotiator": "文件谈判专员",
  "dmlro": "副洗钱报告主任",
  "mlro": "洗钱报告主任",
  "costing": "成本核算",
  "financial control reporting": "财务控制／报告",
  "quantitative": "量化分析",
  "local institutions": "本土机构",
  "wfoes": "外商独资企业",
  "multinational securities firms": "跨国证券公司",
  "learning development": "学习与发展",
  "organizational development": "组织发展",
  "shared service": "共享服务",
  "testing": "测试",
  "digital": "数字化",
  "non us international law firms": "非美国国际律师事务所",
  "research insight": "研究及洞察",
  "e-commerce": "电子商务",
  "e commerce": "电子商务",
  "new retail o2o": "新零售／线上线下",
  "store management": "门店管理",
  "sales operation rtm": "销售运营／通路策略",
  "merchandising buying": "商品企划与采购",
  "ehs": "环境健康安全",
  "driver": "司机",
  "motion graphic": "动态图像设计",
  "messenger dispatch bill collector": "外勤派送／收款员",
  "neurologist": "神经科医生",
  "photographer videographer": "摄影／摄像师",
  "pretty mc": "活动主持／司仪",
  "service engineer technical support": "服务工程师／技术支持"
};

Object.assign(localeRoleTerms.hk.exact, traditionalExactRoleTranslations);
Object.assign(localeRoleTerms.tw.exact, traditionalExactRoleTranslations, {
  "financial and insurance industry": "金融及保險業",
  "publishing audio-visual and ict": "出版、影音及資通訊業",
  "professional scientific and technical services": "專業、科學及技術服務業",
  "electronic components manufacturing": "電子零組件製造業",
  "customer success - it": "資訊科技客戶成功",
  "digital": "數位化",
  "store management": "門市管理"
});
Object.assign(localeRoleTerms.cn.exact, simplifiedExactRoleTranslations);

delete localeRoleTerms.hk.domains.pr;
delete localeRoleTerms.cn.domains.pr;
delete localeRoleTerms.tw.domains.pr;

localeRoleTerms.cn = {
  ...localeRoleTerms.hk,
  and: "及",
  titleFallback: "職位",
  englishAuthoritative: "以英文職位為準",
  exact: {
    ...localeRoleTerms.hk.exact,
    ...traditionalExactRoleTranslations
  },
  domains: {
    ...localeRoleTerms.hk.domains
  },
  titles: {
    ...localeRoleTerms.hk.titles
  },
  seniority: {
    ...localeRoleTerms.hk.seniority
  }
};
delete localeRoleTerms.cn.domains.pr;

localeRoleTerms.kr = localeRoleTerms.hk;
localeRoleTerms.th = localeRoleTerms.hk;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function normalizeRole(value) {
  return String(value || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[–—-]/g, " ")
    .replace(/&/g, " and ")
    .replace(/[\\/]/g, " ")
    .replace(/[^a-zA-Z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function extractChineseRole(value) {
  const matches = String(value || "").match(/[\u3400-\u9fff][\u3400-\u9fff\s／/（）：:、&-]*/g);
  if (!matches) return "";
  return matches
    .map((match) => match.replace(/\s+/g, "").replace(/[/:：-]+$/, ""))
    .filter(Boolean)
    .join("／");
}

function localizedTerms(country) {
  return localeRoleTerms[country] || localeRoleTerms.hk;
}

function exactTranslation(map, normalized) {
  if (map[normalized]) return map[normalized];
  const match = Object.entries(map).find(([english]) => normalizeRole(english) === normalized);
  return match ? match[1] : "";
}

function containsNormalizedTerm(normalized, term) {
  const cleanTerm = normalizeRole(term);
  if (!cleanTerm) return false;
  return new RegExp(`(^|\\s)${cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$)`).test(normalized);
}

function composeRoleTranslation(role, country) {
  const terms = localizedTerms(country);
  const normalized = normalizeRole(role);
  if (!normalized) return "";
  const exact = exactTranslation(terms.exact, normalized);
  if (exact) return exact;

  const segments = normalized
    .split(/\s+(?:and|or)\s+|\/| - |-/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length > 1 && segments.length <= 4) {
    const translatedSegments = segments.map((segment) => composeRoleTranslation(segment, country)).filter(Boolean);
    if (translatedSegments.length) return [...new Set(translatedSegments)].join("／");
  }

  const exactHit = Object.entries(terms.exact)
    .filter(([english]) => normalized === normalizeRole(english) || containsNormalizedTerm(normalized, english))
    .sort((a, b) => b[0].length - a[0].length)[0];
  if (exactHit && exactHit[0].length > 2) return exactHit[1];

  const seniority = Object.entries(terms.seniority)
    .filter(([english]) => normalized.includes(english))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, chinese]) => chinese)[0] || "";

  const domains = Object.entries(terms.domains)
    .filter(([english]) => normalized.includes(english))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, chinese]) => chinese);

  const titles = Object.entries(terms.titles)
    .filter(([english]) => normalized.includes(english))
    .sort((a, b) => b[0].length - a[0].length)
    .map(([, chinese]) => chinese);

  const domain = [...new Set(domains)].slice(0, 2).join(terms.and);
  const title = [...new Set(titles)][0] || "";
  const translated = `${seniority}${domain}${title}`.trim();

  if (translated) return translated;
  if (domain) return domain;
  if (title) return title;
  return terms.titleFallback;
}

function translatedRole(row) {
  if (roleTranslationCache.has(row)) return roleTranslationCache.get(row);
  let result = "";
  if (row.roleZh) {
    result = row.roleZh;
    roleTranslationCache.set(row, result);
    return result;
  }
  const embeddedChinese = extractChineseRole(row.role);
  if (embeddedChinese) {
    result = embeddedChinese;
    roleTranslationCache.set(row, result);
    return result;
  }
  const glossary = roleZhGlossaries[row.country] || roleZhGlossaries.hk;
  const normalized = normalizeRole(row.role);
  const exactGlossary = exactTranslation(glossary, normalized);
  result = exactGlossary || composeRoleTranslation(row.role, row.country);
  roleTranslationCache.set(row, result);
  return result;
}

function roleCell(row) {
  const roleZh = translatedRole(row);
  return `
    <strong>${escapeHtml(row.role)}</strong>
    ${roleZh ? `<span class="role-zh">${escapeHtml(roleZh)}</span>` : ""}
  `;
}

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

function searchText(row) {
  if (searchTextCache.has(row)) return searchTextCache.get(row);
  const country = countryById[row.country];
  const text = [
    country.name,
    country.english,
    country.currency,
    row.role,
    translatedRole(row),
    row.function,
    row.seniority,
    sources[row.source].label,
    row.coverage || ""
  ].join(" ").toLowerCase();
  searchTextCache.set(row, text);
  return text;
}

function filterRows() {
  const query = state.query.trim().toLowerCase();
  return salaries.filter((row) => {
    const countryMatch = state.selectedCountry === "all" || row.country === state.selectedCountry;
    const functionMatch = state.selectedFunction === "all" || row.function === state.selectedFunction;
    const queryMatch = !query || searchText(row).includes(query);
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
        <td>${roleCell(row)}</td>
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
  if (searchRenderFrame) cancelAnimationFrame(searchRenderFrame);
  searchRenderFrame = requestAnimationFrame(() => {
    searchRenderFrame = 0;
    renderTable();
  });
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
  state.pageSize = 10;
  document.getElementById("searchInput").value = "";
  document.getElementById("pageSizeSelect").value = "10";
  render();
});

salaries.forEach((row) => {
  translatedRole(row);
  searchText(row);
});

render();
