"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-8 pointer-events-none">
            <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 flex items-center gap-4 pointer-events-auto shadow-2xl">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white rounded-full px-4 h-10 gap-2">
                    <Menu className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wide font-medium">Menu</span>
                </Button>

                <div className="px-6 flex items-center justify-center">
                    <span className="font-bold text-xl tracking-tight text-white">STUDY<span className="text-[#ccff00]">FLOW</span>.</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-full px-6 h-10 text-xs uppercase tracking-wide font-medium">
                        Log In
                    </Button>
                    <Button size="sm" className="bg-[#ccff00] text-black hover:bg-[#b0dd00] rounded-full px-6 h-10 text-xs uppercase tracking-wide font-bold">
                        Join
                    </Button>
                </div>
            </div>
        </nav>
    );
}
