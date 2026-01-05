"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, BookOpen, BarChart2, Zap, Settings, LogOut, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

// Reusing same nav items for consistency
const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Peta Materi",
        href: "/dashboard/study",
        icon: BookOpen,
    },
    {
        title: "Tryout Tracker",
        href: "/dashboard/tryout",
        icon: Target,
    },
    {
        title: "Analitik Progres",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Agenda Harian",
        href: "/tasks",
        icon: Zap,
    },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="sm"
                className="text-white bg-white/5 hover:bg-white/10 gap-2 border border-white/10 px-3 h-9"
                onClick={() => setIsOpen(true)}
            >
                <Menu className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-widest uppercase">Menu</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 z-50 w-[280px] bg-[#09090b] border-l border-white/10 p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <span className="text-xl font-black tracking-widest text-[#BFFF0B]">STUDYFLOW</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-500 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="space-y-2 flex-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={cn(
                                            "flex items-center gap-4 px-4 py-4 rounded-sm transition-all mb-2",
                                            pathname === item.href
                                                ? "bg-[#6B4FFF] text-white shadow-[0_0_20px_-5px_#6B4FFF]"
                                                : "text-zinc-200 hover:text-white hover:bg-white/10"
                                        )}>
                                            <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-white" : "text-[#6B4FFF]")} />
                                            <span className="text-[11px] font-bold uppercase tracking-widest">
                                                {item.title}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-2">
                                <Link href="/settings" onClick={() => setIsOpen(false)}>
                                    <div className="flex items-center gap-4 px-4 py-3 text-zinc-300 hover:text-white transition-colors">
                                        <Settings className="w-5 h-5" />
                                        <span className="text-sm font-black uppercase tracking-wider">Settings</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-sm transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="text-sm font-bold uppercase">Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
