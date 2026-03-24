'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FadeInView } from 'components/animations';
import Link from 'next/link';
import { BMLoopChart, PMFChart, RetentionChart, LifecycleChart, AARRRFunnel, OKRChart, ResearchMethodsChart, JourneyStagesChart, ServiceBlueprintChart, NPSGaugeChart, HeuristicsChart, DesignSystemChart } from 'components/protocol-charts';

interface SubCategory {
  id: string;
  title: string;
  description: string;
  content: string;
  highlights?: string[];
  links?: { label: string; url: string }[];
  image?: { src: string; alt: string; credit: string; creditUrl: string };
  pdfs?: { title: string; file: string; desc: string }[];
}

interface Category {
  id: string;
  number: string;
  title: string;
  titleDe: string;
  subs: SubCategory[];
}

const categories: Category[] = [
  {
    id: 'ai-transformation',
    number: '01',
    title: 'AI & Digital Transformation',
    titleDe: 'KI & Digitale Transformation',
    subs: [
      {
        id: 'supply-chain',
        title: '01-Supply Chain',
        description: 'Supply chain data analysis & optimization.',
        content: 'End-to-end supply chain analytics — from procurement to delivery. Demand sensing, inventory optimization, supplier performance tracking, and logistics cost reduction through data-driven insights.',
        highlights: ['Demand Sensing', 'Inventory Optimization', 'Supplier Scoring', 'Logistics Analytics'],
        links: [
          { label: 'Enter Module', url: 'https://github.com/AIB612/DigitalTransformationAI' },
        ],
      },
      {
        id: 'order-analysis',
        title: '02-Order Analysis',
        description: 'E-commerce order lifecycle analysis.',
        content: 'Complete order lifecycle tracking from placement to fulfillment. Conversion funnel analysis, return rate prediction, order clustering, and revenue forecasting for e-commerce platforms.',
        highlights: ['Order Lifecycle', 'Conversion Funnel', 'Return Prediction', 'Revenue Forecasting'],
        links: [
          { label: 'Enter Module', url: 'https://github.com/AIB612/DigitalTransformationAI' },
        ],
      },
      {
        id: 'customer-analytics',
        title: '03-Customer Analytics',
        description: 'Customer Lifetime Value (CLV).',
        content: 'Deep customer analytics with CLV modeling, segmentation, churn prediction, and personalized engagement strategies. Turn customer data into retention and growth.\n\n**Key Formulas:**\nCLV = Average Order Value × Purchase Frequency × Customer Lifespan\nChurn Rate = Customers Lost / Total Customers at Start × 100%\nRetention Rate = 1 - Churn Rate\nCAC Payback Period = CAC / (ARPU × Gross Margin)\n\n**RFM Segmentation:**\n• Recency — How recently did the customer purchase?\n• Frequency — How often do they purchase?\n• Monetary — How much do they spend?\nRFM Score = Recency Score + Frequency Score + Monetary Score (each 1-5)\n\n**Customer Segments:**\n• Champions (RFM 555): High value, frequent, recent\n• At Risk (RFM 2xx): Were good customers, haven\'t bought recently\n• New Customers (RFM x1x): Just started, need nurturing',
        highlights: ['CLV Modeling', 'Customer Segmentation', 'Churn Prediction', 'Engagement Strategy'],
        links: [
          { label: 'Enter Module', url: 'https://github.com/AIB612/DigitalTransformationAI' },
        ],
      },
      {
        id: 'knowledge-mgmt',
        title: '04-Knowledge Management',
        description: 'Enterprise RAG Knowledge Base.',
        content: 'Retrieval Augmented Generation for enterprise knowledge bases. Private deployment with Swiss data residency, powered by Azure OpenAI and pgvector. Intelligent search across documents, wikis, and internal data.',
        highlights: ['Private RAG Deployment', 'Azure OpenAI', 'pgvector', 'Intelligent Search'],
        links: [
          { label: 'Enter Module', url: 'https://github.com/AIB612/DigitalTransformationAI' },
        ],
      },
    ],
  },
  {
    id: 'philosophy',
    number: '02',
    title: 'Product Philosophy',
    titleDe: 'Produktphilosophie',
    subs: [
      {
        id: 'mvp',
        title: 'MVP Methodology',
        description: 'Build → Measure → Learn cycle.',
        content: `**What is MVP?**
MVP (Minimum Viable Product) is the smallest version of a product that can validate your core hypothesis. It's not about building "less" — it's about learning "faster."

**The Build-Measure-Learn Loop:**
1. **Build** — Create the smallest feature that tests your assumption
2. **Measure** — Collect real user data (not opinions, but behavior)
3. **Learn** — Analyze results → Pivot (change direction) or Persevere (double down)

**Common Mistakes:**
• Building too much before testing (perfectionism trap)
• Measuring vanity metrics (downloads) instead of value metrics (retention)
• Ignoring negative feedback

**When to use MVP:**
✓ New product ideas with high uncertainty
✓ New features in existing products
✓ Entering new markets`,
        highlights: ['Build-Measure-Learn Loop', 'Hypothesis-Driven Development', 'Validated Learning', 'Pivot or Persevere'],
      },
      {
        id: 'pmf',
        title: 'Product-Market Fit',
        description: 'When the market pulls the product.',
        content: `**What is Product-Market Fit?**
PMF is the moment when your product satisfies a strong market demand. You'll know it when you feel it: users love it, growth is organic, and you can't keep up with demand.

**How to Measure PMF:**

**1. Sean Ellis Test (40% Rule)**
Ask users: "How would you feel if you could no longer use this product?"
• Very disappointed → 40%+ = PMF achieved
• Somewhat disappointed → Need improvement
• Not disappointed → No PMF

**2. Retention Curve**
• Flattening curve = PMF (users stick around)
• Declining to zero = No PMF (everyone leaves)

**3. Organic Growth Signals**
• Word-of-mouth referrals
• Users complaining when service is down
• Competitors copying your features

**Before PMF:** Focus on learning, not scaling
**After PMF:** Focus on growth and optimization`,
        highlights: ['Sean Ellis Test (40% Rule)', 'Retention Curve Analysis', 'Organic Growth Signals', 'Market Pull vs Push'],
      },
      {
        id: 'lifecycle',
        title: 'Product Lifecycle',
        description: 'From ideation to sunset.',
        content: `**The 6 Phases of Product Lifecycle:**

**1. Discovery (0→1)**
• Goal: Find a problem worth solving
• Activities: User research, market analysis, competitor study
• Key Question: "Is this a real problem?"

**2. Definition (1→2)**
• Goal: Design the right solution
• Activities: Prototyping, user testing, spec writing
• Key Question: "Does our solution solve the problem?"

**3. Development (2→3)**
• Goal: Build and ship MVP
• Activities: Engineering, QA, launch
• Key Question: "Can we build it?"

**4. Growth (3→4)**
• Goal: Scale user acquisition
• Activities: Marketing, optimization, expansion
• Key Question: "How do we grow faster?"

**5. Maturity (4→5)**
• Goal: Maximize profitability
• Activities: Efficiency, retention, upselling
• Key Question: "How do we defend our position?"

**6. Decline (5→6)**
• Goal: Decide future direction
• Options: Reinvent, pivot, or sunset gracefully`,
        highlights: ['Discovery → Definition → Development', 'Growth → Maturity → Decline', 'Phase-Specific Metrics', 'Strategic Decision Points'],
      },
      {
        id: 'user-research',
        title: 'User Research Methods',
        description: 'Understand before you build.',
        content: `**Why User Research?**
Building without research = guessing. Research reduces risk and increases success probability.
Research ROI = Cost of Building Wrong Product / Cost of Research × 100%

**Qualitative Methods (Understanding "Why"):**

**1. User Interviews**
• 1:1 conversations to understand motivations
• Ask "why" 5 times to find root cause (5-Whys Method)
• Listen more than you talk (80/20 rule)
• Sample size: 5-8 users per segment
Insight Saturation = ~85% of issues found with 5 users

**2. Contextual Inquiry**
• Observe users in their natural environment
• See what they actually do, not what they say they do
• Record: actions, pain points, workarounds
• Duration: 1-2 hours per session

**3. Usability Testing**
• Watch users try to complete specific tasks
• Measure: task success rate, time on task, error rate
Task Success Rate = Completed Tasks / Total Attempts × 100%
SUS Score = System Usability Scale (0-100, >68 = above average)

**4. Card Sorting**
• Users organize content into categories
• Open sort: users create categories
• Closed sort: users sort into predefined categories
• Tool: OptimalSort, Maze

**Quantitative Methods (Understanding "What"):**

**5. Surveys & Questionnaires**
• Large-scale data collection (n > 100)
• Keep it short (<5 minutes, <10 questions)
• Use Likert scales (1-5) for comparison
Confidence Level = 95% requires n ≥ 385 (for ±5% margin)

**6. A/B Testing**
• Compare two versions with real users
• Test one variable at a time
• Need statistical significance (p < 0.05)
Minimum Sample Size = 16 × σ² / δ² (per variant)

**7. Analytics & Heatmaps**
• Track actual behavior at scale
• Funnels, cohorts, retention curves
• Heatmaps: click, scroll, attention maps
Conversion Rate = Conversions / Total Visitors × 100%

**8. NPS (Net Promoter Score)**
• "How likely are you to recommend us?" (0-10)
• Promoters (9-10), Passives (7-8), Detractors (0-6)
NPS = % Promoters - % Detractors (range: -100 to +100)
NPS > 50 = Excellent, NPS > 70 = World Class

**Jobs-to-be-Done Framework:**
"People don't buy products, they hire them to do a job."
Focus on the outcome users want, not the features they request.

**Research Planning Formula:**
Research Budget = 10-15% of total product development budget
Timeline = 2-4 weeks for discovery, 1 week for usability testing`,
        highlights: ['UserInterviews', 'UsabilityTesting', 'ABTesting', 'NPS', 'JobsToBeDone', 'Heatmaps', 'CardSorting', 'SurveyDesign'],
      },
      {
        id: 'growth',
        title: 'Growth Frameworks',
        description: 'Sustainable, data-driven growth.',
        content: `**AARRR Pirate Metrics Framework:**

**A - Acquisition** (How do users find you?)
• Channels: SEO, ads, referrals, content
• Metric: CAC (Customer Acquisition Cost)
CAC = Total Marketing Spend / Number of New Customers

**A - Activation** (Do users have a great first experience?)
• Goal: Get users to "Aha moment" fast
• Metric: % completing onboarding
Activation Rate = Users Completing Onboarding / Total Signups × 100%

**R - Retention** (Do users come back?)
• Most important metric — without it, growth is a leaky bucket
• Metric: D1, D7, D30 retention rates
Retention Rate = Active Users End of Period / Active Users Start of Period × 100%

**R - Revenue** (Do users pay?)
• Metric: ARPU, LTV, conversion rate
LTV = ARPU × Average Customer Lifespan
LTV:CAC Ratio ≥ 3:1 = Healthy Business

**R - Referral** (Do users tell others?)
• Viral coefficient: K-factor
K = Invites per User × Conversion Rate per Invite
• K > 1 = viral growth (exponential)
• K < 1 = paid growth needed

**Growth Formula:**
Growth = Acquisition × Activation × Retention

**Key Insight:**
Fix retention FIRST. Acquiring users who leave is wasting money.

**North Star Metric:**
One metric that best captures the core value you deliver.
• Airbnb: Nights booked
• Slack: Messages sent
• Facebook: Daily active users`,
        highlights: ['AARRR Pirate Metrics', 'Retention First Strategy', 'North Star Metric', 'Viral Coefficient K>1'],
      },
      {
        id: 'okr',
        title: 'OKR & Goal Setting',
        description: 'Objectives and Key Results.',
        content: `**What are OKRs?**
OKR = Objective + Key Results
A goal-setting framework used by Google, Intel, and top startups.

**Structure:**

**Objective (O)** — What you want to achieve
• Qualitative and inspirational
• Ambitious but achievable
• Example: "Become the #1 choice for SME e-commerce"

**Key Results (KR)** — How you measure success
• Quantitative and measurable
• 3-5 per objective
• Example: 
  - KR1: Increase NPS from 40 to 60
  - KR2: Grow monthly active users to 10,000
  - KR3: Reduce churn rate from 5% to 2%

**OKR Best Practices:**

1. **Set ambitious goals** — 70% achievement = success
2. **Separate from performance reviews** — OKRs are for learning, not punishment
3. **Review weekly** — Track progress, adjust tactics
4. **Cascade alignment** — Company → Team → Individual
5. **Limit quantity** — 3-5 objectives max per quarter

**Common Mistakes:**
• Setting too many OKRs (focus dilution)
• Making KRs too easy (no stretch)
• Treating OKRs as a to-do list (should be outcomes, not tasks)`,
        highlights: ['Objectives = Qualitative', 'Key Results = Quantitative', '70% Achievement = Success', 'Outcomes Not Tasks'],
      },
    ],
  },
  {
    id: 'compliance',
    number: '03',
    title: 'Swiss IT Compliance',
    titleDe: 'Schweizer IT-Compliance',
    subs: [
      {
        id: 'fadp',
        title: 'FADP / nDSG',
        description: 'Federal Act on Data Protection.',
        image: { src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', alt: 'Swiss law and compliance documents', credit: 'Tingey Injury Law Firm', creditUrl: 'https://unsplash.com/@tingeyinjurylawfirm' },
        content: `**What is FADP (nDSG)?**
The new Federal Act on Data Protection (nDSG) came into force on September 1, 2023. It replaces the 1992 law and aligns Switzerland with GDPR standards.

**Key Principles:**
1. Lawfulness — Data processing must have a legal basis
2. Purpose Limitation — Collect data only for stated purposes
3. Data Minimization — Only collect what you need
4. Accuracy — Keep data up to date
5. Storage Limitation — Delete when no longer needed
6. Security — Protect with appropriate technical measures

**What's New in nDSG vs Old FADP:**
• Only natural persons are protected (not legal entities)
• Genetic and biometric data now classified as sensitive
• Privacy by Design and Privacy by Default mandatory
• Data Protection Impact Assessment (DPIA) required for high-risk processing
• Data breach notification to FDPIC within 72 hours
• Fines up to CHF 250,000 for individuals (not companies)

**Compliance Checklist:**
✓ Appoint a Data Protection Advisor (optional but recommended)
✓ Maintain a Register of Processing Activities
✓ Implement Privacy by Design & Default
✓ Conduct DPIA for high-risk processing
✓ Update privacy notices and consent forms
✓ Establish data breach notification process
✓ Review cross-border data transfer mechanisms

**Key Formula:**
Compliance Risk Score = (Data Sensitivity × Processing Scale × Cross-border Factor) / Security Measures`,
        highlights: ['nDSG', 'PrivacyByDesign', 'DPIA', 'DataBreach72h', 'CHF250kFine', 'DataMinimization'],
        links: [
          { label: '🇨🇭 FADP Full Text (Fedlex)', url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/de' },
          { label: '🇨🇭 FDPIC Guidelines', url: 'https://www.edoeb.admin.ch/edoeb/de/home.html' },
          { label: '🇨🇭 nDSG Overview', url: 'https://www.kmu.admin.ch/kmu/de/home/fakten-trends/digitalisierung/datenschutz/neues-datenschutzgesetz-ndsg.html' },
        ],
      },
      {
        id: 'finma',
        title: 'FINMA & Financial Compliance',
        description: 'Financial market regulations.',
        content: `**What is FINMA?**
FINMA (Swiss Financial Market Supervisory Authority) regulates banks, insurance companies, stock exchanges, and financial intermediaries in Switzerland.

**Key FINMA Circulars for IT:**

**1. FINMA Circular 2018/3 — Outsourcing**
• All IT outsourcing must be risk-assessed
• Cloud services = outsourcing (including SaaS)
• Must maintain control over outsourced functions
• Audit rights must be contractually guaranteed
• FINMA must be notified of significant outsourcing

**2. FINMA Circular 2023/1 — Operational Risks & Resilience**
• ICT risk management framework required
• Business continuity planning (BCP) mandatory
• Cyber risk assessment and incident response
• Third-party risk management
• Regular penetration testing and vulnerability assessments

**3. FINMA Circular 2008/21 — Operational Risks (Banks)**
• IT governance and organization
• Change management processes
• Access control and identity management
• Data integrity and availability

**Cloud Compliance Requirements:**
• Data location must be known and documented
• Encryption in transit and at rest
• Multi-tenancy risks assessed
• Exit strategy defined
Risk Assessment Score = Impact × Probability × (1 - Mitigation Effectiveness)

**SOC2 Compliance:**
• Type I: Controls at a point in time
• Type II: Controls over a period (6-12 months)
SOC2 Trust Criteria = Security + Availability + Processing Integrity + Confidentiality + Privacy`,
        highlights: ['FINMACircular', 'CloudOutsourcing', 'OperationalRisk', 'SOC2', 'CyberResilience', 'AuditRights'],
        links: [
          { label: '🇨🇭 FINMA Circulars', url: 'https://www.finma.ch/en/documentation/circulars/' },
          { label: '🇨🇭 FINMA Cloud Guidelines', url: 'https://www.finma.ch/en/news/2018/09/20180914-mm-rs-outsourcing/' },
          { label: '🇨🇭 FINMA Annual Report', url: 'https://www.finma.ch/en/documentation/finma-publications/annual-reports/' },
        ],
      },
      {
        id: 'data-residency',
        title: 'Data Residency',
        description: 'Keep data within Swiss borders.',
        content: `**Why Swiss Data Residency?**
Switzerland is not part of the EU/EEA. While the EU recognizes Switzerland as having adequate data protection, many Swiss companies (especially in finance and healthcare) require data to stay within Swiss borders.

**Swiss Cloud Regions:**

**1. Microsoft Azure — Switzerland North (Zurich)**
• General availability since 2019
• Full Azure services including Azure OpenAI
• Paired region: Switzerland West (Geneva)
• Compliance: ISO 27001, SOC 1/2/3, FINMA

**2. Microsoft Azure — Switzerland West (Geneva)**
• Disaster recovery region
• Limited services compared to North

**3. AWS — Zurich Region (eu-central-2)**
• Launched 2022
• 3 Availability Zones
• Full AWS service portfolio

**4. Google Cloud — Zurich (europe-west6)**
• Available since 2019
• Compliance: ISO 27001, SOC 2

**Cross-border Transfer Rules (nDSG):**
• Adequate countries: EU/EEA, UK, Israel, Japan, etc.
• Non-adequate countries: Need Standard Contractual Clauses (SCCs)
• US: Swiss-US Data Privacy Framework (since 2024)
Transfer Risk Score = Data Sensitivity × Destination Risk × (1 - Safeguard Level)

**Private Deployment Options:**
• On-premise PostgreSQL with pgvector for AI/RAG
• Swiss-hosted Kubernetes clusters
• Encrypted storage with Swiss-managed keys
• No data leaves Swiss jurisdiction`,
        highlights: ['SwissCloud', 'AzureCHNorth', 'AWSZurich', 'GoogleCloudZurich', 'CrossBorderTransfer', 'PrivateDeployment'],
        links: [
          { label: '🇨🇭 Azure Switzerland', url: 'https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/#geographies' },
          { label: '🇨🇭 AWS Zurich Region', url: 'https://aws.amazon.com/about-aws/global-infrastructure/regions_az/' },
          { label: '🇨🇭 Adequate Countries List', url: 'https://www.edoeb.admin.ch/edoeb/de/home/datenschutz/handel-und-wirtschaft/uebermittlung-ins-ausland.html' },
        ],
      },
      {
        id: 'iso-certifications',
        title: 'ISO & Certifications',
        description: 'International standards for Swiss IT.',
        content: `**Key ISO Standards for Swiss IT:**

**ISO 27001 — Information Security Management**
• The gold standard for IT security
• Risk-based approach to information security
• Annex A: 93 controls across 4 themes
• Certification valid for 3 years, annual surveillance audits
• Required by many Swiss financial institutions
Certification Cost = CHF 15,000 - 50,000 (depending on company size)

**ISO 27701 — Privacy Information Management**
• Extension to ISO 27001 for privacy
• Maps to GDPR and nDSG requirements
• Demonstrates privacy compliance to clients

**ISO 22301 — Business Continuity Management**
• Required by FINMA for financial institutions
• BIA (Business Impact Analysis) methodology
• RTO and RPO definitions
RTO = Recovery Time Objective (max acceptable downtime)
RPO = Recovery Point Objective (max acceptable data loss)

**ISO 9001 — Quality Management**
• Process-oriented quality management
• Customer satisfaction focus
• Continuous improvement (PDCA cycle)

**Swiss-Specific Certifications:**
• ISAE 3402 / SOC 2 — Service organization controls
• SAS 70 (replaced by SSAE 18) — Audit standard
• Swiss Digital Trust Label — New Swiss quality mark for digital services

**Certification Roadmap:**
1. Gap Analysis (2-4 weeks)
2. Implementation (3-6 months)
3. Internal Audit (2-4 weeks)
4. Certification Audit (1-2 weeks)
Total Timeline = 6-12 months for first certification`,
        highlights: ['ISO27001', 'ISO27701', 'ISO22301', 'SOC2', 'SwissDigitalTrust', 'BusinessContinuity'],
        links: [
          { label: '🇨🇭 SQS Certification', url: 'https://www.sqs.ch/de' },
          { label: '🇨🇭 Swiss Digital Trust', url: 'https://www.swiss-digital-initiative.org/' },
          { label: '🇨🇭 ISAE 3402 Guide', url: 'https://www.isae3402.com/' },
        ],
      },
    ],
  },
  {
    id: 'consulting',
    number: '04',
    title: 'Consulting Templates',
    titleDe: 'Beratungsvorlagen',
    subs: [
      {
        id: 'discovery',
        title: 'Discovery Workshop',
        description: 'Structured project kickoff.',
        image: { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', alt: 'Team workshop with whiteboard', credit: 'Jason Goodman', creditUrl: 'https://unsplash.com/@jasongoodman_youxventures' },
        content: `**Discovery Workshop Framework**
A structured approach to understand the client's business, challenges, and opportunities before starting any project.

**1. Product Understanding**
• Product content and core features
• Business model (B2B, B2C, SaaS, Marketplace)
• Product positioning and value proposition
• Product roadmap and future plans
• Competitive landscape analysis
Key Question: What makes this product unique in the market?

**2. Customer Experience Management**
• Current data collection methods (surveys, analytics, feedback)
• Research methodologies in use
• Analysis and reporting processes
• Optimization and iteration cycles
• Closed-loop feedback implementation
CX Maturity Score = (Collection + Analysis + Action + Iteration) / 4

**3. Pain Points & Solutions**
• Existing customer feedback and complaints
• Known pain points and friction areas
• Current solutions and workarounds
• Unresolved issues and technical debt
• Priority matrix for improvements
Impact vs Effort Matrix = High Impact + Low Effort = Quick Wins

**4. Stakeholder Expectations**
• Business partner expectations for the project
• Success criteria and KPIs
• Potential execution risks
• Timeline and milestone expectations
• Communication and reporting preferences
Risk Score = Probability × Impact × (1 - Mitigation)

**5. Resource Assessment**
• Available team and skills
• Budget constraints
• Technical infrastructure
• Third-party dependencies
• Business feasibility analysis
Feasibility Score = Resources × Skills × Time × Budget

**6. Technical Feasibility**
• Current tech stack and limitations
• Integration requirements
• Scalability considerations
• Security and compliance needs
• Build vs Buy decisions
Technical Debt Ratio = Remediation Cost / Development Cost`,
        highlights: ['ProductDiscovery', 'CXManagement', 'PainPointAnalysis', 'StakeholderMapping', 'FeasibilityAssessment', 'TechnicalReview'],
      },
      {
        id: 'architecture',
        title: 'Architecture Review',
        description: 'Technical assessment template.',
        image: { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80', alt: 'Server room infrastructure', credit: 'Taylor Vick', creditUrl: 'https://unsplash.com/@tvick' },
        content: `**Architecture Review Framework**
Comprehensive technical assessment covering security, scalability, maintainability, and cost optimization.

**1. Current State Assessment**
• System architecture diagram
• Technology stack inventory
• Data flow mapping
• Integration points
• Performance baselines
Documentation Score = Diagrams + Specs + Runbooks + APIs

**2. Security Audit**
• Authentication & authorization
• Data encryption (at rest, in transit)
• Vulnerability assessment
• Compliance requirements (nDSG, FINMA)
• Incident response readiness
Security Score = Controls × Coverage × Testing × Monitoring

**3. Scalability Analysis**
• Current load and capacity
• Bottleneck identification
• Horizontal vs vertical scaling options
• Database scaling strategy
• CDN and caching layers
Scalability Factor = Max Load / Current Load

**4. Maintainability Review**
• Code quality metrics
• Test coverage
• CI/CD pipeline maturity
• Documentation completeness
• On-call and support processes
Maintainability Index = Cyclomatic Complexity × Lines of Code × Comments

**5. Cost Optimization**
• Current infrastructure costs
• Resource utilization rates
• Reserved vs on-demand analysis
• Right-sizing opportunities
• FinOps recommendations
Cost Efficiency = Value Delivered / Total Cost × 100%

**6. Recommendations**
• Quick wins (< 1 month)
• Medium-term improvements (1-3 months)
• Strategic initiatives (3-12 months)
• Risk mitigation priorities
• Investment roadmap`,
        highlights: ['SecurityAudit', 'ScalabilityCheck', 'CostAnalysis', 'TechDebtReview', 'PerformanceBaseline', 'ComplianceCheck'],
      },
      {
        id: 'gtm',
        title: 'Go-to-Market Plan',
        description: 'Launch strategy template.',
        image: { src: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80', alt: 'Marketing strategy planning', credit: 'Campaign Creators', creditUrl: 'https://unsplash.com/@campaign_creators' },
        content: `**Go-to-Market Strategy Framework**
From positioning to launch — a complete GTM planning template.

**1. Market Analysis**
• Total Addressable Market (TAM)
• Serviceable Addressable Market (SAM)
• Serviceable Obtainable Market (SOM)
• Market trends and growth rate
• Regulatory environment
TAM → SAM → SOM Funnel = Market Reality Check

**2. Competitive Landscape**
• Direct competitors
• Indirect competitors
• Substitute products
• Competitive advantages
• Differentiation strategy
Competitive Position = Features × Price × Brand × Distribution

**3. Customer Segmentation**
• Ideal Customer Profile (ICP)
• Buyer personas
• Decision-making process
• Purchase triggers
• Customer journey mapping
ICP Score = Fit × Intent × Budget × Authority

**4. Pricing Strategy**
• Cost-plus pricing
• Value-based pricing
• Competitive pricing
• Freemium / trial options
• Pricing tiers and packaging
Price Elasticity = % Change in Demand / % Change in Price

**5. Channel Strategy**
• Direct sales
• Partner / reseller channels
• Digital marketing channels
• Content marketing
• Community building
CAC by Channel = Channel Spend / Customers Acquired

**6. Launch Timeline**
• Pre-launch (awareness building)
• Soft launch (beta users)
• Public launch (PR, marketing)
• Post-launch (optimization)
• Scale phase (growth)
Launch Readiness Score = Product × Marketing × Sales × Support`,
        highlights: ['MarketAnalysis', 'PricingStrategy', 'ChannelPlanning', 'LaunchTimeline', 'CompetitiveAnalysis', 'CustomerSegmentation'],
      },
      {
        id: 'cx-audit',
        title: 'CX Audit Template',
        description: 'Customer experience assessment.',
        image: { src: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&q=80', alt: 'Customer feedback and satisfaction', credit: 'Blake Wisz', creditUrl: 'https://unsplash.com/@blakewisz' },
        content: `**Customer Experience Audit Framework**
Comprehensive assessment of customer touchpoints and experience quality.

**1. Touchpoint Mapping**
• Pre-purchase touchpoints
• Purchase experience
• Post-purchase support
• Retention touchpoints
• Advocacy and referral
Touchpoint Score = Satisfaction × Importance × Frequency

**2. Voice of Customer (VoC)**
• Survey data analysis
• Review and rating trends
• Social media sentiment
• Support ticket themes
• NPS and CSAT trends
VoC Index = NPS + CSAT + CES / 3

**3. Journey Pain Points**
• Friction identification
• Drop-off analysis
• Complaint categorization
• Root cause analysis
• Impact prioritization
Pain Point Priority = Frequency × Severity × Solvability

**4. Experience Metrics**
• Net Promoter Score (NPS)
• Customer Satisfaction (CSAT)
• Customer Effort Score (CES)
• First Contact Resolution (FCR)
• Average Handle Time (AHT)
NPS = % Promoters - % Detractors
CSAT = Satisfied Responses / Total Responses × 100%
CES = Sum of Effort Scores / Total Responses

**5. Competitive Benchmarking**
• Industry NPS benchmarks
• Feature comparison
• Service level comparison
• Price-value perception
• Brand perception
Benchmark Gap = Your Score - Industry Average

**6. Improvement Roadmap**
• Quick wins (high impact, low effort)
• Strategic initiatives
• Resource requirements
• Expected ROI
• Success metrics
CX ROI = (Revenue Increase + Cost Savings) / CX Investment × 100%`,
        highlights: ['TouchpointMapping', 'VoiceOfCustomer', 'NPS', 'CSAT', 'CES', 'JourneyAnalysis'],
      },
    ],
  },
  {
    id: 'templates',
    number: '05',
    title: 'Life & Work Templates',
    titleDe: 'Leben & Arbeit Vorlagen',
    subs: [
      {
        id: 'productivity',
        title: 'Productivity System',
        description: 'Personal workflow optimization.',
        content: 'Notion-based productivity system with weekly reviews, goal tracking, and habit management. Designed for developers and consultants.',
        highlights: ['Weekly Review', 'Goal Tracking', 'Habit System', 'Time Blocking'],
      },
      {
        id: 'knowledge',
        title: 'Knowledge Base',
        description: 'Second brain setup.',
        content: 'Structured knowledge management with tagging, linking, and progressive summarization. Never lose an insight again.',
        highlights: ['Zettelkasten', 'Progressive Summary', 'Tag System', 'Quick Capture'],
      },
    ],
  },
  {
    id: 'ux',
    number: '06',
    title: 'UX & Service Design',
    titleDe: 'UX & Service Design',
    subs: [
      {
        id: 'journey',
        title: 'User Journey Map',
        description: 'End-to-end experience mapping.',
        content: `**What is a User Journey Map?**
A visual representation of the entire user experience from first contact to long-term loyalty. It captures emotions, actions, and pain points at every stage.

**Journey Stages:**

**1. Awareness (潜在用户)**
• How users discover your product
• Marketing touchpoints
• First impressions
• Brand perception
Awareness Score = Reach × Relevance × Recall

**2. Consideration (新用户)**
• Research and comparison
• Trial and evaluation
• Decision factors
• Barriers to entry
Conversion Rate = Signups / Visitors × 100%

**3. Purchase/Activation (活跃用户)**
• Onboarding experience
• First value moment (Aha!)
• Setup and configuration
• Initial engagement
Time to Value = First Login → First Success Action

**4. Retention (留存用户)**
• Ongoing usage patterns
• Feature adoption
• Support interactions
• Habit formation
Retention Rate = Active Users Day N / New Users Day 0 × 100%

**5. Advocacy (忠实用户)**
• Referral behavior
• Reviews and ratings
• Community participation
• Brand ambassadors
NPS = % Promoters - % Detractors

**Journey Map Components:**
• User Actions — What the user does
• Touchpoints — Where interaction happens
• Emotions — How the user feels (😊 → 😐 → 😤)
• Pain Points — Friction and frustration
• Opportunities — Areas for improvement

**Key Metrics per Stage:**
Stage Conversion = Users Entering Next Stage / Users in Current Stage × 100%
Drop-off Rate = 1 - Stage Conversion`,
        highlights: ['TouchpointMapping', 'EmotionCurve', 'PainPoints', 'AhaMoment', 'UserStages', 'ConversionFunnel'],
      },
      {
        id: 'blueprint',
        title: 'Service Blueprint',
        description: 'Front-stage and back-stage design.',
        content: `**What is a Service Blueprint?**
A detailed diagram showing the complete service delivery process, including what customers see (front-stage) and what happens behind the scenes (back-stage).

**Blueprint Layers:**

**1. Customer Actions (用户行为)**
• Steps the customer takes
• Decisions and choices
• Entry and exit points
• Parallel paths

**2. Front-stage (前台交互)**
• Visible employee actions
• Digital interfaces
• Physical touchpoints
• Communication channels
Front-stage Quality = Responsiveness × Accuracy × Friendliness

**3. Back-stage (后台流程)**
• Internal processes
• Employee activities
• System operations
• Data processing
Back-stage Efficiency = Output / Input × Time

**4. Support Processes (支持系统)**
• Technology infrastructure
• Third-party services
• Internal tools
• Knowledge bases

**5. Physical Evidence (物理证据)**
• Tangible elements
• Environment design
• Documentation
• Receipts and confirmations

**Key Blueprint Elements:**
• Line of Interaction — Customer ↔ Front-stage
• Line of Visibility — What customer sees vs doesn't see
• Line of Internal Interaction — Front-stage ↔ Back-stage
• Fail Points — Where things can go wrong
• Wait Points — Where delays occur

**Service Quality Formula:**
Service Quality = Perception - Expectation
SERVQUAL = Tangibles + Reliability + Responsiveness + Assurance + Empathy

**Example: Didi Service Blueprint**
• Customer: Request ride → Wait → Ride → Pay → Rate
• Front-stage: App interface, Driver interaction
• Back-stage: Matching algorithm, Payment processing
• Support: GPS, Maps, Payment gateway`,
        highlights: ['FrontStage', 'BackStage', 'LineOfVisibility', 'FailPoints', 'SERVQUAL', 'ServiceQuality'],
      },
      {
        id: 'nps',
        title: 'NPS & Satisfaction',
        description: 'Customer satisfaction measurement.',
        content: `**Net Promoter Score (NPS)**
"How likely are you to recommend us to a friend?" (0-10)

**Score Categories:**
• Promoters (9-10): Loyal enthusiasts, will refer others
• Passives (7-8): Satisfied but not enthusiastic
• Detractors (0-6): Unhappy, can damage brand

**NPS Calculation:**
NPS = % Promoters - % Detractors
Range: -100 to +100

**NPS Benchmarks:**
• NPS > 0 = Good
• NPS > 30 = Great
• NPS > 50 = Excellent
• NPS > 70 = World Class

**Customer Satisfaction (CSAT)**
"How satisfied are you with [specific interaction]?" (1-5)
CSAT = (Satisfied Responses / Total Responses) × 100%

**Customer Effort Score (CES)**
"How easy was it to [complete task]?" (1-7)
CES = Sum of Scores / Number of Responses
Lower effort = Higher loyalty

**When to Use Each:**
• NPS — Overall relationship, brand loyalty
• CSAT — Specific transaction, interaction quality
• CES — Process efficiency, friction reduction

**Survey Best Practices:**
• Keep it short (< 3 minutes)
• Ask at the right moment (post-interaction)
• Follow up on detractors within 24h
• Close the loop with respondents
Response Rate = Responses / Surveys Sent × 100%

**NPS Action Framework:**
1. Collect — Gather scores and feedback
2. Analyze — Identify patterns and root causes
3. Act — Implement improvements
4. Follow-up — Close the loop with customers
5. Measure — Track impact of changes`,
        highlights: ['NPS', 'CSAT', 'CES', 'Promoters', 'Detractors', 'SurveyDesign'],
      },
      {
        id: 'design-system',
        title: 'Design System',
        description: 'Scalable design foundations.',
        content: `**What is a Design System?**
A collection of reusable components, guidelines, and standards that ensure consistency across products and teams.

**Design System Layers:**

**1. Design Tokens (设计令牌)**
• Colors (primary, secondary, semantic)
• Typography (font families, sizes, weights)
• Spacing (4px, 8px, 16px, 24px, 32px grid)
• Shadows, borders, radii
Token Adoption = Components Using Tokens / Total Components × 100%

**2. Components (组件库)**
• Atoms: Buttons, inputs, icons
• Molecules: Form fields, cards, list items
• Organisms: Headers, forms, data tables
• Templates: Page layouts
Component Coverage = Unique Components / Total UI Patterns × 100%

**3. Patterns (交互模式)**
• Navigation patterns
• Form patterns
• Error handling
• Loading states
• Empty states

**4. Guidelines (设计规范)**
• Voice and tone
• Accessibility standards (WCAG 2.1)
• Responsive breakpoints
• Animation principles

**Design System Metrics:**
• Adoption Rate = Teams Using System / Total Teams
• Component Reuse = Instances / Unique Components
• Design Debt = Custom Components / Total Components
• Time Savings = Old Design Time - New Design Time

**Tools:**
• Design: Figma, Sketch
• Documentation: Storybook, Zeroheight
• Code: React, Vue, Web Components
• Tokens: Style Dictionary, Theo

**Implementation Roadmap:**
1. Audit existing UI (2-4 weeks)
2. Define tokens and foundations (2-3 weeks)
3. Build core components (4-8 weeks)
4. Document and publish (2-3 weeks)
5. Migrate and adopt (ongoing)
ROI = (Time Saved × Hourly Rate) - Implementation Cost`,
        highlights: ['DesignTokens', 'ComponentLibrary', 'Figma', 'Storybook', 'WCAG', 'Accessibility'],
      },
      {
        id: 'case-studies',
        title: 'Case Studies',
        description: 'Real-world UX document references.',
        pdfs: [
          { title: 'Didi Service Blueprint', file: '/pdfs/didi-service-blueprint.pdf', desc: 'Complete ride-hailing service flow: customer actions, front-stage interactions, back-stage processes, and support systems for Didi Chuxing.' },
          { title: 'SAIC-GM Service Blueprint', file: '/pdfs/saic-gm-service-blueprint.pdf', desc: 'Automotive after-sales service design: dealership touchpoints, maintenance workflow, customer communication, and quality assurance loops.' },
          { title: 'OPPO Mobile — Customer Journey', file: '/pdfs/customer-journey.pdf', desc: 'OPPO Mobile — End-to-end customer journey mapping: NPS research across user stages (potential, new, active, paying), touchpoint analysis, emotion curves, and experience optimization for the OPPO Internet reading app ecosystem.' },
        ],
        content: '',
        highlights: ['ServiceBlueprint', 'DesignSystem', 'RealWorldCases'],
      },
    ],
  },
  {
    id: 'it-business',
    number: '06',
    title: 'IT & Business Alignment',
    titleDe: 'IT & Business Alignment',
    subs: [
      {
        id: 'data-analytics',
        title: 'Data Analytics',
        description: 'From data to business insights.',
        image: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', alt: 'Data analytics dashboard', credit: 'Luke Chesser', creditUrl: 'https://unsplash.com/@lukechesser' },
        content: `**Data Analytics Fundamentals**

Data analytics transforms raw data into actionable business insights. The key is connecting technical analysis to business outcomes.

**Analytics Maturity Levels:**
1. **Descriptive** — What happened? (Reports, dashboards)
2. **Diagnostic** — Why did it happen? (Root cause analysis)
3. **Predictive** — What will happen? (Forecasting, ML models)
4. **Prescriptive** — What should we do? (Optimization, recommendations)

**Key Metrics by Function:**
• **Marketing:** CAC, ROAS, Attribution, Funnel Conversion
• **Sales:** Pipeline Velocity, Win Rate, Deal Size, Quota Attainment
• **Product:** DAU/MAU, Retention, Feature Adoption, NPS
• **Finance:** Revenue, Margin, Cash Flow, Unit Economics

**Tools & Stack:**
• Visualization: Tableau, Power BI, Looker
• Processing: SQL, Python, dbt
• Storage: Snowflake, BigQuery, Redshift`,
        highlights: ['Descriptive to Prescriptive', 'Business KPIs', 'Data Stack', 'Insight Generation'],
      },
      {
        id: 'business-intelligence',
        title: 'Business Intelligence',
        description: 'BI strategy and implementation.',
        image: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Business intelligence charts', credit: 'Carlos Muza', creditUrl: 'https://unsplash.com/@kmuza' },
        content: `**Business Intelligence Strategy**

BI bridges the gap between data infrastructure and business decision-making.

**BI Architecture Layers:**
1. **Data Sources** — ERP, CRM, Web Analytics, APIs
2. **ETL/ELT** — Extract, Transform, Load pipelines
3. **Data Warehouse** — Single source of truth
4. **Semantic Layer** — Business definitions, metrics
5. **Visualization** — Dashboards, reports, alerts

**Self-Service BI Principles:**
• Governed data models (single source of truth)
• Role-based access control
• Training & documentation
• Feedback loops for improvement

**Common Pitfalls:**
• Too many dashboards, no action
• Vanity metrics vs actionable metrics
• Data silos across departments
• Lack of data literacy training`,
        highlights: ['BI Architecture', 'Self-Service Analytics', 'Data Governance', 'Decision Support'],
      },
      {
        id: 'it-strategy',
        title: 'IT Strategy & Governance',
        description: 'Aligning IT with business goals.',
        image: { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'IT strategy planning', credit: 'Adeolu Eletu', creditUrl: 'https://unsplash.com/@adeolueletu' },
        content: `**IT-Business Alignment Framework**

Successful digital transformation requires tight alignment between IT capabilities and business strategy.

**Strategic Alignment Model (SAM):**
• Business Strategy ↔ IT Strategy
• Business Operations ↔ IT Infrastructure
• Cross-domain alignment is key

**IT Governance Frameworks:**
• **COBIT** — Control Objectives for IT
• **ITIL** — IT Service Management
• **TOGAF** — Enterprise Architecture

**Key Alignment Questions:**
1. Does IT investment support business priorities?
2. Are IT projects measured by business outcomes?
3. Is there a shared roadmap between IT and business?
4. How fast can IT respond to business changes?

**Metrics for Alignment:**
• IT spend as % of revenue
• Project delivery on time/budget
• Business satisfaction with IT
• Time-to-market for new capabilities`,
        highlights: ['Strategic Alignment', 'IT Governance', 'COBIT/ITIL/TOGAF', 'Business Value'],
      },
      {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        description: 'Enterprise transformation roadmap.',
        image: { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', alt: 'Digital transformation team', credit: 'Marvin Meyer', creditUrl: 'https://unsplash.com/@marvelous' },
        content: `**Digital Transformation Framework**

Digital transformation is not just technology — it's a fundamental change in how organizations create value.

**Transformation Pillars:**
1. **Customer Experience** — Digital touchpoints, personalization
2. **Operational Excellence** — Automation, efficiency
3. **Business Model Innovation** — New revenue streams
4. **Data & Analytics** — Data-driven decisions

**Maturity Assessment:**
• Level 1: Ad-hoc digital initiatives
• Level 2: Departmental digitization
• Level 3: Enterprise-wide integration
• Level 4: Digital-native operations
• Level 5: Continuous innovation

**Change Management:**
• Executive sponsorship is critical
• Start with quick wins, scale successes
• Invest in digital skills training
• Measure and communicate progress

**Common Failure Modes:**
• Technology-first, strategy-second
• Underestimating cultural change
• Lack of sustained investment`,
        highlights: ['Transformation Pillars', 'Maturity Model', 'Change Management', 'Value Realization'],
      },
      {
        id: 'enterprise-architecture',
        title: 'Enterprise Architecture',
        description: 'EA frameworks and practices.',
        image: { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', alt: 'Enterprise architecture blueprint', credit: 'Campaign Creators', creditUrl: 'https://unsplash.com/@campaign_creators' },
        content: `**Enterprise Architecture Overview**

EA provides a holistic view of an organization's processes, information, applications, and technology.

**TOGAF Architecture Domains:**
1. **Business Architecture** — Strategy, governance, processes
2. **Data Architecture** — Data models, data flow, governance
3. **Application Architecture** — Application portfolio, integration
4. **Technology Architecture** — Infrastructure, platforms, security

**Architecture Principles:**
• Reuse over rebuild
• Loose coupling, high cohesion
• API-first design
• Cloud-native where appropriate
• Security by design

**EA Deliverables:**
• Current state assessment
• Target state vision
• Gap analysis
• Transition roadmap
• Architecture decision records (ADRs)

**Tools:** ArchiMate, Sparx EA, LeanIX, Ardoq`,
        highlights: ['TOGAF Domains', 'Architecture Principles', 'Roadmap Planning', 'EA Tools'],
      },
      {
        id: 'agile-at-scale',
        title: 'Agile at Scale',
        description: 'Scaling agile across the enterprise.',
        image: { src: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&q=80', alt: 'Agile team collaboration', credit: 'Domenico Loia', creditUrl: 'https://unsplash.com/@domenicoloia' },
        content: `**Scaling Agile Frameworks**

Moving from team-level agile to enterprise-wide agility.

**Popular Frameworks:**
• **SAFe** — Scaled Agile Framework (most adopted)
• **LeSS** — Large-Scale Scrum
• **Spotify Model** — Squads, Tribes, Chapters, Guilds
• **Disciplined Agile** — Hybrid approach

**SAFe Levels:**
1. Team Level — Scrum/Kanban teams
2. Program Level — Agile Release Train (ART)
3. Large Solution — Multiple ARTs
4. Portfolio — Strategy & investment

**Key Practices:**
• PI Planning (quarterly alignment)
• Continuous delivery pipeline
• DevOps & automation
• Inspect & adapt ceremonies

**Success Factors:**
• Leadership commitment
• Organizational change management
• Technical excellence (CI/CD, testing)
• Metrics: Lead time, deployment frequency, MTTR`,
        highlights: ['SAFe/LeSS/Spotify', 'PI Planning', 'DevOps Integration', 'Agile Metrics'],
      },
    ],
  },
];

export default function ProtocolPage() {
  const [activeCatId, setActiveCatId] = useState<string>(categories[0]!.id);
  const [activeSubId, setActiveSubId] = useState<string>(categories[0]!.subs[0]!.id);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomedPdf, setZoomedPdf] = useState<string | null>(null);

  const activeCat = categories.find((c) => c.id === activeCatId)!;
  const activeSub = activeCat.subs.find((s) => s.id === activeSubId) || activeCat.subs[0]!;

  const handleCatClick = (catId: string) => {
    setActiveCatId(catId);
    const cat = categories.find((c) => c.id === catId)!;
    setActiveSubId(cat.subs[0]!.id);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative px-5 md:px-8 lg:px-20 pt-8 pb-0">
        {/* Background Image - Right Side - Fixed Position */}
        <img 
          src="/protocol-hero.jpg" 
          alt="" 
          className="absolute right-8 lg:right-20 top-8 w-[400px] h-auto rounded-2xl z-0" 
        />
        
        {/* Content - Left Side */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">My Methodology</h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Product philosophy, Swiss IT compliance, consulting templates, and UX design frameworks.
          </p>
        </div>
      </div>

      {/* Main: Left Sidebar + Right Content */}
      <section className="px-5 md:px-8 lg:px-20 mt-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start">

          {/* Left: Category Tree */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24 space-y-1"
          >
            {categories.map((cat) => (
              <div key={cat.id}>
                {/* Level 1 */}
                <button
                  onClick={() => handleCatClick(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                    activeCatId === cat.id
                      ? 'bg-neutral-100 text-black'
                      : 'text-neutral-500 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-[11px] text-neutral-300 font-mono w-5">{cat.number}</span>
                  <span className="text-sm font-medium">{cat.title}</span>
                </button>

                {/* Level 2 */}
                <AnimatePresence>
                  {activeCatId === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 border-l border-neutral-200 pl-3 py-1 space-y-0.5">
                        {cat.subs.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveSubId(sub.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-all duration-200 ${
                              activeSubId === sub.id
                                ? 'text-black font-semibold bg-neutral-50'
                                : 'text-neutral-400 hover:text-neutral-700'
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.nav>

          {/* Right: Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-6">
                  <span>{activeCat.number}</span>
                  <span>{activeCat.title}</span>
                  <span>/</span>
                  <span className="text-neutral-700">{activeSub.title}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold tracking-tight mb-2">{activeSub.title}</h2>
                <p className="text-sm text-neutral-400 mb-6">{activeSub.description}</p>

                {/* Image with Zoom */}
                {activeSub.image && (
                  <div className="mb-6 ml-5">
                    <div 
                      className="rounded-xl overflow-hidden border border-neutral-200 cursor-zoom-in hover:border-neutral-400 transition-colors"
                      onClick={() => setZoomedImage(activeSub.image!.src)}
                    >
                      <img
                        src={activeSub.image.src}
                        alt={activeSub.image.alt}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[10px] text-neutral-300 mt-1.5 ml-1">
                      Photo by <a href={activeSub.image.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">{activeSub.image.credit}</a> / Unsplash · Click to zoom
                    </p>
                  </div>
                )}

                {/* PDF Previews */}
                {activeSub.pdfs && activeSub.pdfs.length > 0 && (
                  <div className="mb-6 ml-5">
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">REFERENCE DOCUMENTS</p>
                    <div className="space-y-3">
                      {activeSub.pdfs.map((pdf: { title: string; file: string; desc: string }, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="group cursor-pointer"
                          onClick={() => setZoomedPdf(pdf.file)}
                        >
                          <div className="flex border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-400 transition-all hover:shadow-md">
                            <div className="w-48 h-32 bg-neutral-50 relative overflow-hidden flex-shrink-0">
                              <iframe
                                src={`${pdf.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none"
                                title={pdf.title}
                                tabIndex={-1}
                              />
                              <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors" />
                              <span className="absolute top-2 right-2 text-[8px] font-mono bg-red-500 text-white px-1.5 py-0.5 rounded">PDF</span>
                            </div>
                            <div className="p-3 flex flex-col justify-center">
                              <p className="text-sm font-medium text-neutral-700">{pdf.title}</p>
                              <p className="text-[10px] text-neutral-400 mt-1">{pdf.desc}</p>
                              <p className="text-[9px] text-neutral-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to preview</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="border-t border-neutral-100 pt-6 mb-8">
                  {/* Chart for specific sections */}
                  {activeSub.id === 'mvp' && <BMLoopChart />}
                  {activeSub.id === 'pmf' && <PMFChart />}
                  {activeSub.id === 'lifecycle' && <LifecycleChart />}
                  {activeSub.id === 'user-research' && <ResearchMethodsChart />}
                  {activeSub.id === 'growth' && <AARRRFunnel />}
                  {activeSub.id === 'okr' && <OKRChart />}
                  {activeSub.id === 'journey' && <JourneyStagesChart />}
                  {activeSub.id === 'blueprint' && <ServiceBlueprintChart />}
                  {activeSub.id === 'nps' && <NPSGaugeChart />}
                  {activeSub.id === 'heuristics' && <HeuristicsChart />}
                  {activeSub.id === 'design-system' && <DesignSystemChart />}

                  {/* Inline charts within content */}
                  <div className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                    {activeSub.content.split('\n').map((line, i) => {
                      // Insert RetentionChart before "Before PMF" line
                      if (activeSub.id === 'pmf' && line.includes('Before PMF')) {
                        return (
                          <div key={i}>
                            <RetentionChart />
                            <p className="mb-1.5 ml-5 leading-relaxed">
                              {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
                                j % 2 === 1 ? <span key={j} className="text-black font-medium">{part}</span> : <span key={j}>{part}</span>
                              )}
                            </p>
                          </div>
                        );
                      }
                      // Formula lines (contains = and numbers/variables)
                      if (line.includes(' = ') && (line.includes('×') || line.includes('+') || line.includes('/') || line.includes('%') || /\d/.test(line))) {
                        return (
                          <p key={i} className="my-2 ml-5 text-sm font-semibold italic text-black">
                            <mark className="bg-yellow-200 px-1 py-0.5 rounded">{line}</mark>
                          </p>
                        );
                      }
                      // Bold headers
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="text-[10px] tracking-[0.2em] text-neutral-400 mt-6 mb-3 uppercase">{line.replace(/\*\*/g, '')}</p>;
                      }
                      // Bold inline
                      if (line.includes('**')) {
                        const parts = line.split(/\*\*(.+?)\*\*/g);
                        return (
                          <p key={i} className="mb-1.5 leading-relaxed">
                            {parts.map((part, j) => 
                              j % 2 === 1 ? <span key={j} className="text-black font-medium">{part}</span> : <span key={j}>{part}</span>
                            )}
                          </p>
                        );
                      }
                      // Bullet points
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        const text = line.replace(/^[•\-]\s/, '');
                        return (
                          <div key={i} className="flex items-start gap-2.5 ml-5 mb-1.5">
                            <div className="w-1 h-1 rounded-full bg-neutral-400 mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{text}</span>
                          </div>
                        );
                      }
                      // Checkmarks
                      if (line.startsWith('✓ ')) {
                        return (
                          <div key={i} className="flex items-start gap-2.5 ml-5 mb-1.5">
                            <span className="text-neutral-700 flex-shrink-0">✓</span>
                            <span className="leading-relaxed">{line.slice(2)}</span>
                          </div>
                        );
                      }
                      // Numbered items
                      if (/^(\d+)\.\s/.test(line)) {
                        const match = line.match(/^(\d+)\.\s(.*)/);
                        if (match) {
                          return (
                            <div key={i} className="flex items-start gap-3 ml-5 mb-2">
                              <span className="text-[11px] font-mono text-neutral-300 mt-0.5 flex-shrink-0 w-4">{match[1]}.</span>
                              <span className="leading-relaxed">{match[2]}</span>
                            </div>
                          );
                        }
                      }
                      // Empty lines
                      if (line.trim() === '') {
                        return <div key={i} className="h-3" />;
                      }
                      // Regular text
                      return <p key={i} className="mb-1.5 ml-5 leading-relaxed">{line}</p>;
                    })}
                  </div>
                </div>

                {/* Highlights as SEO Hashtags */}
                {activeSub.highlights && (
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-4">KEY AREAS</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {activeSub.highlights.map((h, idx) => (
                        <span
                          key={h}
                          className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                          <span className="text-neutral-300">#</span>{h.replace(/\s+/g, '')}<span className="text-neutral-300 ml-0.5">#</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links / Resources */}
                {activeSub.links && activeSub.links.length > 0 && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-4">RESOURCES</p>
                    <div className="flex flex-wrap gap-3">
                      {activeSub.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm border border-neutral-200 rounded-lg px-4 py-2.5 hover:border-black hover:text-black transition-colors text-neutral-500 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {link.label}
                          <span className="text-xs">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Image Zoom Overlay */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out p-8"
            onClick={() => setZoomedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={zoomedImage}
              alt="Zoomed image"
              className="max-w-full max-h-full object-contain rounded-xl"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Zoom Overlay */}
      <AnimatePresence>
        {zoomedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 bg-neutral-50">
                <span className="text-xs text-neutral-500">{zoomedPdf.split('/').pop()}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-neutral-300">Preview only</span>
                  <button
                    onClick={() => setZoomedPdf(null)}
                    className="text-neutral-400 hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <iframe
                src={`${zoomedPdf}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
