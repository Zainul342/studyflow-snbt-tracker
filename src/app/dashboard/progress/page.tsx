"use client";

import { HierarchyTree } from "@/components/tracking/hierarchy-tree";
import { Sparkles } from "lucide-react";

export default function TrackingPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                        Target Tracker
                        <Sparkles className="w-5 h-5 text-[#BFFF0B]" />
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">
                        Track your progress across all 7 SNBT Subtes.
                    </p>
                </div>

                {/* Global Progress Summary Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex items-center gap-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Progress</p>
                        <p className="text-2xl font-black text-white">0<span className="text-zinc-600 text-lg">/93</span></p>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Mastered</p>
                        <p className="text-2xl font-black text-[#BFFF0B]">0%</p>
                    </div>
                </div>
            </div>

            {/* Tree View */}
            <HierarchyTree />
        </div>
    );
}
