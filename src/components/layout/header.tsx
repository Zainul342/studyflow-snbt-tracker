"use client";

import { Search, Video, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./mobile-nav";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const isDashboard = pathname === "/dashboard";

    return (
        <header className="flex h-14 items-center gap-2 md:gap-4 border-b border-white/5 bg-[#0A0A0A] md:bg-[#0A0A0A]/50 md:backdrop-blur-xl px-3 md:px-4 sticky top-0 z-30">
            {/* Back Button for mobile navigation */}
            {!isDashboard && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 md:hidden text-zinc-400"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            )}

            <div className="w-full flex-1">
                <form className={cn("hidden sm:block", !isDashboard && "sm:block")}>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-[#6B4FFF] transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search concepts, tasks..."
                            className="h-9 w-full bg-white/5 border-white/5 pl-9 md:w-[200px] lg:w-[320px] text-zinc-200 text-xs placeholder:text-zinc-600 focus-visible:ring-[#6B4FFF] rounded-sm transition-all"
                        />
                    </div>
                </form>
                {/* Mobile Page Title if search is hidden */}
                {!isDashboard && (
                    <div className="sm:hidden font-black text-[11px] uppercase tracking-widest text-zinc-300 ml-2">
                        {pathname.split('/').pop()?.replace('-', ' ')}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
                <Button size="sm" variant="ghost" className="h-9 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm border border-white/5 px-3 shadow-sm transition-all hidden sm:flex text-xs">
                    <Video className="mr-2 h-3.5 w-3.5" />
                    Tutorial
                </Button>

                <MobileNav />
            </div>
        </header>
    );
}
