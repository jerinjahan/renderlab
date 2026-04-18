// components/ssr-demo/Skeletons.tsx

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="
                        rounded-xl border border-gray-200 dark:border-white/[0.07]
                        bg-gray-50 dark:bg-white/[0.03]
                        p-5 space-y-3
                    "
                >
                    <div className="h-3 w-16 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    <div className="h-7 w-24 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    <div className="h-2.5 w-20 rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                </div>
            ))}
        </div>
    );
}

export function ArticlesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="
                        rounded-xl border border-gray-200 dark:border-white/[0.07]
                        bg-gray-50 dark:bg-white/[0.03]
                        p-5 space-y-4
                    "
                    style={{ animationDelay: `${i * 80}ms` }}
                >
                    {/* category badge */}
                    <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />

                    {/* title */}
                    <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
                    </div>

                    {/* excerpt */}
                    <div className="space-y-1.5">
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                        <div className="h-3 w-4/6 rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                    </div>

                    {/* footer */}
                    <div className="flex items-center gap-3 pt-1">
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                        <div className="ml-auto h-3 w-16 rounded bg-gray-200 dark:bg-white/[0.06] animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
