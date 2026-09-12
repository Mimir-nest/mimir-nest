// ── MimirNest · Non-Technical Interview Question Bank ─────────────────────────
// Data model: role × category × difficulty × industry
// Phase 1: Consulting (all 12 categories) + Behavioral/HR
// ─────────────────────────────────────────────────────────────────────────────

// ── ROLES ─────────────────────────────────────────────────────────────────────
export const roles = [
  {
    id: "consulting",
    label: "Consulting",
    icon: "🧠",
    color: "#FF5A36",
    gradient: "from-[#FF5A36] to-[#FF8A65]",
    description: "Case interviews, market sizing, and structured problem-solving",
    categories: [
      "Profitability",
      "Market Sizing",
      "Market Entry",
      "Growth",
      "M&A",
      "Pricing",
      "Operations",
      "Strategy",
      "Guesstimates",
      "Behavioral / PEI",
      "Public Sector",
      "Ambiguous / Partner-style",
    ],
  },
  {
    id: "product-management",
    label: "Product Management",
    icon: "📱",
    color: "#6366F1",
    gradient: "from-[#6366F1] to-[#818CF8]",
    description: "Product sense, strategy, metrics, and execution",
    categories: [
      "Product Sense",
      "Product Strategy",
      "Prioritization",
      "Metrics",
      "Execution",
      "Product Cases",
      "Behavioral",
    ],
  },
  {
    id: "investment-banking",
    label: "Investment Banking",
    icon: "💹",
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FBBF24]",
    description: "Valuation, accounting, deal scenarios, and market knowledge",
    categories: [
      "Valuation",
      "Accounting",
      "Financial Concepts",
      "Deal Scenarios",
      "Markets",
      "Technical / Fit",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "📣",
    color: "#EC4899",
    gradient: "from-[#EC4899] to-[#F472B6]",
    description: "Segmentation, positioning, campaigns, and growth",
    categories: [
      "Segmentation",
      "Positioning",
      "Campaigns",
      "Growth",
      "Brand",
      "Analytics",
      "Marketing Cases",
      "Behavioral",
    ],
  },
  {
    id: "strategy",
    label: "Strategy",
    icon: "♟️",
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#A78BFA]",
    description: "Competitive strategy, market entry, and portfolio decisions",
    categories: [
      "Market Entry",
      "Competitive Strategy",
      "Growth",
      "Pricing",
      "Portfolio",
      "Operations",
      "Strategic Cases",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: "📊",
    color: "#10B981",
    gradient: "from-[#10B981] to-[#34D399]",
    description: "Corporate finance, FP&A, budgeting, and investment reasoning",
    categories: [
      "Corporate Finance",
      "FP&A",
      "Budgeting",
      "Investment Reasoning",
      "Financial Analysis",
      "Scenarios",
      "Behavioral",
    ],
  },
  {
    id: "human-resources",
    label: "Human Resources",
    icon: "🤝",
    color: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
    description: "Behavioral, recruiting, employee relations, and HR judgment",
    categories: [
      "Behavioral",
      "Recruiting",
      "Employee Relations",
      "Conflict",
      "Performance",
      "HR Scenarios",
      "Policy Judgment",
    ],
  },
];

// ── DIFFICULTIES ──────────────────────────────────────────────────────────────
export const difficulties = [
  {
    id: "Easy",
    color: "#10B981",
    bg: "bg-emerald-500/15",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    description: "Screening / early practice",
    expectedBehavior: "Identify the relevant concept and structure a response.",
  },
  {
    id: "Medium",
    color: "#F59E0B",
    bg: "bg-amber-500/15",
    border: "border-amber-500/30",
    text: "text-amber-400",
    description: "Standard preparation",
    expectedBehavior: "Make assumptions and justify choices.",
  },
  {
    id: "Hard",
    color: "#FF5A36",
    bg: "bg-[#FF5A36]/15",
    border: "border-[#FF5A36]/30",
    text: "text-[#FF5A36]",
    description: "Advanced rounds",
    expectedBehavior: "Drive the problem proactively and synthesize evidence.",
  },
  {
    id: "Expert",
    color: "#8B5CF6",
    bg: "bg-violet-500/15",
    border: "border-violet-500/30",
    text: "text-violet-400",
    description: "Final / partner-level",
    expectedBehavior:
      "Form hypotheses, prioritize information, adapt and defend a recommendation.",
  },
];

// ── INDUSTRIES ────────────────────────────────────────────────────────────────
export const industries = [
  "General / Cross-industry",
  "Technology & Software",
  "Financial Services & Banking",
  "Healthcare & Pharmaceuticals",
  "Retail & E-commerce",
  "FMCG / Consumer Goods",
  "Automotive & Mobility",
  "Manufacturing & Industrial",
  "Telecommunications",
  "Energy & Utilities",
  "Travel & Hospitality",
  "Media & Entertainment",
  "Logistics & Transportation",
  "Real Estate & Construction",
  "Education",
  "Government / Public Sector",
  "Agriculture & Food",
  "Insurance",
  "Professional Services",
];

// ── QUESTION BANK ─────────────────────────────────────────────────────────────
export const questions = [

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — PROFITABILITY
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-prof-001",
    role: "consulting",
    category: "Profitability",
    subcategory: "Revenue decline",
    difficulty: "Easy",
    industry: "Retail & E-commerce",
    company: null,
    question: "A retail chain's profits have declined over the past two years despite flat revenue. What would you investigate?",
    shortAnswer: "Disaggregate profit into revenue and costs, then systematically isolate the driver of margin compression.",
    detailedAnswer: "Start with the profit equation: Profit = Revenue − Costs. Since revenue is flat, the issue is on the cost side. Segment costs into COGS (product cost, supply chain) and operating expenses (rent, labour, marketing, overheads). Ask: Has product mix shifted toward lower-margin items? Have input costs risen without a corresponding price increase? Have operating costs (rent, wages) grown as a percentage of revenue? Also explore whether gross margin is stable but SG&A has ballooned — e.g., a new ERP rollout or headcount surge. Conclude with a prioritised hypothesis about the most likely driver.",
    skills: ["cost disaggregation", "hypothesis-driven thinking", "structured analysis"],
    tags: ["profitability", "retail", "cost structure", "margins"],
    followUps: [
      "What if gross margin is actually improving but net profit is falling?",
      "How would you quantify the impact of each cost driver?",
      "What benchmarks would you use to assess whether costs are in line?",
    ],
    evaluationRubric: "Candidate structures the problem before diving in, separates revenue and cost cleanly, and asks clarifying questions about which segment or cost line is moving.",
    interviewStage: "First round",
    expectedTime: "5–8 min",
    source: "MimirNest curated",
  },
  {
    id: "con-prof-002",
    role: "consulting",
    category: "Profitability",
    subcategory: "Unit economics",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "A SaaS company has strong revenue growth but its CFO is concerned about deteriorating unit economics. How would you diagnose the problem?",
    shortAnswer: "Analyse LTV, CAC, and payback period at the cohort level to find where unit economics are breaking down.",
    detailedAnswer: "Unit economics for a SaaS business live at the customer or cohort level. Start with the LTV:CAC ratio — a healthy SaaS business should have LTV ≥ 3× CAC with a payback period under 18 months. Then investigate: (1) Is CAC rising — e.g., more competition in paid channels, sales team scaling inefficiency, or shift to enterprise deals? (2) Is LTV declining — via rising churn, lower ARPU, or fewer expansion opportunities? (3) Is the cohort mix changing — are newer cohorts behaving differently from earlier ones (younger cohort effect)? Segment by customer tier (SMB vs enterprise), acquisition channel, and geography. Recommend whether the issue is demand-side (product-market fit erosion) or supply-side (go-to-market inefficiency).",
    skills: ["unit economics", "SaaS metrics", "cohort analysis", "commercial judgment"],
    tags: ["profitability", "SaaS", "LTV", "CAC", "growth"],
    followUps: [
      "What would you do if CAC is rising but conversion rates are stable?",
      "How would you prioritise between improving retention and reducing acquisition cost?",
    ],
    evaluationRubric: "Strong candidates move quickly to cohort-level thinking, define LTV and CAC clearly, and identify the specific levers rather than describing them generically.",
    interviewStage: "First round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },
  {
    id: "con-prof-003",
    role: "consulting",
    category: "Profitability",
    subcategory: "Margin recovery",
    difficulty: "Hard",
    industry: "FMCG / Consumer Goods",
    company: null,
    question: "An FMCG company has seen gross margin fall from 45% to 35% over 18 months. The CEO wants to recover at least 5 percentage points within one year. How would you approach this?",
    shortAnswer: "Identify the margin drivers (mix, input costs, pricing power), quantify each, and build a sequenced recovery roadmap.",
    detailedAnswer: "A 10-point gross margin decline in 18 months is severe. The analysis should cover: (1) Price–volume mix — has the product mix shifted to lower-margin SKUs? Has the channel mix shifted (e.g., more modern trade, fewer premium channels)? (2) Input cost inflation — commodity prices, packaging, freight. Determine whether hedging or procurement contracts are in place. (3) Pricing realisation — have list price increases been offset by trade promotions, discounts, or retailer negotiations? (4) Manufacturing efficiency — overhead absorption if volumes dropped. Quantify each bucket as a percentage of the 10-point decline. To recover 5 points: pricing actions (even modest 2–3% net price realisation) typically deliver the fastest impact; reformulation or SKU rationalisation medium-term; procurement renegotiation takes longer. Be explicit about trade-offs — aggressive pricing in a competitive category risks volume loss.",
    skills: ["margin analysis", "pricing strategy", "cost management", "FMCG dynamics", "roadmap thinking"],
    tags: ["profitability", "FMCG", "gross margin", "pricing", "recovery"],
    followUps: [
      "How would you decide which SKUs to rationalise without losing category share?",
      "What's the risk of a pricing action in a price-sensitive segment?",
      "How do you measure the success of the recovery plan at the 6-month mark?",
    ],
    evaluationRubric: "Candidate quantifies the problem, identifies multiple levers, explicitly prioritises by speed and feasibility, and acknowledges trade-offs without needing prompting.",
    interviewStage: "Second round",
    expectedTime: "12–18 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — MARKET SIZING
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-ms-001",
    role: "consulting",
    category: "Market Sizing",
    subcategory: "Bottom-up estimation",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "Estimate the number of cups of coffee sold in your city each day.",
    shortAnswer: "Build from population → coffee drinkers → cups per day, then sense-check against supply-side proxies.",
    detailedAnswer: "Start with population (e.g., 5 million for a large metro). Segment into adults (~75%, so 3.75M). Of those, assume ~60% drink coffee regularly → 2.25M coffee drinkers. Average of 1.5 cups per person per day → ~3.4M cups/day. Roughly 70% consumed at home and 30% out-of-home (cafés, offices). Cross-check on supply side: assume 5,000 cafés/coffee shops citywide, each serving ~200 cups/day → 1M commercial cups. Home and office add the remainder. State assumptions explicitly and flag sources of uncertainty (e.g., cultural differences in coffee consumption).",
    skills: ["estimation", "structured reasoning", "assumption clarity"],
    tags: ["market sizing", "bottom-up", "estimation"],
    followUps: [
      "How would your estimate change if the city has a strong tea culture?",
      "How would you validate this estimate with limited time and data?",
    ],
    evaluationRubric: "Candidate structures the problem before calculating, labels assumptions clearly, cross-checks the answer, and communicates a final number with appropriate caveats.",
    interviewStage: "Screening",
    expectedTime: "5–7 min",
    source: "MimirNest curated",
  },
  {
    id: "con-ms-002",
    role: "consulting",
    category: "Market Sizing",
    subcategory: "Top-down estimation",
    difficulty: "Medium",
    industry: "Healthcare & Pharmaceuticals",
    company: null,
    question: "Estimate the size of the private health insurance market in India (in annual premium revenue).",
    shortAnswer: "Start from the addressable population, segment by income and employer, apply penetration and premium assumptions.",
    detailedAnswer: "India's population: ~1.4B. Working-age adults (15–60): ~65%, or ~900M. Formal sector employees (those likely to have private insurance): ~15% of working-age (~135M). Corporate group insurance penetration: ~70% of formal employees → ~95M insured through employers. Individual policies add ~10–15M more (upper-middle class). Total privately insured: ~105–110M lives. Average annual premium: group ~₹5,000/life, individual ~₹15,000/life. Blended: ~₹6,000–7,000/life. Total market: ~₹650–770B (~$8–9B USD). Cross-check: India's health insurance penetration is ~5% of GDP contribution; this is directionally consistent with reported figures.",
    skills: ["market sizing", "top-down analysis", "India context", "financial estimation"],
    tags: ["market sizing", "healthcare", "insurance", "India"],
    followUps: [
      "How would this change if government schemes (Ayushman Bharat) are expanding rapidly?",
      "What's the growth potential of this market over 5 years?",
    ],
    evaluationRubric: "Strong answer: explicit segmentation by income/employment, reasonable penetration assumptions, sense-checks against known data, and clear communication of uncertainty.",
    interviewStage: "First round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },
  {
    id: "con-ms-003",
    role: "consulting",
    category: "Market Sizing",
    subcategory: "Novel market",
    difficulty: "Hard",
    industry: "Technology & Software",
    company: null,
    question: "Estimate the global revenue opportunity for AI-powered legal document review software over the next five years.",
    shortAnswer: "Size the addressable legal market, estimate the share that's document-review-intensive, apply AI penetration and price assumptions, project out 5 years.",
    detailedAnswer: "Global legal services market: ~$850B/year. Document review is most prevalent in litigation and M&A due diligence — roughly 30% of legal spend (~$255B). Of that, a meaningful share is done by law firms and corporate legal teams rather than in-house informally. AI document review is most applicable to high-volume, pattern-heavy review (eDiscovery, contract analysis) — estimate ~40% of document review is addressable by AI tools → $100B total addressable work. At current AI pricing (savings-sharing or per-document model), AI tools typically capture 10–20% of the cost saved as revenue. If AI can reduce review cost by 50% on $100B of work, it saves $50B; capturing 15% of that → $7.5B revenue opportunity. Over 5 years with 25% annual penetration growth from a low base, realised revenue could reach $3–5B by year 5. Caveats: regulatory adoption lag, trust barriers in legal, vendor consolidation.",
    skills: ["market sizing", "new market estimation", "technology adoption curve", "commercial judgment"],
    tags: ["market sizing", "AI", "legal tech", "technology"],
    followUps: [
      "How does this change if regulation restricts AI use in legal proceedings?",
      "Which geography would you prioritise for market entry?",
    ],
    evaluationRubric: "Candidate acknowledges uncertainty about a nascent market, builds a sensible addressable-market funnel, applies adoption curve thinking, and lands on a defensible range rather than a false-precision number.",
    interviewStage: "Second round",
    expectedTime: "12–18 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — MARKET ENTRY
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-me-001",
    role: "consulting",
    category: "Market Entry",
    subcategory: "Market attractiveness",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "A client wants to enter a new geographic market. What framework would you use to assess the opportunity?",
    shortAnswer: "Assess market attractiveness, competitive dynamics, client fit and capabilities, entry options, and risks.",
    detailedAnswer: "A market entry assessment covers five pillars: (1) Market attractiveness — size, growth rate, profitability, customer needs. (2) Competitive landscape — who are the incumbents, what is their strength, is there a structural opening? (3) Client capabilities — does the client have relevant products, brand recognition, distribution, or regulatory relationships for this market? (4) Entry options — organic build, acquisition, partnership/JV, licensing. Each has a different risk-return profile and time-to-market. (5) Risks — regulatory, currency, political, execution. Conclude with a go/no-go recommendation and, if go, the preferred entry mode and timing.",
    skills: ["market entry framework", "structured thinking", "strategic judgment"],
    tags: ["market entry", "strategy", "framework"],
    followUps: [
      "When would you recommend a JV over an acquisition?",
      "How do you assess competitive response risk?",
    ],
    evaluationRubric: "Candidate articulates a clear, MECE structure before diving in and shows understanding that the framework must be adapted to the specific context.",
    interviewStage: "Screening",
    expectedTime: "5–7 min",
    source: "MimirNest curated",
  },
  {
    id: "con-me-002",
    role: "consulting",
    category: "Market Entry",
    subcategory: "New country",
    difficulty: "Hard",
    industry: "Healthcare & Pharmaceuticals",
    company: null,
    question: "A healthcare company is considering entering a new country. How would you evaluate the opportunity?",
    shortAnswer: "Assess market attractiveness, competition, economics, capabilities, entry options, and risks.",
    detailedAnswer: "A healthcare company's market entry analysis must account for the sector's unique characteristics: (1) Market attractiveness — disease burden, healthcare expenditure per capita (public vs private split), demographic trends, willingness to pay. (2) Regulatory environment — drug approval pathways, pricing/reimbursement policies, clinical trial requirements, local manufacturing mandates. (3) Competitive landscape — local incumbents, multinational presence, generic vs branded dynamics. (4) Business model fit — does the company's product (branded drug, device, diagnostics) suit the market's price sensitivity and distribution infrastructure? (5) Capabilities gap — local regulatory expertise, sales force, distribution partnerships, manufacturing. (6) Entry mode — direct subsidiary, partnership with local distributor, licensing, acquisition of a local player. (7) Financial modelling — breakeven timeline, capital requirements, repatriation risk. For emerging markets: prioritise government tender access, insurance coverage expansion trends, and the competitive response of local generics.",
    skills: ["market entry", "healthcare dynamics", "regulatory awareness", "commercial judgment", "structured analysis"],
    tags: ["market entry", "healthcare", "emerging markets", "international expansion"],
    followUps: [
      "How would you estimate the market size for this product in the new country?",
      "What could change your recommendation after 6 months of further diligence?",
      "How do you assess political risk in an emerging market?",
    ],
    evaluationRubric: "Strong answer: healthcare-specific nuance (regulatory, reimbursement), structured framework, explicit assumptions, recommendation with clear logic. Weak answer: generic market entry template without sector adaptation.",
    interviewStage: "Second round",
    expectedTime: "15–20 min",
    source: "MimirNest curated",
  },
  {
    id: "con-me-003",
    role: "consulting",
    category: "Market Entry",
    subcategory: "Segment entry",
    difficulty: "Expert",
    industry: "Financial Services & Banking",
    company: null,
    question: "A leading European retail bank is considering entering the Indian SME lending market. The partner asks you to develop an entry recommendation by end of week. How do you approach this and what is your recommendation?",
    shortAnswer: "Prioritise data collection on market size, competitive intensity, and regulatory barriers; assess the bank's edge; develop a go/no-go with entry mode options.",
    detailedAnswer: "This is a partner-level framing question. Start by clarifying objectives and success criteria: what does the bank define as success (revenue, market share, strategic foothold)? What is the investment appetite and time horizon? Then structure the work in 2–3 parallel tracks: (1) Market attractiveness — India SME credit gap is well-documented ($300–400B); growth is driven by GST formalization, digital banking, and government push. (2) Competitive dynamics — SBI, HDFC, Axis dominate; fintechs (Lendingkart, Indifi) are capturing the underserved segment. Foreign banks face branch restrictions and capital requirements under RBI. (3) The bank's edge — European banks typically lack local distribution and brand recognition but may bring risk technology, structured lending expertise, and access to European corporates operating in India (a niche). Recommendation structure: Go, but as a niche play focused on European corporate supply chains operating in India. Entry mode: a phased approach — first, representative office and regulatory approval; then a JV with a domestic NBFC for distribution; then full subsidiary if the model proves out. Key risks: RBI regulations restricting foreign bank expansion, credit risk in informal SME segment, FX exposure.",
    skills: ["executive judgment", "ambiguity management", "recommendation synthesis", "financial services domain", "India market knowledge"],
    tags: ["market entry", "banking", "SME", "India", "foreign bank", "partner-level"],
    followUps: [
      "How would you structure the JV agreement to protect the bank's IP and risk exposure?",
      "What's your biggest concern about this market, and how would you validate it?",
      "If the bank has limited budget for diligence, what are the three data points you'd absolutely need?",
    ],
    evaluationRubric: "Expert-level: candidate structures ambiguity, drives the problem without waiting for prompts, makes a decisive recommendation with clear logic, acknowledges risks with mitigation ideas, and shows genuine India market and financial services knowledge.",
    interviewStage: "Final / partner round",
    expectedTime: "20–30 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — GROWTH
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-gr-001",
    role: "consulting",
    category: "Growth",
    subcategory: "Revenue growth",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "A mid-sized company wants to grow revenue by 20% next year. Walk me through how you'd structure the growth strategy.",
    shortAnswer: "Decompose growth into customer, product, geographic, and channel vectors; prioritise by feasibility and return.",
    detailedAnswer: "Growth can come from four levers: (1) Existing customers — sell more to current customers via upsell, cross-sell, or retention improvements. (2) New customers in existing markets — improve acquisition through better marketing, sales, or distribution. (3) New products/services — expand the portfolio to capture adjacent spend. (4) New geographies — expand into new regions. For a 20% revenue target, start with the baseline: how much comes from organic retention vs new sales? Then size each lever: if annual churn is 10%, you need 30% gross new revenue to hit 20% net growth. Prioritise levers by time-to-impact (retention is fastest), investment required, and competitive risk. A typical playbook: fix retention first, then accelerate acquisition in the highest-converting channels, then explore adjacencies.",
    skills: ["growth frameworks", "revenue decomposition", "strategic prioritisation"],
    tags: ["growth", "revenue", "strategy"],
    followUps: [
      "How would you prioritise between customer retention vs new customer acquisition?",
      "What data would you need to size each growth lever?",
    ],
    evaluationRubric: "Candidate uses a structured growth taxonomy, avoids jumping to tactics, and shows understanding that 20% net growth requires significantly higher gross growth depending on churn.",
    interviewStage: "Screening",
    expectedTime: "6–8 min",
    source: "MimirNest curated",
  },
  {
    id: "con-gr-002",
    role: "consulting",
    category: "Growth",
    subcategory: "Channel growth",
    difficulty: "Medium",
    industry: "Retail & E-commerce",
    company: null,
    question: "A traditional brick-and-mortar retailer is losing market share to online competitors. How would you develop a digital growth strategy?",
    shortAnswer: "Assess where customers are shifting, what the retailer's defensible advantages are, and build an omnichannel strategy that monetises physical assets digitally.",
    detailedAnswer: "Start with diagnostics: which categories are losing share fastest? What is the price gap vs online? Which customer segments are defecting? Then assess the retailer's assets — physical stores can be repositioned as fulfillment hubs (click-and-collect, same-day delivery), experience centers, or community destinations. The digital growth strategy should cover: (1) Own digital channel — invest in e-commerce capability and mobile app; a retailer with no strong own channel is entirely dependent on marketplaces. (2) Marketplace presence — list on Amazon/Flipkart to capture demand but manage margin carefully. (3) Data and personalisation — physical retailers have rich transaction data; a loyalty program can power targeted digital marketing. (4) Last-mile advantage — use stores as micro-fulfillment centers to compete on delivery speed. Be explicit about trade-offs: full digital build is expensive and slow; marketplace presence is fast but margin-dilutive.",
    skills: ["digital strategy", "omnichannel", "retail dynamics", "channel economics"],
    tags: ["growth", "retail", "digital", "omnichannel"],
    followUps: [
      "How would you prioritise investment between own digital channel vs marketplace presence?",
      "What metrics would you use to track the success of this strategy in year 1?",
    ],
    evaluationRubric: "Strong answer: leverages existing physical assets rather than ignoring them, addresses both online channel and fulfillment, and acknowledges the margin trade-off of digital channels.",
    interviewStage: "First round",
    expectedTime: "10–14 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — M&A
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-ma-001",
    role: "consulting",
    category: "M&A",
    subcategory: "Strategic rationale",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "A large enterprise software company is considering acquiring a smaller AI startup. How would you evaluate the strategic rationale?",
    shortAnswer: "Assess strategic fit, synergy potential, valuation logic, integration complexity, and alternative options.",
    detailedAnswer: "The evaluation framework: (1) Strategic rationale — does the startup fill a capability gap (AI/ML talent, proprietary technology, data assets) that the acquirer cannot build fast enough organically? Is it a defensive move (preventing a competitor from acquiring) or offensive (expanding into a new market)? (2) Synergy analysis — revenue synergies (bundling AI into existing products, new customers), cost synergies (eliminating duplicate functions), and technology synergies (embedding the AI into the acquirer's platform). Synergies should be quantified and stress-tested. (3) Valuation — startups are typically valued on revenue multiples or DCF with aggressive growth assumptions; assess whether the premium is justified by synergies. (4) Integration risk — AI startups are talent-dense; what is the retention plan for key engineers and researchers? Culture clash between a large enterprise and a startup is a real risk. (5) Alternatives — could the company partner or license instead? Is there a better acquisition target?",
    skills: ["M&A evaluation", "strategic rationale", "synergy analysis", "technology M&A"],
    tags: ["M&A", "technology", "acquisition", "AI", "strategy"],
    followUps: [
      "How would you structure the retention packages for key AI researchers?",
      "What are the top three integration risks and how would you mitigate them?",
    ],
    evaluationRubric: "Candidate covers strategic rationale beyond just financial return, explicitly addresses talent risk in tech acquisitions, and distinguishes between different types of synergies.",
    interviewStage: "First round",
    expectedTime: "10–14 min",
    source: "MimirNest curated",
  },
  {
    id: "con-ma-002",
    role: "consulting",
    category: "M&A",
    subcategory: "Synergy valuation",
    difficulty: "Hard",
    industry: "FMCG / Consumer Goods",
    company: null,
    question: "Two FMCG giants are considering a merger. How would you approach the synergy valuation, and what are the key risks you'd flag to the board?",
    shortAnswer: "Build a bottom-up synergy case across cost and revenue; haircut aggressively for integration costs, timeline slippage, and competitive response.",
    detailedAnswer: "Synergy valuation in FMCG M&A: (1) Cost synergies (more certain): procurement scale (typically 2–5% savings on COGS for overlapping categories), manufacturing rationalisation (plant closures, overhead elimination), SG&A consolidation (marketing, HQ, back-office). For large FMCG deals, cost synergies of $500M–$1B+ are common. Model bottom-up by category and function, then apply a 20–30% haircut for execution risk and delay. (2) Revenue synergies (less certain): category expansion, distribution leverage (using one company's distribution in markets where the other is weak), cross-selling premium brands to the other's customer base. Revenue synergies typically take 3–5 years to materialise and should be valued conservatively. Key risks for the board: (a) Regulatory / antitrust — FMCG mega-mergers attract scrutiny; remedies (divestitures) can destroy value. (b) Brand portfolio complexity — managing 50+ brands post-merger creates focus dilution. (c) Culture and leadership — FMCG cultures are often entrenched. (d) Integration cost underestimation — a large FMCG merger can cost $500M–$1B+ to integrate. (e) Competitive response — competitors will exploit distraction during integration.",
    skills: ["synergy modelling", "M&A valuation", "FMCG sector knowledge", "risk identification", "board communication"],
    tags: ["M&A", "FMCG", "synergies", "merger", "board-level"],
    followUps: [
      "How would you present a bear case and a bull case for synergies?",
      "What is the single biggest integration risk and how do you mitigate it?",
    ],
    evaluationRubric: "Expert answer: distinguishes cost vs revenue synergies in confidence and timing, applies appropriate haircuts, and identifies FMCG-specific risks (antitrust, brand portfolio).",
    interviewStage: "Second round",
    expectedTime: "15–20 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — PRICING
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-pr-001",
    role: "consulting",
    category: "Pricing",
    subcategory: "New product pricing",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "A client is launching a new product. Walk me through how you'd approach the pricing decision.",
    shortAnswer: "Anchor on value delivered to the customer, cross-reference with competitive alternatives and cost floor, then choose a pricing strategy.",
    detailedAnswer: "There are three fundamental anchors for pricing: (1) Value-based pricing — what is the customer's willingness to pay (WTP)? This is the ceiling. WTP depends on the economic value delivered relative to the next best alternative. (2) Competitive benchmarking — what do comparable products charge? This informs the reference price in the buyer's mind. (3) Cost-plus floor — what is the minimum price to be profitable? This is the floor. The pricing strategy then depends on context: penetration pricing (low entry price to build share, then raise) vs skimming (high entry price to capture early adopters, then lower). Also consider the revenue model: one-time purchase, subscription, usage-based. For B2B, value-based pricing is typically dominant — quantify the ROI or cost savings the product delivers and price at a fraction of that value.",
    skills: ["pricing frameworks", "value-based pricing", "competitive analysis"],
    tags: ["pricing", "new product", "strategy"],
    followUps: [
      "How would you test willingness to pay before launch?",
      "When would you recommend a freemium model over a subscription?",
    ],
    evaluationRubric: "Candidate articulates three pricing anchors (value, competition, cost), distinguishes strategy from tactics, and does not default to cost-plus as the only approach.",
    interviewStage: "Screening",
    expectedTime: "5–8 min",
    source: "MimirNest curated",
  },
  {
    id: "con-pr-002",
    role: "consulting",
    category: "Pricing",
    subcategory: "Segmented pricing",
    difficulty: "Hard",
    industry: "Travel & Hospitality",
    company: null,
    question: "An airline wants to increase revenue per seat without increasing base fares. How would you approach a pricing strategy overhaul?",
    shortAnswer: "Move from fare-class yield management to dynamic ancillary monetisation, personalised bundling, and segmented upgrade offers.",
    detailedAnswer: "Airlines already use sophisticated yield management, but the opportunity is in ancillary revenue and personalised pricing: (1) Ancillary unbundling — separate bags, seat selection, meals, and priority boarding from the base fare. This allows price-sensitive customers to choose a lower base fare while capturing willingness to pay from those who value add-ons. (2) Dynamic ancillary pricing — price ancillaries dynamically based on remaining inventory, route, day-of-week, and customer history. (3) Personalised upgrade offers — use booking history and loyalty tier data to make targeted upgrade offers (e.g., last-minute business class upgrade at a price calibrated to that traveller's history). (4) Corporate account pricing — renegotiate corporate contracts to shift from fixed discounts to demand-based credits, capturing more value from flexible corporate travel. (5) Bundling — create tiered bundles (basic, standard, premium) that guide customers toward higher-value options through anchoring. Revenue impact: airlines that execute this well see ancillary revenue reach 20–30% of total revenue vs 10–15% for laggards.",
    skills: ["pricing strategy", "revenue management", "personalisation", "airline economics"],
    tags: ["pricing", "travel", "airline", "ancillary revenue", "segmentation"],
    followUps: [
      "How do you avoid customer backlash from aggressive unbundling?",
      "What technology investment is required to enable personalised pricing?",
    ],
    evaluationRubric: "Strong answer goes beyond generic price segmentation to airline-specific mechanisms (yield management, ancillary, dynamic pricing) and quantifies the opportunity.",
    interviewStage: "Second round",
    expectedTime: "12–18 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — OPERATIONS
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-op-001",
    role: "consulting",
    category: "Operations",
    subcategory: "Bottleneck analysis",
    difficulty: "Medium",
    industry: "Manufacturing & Industrial",
    company: null,
    question: "A manufacturing plant is running at 70% capacity but cannot meet customer delivery commitments. How would you identify and resolve the bottleneck?",
    shortAnswer: "Map the production flow, identify the constraint step using throughput data, then eliminate the constraint through focused investment.",
    detailedAnswer: "Apply the Theory of Constraints approach: (1) Identify the constraint — map every production step and measure throughput rate and queue time at each. The bottleneck is the step with the lowest throughput and highest queue (work-in-progress piling up before it). (2) Exploit the constraint — ensure the bottleneck step runs at 100% utilisation; eliminate downtime, changeovers, quality rework that wastes constraint capacity. (3) Subordinate everything else — pace upstream steps to feed the constraint at its optimal rate; don't overproduce before the bottleneck. (4) Elevate the constraint — only if exploitation is insufficient: invest in additional capacity at the bottleneck (extra shift, equipment, outsourcing). (5) Repeat — once a constraint is resolved, a new one will emerge. Also investigate the 70% capacity figure: is it capacity of the whole plant or the bottleneck step? A plant can run at 70% nominal capacity but still fail to deliver if one critical step is at 100% and creating delays.",
    skills: ["operations management", "Theory of Constraints", "bottleneck analysis", "manufacturing"],
    tags: ["operations", "manufacturing", "capacity", "bottleneck", "TOC"],
    followUps: [
      "What data would you collect in the first week on-site?",
      "How do you convince plant management to prioritise the bottleneck step over others?",
    ],
    evaluationRubric: "Strong answer: applies a systematic constraint-identification process, distinguishes capacity utilisation from effective throughput, and proposes a sequenced resolution approach.",
    interviewStage: "First round",
    expectedTime: "10–14 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — STRATEGY
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-st-001",
    role: "consulting",
    category: "Strategy",
    subcategory: "Competitive advantage",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "A technology company is losing market share to a new entrant with a lower-cost product. What strategic options does it have?",
    shortAnswer: "Assess the source of the new entrant's advantage, evaluate the firm's defensible moat, and choose between competing on price, differentiating further, or targeting a niche.",
    detailedAnswer: "Strategic response to a low-cost entrant depends on the source of the threat: (1) Diagnose the competitive advantage — is the entrant's low cost structural (different business model, lower fixed costs) or temporary (VC-subsidised pricing, lower quality)? A structural cost advantage is far harder to counter. (2) Assess the incumbent's moat — switching costs, network effects, brand, proprietary data, distribution. If the moat is strong among certain customer segments, defend those. (3) Strategic options: (a) Fight on cost — launch a flanker brand or low-cost product line; risk: cannibalisation of premium revenue. (b) Differentiate further — lean into superior features, service, or integration that the new entrant cannot match; requires pricing power to be sustainable. (c) Retreat to a defensible niche — focus on the highest-value customers where switching costs are highest and the entrant has least appeal. (d) Acquire or partner with the entrant — if you can't beat them. The classic mistake is to neither commit to cost competition nor differentiate clearly, leaving the company stuck in the middle.",
    skills: ["competitive strategy", "market positioning", "strategic options", "technology sector"],
    tags: ["strategy", "competition", "market share", "technology", "differentiation"],
    followUps: [
      "How do you avoid the 'stuck in the middle' trap?",
      "What is the risk of launching a low-cost flanker brand?",
    ],
    evaluationRubric: "Strong answer: diagnoses the source of competitive advantage before prescribing a response, avoids generic advice, and acknowledges the risk of each option.",
    interviewStage: "First round",
    expectedTime: "10–14 min",
    source: "MimirNest curated",
  },
  {
    id: "con-st-002",
    role: "consulting",
    category: "Strategy",
    subcategory: "Portfolio strategy",
    difficulty: "Expert",
    industry: "FMCG / Consumer Goods",
    company: null,
    question: "A large FMCG conglomerate with 80+ brands across 12 categories is reviewing its portfolio strategy. The board wants a framework to decide which brands to grow, hold, fix, or divest. How do you approach this?",
    shortAnswer: "Apply a two-axis portfolio framework (market attractiveness × competitive position), then add financial return and strategic coherence overlays to generate a differentiated recommendation.",
    detailedAnswer: "A portfolio review of this scale requires a structured prioritisation approach: (1) Two-axis assessment — for each brand: market attractiveness (category growth, profitability, consumer trends) vs competitive position (market share, brand health scores, pricing power). This generates a classic 2×2 with four quadrants: Stars (grow), Cash Cows (hold and harvest), Question Marks (selective investment or divest), Dogs (fix or divest). (2) Financial overlay — calculate ROIC and free cash flow by brand. Some brands may be in attractive markets but destroy value (high investment, low return). (3) Strategic coherence — does the brand fit the company's core capabilities? A brand in a category requiring different manufacturing, distribution, or marketing capabilities is a strategic drain. (4) Brand interaction effects — some brands create halo effects or distribution leverage that isn't captured in standalone P&L. (5) Divestiture readiness — for brands flagged for exit, assess market demand, valuation range, and auction readiness. Recommendation structure: identify 10–15 'Power Brands' to concentrate investment; flag 20–30 for steady harvest; initiate divestiture of 30–40 brands in 24 months. This is the model Unilever, P&G, and Nestlé have all applied.",
    skills: ["portfolio strategy", "BCG matrix", "ROIC analysis", "FMCG sector", "brand management", "executive communication"],
    tags: ["strategy", "portfolio", "FMCG", "brands", "divestiture", "partner-level"],
    followUps: [
      "How would you handle brand managers who resist the 'fix or divest' classification?",
      "What are the risks of too aggressive a divestiture program?",
      "How do you sequence the divestitures to maximise proceeds?",
    ],
    evaluationRubric: "Expert-level: moves beyond generic BCG matrix to integrate financial returns, strategic coherence, and operational readiness. Shows familiarity with how leading FMCG companies have executed similar programs.",
    interviewStage: "Final / partner round",
    expectedTime: "20–30 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — GUESSTIMATES
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-ge-001",
    role: "consulting",
    category: "Guesstimates",
    subcategory: "Physical estimation",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "How many piano tuners are there in Chicago?",
    shortAnswer: "Estimate from the demand side: pianos in Chicago → tuning frequency → tuner time → number of tuners.",
    detailedAnswer: "This is the classic Fermi estimation. Chicago population: ~3M people, ~1M households. Assume 1 in 20 households owns a piano → 50,000 pianos. Add institutions (schools, hotels, churches): roughly 10,000 more → 60,000 pianos total. Tuning frequency: assume each piano is tuned once or twice per year → 75,000 tunings/year. A piano tuner can tune roughly 4 pianos per day, 250 working days/year → 1,000 tunings per tuner per year. Number of tuners: 75,000 / 1,000 = 75 tuners. The 'right answer' (per the Yellow Pages in the 1990s) was ~125 tuners — directionally consistent. State your logic, assumptions, and final number with appropriate caveats.",
    skills: ["Fermi estimation", "logical decomposition", "calibration"],
    tags: ["guesstimate", "estimation", "Fermi", "classic"],
    followUps: [
      "How confident are you in this estimate? What's the range?",
      "What one assumption has the most impact on your answer?",
    ],
    evaluationRubric: "Candidate builds a logical chain from a known starting point, labels assumptions explicitly, cross-checks, and arrives at a number — the exact value matters less than the process.",
    interviewStage: "Screening",
    expectedTime: "4–6 min",
    source: "MimirNest curated",
  },
  {
    id: "con-ge-002",
    role: "consulting",
    category: "Guesstimates",
    subcategory: "Revenue estimation",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "Estimate the annual revenue of a leading Indian food delivery app (e.g., Swiggy or Zomato).",
    shortAnswer: "Estimate from GMV (orders × AOV) and monetisation take-rate, then validate against margin structure.",
    detailedAnswer: "Build from the demand side: India's urban population: ~500M; smartphone users: ~350M. Active food delivery users: assume ~15% penetration → 50M active users. Average order frequency: ~2 orders/month → 100M orders/month = 1.2B orders/year. Average order value (AOV): ~₹350 (mix of individual and group orders). GMV = 1.2B × ₹350 = ~₹420B ($5B). Platform take-rate (commission + delivery charges + platform fee): ~18–22% blended. Revenue from GMV: ~₹75–90B ($900M–$1.1B). Add advertising/restaurant visibility revenue: ~10–15% of total revenue. Total estimated revenue: ₹85–100B (~$1–1.2B). Cross-check: Zomato reported FY24 GOV of ~₹320B and revenue of ~₹121B; our estimate is directionally consistent for a single large player.",
    skills: ["revenue estimation", "platform economics", "India digital economy"],
    tags: ["guesstimate", "food delivery", "India", "platform", "revenue"],
    followUps: [
      "What's the path to profitability at this revenue level?",
      "How would this estimate change if quick commerce (10-minute delivery) cannibalises standard delivery?",
    ],
    evaluationRubric: "Strong answer: builds from users and frequency, applies a realistic take-rate, and either validates against known data or acknowledges the limitation of not having it.",
    interviewStage: "First round",
    expectedTime: "7–10 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — BEHAVIORAL / PEI
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-pei-001",
    role: "consulting",
    category: "Behavioral / PEI",
    subcategory: "Leadership",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "Tell me about a time you led a team through a difficult challenge.",
    shortAnswer: "Use a structured story: context → your specific leadership actions → the impact, with honest reflection.",
    detailedAnswer: "A strong PEI response for leadership should demonstrate: taking initiative and ownership (not just managing a process assigned to you), making a key decision with incomplete information, motivating others when morale was low, or advocating for a team member or approach. Structure: (S) Set the scene briefly — what was the challenge and who was involved? (A) Describe your specific actions — what did you do that a passive person wouldn't have? (R) What was the result — quantify where possible. (R) What did you learn? Consulting firms, especially McKinsey (Structured Problem Solving), BCG, and Bain, are looking for the candidate's individual contribution — avoid 'we did X'; use 'I decided / I convinced / I designed'. Ideally choose a story where the challenge involved ambiguity, pushback, or a genuine trade-off — not a simple project management success.",
    skills: ["leadership", "ownership", "influence", "communication"],
    tags: ["behavioral", "PEI", "leadership", "consulting"],
    followUps: [
      "What would you do differently if you faced the same situation again?",
      "How did you handle a team member who wasn't performing?",
    ],
    evaluationRubric: "Strong answer: specific and personal (uses 'I', not 'we'), demonstrates a genuine leadership moment (not just project coordination), quantifies impact, and reflects authentically.",
    interviewStage: "First round",
    expectedTime: "3–5 min",
    source: "MimirNest curated",
  },
  {
    id: "con-pei-002",
    role: "consulting",
    category: "Behavioral / PEI",
    subcategory: "Influence without authority",
    difficulty: "Medium",
    industry: "General / Cross-industry",
    company: null,
    question: "Describe a time when you had to convince someone senior to change their mind or adopt your recommendation.",
    shortAnswer: "Structure around the persuasion challenge, the evidence and framing you used, and the outcome — highlight empathy and data-driven communication.",
    detailedAnswer: "Influencing without authority is a core consulting skill — consultants constantly have to persuade senior clients who don't report to them. A strong story should show: (1) You understood why the senior person held the contrary view (their incentives, concerns, context). (2) You built a credible evidence base — data, external benchmarks, pilot results. (3) You tailored your communication style to their perspective and used the right moment to make the case. (4) You handled pushback professionally and didn't capitulate to preserve the relationship. Avoid stories where you 'just presented facts and they agreed' — the interesting part is the persuasion challenge and how you navigated it. Also avoid stories where the senior person was simply wrong and you were obviously right — that doesn't show nuanced influence skills.",
    skills: ["influence", "stakeholder management", "communication", "executive presence"],
    tags: ["behavioral", "PEI", "influence", "stakeholder", "consulting"],
    followUps: [
      "What did you do when they pushed back on your data?",
      "How do you maintain a relationship when you ultimately don't win the argument?",
    ],
    evaluationRubric: "Strong answer: shows genuine empathy for the senior person's perspective, uses evidence-based persuasion, and demonstrates resilience under pushback. Weak answer: 'I showed them the data and they agreed immediately.'",
    interviewStage: "First round",
    expectedTime: "3–5 min",
    source: "MimirNest curated",
  },
  {
    id: "con-pei-003",
    role: "consulting",
    category: "Behavioral / PEI",
    subcategory: "Failure and resilience",
    difficulty: "Medium",
    industry: "General / Cross-industry",
    company: null,
    question: "Tell me about your biggest professional failure or mistake. What did you learn from it?",
    shortAnswer: "Choose a real failure, own it fully, and demonstrate a genuine learning that changed how you operate.",
    detailedAnswer: "Interviewers ask this to test self-awareness, intellectual honesty, and growth mindset. Avoid: (1) A 'humble-brag' disguised as a failure ('I worked too hard'). (2) A failure that wasn't really your fault. (3) A trivial mistake with no real consequences. Strong answer structure: State the failure plainly and early. Explain your role and the factors that led to it. Describe the consequences honestly. Then show the insight you extracted — not just 'I learned to communicate better' but specifically what you now do differently. The best answers show that the failure genuinely changed your behaviour and that you have applied the lesson since.",
    skills: ["self-awareness", "intellectual honesty", "growth mindset", "resilience"],
    tags: ["behavioral", "PEI", "failure", "growth", "self-awareness"],
    followUps: [
      "How do you ensure you don't make the same mistake again?",
      "Has a failure ever changed the direction of your career or thinking?",
    ],
    evaluationRubric: "Strong: genuine failure, full ownership, specific lesson with behavioural change demonstrated. Weak: humble-brag, externalised blame, or lesson is generic platitude.",
    interviewStage: "First round",
    expectedTime: "3–5 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — PUBLIC SECTOR / SOCIAL IMPACT
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-ps-001",
    role: "consulting",
    category: "Public Sector",
    subcategory: "Policy implementation",
    difficulty: "Medium",
    industry: "Government / Public Sector",
    company: null,
    question: "A state government wants to reduce out-of-school children by 50% in 3 years. How would you design and implement a strategy?",
    shortAnswer: "Diagnose the root causes of non-attendance, design targeted interventions for each segment, and build a phased implementation with clear accountability.",
    detailedAnswer: "Start with diagnosis: out-of-school children are not a homogeneous group. Causes include poverty (children needed for household income), distance from school, gender barriers (especially for girls), poor quality schooling (no incentive to attend), disability, and seasonal migration. Segment the population by root cause, because the intervention differs for each: (1) Economic barriers → conditional cash transfers, mid-day meal programs, free uniforms and books. (2) Distance → community schools, mobile schools, or transportation. (3) Gender → girls-only sanitation facilities, female teachers, community engagement on norms. (4) Quality → teacher training, accountability mechanisms, community monitoring. (5) Migration → portable enrollment, bridge programs. On implementation: set district-level targets, assign accountability to district education officers, create a real-time monitoring dashboard, and establish a quarterly review mechanism. The government should also engage civil society and NGOs as last-mile delivery partners. 3-year timeline: Year 1 — data collection, program design, pilot in 5 districts; Year 2 — scale to all districts; Year 3 — consolidate and sustain.",
    skills: ["public policy", "implementation planning", "social impact", "stakeholder management", "monitoring and evaluation"],
    tags: ["public sector", "education", "social impact", "implementation", "government"],
    followUps: [
      "How would you measure progress against the 50% target quarterly?",
      "What's the risk of political change disrupting the program?",
      "How would you handle districts where local leaders resist the intervention?",
    ],
    evaluationRubric: "Strong answer: segments the problem by root cause (not a one-size-fits-all solution), designs tailored interventions, and builds a practical implementation plan with accountability structures.",
    interviewStage: "First round",
    expectedTime: "12–16 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // CONSULTING — AMBIGUOUS / PARTNER-STYLE
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "con-amb-001",
    role: "consulting",
    category: "Ambiguous / Partner-style",
    subcategory: "Open synthesis",
    difficulty: "Expert",
    industry: "General / Cross-industry",
    company: null,
    question: "The CEO of a large conglomerate calls you and says: 'I'm worried. I feel like we're winning tactically but losing strategically.' What do you do?",
    shortAnswer: "Acknowledge the concern, ask questions to understand what 'losing strategically' means to them, then co-develop a diagnostic framing before jumping to solutions.",
    detailedAnswer: "This is a partner-level ambiguity question. The right first move is not to provide a framework or a solution — it's to listen and ask. Key questions to unlock the CEO's concern: 'What's making you feel this way — is it a specific market, competitor, or internal signal?' 'How do you define winning strategically for this business in 5 years?' 'Are there decisions you've been making that felt right short-term but now feel wrong?' Once you understand the concern, you can help diagnose: is this a strategy clarity problem (no shared vision), a resource allocation problem (investment not matching stated strategy), a performance management problem (incentives rewarding the wrong things), or an external threat the organisation isn't seeing? Each diagnosis leads to a different engagement. The mistake is to immediately launch into a strategic planning framework or competitive analysis without first understanding what the CEO is really worried about. Senior consulting is as much about helping clients articulate their real problem as it is about solving it.",
    skills: ["ambiguity management", "executive communication", "diagnostic thinking", "empathy", "hypothesis formation"],
    tags: ["ambiguous", "partner-level", "CEO", "strategy", "diagnostic"],
    followUps: [
      "What if the CEO can't articulate clearly what 'losing strategically' means?",
      "How do you avoid the trap of jumping to a solution before understanding the problem?",
      "How do you charge for an engagement when the problem is this ill-defined?",
    ],
    evaluationRubric: "Expert answer: candidate asks clarifying questions rather than launching into a framework; demonstrates empathy and executive-level listening; proposes a diagnostic approach rather than a solution; shows comfort with ambiguity.",
    interviewStage: "Final / partner round",
    expectedTime: "15–20 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // HUMAN RESOURCES — BEHAVIORAL (shared with all roles)
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "hr-beh-001",
    role: "human-resources",
    category: "Behavioral",
    subcategory: "Conflict resolution",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "Tell me about a time you resolved a conflict between two team members.",
    shortAnswer: "Describe the conflict, your facilitation approach, and the resolution — highlighting listening, impartiality, and sustainable outcome.",
    detailedAnswer: "Strong conflict resolution stories show: (1) You understood both parties' perspectives before taking action. (2) You created a structured space for dialogue rather than imposing a solution. (3) You separated the person from the issue. (4) You arrived at a solution both parties could live with. Structure: what was the conflict (professionally specific — task conflict, values conflict, personality clash), what you did (how you facilitated), what the outcome was (quantify if possible — team performance, project outcome), and what you learned. Avoid stories where the conflict was trivial or resolved by hierarchy ('I told them what to do'). The best stories involve genuine tension and show that the resolution was durable.",
    skills: ["conflict resolution", "empathy", "facilitation", "team management"],
    tags: ["behavioral", "HR", "conflict", "team", "facilitation"],
    followUps: [
      "What if the conflict was unresolvable? What then?",
      "How do you handle a conflict where you believe one party is clearly wrong?",
    ],
    evaluationRubric: "Strong: impartial facilitation, both parties heard, sustainable resolution, learning extracted. Weak: 'I told them to get along' or story lacks genuine conflict.",
    interviewStage: "Screening",
    expectedTime: "3–5 min",
    source: "MimirNest curated",
  },
  {
    id: "hr-beh-002",
    role: "human-resources",
    category: "Behavioral",
    subcategory: "Performance management",
    difficulty: "Medium",
    industry: "General / Cross-industry",
    company: null,
    question: "How have you handled a situation where a high-performing employee was exhibiting behaviours that were damaging team culture?",
    shortAnswer: "Balance recognising performance with addressing behaviour directly — the 'brilliant jerk' problem requires early, honest, and specific feedback.",
    detailedAnswer: "This tests whether the candidate understands that culture is not separate from performance. A high performer with toxic behaviours is not a net positive — research consistently shows that one team member with severely negative behaviours can reduce team performance by 30–40%. Key steps: (1) Don't ignore it because of performance. (2) Get specific — generalised feedback ('people find you difficult') is not actionable. Document specific behaviours and their impact. (3) Have a direct conversation early: 'I've noticed X behaviour in Y situations, and the impact on the team is Z.' (4) Make behavioural improvement a performance criterion alongside output metrics. (5) Follow through — if behaviour doesn't change after a fair intervention, act. Failure to act sends a message to the team that performance excuses any behaviour. The hardest part is confronting a high performer who brings in revenue or results; the candidate should show they're willing to have that conversation.",
    skills: ["performance management", "feedback delivery", "culture management", "HR judgment"],
    tags: ["behavioral", "HR", "performance", "culture", "difficult conversations"],
    followUps: [
      "What if the employee denies the behaviour when you raise it?",
      "What's the risk of losing them if they're top-performing?",
    ],
    evaluationRubric: "Strong: candidate shows willingness to confront despite performance, uses specific behavioural evidence, follows through, and understands the cultural cost of inaction.",
    interviewStage: "First round",
    expectedTime: "5–8 min",
    source: "MimirNest curated",
  },
  {
    id: "hr-beh-003",
    role: "human-resources",
    category: "Behavioral",
    subcategory: "Ethical judgment",
    difficulty: "Hard",
    industry: "General / Cross-industry",
    company: null,
    question: "You discover that a senior manager has been providing inaccurate information to the board. What do you do?",
    shortAnswer: "Assess the severity and intent, gather facts, escalate through appropriate channels with documentation, and protect whistleblower rights.",
    detailedAnswer: "This is an ethical judgment case: (1) Fact-gather first — confirm what you've observed is accurate and not a misunderstanding. Document it. (2) Assess severity — is this a one-time error or a pattern? Is it material (could harm stakeholders, create legal liability, or mislead investors)? (3) Determine intent — honest mistake vs deliberate misrepresentation changes the response significantly. (4) Escalate appropriately — depending on the organisation: first, try to address directly with the manager if the relationship allows and it's a borderline case. If material or intentional, escalate to the CHRO, General Counsel, or Audit Committee (bypass the manager). Don't escalate to the manager's direct supervisor if they might be complicit. (5) Follow whistleblower protocols — protect yourself and any witnesses. Document every step. The candidate should show they won't be paralysed by the seniority of the person involved and will act proportionally based on the facts.",
    skills: ["ethical judgment", "HR integrity", "escalation protocols", "compliance awareness"],
    tags: ["behavioral", "HR", "ethics", "escalation", "governance"],
    followUps: [
      "What if escalating would put your own job at risk?",
      "How do you handle it if the CHRO is also implicated?",
    ],
    evaluationRubric: "Strong: fact-based approach, appropriate escalation channel (not just their manager), protection of process integrity, willingness to act despite seniority. Weak: ignores it, handles informally, or escalates without evidence.",
    interviewStage: "Second round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },
  {
    id: "hr-rec-001",
    role: "human-resources",
    category: "Recruiting",
    subcategory: "Talent strategy",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "A fast-growing tech company is struggling to hire senior engineers. They're losing candidates to FAANG. What talent strategy would you recommend?",
    shortAnswer: "Rethink the employer value proposition (EVP), diversify sourcing, improve the candidate experience, and differentiate on dimensions FAANG cannot easily match.",
    detailedAnswer: "Competing with FAANG on compensation alone is a losing strategy for most companies. Instead: (1) Define a differentiated EVP — what can you offer that FAANG cannot? Typically: faster career progression, more ownership and impact, equity upside at an earlier stage, flexibility, mission, or interesting technical problems. Be specific and honest — don't claim all of these if they're not true. (2) Diversify sourcing — FAANG targets the same top schools and platforms. Expand sourcing to bootcamp graduates, international talent, career changers, and passive candidates via direct outreach. (3) Fix the candidate experience — slow, inconsistent, or disrespectful processes lose candidates. Audit your time-to-offer and feedback quality. (4) Structured interviewing — reduce bias and improve quality of hire through consistent, competency-based interviews. (5) Referral programs — well-designed referral programs are highly cost-effective for senior hires. (6) Employer branding — tech blogs, open-source contributions, conference presence. Candidates research companies; strong technical brand reduces the acquisition cost.",
    skills: ["talent acquisition", "employer branding", "EVP design", "sourcing strategy"],
    tags: ["recruiting", "HR", "talent", "tech", "FAANG competition"],
    followUps: [
      "How do you craft an EVP when you can't match FAANG compensation?",
      "What metrics would you use to assess recruiting effectiveness?",
    ],
    evaluationRubric: "Strong: differentiates beyond compensation, addresses multiple levers (EVP, sourcing, process, brand), and is realistic about what smaller companies can offer.",
    interviewStage: "First round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },
  {
    id: "hr-scenario-001",
    role: "human-resources",
    category: "HR Scenarios",
    subcategory: "Restructuring",
    difficulty: "Hard",
    industry: "General / Cross-industry",
    company: null,
    question: "The company has decided to lay off 20% of the workforce. You are the CHRO. How do you manage this process?",
    shortAnswer: "Plan meticulously, communicate with transparency and dignity, comply with all legal requirements, and protect the morale of those who remain.",
    detailedAnswer: "A 20% workforce reduction is a high-stakes, high-risk event. As CHRO: (1) Pre-announcement: work with legal on compliance (notice periods, severance, consultation requirements vary by jurisdiction). Ensure selection criteria are objective, documented, and legally defensible. Brief the executive team and train managers. Prepare the communication plan — the message must come from senior leadership, not just HR. (2) Notification day: inform affected employees individually and privately. Have severance packages, outplacement support, and benefits continuation ready to present. Be clear, direct, and compassionate. Avoid euphemisms. (3) Communication to retained employees: announce on the same day. Explain the business rationale, the criteria used, and what happens next. Silence creates rumour and terror. (4) Post-announcement: the risk shifts to survivor syndrome — remaining employees may feel guilty, anxious, or disengaged. Address this with visible leadership presence, a clear vision for the future, and honest answers to 'is this over?' (5) Monitor turnover in the 60–90 days post-layoff. Key principles: speed (slow layoffs are crueller), transparency (people handle hard truths better than uncertainty), and dignity (treat affected employees with respect throughout).",
    skills: ["change management", "legal compliance", "crisis communication", "employee relations", "CHRO judgment"],
    tags: ["HR", "layoffs", "restructuring", "CHRO", "communication", "change management"],
    followUps: [
      "How do you decide who to let go vs retain?",
      "What do you say to the employees who remain?",
      "How do you rebuild trust after a large layoff?",
    ],
    evaluationRubric: "Strong: covers legal compliance, transparent communication to both affected and retained employees, dignity in execution, and addresses survivor syndrome. Weak: focuses only on process without addressing the human and cultural dimensions.",
    interviewStage: "Second round",
    expectedTime: "12–18 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PRODUCT MANAGEMENT — (Preview questions for Phase 2)
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "pm-ps-001",
    role: "product-management",
    category: "Product Sense",
    subcategory: "Product improvement",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "How would you improve Google Maps?",
    shortAnswer: "Define the user, identify their key pain points, prioritise the most impactful improvement, and articulate the product change clearly.",
    detailedAnswer: "Start by clarifying the goal: improve for which user and which metric? Google Maps serves multiple segments — commuters, tourists, drivers, delivery partners. Pick one: e.g., commuters. Their core need is reliable, accurate, fast navigation. Pain points: (1) Last-mile accuracy (poor navigation in dense urban areas, wrong building entrances). (2) Real-time disruption alerts (road works, sudden closures lag behind reality). (3) Cognitive load when driving (too many reroutes, confusing lane instructions). Prioritise by impact × feasibility. Proposed improvement: an AI-powered 'entry point navigator' that uses street-view imagery and user-contributed photos to guide users to the exact entrance of a building — especially relevant for hospitals, malls, and office parks. Success metric: reduction in 'arrived but lost' reports and improvement in destination satisfaction rating. Be explicit about trade-offs: this requires significant imagery labelling investment and is geographically uneven.",
    skills: ["product sense", "user empathy", "prioritisation", "product communication"],
    tags: ["product", "PM", "product improvement", "Google Maps"],
    followUps: [
      "How would you prioritise between this improvement and real-time traffic accuracy?",
      "What data would you look at to validate that last-mile navigation is actually a problem?",
    ],
    evaluationRubric: "Strong: picks a specific user, identifies a genuine pain point with evidence, proposes a concrete product change, defines success metrics, and acknowledges trade-offs.",
    interviewStage: "First round",
    expectedTime: "10–15 min",
    source: "MimirNest curated",
  },
  {
    id: "pm-metrics-001",
    role: "product-management",
    category: "Metrics",
    subcategory: "Metric diagnosis",
    difficulty: "Medium",
    industry: "Technology & Software",
    company: null,
    question: "Daily active users on your app dropped 15% last Tuesday. How do you investigate?",
    shortAnswer: "Rule out data issues, then segment the drop by platform, geography, user cohort, and feature area to isolate the cause.",
    detailedAnswer: "A DAU drop investigation: (1) Verify the data — is it a tracking issue, logging bug, or real? Check multiple data sources. (2) Characterise the drop — did it happen on all platforms (iOS, Android, web) or just one? All geographies or one market? All user segments or a specific cohort? All features or just one flow? (3) External causes — was there an app store outage, a competitor launch, media coverage, or a major external event (public holiday, news event)? (4) Internal causes — was there a code deployment, feature change, notification/marketing change, or pricing change on or before Tuesday? (5) Form hypotheses and test — rank by likelihood and check each against data. Common culprits: a bad app update causing crashes for a specific device type; a push notification that was turned off; a competitor product launch; a holiday in a key market. Communicate findings with: what happened, what caused it (or what you ruled out), what action you're taking, and what the expected recovery timeline is.",
    skills: ["metric analysis", "root cause analysis", "data-driven thinking", "product judgment"],
    tags: ["metrics", "DAU", "product", "investigation", "root cause"],
    followUps: [
      "How would you communicate this to your VP while you're still investigating?",
      "What if you can't find a single clear cause?",
    ],
    evaluationRubric: "Strong: systematic segmentation before jumping to conclusions, checks for data validity first, uses parallel hypothesis testing, communicates findings clearly.",
    interviewStage: "First round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // INVESTMENT BANKING — Preview
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "ib-val-001",
    role: "investment-banking",
    category: "Valuation",
    subcategory: "DCF basics",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "Walk me through a DCF analysis.",
    shortAnswer: "Project free cash flows, determine the discount rate (WACC), calculate terminal value, and discount everything back to the present.",
    detailedAnswer: "A DCF values a business based on the present value of its future cash flows: (1) Project unlevered free cash flows (EBIT × (1-tax) + D&A – capex – Δworking capital) for 5–10 years. (2) Calculate the discount rate — typically WACC = (E/V) × Ke + (D/V) × Kd × (1-t), where Ke comes from CAPM: Ke = Rf + β × ERP. (3) Calculate terminal value — either Gordon Growth Model (FCF_n × (1+g) / (WACC-g)) or Exit Multiple (EBITDA × terminal multiple). (4) Discount all projected FCFs and the terminal value back to today. (5) Sum to get Enterprise Value; subtract net debt to get Equity Value; divide by shares to get per-share value. Key sensitivities: terminal value often represents 60–80% of total value — small changes in WACC or growth rate have a large impact. Always present a sensitivity table.",
    skills: ["DCF", "valuation", "financial modelling", "WACC", "terminal value"],
    tags: ["valuation", "DCF", "IB", "finance", "technical"],
    followUps: [
      "What are the main weaknesses of a DCF?",
      "How do you determine the terminal growth rate?",
      "What's the difference between FCFF and FCFE?",
    ],
    evaluationRubric: "Strong: walks through all five steps clearly, explains WACC components correctly, flags the terminal value sensitivity, and mentions equity vs enterprise value bridge.",
    interviewStage: "Screening",
    expectedTime: "5–8 min",
    source: "MimirNest curated",
  },
  {
    id: "ib-acct-001",
    role: "investment-banking",
    category: "Accounting",
    subcategory: "Financial statements linkage",
    difficulty: "Easy",
    industry: "General / Cross-industry",
    company: null,
    question: "Walk me through the three financial statements and how they are linked.",
    shortAnswer: "Income statement flows into retained earnings on the balance sheet; cash flow statement reconciles net income to cash, which also flows to the balance sheet.",
    detailedAnswer: "The three statements are: (1) Income Statement — revenues minus expenses equals net income. (2) Balance Sheet — assets = liabilities + equity, at a point in time. (3) Cash Flow Statement — operating, investing, and financing activities, reconciling the change in cash. Linkages: Net income flows from the income statement to retained earnings (equity) on the balance sheet. Net income is also the starting point for the cash flow statement. Depreciation and amortisation on the income statement (non-cash charge) are added back in operating cash flows. Capital expenditures appear in investing activities on the CFS and increase PP&E on the balance sheet. Ending cash on the CFS equals cash on the balance sheet. Change in working capital items (accounts receivable, payables) links operating activities to current assets/liabilities on the balance sheet.",
    skills: ["accounting", "financial statements", "linkages", "financial literacy"],
    tags: ["accounting", "IB", "financial statements", "balance sheet", "technical"],
    followUps: [
      "If depreciation increases by $100, walk me through the impact on all three statements.",
      "What does it mean if a company has high net income but negative operating cash flow?",
    ],
    evaluationRubric: "Strong: explains all three and their linkages clearly and concisely without prompting. Gets the direction of linkages right and can articulate why they matter.",
    interviewStage: "Screening",
    expectedTime: "4–6 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MARKETING — Preview
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "mkt-growth-001",
    role: "marketing",
    category: "Growth",
    subcategory: "Go-to-market",
    difficulty: "Medium",
    industry: "FMCG / Consumer Goods",
    company: null,
    question: "You are launching a new beverage brand targeting health-conscious millennials. Design a go-to-market strategy.",
    shortAnswer: "Define the target segment precisely, craft a differentiated positioning, choose appropriate channels, and set measurable launch goals.",
    detailedAnswer: "A GTM for a health beverage targeting millennials: (1) Target definition — not all millennials; focus on the health-conscious subset (25–35, urban, income >₹8L, fitness-oriented). Size: ~30–40M in Tier 1/2 India. (2) Positioning — identify the insight (millennials are sceptical of sugar-laden 'health' drinks; they want clean-label, functional benefits). Position as 'honest nutrition' — no added sugars, visible ingredients, third-party certified. (3) Product — 2–3 hero SKUs at launch, not 10. Price at premium but accessible (₹60–80 per unit). (4) Channel — go D2C first (website, own app) to build brand story and gather data. Add modern trade (gyms, health stores, premium supermarkets) in Month 3. Avoid mass distribution until brand is established. (5) Marketing — influencer partnerships with genuine fitness creators (not celebrities), content about ingredients and sourcing, sampling at gyms and events. (6) Metrics — repeat purchase rate, NPS, CAC by channel. Target: ₹5 crore GMV in 6 months with >40% repeat rate.",
    skills: ["go-to-market", "positioning", "channel strategy", "consumer marketing", "brand building"],
    tags: ["marketing", "GTM", "FMCG", "brand launch", "millennial"],
    followUps: [
      "How would you handle a large FMCG incumbents launching a similar product in month 4?",
      "What would cause you to change your channel strategy at month 6?",
    ],
    evaluationRubric: "Strong: precise segment definition (not 'millennials' broadly), differentiated positioning, sequenced channel strategy, and specific launch metrics.",
    interviewStage: "First round",
    expectedTime: "10–15 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FINANCE — Preview
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "fin-cf-001",
    role: "finance",
    category: "Corporate Finance",
    subcategory: "Capital allocation",
    difficulty: "Medium",
    industry: "General / Cross-industry",
    company: null,
    question: "A company has ₹500 crore in excess cash. The CFO asks you to recommend how to deploy it. What framework would you use?",
    shortAnswer: "Evaluate reinvestment, acquisition, debt repayment, dividends, and buybacks based on the company's cost of capital, growth opportunities, and capital structure.",
    detailedAnswer: "The capital allocation hierarchy: (1) Reinvest in the business — if there are positive-NPV growth projects (new capacity, R&D, market expansion) where ROIC > WACC, reinvest first. This creates the most value. (2) Acquisitions — if organic opportunities are limited or too slow, assess M&A targets that are strategic and accretive. (3) Debt repayment — if the company is over-leveraged (high interest burden, credit risk), deleveraging may be the best risk-adjusted use. (4) Return to shareholders — if the above don't offer sufficient return: dividends signal financial health but are sticky; buybacks are more flexible and tax-efficient (in many jurisdictions), and make sense when the stock is undervalued relative to intrinsic value. Recommendation must also consider: tax implications, shareholder composition (institutional vs retail), and management's track record on capital allocation. The worst outcome: accumulating excess cash indefinitely, which drags ROIC and attracts activist investors.",
    skills: ["capital allocation", "corporate finance", "ROIC", "shareholder returns"],
    tags: ["finance", "capital allocation", "CFO", "buybacks", "dividends", "M&A"],
    followUps: [
      "How do you decide between a dividend and a buyback?",
      "What signals suggest the company is holding too much cash?",
    ],
    evaluationRubric: "Strong: follows the value-maximising hierarchy (internal reinvestment first), uses ROIC vs WACC logic, considers capital structure, and doesn't treat buybacks as a default.",
    interviewStage: "First round",
    expectedTime: "8–12 min",
    source: "MimirNest curated",
  },

  // ════════════════════════════════════════════════════════════════════════════
  // STRATEGY — Preview
  // ════════════════════════════════════════════════════════════════════════════
  {
    id: "strat-comp-001",
    role: "strategy",
    category: "Competitive Strategy",
    subcategory: "Disruption response",
    difficulty: "Hard",
    industry: "Media & Entertainment",
    company: null,
    question: "A traditional media company (cable TV + print) is being disrupted by streaming and digital news. What is a credible 5-year strategy?",
    shortAnswer: "Acknowledge the terminal nature of the legacy business, invest in digital migration, and seek a structural partnership or transformation that leverages existing content assets.",
    detailedAnswer: "This is an innovator's dilemma case. The strategic options: (1) Defend and optimise — squeeze the remaining cash from cable and print while digitally extending. Risk: too slow; legacy declines faster than digital grows. (2) Migrate and cannibalise — actively shift audiences to a company-owned streaming/digital news product. Requires upfront investment but creates an asset at the end. Challenges: bundling vs à la carte, subscriber economics, editorial independence on digital. (3) Partner or sell — sell content assets to a streaming giant (Netflix, Disney+) or merge with a digital-native media company. This crystalises value but may eliminate independence. (4) Focus on strengths — some traditional media has defensible moats: local journalism, live sports, investigative content. Double down on what streaming cannot easily replicate. A credible 5-year strategy: (a) Launch a direct-to-consumer digital product in Year 1; (b) sunset print/linear in declining markets by Year 3; (c) protect and monetise the highest-value content (live events, premium journalism) by Year 5; (d) consider a strategic partnership with a distributor to solve the discovery problem. Key metrics: digital subscriber count, churn, ARPU, and content cost per subscriber.",
    skills: ["competitive strategy", "disruption", "media industry", "transformation", "strategic options"],
    tags: ["strategy", "media", "disruption", "streaming", "transformation"],
    followUps: [
      "How do you manage the internal culture conflict between print journalists and digital teams?",
      "What's your biggest risk in this strategy and how do you mitigate it?",
    ],
    evaluationRubric: "Strong: acknowledges the structural decline honestly rather than trying to protect legacy, proposes a credible migration path with milestones, and shows media industry awareness.",
    interviewStage: "Second round",
    expectedTime: "15–20 min",
    source: "MimirNest curated",
  },
];

// ── COMPUTED HELPERS ──────────────────────────────────────────────────────────

/** All unique categories across all roles */
export const allCategories = [...new Set(questions.map((q) => q.category))].sort();

/** Get questions filtered by dimensions */
export function filterQuestions({
  role = null,
  category = null,
  difficulty = null,
  industry = null,
  search = "",
}) {
  let result = questions;
  if (role) result = result.filter((q) => q.role === role);
  if (category) result = result.filter((q) => q.category === category);
  if (difficulty) result = result.filter((q) => q.difficulty === difficulty);
  if (industry && industry !== "General / Cross-industry")
    result = result.filter(
      (q) =>
        q.industry === industry || q.industry === "General / Cross-industry"
    );
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (qn) =>
        qn.question.toLowerCase().includes(q) ||
        qn.shortAnswer.toLowerCase().includes(q) ||
        qn.category.toLowerCase().includes(q) ||
        qn.industry.toLowerCase().includes(q) ||
        qn.skills?.some((s) => s.toLowerCase().includes(q)) ||
        qn.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }
  return result;
}

/** Get categories available for a given role */
export function getCategoriesForRole(roleId) {
  const role = roles.find((r) => r.id === roleId);
  return role ? role.categories : [];
}

/** Difficulty meta map for quick lookup */
export const difficultyMeta = Object.fromEntries(
  difficulties.map((d) => [d.id, d])
);

/** Role meta map for quick lookup */
export const roleMeta = Object.fromEntries(roles.map((r) => [r.id, r]));
