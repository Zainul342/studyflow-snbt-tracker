"use client";

import { Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-xl px-4 sticky top-0 z-20">
            <div className="w-full flex-1">
                <form>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-[#6B4FFF] transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search concepts, tasks..."
                            className="h-9 w-full bg-white/5 border-white/5 pl-9 md:w-[200px] lg:w-[320px] text-zinc-200 text-xs placeholder:text-zinc-600 focus-visible:ring-[#6B4FFF] rounded-sm transition-all"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-3">
                <Button size="sm" variant="ghost" className="h-9 text-zinc-500 hover:text-white hover:bg-white/5 rounded-sm border border-white/5 px-3 shadow-sm transition-all hidden sm:flex text-xs">
                    <Video className="mr-2 h-3.5 w-3.5" />
                    Tutorial
                </Button>
                <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#BFFF0B] to-emerald-400 p-0.5 md:hidden">
                    <div className="w-full h-full rounded-sm bg-black flex items-center justify-center text-[9px] font-black text-[#BFFF0B]">
                        ZN
                    </div>
                </div>
            </div>
        </header>
    );
}
