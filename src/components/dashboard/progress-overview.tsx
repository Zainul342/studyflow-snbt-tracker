"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Target, TrendingUp } from "lucide-react";

// Matches landing page "Features" card style exactly
const cardStyle = "group bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-sm p-6 hover:border-white/10 transition-all duration-300 shadow-xl";
const iconBoxStyle = "w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 border border-white/5";

const stats = [
    {
        label: "Total Progress",
        value: "0%",
        change: "Mulai Hari Ini",
        trend: "neutral", // changed to neutral for new users
        icon: TrendingUp,
        color: "text-zinc-400", // Start neutral
        bg: "bg-zinc-400/10",
    },
    {
        label: "Materi Selesai",
        value: "0/146",
        change: "Target: 50",
        trend: "neutral",
        icon: CheckCircle2,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Rata-rata TO",
        value: "-",
        change: "Belum Ada Data",
        trend: "neutral",
        icon: Target,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        label: "Jam Belajar",
        value: "0h",
        change: "Minggu ini",
        trend: "neutral",
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
                        <span className="flex items-center text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-500/10 px-2 py-1 rounded-sm border border-zinc-500/20">
                            {stat.change}
                        </span>
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
