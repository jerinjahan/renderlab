"use client";

import { PanelLeftClose, PanelLeftOpen, Bell, User, Settings, LogOut, ChevronDown, Moon, Sun } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { MobileMenuButton } from "./sidebar";
import { useState, useEffect } from "react";

export function Topbar() {
    const { collapsed, toggleCollapsed } = useSidebar();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Initialize theme - runs once on mount
    useEffect(() => {
        // Read initial value directly without setting a "mounted" state
        const saved = localStorage.getItem("theme");
        let isDark = false;

        if (saved === "dark") {
            isDark = true;
            document.documentElement.classList.add("dark");
        } else if (saved === "light") {
            isDark = false;
            document.documentElement.classList.remove("dark");
        } else {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            isDark = systemDark;
            if (systemDark) {
                document.documentElement.classList.add("dark");
            }
        }
        
        // Set state once after all calculations
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDarkMode(isDark);
    }, []); // Empty dependency array - runs once

    // Handle theme changes - only runs when isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".user-menu-container")) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <header className="h-20 flex items-center justify-between px-6 border-b backdrop-blur-xl sticky top-0 z-20 dark:bg-black/50 dark:border-white/10 border-gray-200">
            {/* Left section */}
            <div className="flex items-center gap-4">
                {/* Desktop: collapse/expand sidebar */}
                <button
                    onClick={toggleCollapsed}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="
                        hidden md:flex items-center justify-center
                        w-10 h-10 rounded-lg
                        text-gray-600 hover:text-gray-900 hover:bg-gray-100
                        transition-all duration-150
                        dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5
                    "
                >
                    {collapsed ? <PanelLeftOpen size={20} strokeWidth={1.5} /> : <PanelLeftClose size={20} strokeWidth={1.5} />}
                </button>

                {/* Mobile: open drawer */}
                <MobileMenuButton />

                {/* Divider */}
                <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-white/10" />

                {/* Logo and title */}
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div>
                        <span className="font-semibold text-base text-gray-900 dark:text-white">RenderLab</span>
                        <span className="hidden lg:inline ml-2 text-sm text-gray-500 dark:text-white/40">• Frontend Architecture Explorer</span>
                    </div>
                </div>
            </div>

            {/* Right section - User Navigation */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="
                        w-10 h-10 rounded-lg
                        text-gray-600 hover:text-gray-900 hover:bg-gray-100
                        transition-all duration-150
                        flex items-center justify-center
                        dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5
                    "
                    title="Toggle theme"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <button
                    className="
                        w-10 h-10 rounded-lg
                        text-gray-600 hover:text-gray-900 hover:bg-gray-100
                        transition-all duration-150
                        flex items-center justify-center relative
                        dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5
                    "
                    title="Notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full dark:bg-red-400" />
                </button>

                {/* User Menu */}
                <div className="relative user-menu-container">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setUserMenuOpen(!userMenuOpen);
                        }}
                        className="
                            flex items-center gap-3
                            px-3 py-2 rounded-lg
                            hover:bg-gray-100
                            transition-all duration-150
                            border border-gray-200
                            dark:border-white/10 dark:hover:bg-white/5
                        "
                    >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">JD</span>
                        </div>

                        {/* User info - hidden on mobile */}
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                            <p className="text-xs text-gray-500 dark:text-white/40">john@renderlab.com</p>
                        </div>

                        <ChevronDown size={14} className="text-gray-500 hidden md:block dark:text-white/40" />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden z-50 dark:bg-slate-900 dark:border-white/10">
                            <div className="p-2">
                                <div className="px-3 py-2 border-b border-gray-100 mb-2 dark:border-white/10">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
                                    <p className="text-xs text-gray-500 truncate dark:text-white/40">john@renderlab.com</p>
                                </div>

                                <button
                                    className="
                                        w-full flex items-center gap-3 px-3 py-2 rounded-md
                                        text-gray-700 hover:text-gray-900 hover:bg-gray-100
                                        transition-all duration-150
                                        dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5
                                    "
                                >
                                    <User size={16} />
                                    <span className="text-sm">Profile</span>
                                </button>

                                <button
                                    className="
                                        w-full flex items-center gap-3 px-3 py-2 rounded-md
                                        text-gray-700 hover:text-gray-900 hover:bg-gray-100
                                        transition-all duration-150
                                        dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5
                                    "
                                >
                                    <Settings size={16} />
                                    <span className="text-sm">Settings</span>
                                </button>

                                <div className="border-t border-gray-100 my-2 dark:border-white/10" />

                                <button
                                    className="
                                        w-full flex items-center gap-3 px-3 py-2 rounded-md
                                        text-red-600 hover:text-red-700 hover:bg-red-50
                                        transition-all duration-150
                                        dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/10
                                    "
                                >
                                    <LogOut size={16} />
                                    <span className="text-sm">Log out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}