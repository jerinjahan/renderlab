
import CSRDemo from "@/components/demo/CSRDemo";
import SSRDemo from "@/components/demo/SSRDemo";
import { formatDateTime } from "@/lib/date";

function Card({ title, type, description, children }: { title: string; type: string; description: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl p-5 shadow-sm space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{title}</h2>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{type}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500">{description}</p>

            {/* Demo */}
            <div className="pt-3 border-t">{children}</div>
        </div>
    );
}

export default function RenderingComparePage() {
    // Runs on server only
    const buildTimeISO = new Date().toISOString();
    const buildTime = formatDateTime(buildTimeISO);

    const isrTimeISO = new Date().toISOString();
    const isrTime = formatDateTime(isrTimeISO);

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold">SSR vs SSG vs ISR vs CSR</h1>
                <p className="text-gray-500 mt-1">Understanding when and how Next.js renders pages</p>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* SSR */}
                <Card title="Server Side Rendering" type="SSR" description="Rendered on every request from the server.">
                    <SSRDemo />
                </Card>

                {/* CSR */}
                <Card title="Client Side Rendering" type="CSR" description="Rendered in browser after JS loads.">
                    <CSRDemo />
                </Card>

                {/* SSG */}
                <Card title="Static Site Generation" type="SSG" description="Pre-rendered at build time (fastest delivery).">
                    <div className="text-sm space-y-1">
                        <p>📦 Static build snapshot</p>
                        <p className="text-green-600 font-medium">Build Time: {buildTime}</p>
                        <p className="text-gray-400 text-xs">(This is generated once during build)</p>
                    </div>
                </Card>

                {/* ISR */}
                <Card title="Incremental Static Regeneration" type="ISR" description="Static page updated in the background after interval.">
                    <div className="text-sm space-y-1">
                        <p>⚡ Cached static page</p>
                        <p className="text-blue-600 font-medium">Last Render: {isrTime}</p>
                        <p className="text-gray-400 text-xs">(Simulates revalidation behavior)</p>
                    </div>
                </Card>
            </div>

            {/* INSIGHT SECTION */}
            <div className="border-t pt-6 text-sm text-gray-600 space-y-2">
                <p className="font-semibold">💡 Key Takeaway</p>

                <p>Next.js does not force a single rendering strategy. Instead, you choose per route based on performance, SEO, and interactivity.</p>

                <p className="text-gray-500">Real-world apps always use a hybrid mix of SSR + CSR + SSG + ISR.</p>
            </div>
        </div>
    );
}
