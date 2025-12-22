"use client";

import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { TodayAgenda } from "@/components/dashboard/today-agenda";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        // Main container match landing page bg-[#09090b] and selection color
        <div className="min-h-screen bg-[#09090b] text-white selection:bg-emerald-400 selection:text-black font-sans overflow-x-hidden relative">

            {/* Background Effects (Matches Landing Page Hero) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-8">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2"
                        >
                            Selamat Pagi, <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Zain</span> 👋
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg font-medium"
                        >
                            Siap untuk mengejar target <span className="text-white font-semibold">ITB - Teknik Informatika</span> hari ini?
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                    >
                        <Link href="/materials" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-800/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-zinc-300 hover:text-white text-sm font-bold">
                            <BookOpen className="w-4 h-4" />
                            Materi
                        </Link>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black text-sm font-black shadow-lg shadow-emerald-400/20 transition-all group">
                            <Trophy className="w-4 h-4 ml-1" />
                            Lanjut Belajar
                        </button>
                    </motion.div>
                </header>

                {/* Overview Cards */}
                <section className="mb-8">
                    <ProgressOverview />
                </section>

                {/* Placeholder for future widgets (StatsGrid & Agenda) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Area */}
                    <ActivityChart />

                    {/* Today's Agenda */}
                    <TodayAgenda />
                </div>
            </div>
        </div>
    );
}
