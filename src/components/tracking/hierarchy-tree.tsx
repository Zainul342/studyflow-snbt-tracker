"use client";

import { useState, useEffect } from "react";
import {
    ChevronDown,
    ChevronRight,
    BookOpen,
    BrainCircuit,
    Target,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SUBTES_STRUCTURE, Subtes, Materi, Submateri } from "@/lib/data/materi-structure";
import { mockDB, UserProgressMap } from "@/lib/data/mock-db";
import { StatusCheckbox } from "./status-checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function HierarchyTree() {
    const [progressData, setProgressData] = useState<UserProgressMap>({});
    const [expandedSubtes, setExpandedSubtes] = useState<string[]>([]);
    const [expandedMateri, setExpandedMateri] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            // Small artificial delay to simulate network
            await new Promise(r => setTimeout(r, 500));
            const data = mockDB.getUserProgress();
            setProgressData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSubtes = (id: string) => {
        setExpandedSubtes(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleMateri = (id: string) => {
        setExpandedMateri(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Helper to check if a specific submateri is checked in the progress map
    const isChecked = (subId: string, type: "belajar" | "latsol" | "review") => {
        return progressData[subId]?.[type] || false;
    };

    // Calculate generic progress for a node (visual only for now)
    const calculateNodeProgress = (items: Submateri[]) => {
        if (items.length === 0) return 0;
        let completed = 0;
        let total = items.length * 3; // 3 checkboxes per item

        items.forEach(item => {
            if (progressData[item.id]?.belajar) completed++;
            if (progressData[item.id]?.latsol) completed++;
            if (progressData[item.id]?.review) completed++;
        });

        return Math.round((completed / total) * 100);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-w-4xl mx-auto pb-20">
            {SUBTES_STRUCTURE.map((subtes) => (
                <div
                    key={subtes.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-lg transition-all hover:border-zinc-700"
                >
                    {/* Subtes Header */}
                    <div
                        onClick={() => toggleSubtes(subtes.id)}
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors select-none"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#ccff00]">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg tracking-tight text-white">{subtes.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <span>{subtes.materiList.length} Topik</span>
                                    <span>•</span>
                                    <span>{subtes.materiList.reduce((acc, m) => acc + m.submateriList.length, 0)} Sub-bab</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Mini progress ring or text could go here */}
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 text-zinc-500 transition-transform duration-300",
                                    expandedSubtes.includes(subtes.id) && "rotate-180"
                                )}
                            />
                        </div>
                    </div>

                    {/* Materi List (Accordion Body) */}
                    <AnimatePresence>
                        {expandedSubtes.includes(subtes.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-4 pt-0 space-y-2">
                                    {subtes.materiList.map((materi) => (
                                        <div key={materi.id} className="ml-4 border-l border-zinc-800 pl-4 py-2">
                                            {/* Materi Header */}
                                            <div
                                                onClick={() => toggleMateri(materi.id)}
                                                className="flex items-center gap-2 cursor-pointer group mb-3"
                                            >
                                                <div className={cn(
                                                    "w-4 h-4 rounded-full border border-zinc-700 flex items-center justify-center transition-colors",
                                                    expandedMateri.includes(materi.id) ? "bg-[#ccff00] border-[#ccff00]" : "group-hover:border-white"
                                                )}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                                </div>
                                                <span className={cn(
                                                    "font-medium text-zinc-300 group-hover:text-white transition-colors",
                                                    expandedMateri.includes(materi.id) && "text-white"
                                                )}>
                                                    {materi.name}
                                                </span>

                                                {/* Materi Progress Bar */}
                                                <div className="ml-auto w-24">
                                                    <Progress value={calculateNodeProgress(materi.submateriList)} className="h-1.5 bg-zinc-800" />
                                                </div>
                                            </div>

                                            {/* Submateri List */}
                                            <AnimatePresence>
                                                {expandedMateri.includes(materi.id) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="grid gap-3 pl-6"
                                                    >
                                                        {materi.submateriList.map((sub) => (
                                                            <div
                                                                key={sub.id}
                                                                className="bg-black/40 rounded-lg p-3 border border-zinc-800/50 hover:border-zinc-700 transition-colors"
                                                            >
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                    <div className="flex items-start gap-2 max-w-sm">
                                                                        {sub.isAdvanced && (
                                                                            <span className="bg-purple-500/10 text-purple-400 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider mt-0.5">
                                                                                High
                                                                            </span>
                                                                        )}
                                                                        <span className="text-sm text-zinc-300">
                                                                            {sub.name}
                                                                        </span>
                                                                    </div>

                                                                    {/* Checkboxes */}
                                                                    <div className="flex items-center gap-4">
                                                                        <StatusCheckbox
                                                                            submateriId={sub.id}
                                                                            type="belajar"
                                                                            label="Belajar"
                                                                            initialChecked={isChecked(sub.id, "belajar")}
                                                                            onUpdate={loadProgress} // Refresh state
                                                                        />
                                                                        <div className="h-4 w-px bg-zinc-800"></div>
                                                                        <StatusCheckbox
                                                                            submateriId={sub.id}
                                                                            type="latsol"
                                                                            label="Latsol"
                                                                            initialChecked={isChecked(sub.id, "latsol")}
                                                                            onUpdate={loadProgress}
                                                                        />
                                                                        <div className="h-4 w-px bg-zinc-800"></div>
                                                                        <StatusCheckbox
                                                                            submateriId={sub.id}
                                                                            type="review"
                                                                            label="Review"
                                                                            initialChecked={isChecked(sub.id, "review")}
                                                                            onUpdate={loadProgress}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
