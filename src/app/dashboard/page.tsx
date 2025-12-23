"use client";

import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { TodayAgenda } from "@/components/dashboard/today-agenda";
import { BookOpen, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
    const { user, userData } = useAuth();

    // Default Fallback
    const displayName = userData?.displayName || user?.displayName || "Accessing Protocol...";
    const targetPTN = userData?.targetPTN || "Target Universitas";
    const targetMajor = userData?.targetMajor || "Target Jurusan";

    return (
        // Main container match landing page bg-[#09090b] and selection color
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-emerald-400 selection:text-black font-sans overflow-x-hidden relative">

            {/* Osmo Ambient Background & Grid */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#0A0A0A]" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                {/* Ambient Glows matches Landing Page */}
                <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full mix-blend-overlay" />
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
                            Selamat Pagi, <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">{displayName}</span> 👋
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg font-medium"
                        >
                            Siap untuk mengejar target <span className="text-white font-semibold">{targetPTN} - {targetMajor}</span> hari ini?
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-3"
                    >
                        <Link href="/dashboard/study" className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white text-sm font-bold">
                            <BookOpen className="w-4 h-4" />
                            Materi
                        </Link>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black text-sm font-black shadow-lg shadow-[#BFFF0B]/20 transition-all group">
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
