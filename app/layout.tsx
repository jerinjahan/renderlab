import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SidebarProvider } from "@/components/layout/sidebar-context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "RenderLab - Frontend Architecture Explorer",
    description: "Learn SSR, CSR, ISR, UI patterns, and testing through interactive demos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <html 
            lang="en" 
            className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} 
            data-gramm="false" suppressHydrationWarning={true}
        >
            {/* <body className="flex h-screen bg-neutral-950 text-white overflow-hidden"> */}
            <body suppressHydrationWarning className="flex h-screen">
                <SidebarProvider>
                    {/* Sidebar: sticky on desktop, drawer on mobile */}
                    <Sidebar />

                    {/* Main content column */}
                    <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
                        {/* Topbar: has collapse toggle (desktop) + hamburger (mobile) */}
                        <Topbar />

                        {/* Page */}
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
