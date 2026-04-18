"use client";

import { formatDateTime } from "@/lib/date";
import { useEffect, useState } from "react";

export default function CSRDemo() {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [renderTime] = useState(new Date().toISOString());

    const formattedTime = formatDateTime(renderTime);

    useEffect(() => {
        // Simulate API call delay (client-side fetch)
        const timer = setTimeout(() => {
            setData("Client-side data loaded from browser");
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-2 text-sm">
            <p className="text-gray-500">🌐 Rendering happens in the browser after JS loads</p>

            <p className="text-xs text-gray-400">Component mounted at: {formattedTime}</p>

            {loading ? <p className="text-blue-500 animate-pulse">Loading data in browser...</p> : <p className="text-green-600 font-medium">{data}</p>}

            <div className="text-xs text-gray-400 pt-2">✔ No HTML data from server ✔ UI appears after hydration</div>
        </div>
    );
}
