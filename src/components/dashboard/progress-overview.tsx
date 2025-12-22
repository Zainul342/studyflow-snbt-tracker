"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Target, TrendingUp } from "lucide-react";

// Matches landing page "Features" card style exactly
const cardStyle = "group bg-zinc-800/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-800 hover:border-white/10 transition-all duration-300";
const iconBoxStyle = "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110";

const stats = [
    {
        label: "Total Progress",
        value: "45%",
        change: "+12.5%",
        trend: "up",
        icon: TrendingUp,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        label: "Materi Selesai",
        value: "28/146",
        change: "Target: 50",
        trend: "neutral",
        icon: CheckCircle2,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        label: "Rata-rata TO",
        value: "645",
        change: "+28 poin",
        trend: "up",
        icon: Target,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        label: "Jam Belajar",
        value: "42.5h",
        change: "Minggu ini",
        trend: "up",
        icon: BookOpen,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
];

export function ProgressOverview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cardStyle}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className={`${iconBoxStyle} ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        {stat.trend === "up" && (
                            <span className="flex items-center text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                                {stat.change}
                            </span>
                        )}
                        {stat.trend === "neutral" && (
                            <span className="flex items-center text-[10px] font-bold tracking-wider uppercase text-zinc-400 bg-zinc-400/10 px-2 py-1 rounded-full border border-zinc-400/20">
                                {stat.change}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="text-3xl font-black text-white mb-1 tracking-tight">
                            {stat.value}
                        </div>
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{stat.label}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
