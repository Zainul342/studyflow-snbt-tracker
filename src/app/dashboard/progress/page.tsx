"use client";

import { HierarchyTree } from "@/components/tracking/hierarchy-tree";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { mockDB } from "@/lib/data/mock-db";

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
                <GlobalStats />
            </div>

            {/* Tree View */}
            <HierarchyTree />
        </div>
    );
}

function GlobalStats() {
    const [stats, setStats] = useState({
        completedBelajar: 0,
        completedLatsol: 0,
        completedReview: 0,
        totalItems: 93,
        percentMastered: 0
    });

    useEffect(() => {
        const updateStats = () => {
            const newStats = mockDB.calculateStats();
            setStats(newStats as any);
        };

        // Initial load
        updateStats();

        // Listen for updates
        const handleUpdate = () => updateStats();
        window.addEventListener("progress-updated" as any, handleUpdate);
        return () => window.removeEventListener("progress-updated" as any, handleUpdate);
    }, []);

    const totalCompleted = stats.completedBelajar + stats.completedLatsol + stats.completedReview;
    const maxPossible = stats.totalItems * 3;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex items-center gap-6 shadow-lg shadow-black/20">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total Checkboxes</p>
                <p className="text-2xl font-black text-white">
                    {totalCompleted}
                    <span className="text-zinc-600 text-lg">/{maxPossible}</span>
                </p>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 w-32">Mastered (Review)</p>
                <p className="text-2xl font-black text-[#BFFF0B]">
                    {Math.round(stats.percentMastered)}%
                </p>
            </div>
        </div>
    );
}
