// app/rendering/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Search, Clock, DollarSign, Sparkles, RefreshCw, FileText, Cpu, Star } from "lucide-react";

const strategies = [
    {
        name: "SSR",
        fullName: "SERVER-SIDE RENDERING",
        description: "HTML generated on every request. Fresh data, full SEO, but needs a server.",
        metrics: {
            speed: "Fast",
            seo: "100%",
            freshness: "Real-time",
            cost: "Medium",
        },
        bestFor: ["Dashboards", "Auth pages", "E-commerce"],
        icon: RefreshCw,
        accentColor: "blue",
        isDynamic: true,
    },
    {
        name: "SSG",
        fullName: "STATIC SITE GENERATION",
        description: "Pages pre-built at build time. Fastest possible delivery via CDN, zero runtime cost.",
        metrics: {
            speed: "Fastest",
            seo: "100%",
            freshness: "Build only",
            cost: "Free",
        },
        bestFor: ["Blogs", "Docs", "Marketing"],
        icon: FileText,
        accentColor: "emerald",
        isDynamic: false,
    },
    {
        name: "ISR",
        fullName: "INCREMENTAL STATIC REGEN",
        description: "Static pages that revalidate in the background. Best of SSG + SSR combined.",
        metrics: {
            speed: "Very Fast",
            seo: "100%",
            freshness: "Periodic",
            cost: "Low",
        },
        bestFor: ["Products", "News Feeds", "Profiles"],
        icon: Sparkles,
        accentColor: "purple",
        isDynamic: false,
    },
    {
        name: "CSR",
        fullName: "CLIENT-SIDE RENDERING",
        description: "JS renders everything in browser. SEO not needed, behind auth, highly interactive.",
        metrics: {
            speed: "Slow",
            seo: "Poor",
            freshness: "Real-time",
            cost: "Low",
        },
        bestFor: ["Admin panels", "Internal tools"],
        icon: Cpu,
        accentColor: "orange",
        isDynamic: false,
    },
];

const accentColorss = {
    blue: {
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        star: "text-blue-400",
    },
    emerald: {
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        star: "text-emerald-400",
    },
    purple: {
        bg: "bg-purple-500/5",
        border: "border-purple-500/20",
        badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        star: "text-purple-400",
    },
    orange: {
        bg: "bg-orange-500/5",
        border: "border-orange-500/20",
        badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        star: "text-orange-400",
    },
};

const accentColors = {
    blue: {
        bg: "bg-blue-50 dark:bg-blue-500/5",
        border: "border-blue-200 dark:border-blue-500/20",
        badge: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
        star: "text-blue-600 dark:text-blue-400",
    },
    emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-500/5",
        border: "border-emerald-200 dark:border-emerald-500/20",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        star: "text-emerald-600 dark:text-emerald-400",
    },
    purple: {
        bg: "bg-purple-50 dark:bg-purple-500/5",
        border: "border-purple-200 dark:border-purple-500/20",
        badge: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
        star: "text-purple-600 dark:text-purple-400",
    },
    orange: {
        bg: "bg-orange-50 dark:bg-orange-500/5",
        border: "border-orange-200 dark:border-orange-500/20",
        badge: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
        star: "text-orange-600 dark:text-orange-400",
    },
};

const metricIcons = {
    speed: Zap,
    seo: Search,
    freshness: Clock,
    cost: DollarSign,
};

const metricLabels = {
    speed: "Speed",
    seo: "SEO",
    freshness: "Freshness",
    cost: "Cost",
};

export default function RenderingPage() {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">SSR</span>
                    <span className="text-slate-500 dark:text-slate-600 mx-2">vs</span>
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">SSG</span>
                    <span className="text-slate-500 dark:text-slate-600 mx-2">vs</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ISR</span>
                    <span className="text-slate-500 dark:text-slate-600 mx-2">vs</span>
                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">CSR</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-500 max-w-2xl mx-auto">
                    Four rendering strategies in Next.js. Pick the right one for every page in your app.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {strategies.map((strategy) => {
                    const Icon = strategy.icon;
                    const colors = accentColors[strategy.accentColor as keyof typeof accentColors];

                    return (
                        <Card
                            key={strategy.name}
                            className={`relative overflow-hidden ${colors.bg} backdrop-blur-sm border ${colors.border} hover:border-opacity-50 transition-all duration-300 hover:shadow-xl group bg-white dark:bg-slate-900/40`}
                        >
                            <CardHeader className="pb-3">
                                {/* Header with name and icon */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Star className={`w-4 h-4 ${colors.star} fill-current`} />
                                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide">{strategy.name}</span>
                                    </div>
                                    <Icon className={`w-5 h-5 ${colors.star} group-hover:scale-110 transition-transform`} />
                                </div>

                                {/* Title */}
                                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{strategy.fullName}</CardTitle>

                                {/* Dynamic Content Badge */}
                                {strategy.isDynamic && (
                                    <div className="mt-3">
                                        <Badge variant="outline" className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300 gap-1">
                                            <Star className="w-3 h-3 text-yellow-500" />
                                            Dynamic Content
                                        </Badge>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{strategy.description}</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Metrics Grid */}
                                <div className="space-y-2">
                                    {Object.entries(strategy.metrics).map(([key, value]) => {
                                        const MetricIcon = metricIcons[key as keyof typeof metricIcons];
                                        let valueColor = "text-slate-700 dark:text-slate-300";

                                        if (key === "speed") {
                                            if (value === "Very Fast") valueColor = "text-emerald-500 dark:text-emerald-400";
                                            else if (value === "Fast") valueColor = "text-cyan-500 dark:text-cyan-400";
                                            else if (value === "Slow") valueColor = "text-orange-500 dark:text-orange-400";
                                        }
                                        if (key === "seo" && value === "100%") valueColor = "text-emerald-500 dark:text-emerald-400";
                                        if (key === "seo" && value === "Poor") valueColor = "text-orange-500 dark:text-orange-400";
                                        if (key === "cost") {
                                            if (value === "Free") valueColor = "text-emerald-500 dark:text-emerald-400";
                                            else if (value === "Low") valueColor = "text-cyan-500 dark:text-cyan-400";
                                            else if (value === "Medium") valueColor = "text-yellow-600 dark:text-yellow-400";
                                        }

                                        return (
                                            <div key={key} className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/50 last:border-0">
                                                <div className="flex items-center gap-2">
                                                    <MetricIcon className="w-3.5 h-3.5 text-slate-500" />
                                                    <span className="text-xs text-slate-500 font-medium">{metricLabels[key as keyof typeof metricLabels]}</span>
                                                </div>
                                                <span className={`text-sm font-semibold ${valueColor}`}>{value}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Best For Section */}
                                <div className="pt-2">
                                    <p className="text-xs text-slate-500 mb-2 font-semibold tracking-wide">BEST FOR</p>
                                    <div className="flex flex-wrap gap-2">
                                        {strategy.bestFor.map((item) => (
                                            <span key={item} className={`text-xs px-2.5 py-1 rounded-full ${colors.badge} border`}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Pro Tip Section */}
            <div
                className="mt-8 p-6 rounded-2xl 
                bg-gradient-to-r from-slate-100 to-white 
                dark:from-slate-800/50 dark:to-slate-900/50 
                border border-slate-300 dark:border-slate-700 backdrop-blur-sm"
            >
                <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Pro Tip: Mix strategies per route</h3>

                        <p className="text-slate-600 dark:text-slate-400">
                            Use SSR for dynamic, ISR for semi-static, SSG for static pages. Next.js App Router makes it easy to combine these strategies within the same application for optimal
                            performance and developer experience.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400">
                            SSR → Dynamic
                        </Badge>

                        <Badge variant="outline" className="border-purple-500/30 text-purple-600 dark:text-purple-400">
                            ISR → Semi-Static
                        </Badge>

                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                            SSG → Static
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Quick Reference */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-500">SSR WHEN</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        Data changes every request or is user-specific
                    </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 text-center">
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">SSG WHEN</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        Content known at build time and rarely changes
                    </p>
                </div>

                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 text-center">
                    <p className="text-xs text-purple-600 dark:text-purple-500">ISR WHEN</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                        Content updates periodically (every N seconds)
                    </p>
                </div>

                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 text-center">
                    <p className="text-xs text-orange-600 dark:text-orange-500">CSR WHEN</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                        SEO not needed, behind authentication, high interactivity
                    </p>
                </div>
            </div>
        </div>
    );
}
