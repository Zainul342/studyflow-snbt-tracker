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
    Atom,
    Target
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
        title: "Progress Tracker",
        href: "/progress",
        icon: Target,
    },
    {
        title: "Analisis Tryout",
        href: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Tugas",
        href: "/tasks",
        icon: CheckSquare,
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
        <div className="hidden border-r bg-zinc-950/50 backdrop-blur-xl md:block w-64 h-screen fixed left-0 top-0 z-30">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <Atom className="h-6 w-6 text-blue-500" />
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-bold">
                        StudyFlow
                    </span>
                </Link>
            </div>

            <ScrollArea className="h-[calc(100vh-60px)]">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-zinc-500 uppercase">
                            Main Menu
                        </h2>
                        <div className="space-y-1">
                            {sidebarNavItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-2",
                                            pathname === item.href
                                                ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-zinc-800 mx-4 w-auto" />

                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-zinc-500 uppercase">
                            System
                        </h2>
                        <div className="space-y-1">
                            <Link href="/settings">
                                <Button variant="ghost" className="w-full justify-start gap-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Button>
                            </Link>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* User Profile Snippet */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs">
                            {profile?.name ? profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "ZN"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium leading-none text-zinc-200">
                                {profile?.name ? profile.name.split(" ")[0] : "Student"}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                                Target: {profile?.targetUniversity || "ITB"} {profile?.targetDate ? new Date(profile.targetDate).getFullYear() : "2026"}
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
