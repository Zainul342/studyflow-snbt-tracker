"use client";

import { useEffect, useState } from "react";
import { mockDB } from "@/lib/data/mock-db";
import { calculateProgress, ProgressStats } from "@/lib/calculations/progress-calculator";
import { Progress } from "@/components/ui/progress";
import { Activity, Book, Trophy, Zap } from "lucide-react";

export function StatsGrid() {
    const [stats, setStats] = useState<ProgressStats | null>(null);

    useEffect(() => {
        // Poll for updates (mocking real-time sync for now)
        const loadStats = () => {
            const data = mockDB.getUserProgress();
            const calculated = calculateProgress(data);
            setStats(calculated);
        };

        loadStats();
        // Refresh every 2 seconds to catch changes from other tabs/components
        const interval = setInterval(loadStats, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) return <div className="text-zinc-500">Loading stats...</div>;

    return (
        <div className="space-y-6">
            {/* Global Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Progress</span>
                        <Activity className="h-4 w-4 text-[#ccff00]" />
                    </div>
                    <div>
                        <div className="text-4xl font-bold font-mono text-white mb-2">{stats.globalPercentage}%</div>
                        <Progress value={stats.globalPercentage} className="h-2 bg-zinc-800" indicatorClassName="bg-[#ccff00]" />
                        <p className="text-xs text-zinc-500 mt-2">{stats.completedItems} / {stats.totalItems} checkpoints</p>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Study Streak</span>
                        <Zap className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="text-4xl font-bold font-mono text-white">0</div>
                    <p className="text-xs text-zinc-500 mt-2">Days active</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">To-Do Today</span>
                        <Book className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-4xl font-bold font-mono text-white">4</div>
                    <p className="text-xs text-zinc-500 mt-2">Materi scheduled</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Rank</span>
                        <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="text-xl font-bold font-mono text-white">Novice</div>
                    <p className="text-xs text-zinc-500 mt-2">Level 1 Scholar</p>
                </div>
            </div>

            {/* Subtes Breakdown Grid */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Coverage by Subtes</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Object.values(stats.subtesStats).map((sub) => (
                        <div key={sub.name} className="rounded-lg border border-zinc-800 bg-black/40 p-4 hover:border-zinc-700 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-sm text-zinc-200 line-clamp-1">{sub.name}</h4>
                                <span className="font-mono text-xs font-bold text-[#ccff00]">{sub.percentage}%</span>
                            </div>
                            <Progress value={sub.percentage} className="h-1.5 bg-zinc-800" />
                            <p className="text-[10px] text-zinc-500 mt-2 text-right">{sub.completed}/{sub.total}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
