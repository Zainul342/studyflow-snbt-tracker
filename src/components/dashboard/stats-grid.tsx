"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { mockDB } from "@/lib/data/mock-db";
import { calculateProgress, ProgressStats } from "@/lib/calculations/progress-calculator";
import { Progress } from "@/components/ui/progress";
import { Activity, Book, Trophy, Zap, ArrowUpRight, CheckCircle2 } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export function StatsGrid() {
    const [stats, setStats] = useState<ProgressStats | null>(null);

    useEffect(() => {
        const loadStats = () => {
            const data = mockDB.getUserProgress();
            const calculated = calculateProgress(data);
            setStats(calculated);
        };

        loadStats();
        const interval = setInterval(loadStats, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return (
        <div className="flex items-center gap-3 text-zinc-500 font-bold tracking-widest uppercase text-xs">
            <div className="w-2 h-2 rounded-full bg-[#6B4FFF] animate-ping" />
            Loading Database...
        </div>
    );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* Global Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div variants={item} className="relative group rounded-sm border border-white/5 bg-white/5 p-4 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#6B4FFF]/10 blur-[40px] -mr-12 -mt-12 group-hover:bg-[#6B4FFF]/20 transition-colors" />
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 rounded-sm bg-[#6B4FFF]/10 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-[#6B4FFF]" />
                        </div>
                        <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block">System Sync</span>
                        <div className="text-3xl font-black text-white mb-3 tracking-tighter">{stats.globalPercentage}%</div>
                        <Progress value={stats.globalPercentage} className="h-1.5 bg-white/5" />
                        <div className="flex justify-between mt-2.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            <span>Checkpoints</span>
                            <span className="text-zinc-300">{stats.completedItems} / {stats.totalItems}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="rounded-sm border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 rounded-sm bg-orange-500/10 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-orange-500" />
                        </div>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block">Current Streak</span>
                        <div className="text-3xl font-black text-white mb-1.5 tracking-tighter">0</div>
                        <p className="text-[10px] text-zinc-500 font-medium">Days active on mission</p>
                    </div>
                </motion.div>

                <motion.div variants={item} className="rounded-sm border border-white/5 bg-white/5 p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 rounded-sm bg-[#BFFF0B]/10 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-[#BFFF0B]" />
                        </div>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block">Daily Tasks</span>
                        <div className="text-3xl font-black text-white mb-1.5 tracking-tighter">4</div>
                        <p className="text-[10px] text-zinc-500 font-medium">Verified targets remaining</p>
                    </div>
                </motion.div>

                <motion.div variants={item} className="rounded-sm border border-white/5 bg-white/5 p-4 flex flex-col justify-between border-b-[#BFFF0B]/20">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 rounded-sm bg-blue-500/10 flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-blue-500" />
                        </div>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block">Combat Level</span>
                        <div className="text-2xl font-black text-white mb-1.5 tracking-tight uppercase">Novice</div>
                        <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Level 1 Scholar Status</p>
                    </div>
                </motion.div>
            </div>

            {/* Subtes Breakdown Grid */}
            <motion.div variants={item}>
                <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Sector Readiness</h3>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Object.values(stats.subtesStats).map((sub, i) => (
                        <motion.div
                            key={sub.name}
                            whileHover={{ y: -2 }}
                            className="group relative rounded-sm border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:bg-white/[0.08]"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-[10px] text-zinc-300 uppercase tracking-tight line-clamp-1">{sub.name}</h4>
                                <span className="font-black text-xs text-[#BFFF0B]">{sub.percentage}%</span>
                            </div>
                            <Progress value={sub.percentage} className="h-1 bg-white/5" />
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{sub.completed} / {sub.total} OBJ</span>
                                <div className={`w-1 h-1 rounded-full ${sub.percentage > 50 ? 'bg-[#BFFF0B]' : 'bg-zinc-700'}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
