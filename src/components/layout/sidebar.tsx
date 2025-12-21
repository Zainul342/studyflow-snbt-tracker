"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    BarChart2,
    CheckSquare,
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
        title: "Command Center",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Survival Kit",
        href: "/dashboard/study",
        icon: BookOpen,
    },
    {
        title: "Target Tracker",
        href: "/progress",
        icon: Target,
    },
    {
        title: "War Room Analytics",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Daily Tasks",
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
            <div className="flex h-16 items-center px-6 border-b border-white/5">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6B4FFF] to-[#7C3AED] flex items-center justify-center">
                        <BookOpen size={16} className="text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">
                        STUDYFLOW
                    </span>
                </Link>
            </div>

            <ScrollArea className="h-[calc(100vh-64px)]">
                <div className="space-y-6 py-6 font-sans">
                    <div className="px-4">
                        <h2 className="mb-4 px-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                            Navigation
                        </h2>
                        <div className="space-y-1.5">
                            {sidebarNavItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start gap-3 h-11 px-4 rounded-xl transition-all duration-300 group",
                                            pathname === item.href
                                                ? "bg-[#6B4FFF]/10 text-[#6B4FFF] font-bold"
                                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-4.5 w-4.5 transition-colors",
                                            pathname === item.href ? "text-[#6B4FFF]" : "text-zinc-500 group-hover:text-zinc-300"
                                        )} />
                                        <span className="text-sm">{item.title}</span>
                                        {pathname === item.href && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6B4FFF]" />
                                        )}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-white/5 mx-6 w-auto" />

                    <div className="px-4">
                        <h2 className="mb-4 px-4 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                            Account
                        </h2>
                        <div className="space-y-1.5">
                            <Link href="/settings">
                                <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl group transition-all">
                                    <Settings className="h-4.5 w-4.5 text-zinc-500 group-hover:text-zinc-300" />
                                    <span className="text-sm">Settings</span>
                                </Button>
                            </Link>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl group transition-all">
                                <LogOut className="h-4.5 w-4.5 opacity-70 group-hover:opacity-100" />
                                <span className="text-sm font-medium">Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* User Profile Snippet */}
                <div className="absolute bottom-6 left-4 right-4">
                    <div className="glass-light p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#6B4FFF] to-purple-600 flex items-center justify-center font-black text-xs text-white shadow-lg shadow-purple-900/20">
                                {profile?.name ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "ZN"}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-white truncate">
                                    {profile?.name ? profile.name.split(" ")[0] : "Student"}
                                </p>
                                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                    <Sparkles size={10} className="text-[#BFFF0B]" />
                                    <span>Warrior</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
