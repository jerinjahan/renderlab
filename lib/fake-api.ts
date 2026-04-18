// lib/fake-api.ts
// Simulates a real backend API with artificial latency.
// In production you'd replace these with fetch() calls to your actual API.

export type Article = {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    avatar: string;
    category: string;
    readTime: number;
    publishedAt: string;
    views: number;
};

export type Stats = {
    totalArticles: number;
    totalViews: number;
    activeAuthors: number;
    avgReadTime: number;
};

// ─── helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ─── data ─────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
    {
        id: 1,
        title: "Understanding React Server Components",
        excerpt: "A deep dive into how RSC changes the way we think about data fetching, bundle sizes, and the server/client boundary.",
        author: "Sarah Chen",
        avatar: "SC",
        category: "React",
        readTime: 8,
        publishedAt: "2025-04-10",
        views: 14200,
    },
    {
        id: 2,
        title: "SSR vs CSR: Picking the Right Strategy",
        excerpt: "When should you reach for server-side rendering? We benchmark both approaches and walk through real-world trade-offs.",
        author: "Marcus Webb",
        avatar: "MW",
        category: "Performance",
        readTime: 6,
        publishedAt: "2025-04-08",
        views: 9800,
    },
    {
        id: 3,
        title: "Streaming HTML with Suspense Boundaries",
        excerpt: "Next.js App Router lets you stream parts of your UI as they become ready. Here's how to design your Suspense tree.",
        author: "Priya Nair",
        avatar: "PN",
        category: "Next.js",
        readTime: 10,
        publishedAt: "2025-04-05",
        views: 21000,
    },
    {
        id: 4,
        title: "The Cost of JavaScript: A 2025 Audit",
        excerpt: "JS bundle bloat is still the #1 killer of Core Web Vitals. We audit 50 production sites and share what we found.",
        author: "Leo Tanaka",
        avatar: "LT",
        category: "Performance",
        readTime: 12,
        publishedAt: "2025-04-01",
        views: 33500,
    },
    {
        id: 5,
        title: "ISR Deep Dive: Revalidation Strategies",
        excerpt: "On-demand vs time-based revalidation, cache tags, and how to avoid stale data in production Next.js apps.",
        author: "Sarah Chen",
        avatar: "SC",
        category: "Next.js",
        readTime: 9,
        publishedAt: "2025-03-28",
        views: 7600,
    },
    {
        id: 6,
        title: "Edge Runtime vs Node.js: When to Use Each",
        excerpt: "Edge functions are fast but limited. Node.js is flexible but slower to cold-start. Here's the decision framework.",
        author: "Marcus Webb",
        avatar: "MW",
        category: "Architecture",
        readTime: 7,
        publishedAt: "2025-03-22",
        views: 11400,
    },
];

const STATS: Stats = {
    totalArticles: 128,
    totalViews: 1_240_000,
    activeAuthors: 34,
    avgReadTime: 8,
};

// ─── API functions ────────────────────────────────────────────────────────────

/** Fast endpoint — stats load first (300 ms) */
export async function fetchStats(): Promise<Stats> {
    await delay(300);
    return STATS;
}

/** Slower endpoint — articles stream in after stats (1200 ms) */
export async function fetchArticles(): Promise<Article[]> {
    await delay(1200);
    return ARTICLES;
}

/** Single article fetch */
export async function fetchArticleById(id: number): Promise<Article | null> {
    await delay(400);
    return ARTICLES.find((a) => a.id === id) ?? null;
}
