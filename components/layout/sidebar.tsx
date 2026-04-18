"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Monitor, Layers, FlaskConical, ChevronRight, X, Menu, Infinity, ImageDown, Microscope, Component, LayoutDashboard, GitCompare, Clock, RefreshCw } from "lucide-react";
import { useSidebar } from "./sidebar-context";

/* ───────────────── NAV CONFIG ───────────────── */

const navItems = [
    {
        section: "Rendering",
        icon: Monitor,
        items: [
            { name: "Overview", href: "/rendering", icon: LayoutDashboard },
            { name: "CSR vs SSR", href: "/rendering/compare", icon: GitCompare },
            { name: "SSR", href: "/rendering/ssr", icon: Clock },
            { name: "SSG", href: "/rendering/ssg", icon: Clock },
            { name: "ISR", href: "/rendering/isr", icon: RefreshCw },
            { name: "CSR", href: "/rendering/csr", icon: RefreshCw },
        ],
    },
    {
        section: "UI Patterns",
        icon: Layers,
        items: [
            { name: "Infinite Scroll", href: "/ui-patterns/infinite-scroll", icon: Infinity },
            { name: "Lazy Loading", href: "/ui-patterns/lazy-loading", icon: ImageDown },
        ],
    },
    {
        section: "Testing",
        icon: FlaskConical,
        items: [
            { name: "Unit Tests", href: "/testing/unit", icon: Microscope },
            { name: "Component Tests", href: "/testing/component", icon: Component },
        ],
    },
];

type NavItem = { name: string; href: string; icon: React.ElementType };
type NavSection = { section: string; icon: React.ElementType; items: NavItem[] };

/* ───────────────── NAV LINK ───────────────── */

function NavLink({ item, isActive, collapsed, onClick }: { item: NavItem; isActive: boolean; collapsed: boolean; onClick?: () => void }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            onClick={onClick}
            title={collapsed ? item.name : undefined}
            className={`
        group relative flex items-center gap-3 rounded-lg
        transition-all duration-150 select-none

        ${collapsed ? "justify-center px-0 py-2.5 w-full" : "px-3 py-2"}

        ${isActive ? "bg-accent text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-accent"}
      `}
        >
            <Icon size={16} className="shrink-0" strokeWidth={isActive ? 2 : 1.5} />
            {!collapsed && <span className="text-sm leading-none">{item.name}</span>}
            {isActive && !collapsed && <ChevronRight size={12} className="ml-auto text-muted-foreground" />}

            {collapsed && (
                <span
                    className="
          pointer-events-none absolute left-full ml-3 px-2.5 py-1.5
          rounded-md bg-popover border border-border
          text-popover-foreground text-xs whitespace-nowrap z-50
          opacity-0 translate-x-1
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-150
        "
                >
                    {item.name}
                </span>
            )}
        </Link>
    );
}

/* ───────────────── SECTION GROUP ───────────────── */

function SectionGroup({ section, pathname, collapsed, onLinkClick }: { section: NavSection; pathname: string; collapsed: boolean; onLinkClick?: () => void }) {
    const SectionIcon = section.icon;

    return (
        <div className="space-y-0.5">
            {collapsed ? (
                <div className="flex justify-center py-1.5">
                    <div className="w-1 h-1 rounded-full bg-border" />
                </div>
            ) : (
                <div className="flex items-center gap-2 px-3 mb-1.5">
                    <SectionIcon size={11} className="text-muted-foreground/70" strokeWidth={1.5} />
                    <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{section.section}</h3>
                </div>
            )}

            {section.items.map((item) => (
                <NavLink key={item.href} item={item} isActive={pathname === item.href} collapsed={collapsed} onClick={onLinkClick} />
            ))}
        </div>
    );
}

/* ───────────────── DESKTOP SIDEBAR ───────────────── */

function DesktopSidebar() {
    const { collapsed } = useSidebar();
    const pathname = usePathname();

    return (
        <aside
            className={`
        hidden md:flex flex-col h-screen sticky top-0 shrink-0
        border-r border-sidebar-border bg-sidebar
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[60px]" : "w-64"}
    `}
        >
            {/* Logo */}
            <div className={`flex items-center gap-2.5 p-4 pb-0 ${collapsed ? "justify-center" : ""}`}>
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-border flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">R</span>
                </div>

                {!collapsed && <span className="text-sm font-semibold tracking-wide text-foreground whitespace-nowrap">RenderLab</span>}
            </div>

            <div className={`flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-3 pt-6 ${collapsed ? "items-center" : ""}`}>
                <nav className="flex flex-col gap-6 w-full">
                    {navItems.map((section) => (
                        <SectionGroup key={section.section} section={section} pathname={pathname} collapsed={collapsed} />
                    ))}
                </nav>
            </div>
        </aside>
    );
}

/* ───────────────── MOBILE DRAWER ───────────────── */

function MobileDrawer() {
    const { mobileOpen, setMobileOpen } = useSidebar();
    const pathname = usePathname();

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <div
                onClick={() => setMobileOpen(false)}
                className={`
          fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
            />

            <aside
                className={`
        fixed top-0 left-0 h-full z-50 w-72 md:hidden
        bg-sidebar border-r border-sidebar-border
        flex flex-col transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="text-sm font-semibold text-foreground">RenderLab</span>

                    <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-6">
                    {navItems.map((section) => (
                        <SectionGroup key={section.section} section={section} pathname={pathname} collapsed={false} onLinkClick={() => setMobileOpen(false)} />
                    ))}
                </nav>
            </aside>
        </>
    );
}

/* ───────────────── EXPORTS ───────────────── */

export function Sidebar() {
    return (
        <>
            <DesktopSidebar />
            <MobileDrawer />
        </>
    );
}

export function MobileMenuButton() {
    const { setMobileOpen } = useSidebar();

    return (
        <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <Menu size={18} />
        </button>
    );
}
