/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 *  This is the only file you need to touch to fill in your info.
 *
 *  Facts come from your resume and your commit history.
 *  The wording is a draft in first person — read it out loud and
 *  change anything that doesn't sound like you.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Abusalem M",
  title: "Abusalem M — Backend Software Engineer & Technical Lead",
  description:
    "Backend Software Engineer with 4+ years of experience owning high-scale systems end to end. " +
    "First engineering hire at Pallet, leading 11 microservices across Java, Spring Boot, PostgreSQL, Elasticsearch, and GCP.",
  url: "https://abusalem.me",
};

export const hero = {
  eyebrow: "With great code comes great responsibility",
  name: "ABUSALEM",
  // These cycle every 2.8s
  roles: [
    "BACKEND SOFTWARE ENGINEER",
    "TECHNICAL LEAD",
    "JAVA · SPRING BOOT · GCP",
    "DISTRIBUTED SYSTEMS & AI",
  ],
  blurb:
    "I was the first engineer to join Twinleaves (now Pallet). Back then, we had no backend — so I rolled up my sleeves, " +
    "built our first 6 core services from scratch, and set up our cloud foundation. Today, I lead backend engineering across " +
    "11 microservices, spending my days tuning search pipelines, building sub-20ms calculation engines, and making sure thousands of stores run without a hitch.",
  ctaPrimary: { label: "See my work", href: "#work" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

/** The card that hangs beside the hero on wide screens. */
export const heroCard = {
  label: "Currently",
  role: "SDE 2 & Backend Lead",
  company: "Pallet",
  location: "Bengaluru, India",
  stack: ["Java", "Spring Boot", "Elasticsearch", "GCP", "PostgreSQL"],
  footnote: "Leading 11 microservices",
};

export const about = {
  heading: "ORIGIN STORY",
  paragraphs: [
    "In September 2022, right after finishing intensive backend training at Masai School, I joined Twinleaves (now Pallet) as employee #1 in engineering. " +
      "There was no existing codebase, no CI/CD pipelines, and no cloud setup — just a big roadmap and a whiteboard. " +
      "I took total ownership from day one: drafting schemas, writing the API specs, wiring VPC networks on GCP, and pushing our very first commits to production.",
    "During those early startup days, speed and durability went hand in hand. I built 6 of our foundational services from the ground up — " +
      "Cart, Catalog, Serviceability, Logistics, Communications, and Vendor Management. I also set up our entire GCP infrastructure — Cloud Run, " +
      "Cloud SQL, VPC networking, Cloud NAT, and automated build pipelines — ensuring we could scale rapidly without outgrowing our architecture.",
    "Fast-forward to today: I lead a talented backend team maintaining 11 microservices. Most of my day is spent solving tricky engineering problems: " +
      "optimizing an Elasticsearch catalog that handles 45,000+ queries every minute at under 18ms, writing a DAG tax calculation engine that crunch 100K+ daily orders " +
      "with penny-level precision, keeping checkout latency under 112ms across 1,000+ stores, and shipping practical AI assistants that save merchants hours of manual cataloging.",
    "When I step away from the terminal, I'm usually diving into distributed systems literature, grinding through complex DSA puzzles (700+ solved across LeetCode), " +
      "or tinkering on side projects like JobBeeper — a tool I built to help job seekers get instant opening alerts across 25+ career boards.",
  ],
  stats: [
    { value: "4+", label: "Years Experience" },
    { value: "40+", label: "Repositories Contributed" },
    { value: "11", label: "Microservices Led" },
    { value: "1M+", label: "Catalog Products" },
  ],
};

/**
 * Signature skills, shown as web-strand meters.
 * `level` is 0–100 — these are my read of your history, tune to taste.
 */
export const skills = [
  { name: "Java / Spring Boot", level: 96 },
  { name: "Distributed Systems & Architecture", level: 92 },
  { name: "Elasticsearch & Search Pipelines", level: 90 },
  { name: "PostgreSQL / PostGIS / JPA", level: 90 },
  { name: "GCP Cloud Infrastructure & CI/CD", level: 88 },
  { name: "Event-Driven Systems & AI Agents", level: 86 },
];

/** The full kit, grouped. */
export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "SQL", "JavaScript", "TypeScript", "Python"],
  },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "Microservices",
      "JPA / Hibernate",
      "Node.js",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "PostGIS",
      "MySQL",
      "Elasticsearch",
      "Redis",
      "BigQuery",
    ],
  },
  {
    label: "Cloud & Messaging",
    items: [
      "GCP (Cloud Run, Cloud Build, IAM, VPC)",
      "AWS",
      "Pub/Sub",
      "Kafka",
      "Firebase",
      "WebSockets",
      "SSE",
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    label: "Architecture & Design",
    items: [
      "Multi-tenancy",
      "RBAC",
      "Event-driven Systems",
      "DAG Engines",
      "Caching",
      "Observability",
      "Lock-free Concurrency",
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  /** Comic sound-effect stamped on the card corner */
  sfx: string;
};

export const projects: Project[] = [
  {
    title: "CATALOG & DISCOVERY ENGINE",
    tagline: "1M+ products, 45K+ QPM, p99 < 18ms",
    description:
      "When your catalog exceeds 1 million products and merchants update stock in real time, basic database lookups break down. " +
      "I engineered a dedicated catalog engine combining PostgreSQL with custom Elasticsearch query pipelines. It handles multi-tenant discovery, " +
      "fuzzy search, and dynamic pricing with cache-friendly filter execution. I also designed a multi-level sync engine that automatically fans out updates " +
      "across hundreds of franchise stores without overriding individual store prices, paired with a backend-driven CMS so the mobile app can change layouts on the fly.",
    tags: ["Java", "Spring Boot", "Elasticsearch", "PostgreSQL", "Multi-tenancy"],
    sfx: "THWIP!",
  },
  {
    title: "TAX MASTER & DAG ENGINE",
    tagline: "100K+ calculations/day, p99 < 20ms",
    description:
      "Retail tax in multi-state commerce is full of tricky edge cases — state versus central rules, slabs, cess, cascading percentages, and rounding splits. " +
      "Instead of hardcoding rules, I designed a zero-code-change Tax Master where finance teams configure rules, jurisdictions, and effective dates. " +
      "Under the hood, a DAG (Directed Acyclic Graph) engine evaluates dependencies in parallel, computing penny-accurate taxes on 100,000+ daily orders in under 20ms.",
    tags: ["Java", "Spring Boot", "DAG Engine", "Tax & Billing", "PostgreSQL"],
    sfx: "BAM!",
  },
  {
    title: "SHARED CART & PROMOTIONS",
    tagline: "1,000+ stores, 112ms latency, 5k-10k QPS",
    description:
      "A customer adding an item to their cart expects an immediate response, but behind that click are inventory checks, tier pricing, and promo rules. " +
      "I rebuilt our shared cart engine powering POS, Restaurant, and Consumer apps, slashing add-to-cart latency from 2 seconds down to 112ms under 10,000 queries/sec. " +
      "I also built a rule-pooling promotion engine that evaluates complex Buy-X-Get-Y offers, bundles, and step discounts on every cart update.",
    tags: ["Java", "Spring Boot", "High-Throughput", "Promotions", "Redis"],
    sfx: "POW!",
  },
  {
    title: "AI AGENTS & COMMONS",
    tagline: "70-90% onboarding time reduction + lock-free pool",
    description:
      "Onboarding a grocery merchant used to take days of tedious spreadsheet uploads. I built conversational AI catalog and store-builder agents " +
      "that generate product catalogs, categories, banners, and SEO metadata directly through chat. To keep agent response times fast and economical, " +
      "I authored an AI commons library featuring a custom lock-free CAS JDBC connection pool that shaved token verification latency down to 5–11ms.",
    tags: ["Vertex AI", "Spring Boot", "SSE", "Pub/Sub", "Lock-free JDBC"],
    sfx: "ZAP!",
  },
  {
    title: "CLOUD PRINTER & JOB SYSTEM",
    tagline: "50K–80K print jobs/day across 400+ stores",
    description:
      "Shop floors and commercial kitchens have notoriously spotty Wi-Fi, yet billing receipts and Kitchen Order Tickets (KOT) can never be lost. " +
      "I built a centralized job orchestration engine and lightweight Cloud Printer Agent that reliably handles 50K–80K daily print jobs. " +
      "It uses duplex WebSockets with automatic HTTP polling fallback, startup spool recovery, and reprint tokens so no order is ever missed.",
    tags: ["WebSockets", "Kafka", "Pub/Sub", "POS", "Event-driven"],
    sfx: "KRAK!",
  },
  {
    title: "JOBBEEPER",
    tagline: "Personal project · 25+ platforms, 2K+ active users",
    description:
      "Job searching is stressful when you have to refresh 20 different portals every day. I built JobBeeper to aggregate openings across 25+ major job boards " +
      "(LinkedIn, Naukri, Workday, Greenhouse, Lever, Ashby) into a unified stream. It runs intelligent matching, deduplication, and retries, sending instant personalized alerts " +
      "via Telegram, Web Push, and Android. It runs 24/7 on Oracle Cloud with Docker, PostgreSQL, Redis, and Celery workers.",
    tags: ["Python", "PostgreSQL", "Redis", "Docker", "Nginx"],
    href: "https://jobbeeper.com",
    sfx: "SNIKT!",
  },
];

export type Role = {
  title: string;
  period: string;
  points: string[];
};

export type Job = {
  company: string;
  /** e.g. a rebrand note shown under the company name */
  note?: string;
  period: string;
  location?: string;
  roles: Role[];
};

export const experience: Job[] = [
  {
    company: "Twinleaves (Pallet)",
    note: "first engineering employee · grew platform from 0 to 11 microservices",
    period: "Sep 2022 — Present",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Software Development Engineer 2",
        period: "May 2024 — Present",
        points: [
          "Catalog & Discovery: Engineered high-throughput catalog search and hierarchy engine (PostgreSQL + Elasticsearch) for 1M+ products, handling 45K+ queries/min with p99 search latency under 18ms.",
          "Elasticsearch Pipelines: Built custom Elasticsearch query pipelines for multi-tenant product discovery, dynamic filtering, aggregations, and pricing with cache-friendly filter execution and query optimization.",
          "Catalog Synchronization: Built a multi-level catalog sync engine that propagates master product changes across hundreds of stores while preserving store-specific pricing and inventory overrides.",
          "Backend-Driven Content: Designed and built a backend-driven app content system to manage pages, layouts, and campaigns with scheduled festival and promotion updates without requiring new client releases.",
          "Tax Master & DAG Engine: Built a configurable Tax Master (jurisdictions, rules, rates, slabs, exemptions) and a high-precision DAG-based tax calculation engine processing 100K+ calculations/day with p99 latency under 20ms and rounding reconciliation.",
          "Cart & Promotions: Built a shared cart service across 1,000+ stores for POS, Restaurant, B2C, and B2B flows. Reduced add-to-cart latency from 2s to 112ms under 5k–10k+ QPS, and built a promotion engine for Buy-X-Get-Y, step offers, combos, and category pooling.",
          "AI Agents: Built AI catalog and website builder agents that manage products, SEO, layouts, and styling through chat with inline actions, slashing store setup and onboarding times by 70–90%.",
          "Platform & AI Commons: Built a shared Spring Boot platform library for multi-tenant auth, RBAC, and rate limiting; built an AI commons library with a lock-free CAS JDBC connection pool achieving sub-millisecond borrow latency and reducing AI token checks to 5–11ms.",
          "Job Management & Cloud Printing: Built a centralized Job System and Cloud Printer Agent processing 50K–80K print jobs/day across 400+ stores using WebSockets, polling fallback, and Pub/Sub + Kafka event streams.",
          "Serviceability & Logistics: Built a configurable serviceability service across 1,000+ stores for instant, same-day, and slotted delivery using PostGIS for geo-radius and delivery-time calculation under 45ms.",
          "Cloud & Infrastructure: Managed production GCP infrastructure across 110+ Cloud Run services, 10+ Compute Engine instances, 10+ Cloud SQL instances, 170+ Artifact Registry repos, 140+ Cloud Build triggers, 70+ Pub/Sub topics, and end-to-end VPC networking.",
          "Technical Leadership: Lead 3 backend engineers across 11 microservices (specs, PR reviews, releases); previously led a 14-member cross-functional team (backend, frontend, QA) for Pallet Restaurant across RMS, POS, B2C, B2B, and Zomato/Swiggy integrations.",
        ],
      },
      {
        title: "Software Development Engineer 1",
        period: "Sep 2022 — May 2024",
        points: [
          "Core Services: Joined as the first engineering hire and independently built 6 core services from scratch: Cart, Catalog, Serviceability, Logistics, Communications, and Vendor Management, while contributing to 10+ others.",
          "Integrations & Offline POS: Integrated WhatsApp Business, GS1 Datakart, Firebase, and Vertex AI; engineered offline POS inventory synchronization to maintain uninterrupted store operations during network outages.",
          "GCP Foundation: Set up the company's entire GCP cloud infrastructure from the ground up, including Cloud Run, Cloud SQL, VPC networks, subnets, firewalls, Cloud NAT, load balancers, Docker, and Cloud Build CI/CD.",
        ],
      },
    ],
  },
];

/** The "Feats" band — numbers worth stating plainly. */
export const feats = [
  { value: "40+", label: "Repositories Contributed", detail: "Across core backends, microservices, CLI agents & UI" },
  { value: "112ms", label: "Add-to-cart latency", detail: "Reduced from 2s under 10k QPS" },
  { value: "< 18ms", label: "p99 search latency", detail: "1M+ products, 45K+ QPM" },
  { value: "100K+", label: "Daily tax calculations", detail: "DAG engine with p99 < 20ms" },
  { value: "1,000+", label: "Stores powered", detail: "POS, Restaurant, B2C & B2B" },
  { value: "50K–80K", label: "Daily print jobs", detail: "Cloud Printer Agent across 400+ stores" },
];

export const repoContributions = [
  {
    category: "Core Commerce & High Scale",
    repos: [
      { name: "cms", role: "Catalog & App Content Engine", desc: "Elasticsearch indexing, multi-level hierarchy, 45K+ QPM" },
      { name: "pallet-cart", role: "Shared Cart Engine", desc: "Multi-tenant cart, promotions, 112ms p99 latency" },
      { name: "pallet-tax-engine", role: "Tax Master & DAG Engine", desc: "100K+ daily calculations, sub-20ms DAG pipeline" },
      { name: "pallet-serviceability", role: "Geo-Serviceability Engine", desc: "PostGIS instant/slotted delivery calculation < 45ms" },
      { name: "plusmax-cms", role: "Merchant App Content", desc: "Dynamic layouts, banner feeds, festival updates" },
      { name: "plusmax-company", role: "Company & Multi-tenant Config", desc: "Store hierarchies, merchant profiles, tenant policies" },
    ],
  },
  {
    category: "Store Infrastructure & Real-Time Ops",
    repos: [
      { name: "pallet-printer", role: "Cloud Printer Agent", desc: "WebSocket + polling fallback, 50K-80K print jobs/day" },
      { name: "pallet-pos-service", role: "POS Cloud Gateway", desc: "Billing, offline cash registers, token syncing" },
      { name: "pallet-comms-agent", role: "Communications Agent", desc: "Background SMS, WhatsApp Business, transactional mailers" },
      { name: "pallet-highway", role: "Logistics Highway", desc: "Rider dispatch, slotted order fulfillment pipelines" },
      { name: "vms", role: "Vendor Management System", desc: "Purchase orders, supplier catalog matching, ledger syncing" },
      { name: "offline-pos-agent", role: "Offline POS Agent", desc: "Local SQLite caching & auto-sync during internet dropouts" },
    ],
  },
  {
    category: "AI, Tools & Platform Starters",
    repos: [
      { name: "pallet-ai-commons", role: "AI Commons Library", desc: "Lock-free CAS JDBC pool, token metering (5-11ms)" },
      { name: "pallet-mcp-service", role: "Model Context Protocol Service", desc: "AI assistant tools for live store data & commands" },
      { name: "pallet-chatbot", role: "AI Merchant Assistant", desc: "Natural language catalog & promotion builder agent" },
      { name: "twinleaves-common-starter", role: "Company-wide Spring Starter", desc: "Standardized multi-tenant auth, filters, error handling" },
      { name: "pallet-commons-code", role: "Shared Utilities & DTOs", desc: "Core data contracts shared across 11 microservices" },
      { name: "pallet-cron", role: "Centralized Scheduler", desc: "Automated reconciliation, inventory audits, billing triggers" },
    ],
  },
  {
    category: "Frontend, Portals & Automated Testing",
    repos: [
      { name: "pallet-rms-ui", role: "Restaurant Management Portal", desc: "Table management, KDS (Kitchen Display), menus" },
      { name: "pallet-mrms-replit", role: "Merchant Mobile RMS", desc: "Mobile-first merchant dashboard & real-time analytics" },
      { name: "pallet-website", role: "Pallet Public Platform", desc: "High-performance marketing & product portal" },
      { name: "pallet-grocery-web-ui", role: "B2C Consumer Web Store", desc: "E-commerce storefront for supermarket chains" },
      { name: "web-pos-playwrite-automation", role: "E2E POS Test Suite", desc: "Automated regression testing for POS checkout journeys" },
      { name: "plusmax-erp-automation", role: "ERP Integration Suite", desc: "Automated reconciliation against external ERP ledgers" },
    ],
  },
];

export const achievements = [
  {
    title: "Employee of the Quarter",
    detail:
      "Awarded every quarter since December 2022 at Twinleaves (Pallet). Joined as the first engineering employee and now lead backend development across 11 microservices.",
  },
  {
    title: "700+ DSA Problems Solved",
    detail: "Solved 700+ data structures and algorithms problems across LeetCode and other competitive programming platforms.",
  },
];

export const education = [
  {
    title: "Java Backend Development",
    place: "Masai School, Bengaluru",
    period: "Dec 2021 — Aug 2022",
  },
  {
    title: "Diploma in Computer Science",
    place: "Bharati Vidyapeeth, Maharashtra",
    period: "Aug 2018 — Oct 2021",
  },
];

export const contact = {
  heading: "SEND UP THE SIGNAL",
  blurb:
    "Whether you're tackling high-throughput search, architecting low-latency transactional engines, " +
    "or looking for a hands-on technical lead to take systems from zero to one — I'm always up for a good engineering conversation. " +
    "Drop me an email or find me on the channels below.",
  email: "mail@abusalem.me",
  location: "Bengaluru, India",
  socials: [
    { label: "GitHub", href: "https://github.com/Abusalem9" },
    { label: "LinkedIn", href: "https://linkedin.com/in/abusalemm" },
    { label: "LeetCode", href: "https://leetcode.com/u/Abusalem" },
    { label: "Resume", href: "/resume" },
  ],
};

export const nav = [
  { label: "Origin", href: "#about" },
  { label: "Arsenal", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "History", href: "#experience" },
  { label: "Feats", href: "#feats" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];
