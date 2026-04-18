// components/ssr-demo/SSRDataComponents.tsx

import { fetchStats, fetchArticles, type Article, type Stats } from "@/lib/fake-api";

// ─── category colours ─────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
    React: "bg-sky-100 text-sky-600 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
    Performance: "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
    "Next.js": "bg-violet-100 text-violet-600 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
    Architecture: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
};

function categoryStyle(cat: string) {
    return CATEGORY_STYLES[cat] ?? "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/10 dark:text-white/60 dark:border-white/10";
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function formatNumber(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

export async function StatsSection() {
    const stats: Stats = await fetchStats();

    const cards = [
        { label: "Total Articles", value: formatNumber(stats.totalArticles), unit: "published" },
        { label: "Total Views", value: formatNumber(stats.totalViews), unit: "all time" },
        { label: "Active Authors", value: stats.activeAuthors, unit: "writers" },
        { label: "Avg Read Time", value: `${stats.avgReadTime}m`, unit: "per article" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className="
                        rounded-xl border border-gray-200 dark:border-white/[0.07]
                        bg-white dark:bg-white/[0.03]
                        hover:bg-gray-50 dark:hover:bg-white/[0.05]
                        transition-colors p-5 space-y-1
                    "
                >
                    <p className="text-[11px] font-medium text-gray-500 dark:text-white/30 uppercase tracking-widest">{card.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">{card.value}</p>
                    <p className="text-xs text-gray-500 dark:text-white/25">{card.unit}</p>
                </div>
            ))}
        </div>
    );
}

// ─── Articles ─────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: Article }) {
    return (
        <article
            className="
                group flex flex-col rounded-xl border border-gray-200 dark:border-white/[0.07]
                bg-white dark:bg-white/[0.03]
                hover:bg-gray-50 dark:hover:bg-white/[0.05]
                hover:border-gray-300 dark:hover:border-white/[0.12]
                transition-all duration-200 p-5 gap-4
            "
        >
            {/* category */}
            <span className={`self-start text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${categoryStyle(article.category)}`}>
                {article.category}
            </span>

            {/* title + excerpt */}
            <div className="flex-1 space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90 leading-snug group-hover:text-black dark:group-hover:text-white transition-colors">
                    {article.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-white/40 leading-relaxed line-clamp-3">{article.excerpt}</p>
            </div>

            {/* footer */}
            <div className="flex items-center gap-2.5 pt-1 border-t border-gray-200 dark:border-white/[0.06]">
                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-gray-500 dark:text-white/60">{article.avatar}</span>
                </div>

                <span className="text-[11px] text-gray-500 dark:text-white/35 truncate">{article.author}</span>

                <div className="ml-auto flex items-center gap-2 text-[11px] text-gray-400 dark:text-white/25 shrink-0">
                    <span>{article.readTime}m read</span>
                    <span>·</span>
                    <span>{formatNumber(article.views)} views</span>
                </div>
            </div>
        </article>
    );
}

export async function ArticlesSection() {
    const articles: Article[] = await fetchArticles();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}
