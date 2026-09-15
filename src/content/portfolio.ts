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
    "I was the first engineering hire at Twinleaves (Pallet), independently built 6 core services, " +
    "and now lead backend development across 11 microservices. I build high-scale, fault-tolerant engines " +
    "for catalog search, multi-tenant cart & tax, cloud printing, and production AI agents.",
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
    "I joined Twinleaves (Pallet) as its first engineering employee in 2022 after finishing " +
      "Java Backend Development at Masai School. From day zero, I owned systems end to end — " +
      "from architecture, database schemas, and networking to production deployments.",
    "During the early growth phase, nothing existed yet. I built 6 core services from scratch — " +
      "Cart, Catalog, Serviceability, Logistics, Communications, and Vendor Management — and established " +
      "the company's cloud infrastructure on GCP from the ground up (VPC, Cloud Run, Cloud SQL, Cloud Build CI/CD).",
    "Today, I lead backend development across 11 microservices. My daily focus spans high-throughput catalog " +
      "engines handling 45K+ queries/min with p99 < 18ms, high-precision DAG tax calculations processing 100K+ " +
      "requests/day under 20ms, low-latency cart engines serving 1,000+ stores, and production AI agents that " +
      "slash merchant onboarding from hours to seconds.",
    "Outside work, I love deep-diving into distributed system patterns, solving DSA challenges (700+ problems " +
      "across LeetCode and competitive platforms), and building side projects like JobBeeper.",
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
      "Engineered a high-throughput catalog search and hierarchy engine backed by PostgreSQL and Elasticsearch. " +
      "Built custom Elasticsearch query pipelines for multi-tenant product discovery, dynamic filtering, aggregations, " +
      "and pricing with cache-friendly filter execution. Built a multi-level catalog sync engine that propagates master " +
      "updates across hundreds of stores while preserving store-specific pricing and inventory overrides, plus a backend-driven " +
      "CMS for real-time app layouts without new releases.",
    tags: ["Java", "Spring Boot", "Elasticsearch", "PostgreSQL", "Multi-tenancy"],
    sfx: "THWIP!",
  },
  {
    title: "TAX MASTER & DAG ENGINE",
    tagline: "100K+ calculations/day, p99 < 20ms",
    description:
      "Built a zero-code-change configurable Tax Master supporting tax types, jurisdiction hierarchies, rules, rates, " +
      "formulas, slabs, effective dates, and exemptions. Powered by a high-precision calculation engine processing 100K+ " +
      "tax calculations daily with p99 latency under 20ms using DAG-based dependency execution, location/date-aware rule " +
      "selection, cascading taxes, and penny-perfect rounding reconciliation.",
    tags: ["Java", "Spring Boot", "DAG Engine", "Tax & Billing", "PostgreSQL"],
    sfx: "BAM!",
  },
  {
    title: "SHARED CART & PROMOTIONS",
    tagline: "1,000+ stores, 112ms latency, 5k-10k QPS",
    description:
      "Built a shared cart service powering 1,000+ stores across POS, Restaurant, B2C, and B2B flows. Reduced add-to-cart " +
      "latency from 2s to 112ms while supporting 5,000–10,000+ queries/sec with inventory and offer evaluation. Built a comprehensive " +
      "promotion engine handling complex Buy-X-Get-Y, step offers, combos, and category/brand pooling that dynamically applies " +
      "the optimal discount on every cart recalculation.",
    tags: ["Java", "Spring Boot", "High-Throughput", "Promotions", "Redis"],
    sfx: "POW!",
  },
  {
    title: "AI AGENTS & COMMONS",
    tagline: "70-90% onboarding time reduction + lock-free pool",
    description:
      "Built chat-driven AI catalog and website builder agents that create products, categories, brands, visuals, and SEO " +
      "with inline actions, slashing store setup and onboarding times by 70–90%. Authored shared platform libraries: a multi-tenant " +
      "Spring Boot starter for RBAC and rate limiting, and an AI commons library featuring a custom lock-free CAS JDBC connection pool " +
      "that cut token check latency to 5–11ms with async Pub/Sub billing events.",
    tags: ["Vertex AI", "Spring Boot", "SSE", "Pub/Sub", "Lock-free JDBC"],
    sfx: "ZAP!",
  },
  {
    title: "CLOUD PRINTER & JOB SYSTEM",
    tagline: "50K–80K print jobs/day across 400+ stores",
    description:
      "Built a centralized job management system used across 400+ stores to assign, track, and manage job lifecycles in real time. " +
      "Engineered the Cloud Printer Agent handling 50K–80K daily print jobs with real-time WebSocket delivery, automatic polling fallback, " +
      "startup recovery, reprint tokens, and resilient Pub/Sub + Kafka event pipelines designed specifically for unstable shop-floor networks.",
    tags: ["WebSockets", "Kafka", "Pub/Sub", "POS", "Event-driven"],
    sfx: "KRAK!",
  },
  {
    title: "JOBBEEPER",
    tagline: "Personal project · 25+ platforms, 2K+ active users",
    description:
      "Built JobBeeper end to end to aggregate job openings across 25+ hiring platforms (LinkedIn, Naukri, Workday, Greenhouse, Lever, Ashby) " +
      "into one place, delivering real-time personalized alerts via Telegram, Web Push, Email, and Android. Built the matching engine " +
      "with deduplication and failure retries, running in production on Oracle Cloud with Docker, PostgreSQL, Nginx, and background workers.",
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
    "If you've got a backend challenge worth chewing on — high-throughput catalog search, " +
    "sub-20ms tax & pricing calculation, multi-tenant microservice architecture, or AI agents — " +
    "my inbox is open.",
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
