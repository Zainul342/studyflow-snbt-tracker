"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    BarChart2,
    Settings,
    LogOut,
    Sparkles,
    Target,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mockDB, UserProfile } from "@/lib/data/mock-db";

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Materi Belajar",
        href: "/dashboard/study",
        icon: BookOpen,
    },
    {
        title: "Cek Progress",
        href: "/dashboard/progress",
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

export function Sidebar() {
    const pathname = usePathname();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const userProfile = mockDB.getProfile();
        setProfile(userProfile);
    }, []);

    return (
        <div className="hidden border-r border-white/5 bg-[#0A0A0A] md:block w-64 h-screen fixed left-0 top-0 z-30">
            {/* Sidebar Grid Texture */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none opacity-50" />

            <div className="relative z-10 flex h-16 items-center px-6 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-7 h-7 rounded-sm overflow-hidden border border-white/10 group-hover:border-[#BFFF0B] transition-colors">
                        <Image src="/logo.png" alt="StudyFlow" fill className="object-contain" />
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white group-hover:text-[#BFFF0B] transition-colors">
                        STUDYFLOW
                    </span>
                </Link>
            </div>

            <ScrollArea className="h-[calc(100vh-64px)] relative z-10">
                <div className="flex flex-col h-full font-sans">
                    <div className="space-y-6 py-6">
                        <div className="px-4">
                            <h2 className="mb-3 px-4 text-[9px] font-black tracking-widest text-zinc-600 uppercase">
                                Navigation
                            </h2>
                            <div className="space-y-1">
                                {sidebarNavItems.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "w-full justify-start gap-3 h-10 px-4 rounded-sm transition-all duration-200 group text-xs font-bold uppercase tracking-wide",
                                                "active:scale-95 hover:scale-[1.02]",
                                                pathname === item.href
                                                    ? "bg-[#6B4FFF]/10 text-[#6B4FFF] border border-[#6B4FFF]/20 shadow-[0_0_15px_rgba(107,79,255,0.1)]"
                                                    : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "h-4 w-4 transition-colors",
                                                pathname === item.href ? "text-[#6B4FFF]" : "text-zinc-600 group-hover:text-zinc-300"
                                            )} />
                                            <span>{item.title}</span>
                                            {pathname === item.href && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-sm bg-[#6B4FFF] animate-pulse" />
                                            )}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-white/5 mx-6 w-auto" />

                        <div className="px-4">
                            <h2 className="mb-3 px-4 text-[9px] font-black tracking-widest text-zinc-600 uppercase">
                                Account
                            </h2>
                            <div className="space-y-1">
                                <Link href="/settings">
                                    <Button variant="ghost" className="w-full justify-start gap-3 h-10 px-4 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm group transition-all text-xs border border-transparent hover:border-white/5 font-bold uppercase tracking-wide">
                                        <Settings className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300" />
                                        <span>Settings</span>
                                    </Button>
                                </Link>
                                <Button variant="ghost" className="w-full justify-start gap-3 h-10 px-4 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 rounded-sm group transition-all text-xs border border-transparent hover:border-red-500/10 font-bold uppercase tracking-wide">
                                    <LogOut className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 mt-8 pb-8">
                        <div className="p-3 rounded-sm border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-sm bg-gradient-to-br from-[#6B4FFF] to-purple-800 flex items-center justify-center font-black text-[10px] text-white border border-white/10 group-hover:border-[#6B4FFF] transition-colors">
                                    {profile?.name ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "ZN"}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-black text-white truncate group-hover:text-[#BFFF0B] transition-colors uppercase tracking-tight">
                                        {profile?.name ? profile.name.split(" ")[0] : "Student"}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[9px] text-zinc-600 font-bold uppercase tracking-wider group-hover:text-zinc-400">
                                        <Sparkles size={10} className="text-[#BFFF0B]" />
                                        <span>Warrior</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
