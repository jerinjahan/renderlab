"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type SidebarContextType = {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
    toggleCollapsed: () => void;
    mobileOpen: boolean;
    setMobileOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed]   = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const previousPathName = useRef(pathname);

    // Close mobile drawer on route change
    useEffect(() => {
        if (previousPathName.current !== pathname) {
            setMobileOpen(false);
            previousPathName.current = pathname;
        }
    }, [pathname]);

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                toggleCollapsed: () => setCollapsed((v) => !v),
                mobileOpen,
                setMobileOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
    return ctx;
}