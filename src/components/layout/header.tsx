"use client";

import { Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="flex h-16 items-center gap-4 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-xl px-6 sticky top-0 z-20">
            <div className="w-full flex-1">
                <form>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#6B4FFF] transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search concepts, tasks..."
                            className="h-10 w-full bg-white/5 border-white/5 pl-10 md:w-[200px] lg:w-[320px] text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-[#6B4FFF] rounded-xl transition-all"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-3">
                <Button size="sm" variant="ghost" className="h-10 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl border border-white/5 px-4 shadow-sm transition-all hidden sm:flex">
                    <Video className="mr-2 h-4 w-4" />
                    Tutorial
                </Button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BFFF0B] to-emerald-400 p-0.5 md:hidden">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-black text-[#BFFF0B]">
                        ZN
                    </div>
                </div>
            </div>
        </header>
    );
}
