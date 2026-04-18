import { formatDateTime } from "@/lib/date";

export default function SSRDemo() {
    // ⭐ Runs ONLY on the server (Server Component)
    const serverRenderTime = new Date().toISOString();

    const formattedTime = formatDateTime(serverRenderTime);

    return (
        <div className="space-y-2 text-sm">
            <p className="text-gray-500">🖥️ Rendering happens on the server before page reaches browser</p>

            {/* Server timestamp */}
            <div className="text-xs text-gray-400">
                <p>
                    Server render time: <span className="font-medium">{formattedTime}</span>
                </p>
            </div>

            <p className="text-green-600 font-medium">Server-fetched data delivered in HTML</p>

            <div className="text-xs text-gray-400 pt-2">✔ HTML already contains data ✔ Faster first content paint ✔ Better SEO ✔ No hydration mismatch</div>
        </div>
    );
}
