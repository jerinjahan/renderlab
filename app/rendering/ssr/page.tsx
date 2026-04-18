// app/rendering/ssr/page.tsx
// This is a Server Component page — no "use client".
// Two independent <Suspense> boundaries stream in at different times,
// so the user sees stats (fast) before articles (slow).

import { Suspense } from "react";
import { Server, Zap, Clock, RefreshCw, Info } from "lucide-react";
import { StatsSection, ArticlesSection } from "@/components/ssr-demo/SSRDataComponents";
import { StatsSkeleton, ArticlesSkeleton } from "@/components/ssr-demo/Skeletons";

import { formatDateTime } from "@/lib/date";

// ─── static metadata (SSR page CAN export metadata) ──────────────────────────

export const metadata = {
    title: "SSR Demo — RenderLab",
    description: "Server-Side Rendering with Suspense streaming in Next.js App Router",
};

// ─── info badges at the top ───────────────────────────────────────────────────

const BADGES = [
    { icon: Server, label: "Runs on server" },
    { icon: Zap, label: "Streaming HTML" },
    { icon: Clock, label: "Fresh per request" },
    { icon: RefreshCw, label: "No client JS for data" },
];

// ─── how-it-works steps ───────────────────────────────────────────────────────

const STEPS = [
    {
        step: "01",
        title: "Request arrives",
        body: "The browser hits the Next.js server. No JS bundle is needed to start rendering.",
    },
    {
        step: "02",
        title: "Shell streams instantly",
        body: "The page shell — layout, headings, Suspense fallback skeletons — streams to the client immediately.",
    },
    {
        step: "03",
        title: "Stats resolve (≈300 ms)",
        body: "fetchStats() completes. React streams the real stats HTML, replacing the skeleton in-place.",
    },
    {
        step: "04",
        title: "Articles resolve (≈1200 ms)",
        body: "fetchArticles() completes. The article grid streams in, replacing its skeleton. Page is fully interactive.",
    },
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function SSRDemoPage() {

    // ⭐ Runs ONLY on the server (Server Component)
    const serverRenderTime = new Date().toISOString();

    const formattedTime = formatDateTime(serverRenderTime);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-6">

            {/* ── Header ── */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                        SSR
                    </span>
                    <span className="text-xl text-gray-600 dark:text-white/25 uppercase tracking-widest">
                        Server-Side Rendering
                    </span>
                </div>

                <div className="space-y-3 max-w-2xl">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        HTML generated on every request
                    </h1>

                    <p className="text-gray-600 dark:text-white/50 leading-relaxed">
                        Each request hits the server, fetches fresh data, and streams fully-rendered HTML to the client.
                        With React Suspense, different parts of the page can stream independently as their data resolves.
                    </p>
                </div>

                {/* feature badges */}
                <div className="flex flex-wrap gap-2">
                    {BADGES.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-white/50 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-lg px-3 py-1.5"
                        >
                            <Icon size={12} strokeWidth={1.5} className="text-gray-500 dark:text-white/30" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Suspense boundary 1 ── */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-white/70 uppercase tracking-widest">
                        Site Stats
                    </h2>
                    <span className="text-[11px] text-gray-500 dark:text-white/25 font-mono">
                        Suspense boundary · fetchStats() · ~300ms
                    </span>
                </div>

                <Suspense fallback={<StatsSkeleton />}>
                    <StatsSection />
                </Suspense>
            </section>

            {/* ── Suspense boundary 2 ── */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-white/70 uppercase tracking-widest">
                        Latest Articles
                    </h2>
                    <span className="text-[11px] text-gray-500 dark:text-white/25 font-mono">
                        Suspense boundary · fetchArticles() · ~1200ms
                    </span>
                </div>

                <Suspense fallback={<ArticlesSkeleton />}>
                    <ArticlesSection />
                </Suspense>
            </section>

            {/* ── How it works ── */}
            <section className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-white/70 uppercase tracking-widest">
                    How it works
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {STEPS.map(({ step, title, body }) => (
                        <div
                            key={step}
                            className="rounded-xl border border-gray-200 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.02] p-5 space-y-3"
                        >
                            <span className="text-xs font-mono text-gray-400 dark:text-white/20">
                                {step}
                            </span>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white/80">
                                {title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-white/35 leading-relaxed">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Callout ── */}
            <div className="flex gap-3 rounded-xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/[0.06] p-5">
                <Info size={15} className="text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
                        Try disabling JavaScript in DevTools
                    </p>
                    <p className="text-xs text-sky-600 dark:text-sky-400/60 leading-relaxed">
                        This SSR page will still render fully — all content is in the initial HTML.
                    </p>
                </div>
            </div>

            {/* ── Timestamp ── */}
            <div className="flex items-center gap-2 font-semibold text-gray-500 dark:text-white/20 font-mono">
                <Clock size={16} />
                <span>Page rendered at: 
                    {formattedTime}
                </span>
                <span className="text-gray-400 dark:text-white/10">
                    — refreshing shows new timestamp
                </span>
            </div>

        </div>
    );
}
