"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { SUBTES_STRUCTURE } from "@/lib/data/materi-structure";
import { mockDB } from "@/lib/data/mock-db";
import { useEffect } from "react";
import { SubmateriItem } from "./submateri-item";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

export function HierarchyTree() {
    // State for progress map: subtesId -> { current, total, percentage }
    const [progressMap, setProgressMap] = useState<Record<string, { current: number; total: number; percentage: number }>>({});

    // Independent state for each subtes expansion
    const [expandedSubtes, setExpandedSubtes] = useState<string[]>(["pu"]); // Default open PU

    const toggleSubtes = (id: string) => {
        setExpandedSubtes(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const { userData } = useAuth(); // Live data from Firestore

    useEffect(() => {
        const calculateProgress = () => {
            // MVP: If no progress data yet, fallback to empty object
            const allProgress = userData?.progress || {};
            const newMap: Record<string, any> = {};

            SUBTES_STRUCTURE.forEach(subtes => {
                let totalChecks = 0;
                let completedChecks = 0;

                subtes.materi.forEach(m => {
                    m.submateri.forEach(s => {
                        totalChecks += 3; // Belajar, Latsol, Review
                        const p = allProgress[s.id];
                        if (p) {
                            if (p.belajar) completedChecks++;
                            if (p.latsol) completedChecks++;
                            if (p.review) completedChecks++;
                        }
                    });
                });

                newMap[subtes.id] = {
                    current: completedChecks,
                    total: totalChecks,
                    percentage: totalChecks === 0 ? 0 : Math.round((completedChecks / totalChecks) * 100)
                };
            });

            setProgressMap(newMap);
        };

        calculateProgress();
    }, [userData]); // Re-run whenever Firestore data changes

    return (
        <div className="space-y-4">
            {SUBTES_STRUCTURE.map((subtes) => {
                const stats = progressMap[subtes.id] || { current: 0, total: 0, percentage: 0 };

                return (
                    <div key={subtes.id} className="bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden transition-all hover:border-zinc-700">
                        {/* Level 1: Subtes Header */}
                        <button
                            onClick={() => toggleSubtes(subtes.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-8 h-8 rounded-sm flex items-center justify-center border transition-colors",
                                    expandedSubtes.includes(subtes.id)
                                        ? "bg-[#BFFF0B]/10 border-[#BFFF0B]/20 text-[#BFFF0B]"
                                        : "bg-zinc-800 border-zinc-700 text-zinc-500 group-hover:text-zinc-300"
                                )}>
                                    {expandedSubtes.includes(subtes.id) ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <h3 className={cn(
                                        "text-sm font-bold uppercase tracking-wider transition-colors",
                                        expandedSubtes.includes(subtes.id) ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"
                                    )}>
                                        {subtes.name}
                                    </h3>
                                    <p className="text-[10px] text-zinc-600 font-mono mt-0.5">
                                        {subtes.materi.length} Materi • {subtes.code}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Progress Bar */}
                                <div className="hidden md:flex items-center gap-3 w-48">
                                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#BFFF0B] rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stats.percentage}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 w-8 text-right">{stats.percentage}%</span>
                                </div>
                            </div>
                        </button>

                        {/* Nested Content */}
                        <AnimatePresence>
                            {expandedSubtes.includes(subtes.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="border-t border-zinc-800 bg-zinc-950/30">
                                        {subtes.materi.map((materi) => (
                                            <div key={materi.id} className="border-b border-zinc-800/50 last:border-0">
                                                {/* Level 2: Materi Header */}
                                                <div className="px-4 py-3 bg-white/[0.02] flex items-center gap-3">
                                                    <BookOpen className="w-4 h-4 text-zinc-600" />
                                                    <span className="text-sm font-semibold text-zinc-300">
                                                        {materi.name}
                                                    </span>
                                                </div>

                                                {/* Level 3: Submateri List */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 pt-2">
                                                    {materi.submateri.map((sub) => (
                                                        <SubmateriItem
                                                            key={sub.id}
                                                            id={sub.id}
                                                            name={sub.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    );
}
