import Link from "next/link";

const renderingPatterns = [
    {
        title: "SSR (Server Side Rendering)",
        desc: "Rendered on server for every request",
        href: "/rendering/ssr",
    },
    {
        title: "CSR (Client Side Rendering)",
        desc: "Rendered in browser using React state & hooks",
        href: "/rendering/csr",
    },
    {
        title: "SSG (Static Site Generation)",
        desc: "Pre-rendered at build time",
        href: "/rendering/ssg",
    },
    {
        title: "ISR (Incremental Static Regeneration)",
        desc: "Static pages with background updates",
        href: "/rendering",
    },
];

export default function Page() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Rendering Strategies in Next.js</h1>
                <p className="text-gray-500 mt-1">Compare CSR, SSR, SSG, and ISR with live interactive demos</p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-4">
                {renderingPatterns.map((p) => (
                    <Link key={p.href} href={p.href} className="border rounded-lg p-5 bg-white hover:shadow-md transition">
                        <h2 className="font-semibold">{p.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
