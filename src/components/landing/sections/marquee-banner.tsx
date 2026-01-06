"use client";

import { Star } from "lucide-react";

export function MarqueeBanner() {
    return (
        <div className="fixed top-[70px] left-0 right-0 z-40 pointer-events-none flex justify-center">
            <div className="bg-[#BFFF0B] py-1.5 px-4 rounded-sm overflow-hidden flex items-center justify-center gap-4 w-[90vw] sm:w-[500px] shadow-xl shadow-black/20 border border-[#BFFF0B]/50">
                <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 px-4 h-full">
                            <span className="text-black font-bold text-[10px] tracking-wider leading-none">JELAJAHI SHOWCASE STUDYFLOW</span>
                            <Star className="w-3 h-3 text-black fill-black" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
