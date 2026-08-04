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
  title: "Abusalem M — Backend Engineer & Technical Lead",
  description:
    "Backend engineer in Bengaluru. Java and Spring Boot, mostly — catalogs, " +
    "tax, billing, and the systems that fall over if you get them wrong.",
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
  ],
  blurb:
    "I was the first engineer at Pallet. Four years later I lead the backend " +
    "team and still write code most days — mostly Java, mostly the unglamorous " +
    "parts that everything else depends on.",
  ctaPrimary: { label: "See my work", href: "#work" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
};

export const about = {
  heading: "ORIGIN STORY",
  paragraphs: [
    "I finished a Java backend course at Masai in 2022 and joined a startup " +
      "called Twinleaves as its first engineer. It's called Pallet now. I'm " +
      "still here.",
    "For the first couple of years nothing existed yet. I built cart, catalog, " +
      "serviceability, logistics, comms and vendor management from empty repos, " +
      "and set up most of the GCP infrastructure underneath them — largely by " +
      "reading docs at night and getting it wrong a few times first.",
    "Now I lead the backend side of a six-person team. In practice that means I " +
      "write the specs everyone builds against, review a lot of pull requests, " +
      "and keep the parts I'd rather not hand off: data models, API contracts, " +
      "migrations. If something's going to break production, I'd prefer to be " +
      "the one who broke it.",
    // Add a line about yourself outside work here — it's the one thing neither
    // your resume nor your commits could tell me. Something like:
    // "Outside work I'm usually ___."
  ],
  stats: [
    { value: "4", label: "Years at Pallet" },
    { value: "30+", label: "Repos shipped" },
    { value: "6", label: "Engineers led" },
  ],
};

/**
 * Signature skills, shown as web-strand meters.
 * `level` is 0–100 — these are my read of your history, tune to taste.
 */
export const skills = [
  { name: "Java / Spring Boot", level: 95 },
  { name: "System Design", level: 88 },
  { name: "PostgreSQL / JPA", level: 87 },
  { name: "Elasticsearch", level: 85 },
  { name: "GCP / Cloud Run", level: 82 },
  { name: "Event-Driven Systems", level: 80 },
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
    items: ["PostgreSQL", "MySQL", "Elasticsearch", "BigQuery", "Redis"],
  },
  {
    label: "Cloud & Messaging",
    items: [
      "GCP",
      "Cloud Run",
      "Pub/Sub",
      "Firebase",
      "Kafka",
      "WebSockets",
      "SSE",
      "AWS",
    ],
  },
  {
    label: "DevOps",
    items: ["Docker", "Jenkins", "GitHub Actions", "Kubernetes", "Git"],
  },
  {
    label: "Architecture",
    items: [
      "Multi-tenancy",
      "RBAC",
      "Event-driven",
      "System design",
      "Caching",
      "Observability",
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
    title: "CATALOG PLATFORM",
    tagline: "The thing I've spent the most time on",
    description:
      "Retail chains are nested: an account owns brands, brands own head " +
      "offices, head offices own stores. The old system faked that with " +
      "hard-coded inheritance. I replaced it with five real levels, where a " +
      "product is created once at the top and shared down. When a store edits " +
      "one, it forks — and you can diff that fork against its parent, pull " +
      "single fields back, or undo it entirely. The hard part was the read path: " +
      "collapsing masters and forks into one row per product without making " +
      "search slow.",
    tags: ["Java", "Spring Boot", "Elasticsearch", "Multi-tenancy"],
    sfx: "THWIP!",
  },
  {
    title: "JOBBEEPER",
    tagline: "Mine. Built it, run it, pay for the server.",
    description:
      "A job-alert service I built and operate on my own. It watches LinkedIn, " +
      "Naukri, Workday, Greenhouse, Lever, Ashby and a few others across 2,000+ " +
      "companies, matches new postings against what each person actually wants, " +
      "and pings them on Telegram, browser push or email. It all runs on one " +
      "Oracle Cloud ARM box. Started as a scraper for myself; it now has " +
      "accounts, subscriptions, referrals and an admin panel.",
    tags: ["Java", "Python", "PostgreSQL", "Docker", "Nginx"],
    href: "https://jobbeeper.com",
    sfx: "POW!",
  },
  {
    title: "TAX & PROMOTIONS",
    tagline: "Every bill goes through these two",
    description:
      "The tax engine works out the right rate for every line item at billing " +
      "time. I wrote 185 tests for it, because getting tax wrong across four " +
      "countries isn't the kind of bug you hear about politely. The promotion " +
      "engine covers eight offer types, including the awkward ones: " +
      "buy-X-get-Y, combos, and splitting a discount fairly across loose items " +
      "sold by weight.",
    tags: ["Java", "Spring Boot", "Billing", "Test Coverage"],
    sfx: "BAM!",
  },
  {
    title: "PRODUCT AI AGENTS",
    tagline: "Scan it, photograph it, or just describe it",
    description:
      "Point a phone at a barcode, send a photo, or type what the thing is — " +
      "the agent turns it into a product draft you can check and save. It looks " +
      "for a real product image on the web first and falls back to your photo. " +
      "Most of my time went into the streaming rather than the model: bounding " +
      "the executors, refusing cleanly when we're at capacity, cancelling when " +
      "someone closes the tab, and clearing up tool calls left hanging by an " +
      "interrupted session.",
    tags: ["MCP", "Vertex AI", "SSE", "Spring Boot"],
    sfx: "ZAP!",
  },
  {
    title: "PRINTING PIPELINE",
    tagline: "Boring until it stops working, then it's everything",
    description:
      "Receipts and kitchen tickets have to come out of the printer or the " +
      "store stops. This wires printer agents, POS services and the gateway " +
      "together over WebSockets, with deferred prints for when a printer is " +
      "offline, reprint tokens, recovery on startup, and a sound alert when " +
      "something needs a person. Built for a shop floor, where the network is " +
      "bad and printers vanish mid-job.",
    tags: ["WebSockets", "Event-driven", "POS", "Java"],
    sfx: "KRAK!",
  },
  {
    title: "AUTH STARTER",
    tagline: "One library, so the same bug stops coming back",
    description:
      "Every service was doing its own thing with roles and permissions, so the " +
      "same handful of bugs kept reappearing in different places. I pulled it " +
      "all into one Spring Boot starter — roles, plans, permissions, tenant and " +
      "platform access — and most of the platform runs on it now. Auth bugs " +
      "dropped by roughly 40%, and request logging finally looks the same " +
      "everywhere.",
    tags: ["Spring Boot", "Spring Security", "RBAC", "Library"],
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
    company: "Pallet",
    note: "formerly Twinleaves · first engineering hire",
    period: "Sep 2022 — Present",
    location: "Bengaluru, India",
    roles: [
      {
        title: "Software Development Engineer 2",
        period: "May 2024 — Present",
        points: [
          "Lead the backend side of a six-person team: split requirements into " +
            "per-service work, review the code, unstick integrations when two " +
            "services disagree, and run releases across 11 repos.",
          "Write the specs and integration guides everyone builds from, and keep " +
            "the risky work myself — data models, API contracts, migrations.",
          "Designed the five-level catalog hierarchy and everything around it: " +
            "forking, field-by-field re-sync, un-forking, and a read path that " +
            "collapses masters and forks into one result per product.",
          "Built the tax engine that prices every transaction, with 185 tests " +
            "covering four countries' rules.",
          "Ran the team's work on the promotion engine and its eight offer types, " +
            "and own cart and billing for both retail and restaurant.",
          "Pulled authorization into a shared Spring Boot starter that most " +
            "services now use. Auth bugs dropped by about 40%.",
          "Shipped the event-driven printing pipeline, and stabilised the SSE " +
            "streaming the AI agents run on.",
          "Run services on Cloud Run and Compute Engine. Jenkins and Cloud Build " +
            "took roughly 30% off deploy time.",
          "Handle most production incidents — auth failures, wrong calculations, " +
            "Elasticsearch filter bugs, duplicate records. One empty-PDF bug " +
            "turned out to be an entity-manager lifecycle problem and took me " +
            "embarrassingly long to find.",
        ],
      },
      {
        title: "Software Development Engineer 1",
        period: "Sep 2022 — May 2024",
        points: [
          "Built six of the company's core services while it was still finding " +
            "its feet — cart, catalog, serviceability, logistics, comms, vendor " +
            "management — and worked on ten or so more.",
          "Cut API response times by nearly 40%: profiled the slow endpoints, " +
            "added Redis caching, then fixed the queries, indexes and pagination " +
            "underneath them.",
          "Integrated WhatsApp Business, GS1 Datakart, Firebase and Vertex AI, " +
            "and built offline inventory sync for POS terminals in stores where " +
            "the internet comes and goes.",
          "Set up much of the early GCP infrastructure — VPC, Compute Engine, " +
            "Cloud Run, IAM, load balancing — which took about 15% off the bill.",
        ],
      },
    ],
  },
];

/** The "Feats" band — numbers worth stating plainly. */
export const feats = [
  { value: "185", label: "Tax tests", detail: "Four countries' rules" },
  { value: "40%", label: "Fewer auth bugs", detail: "One shared starter" },
  { value: "40%", label: "Faster APIs", detail: "Profiling, caching, indexes" },
  { value: "30%", label: "Faster deploys", detail: "Jenkins + Cloud Build" },
  { value: "15%", label: "Off the cloud bill", detail: "Early GCP setup" },
  { value: "2,000+", label: "Companies watched", detail: "JobBeeper scrapers" },
];

export const achievements = [
  {
    title: "Employee of the Quarter",
    detail:
      "Twinleaves / Pallet, 2025. I was the first engineer they hired, and the " +
      "team I now lead runs the services I started.",
  },
  {
    title: "700+ DSA problems",
    detail: "Across a few platforms. I still turn up for LeetCode contests.",
  },
];

export const education = [
  {
    title: "Certification in Java Backend Development",
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
    "If you've got a backend problem worth chewing on — or you just want to " +
    "argue about catalog modelling, tax rules, or why printers are the worst — " +
    "my inbox is open.",
  email: "mail@abusalem.me",
  location: "Bengaluru, India",
  socials: [
    { label: "GitHub", href: "https://github.com/Abusalem9" },
    { label: "LinkedIn", href: "https://linkedin.com/in/abusalemm" },
    { label: "LeetCode", href: "https://leetcode.com/u/Abusalem" },
    { label: "Resume", href: "/resume.pdf" },
  ],
};

export const nav = [
  { label: "Origin", href: "#about" },
  { label: "Arsenal", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "History", href: "#experience" },
  { label: "Feats", href: "#feats" },
  { label: "Contact", href: "#contact" },
];
