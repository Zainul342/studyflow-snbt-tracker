"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
    ArrowRight,
    BookOpen,
    Play,
    Check,
    Zap,
    Target,
    TrendingUp,
    Calendar,
    Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudyFlowLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Animation values
    const platformScale = useTransform(scrollYProgress, [0.08, 0.18], [0.9, 1]);
    const platformOpacity = useTransform(scrollYProgress, [0.08, 0.15], [0, 1]);

    return (
        <div ref={containerRef} className="relative min-h-[450vh] bg-[#09090b] text-white font-sans selection:bg-emerald-400 selection:text-black overflow-x-hidden">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
                <div className="bg-zinc-900/80 backdrop-blur-xl pointer-events-auto text-white h-14 rounded-2xl flex items-center justify-between px-2 w-full max-w-xl mx-auto border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-3 pl-3">
                        <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-white/10">
                            <Image
                                src="/logo.png"
                                alt="StudyFlow Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="font-black text-base tracking-tight">StudyFlow</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href="/login">
                            <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl h-10 px-4 text-xs font-semibold">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/onboarding">
                            <Button size="sm" className="bg-emerald-400 hover:bg-emerald-300 text-black rounded-xl h-10 px-5 text-xs font-black">
                                Mulai Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- SECTION 1: HERO --- */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-28 pb-40 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="z-20 text-center px-4 max-w-4xl"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-2 mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </span>
                        <span className="text-emerald-400 text-xs font-bold tracking-wide">SNBT 2026 • 106 Hari Lagi</span>
                    </motion.div>

                    {/* Main headline */}
                    <h1 className="text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] font-black tracking-tight text-white mb-6">
                        Dari Spreadsheet ke{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                            Supercharged
                        </span>
                        <br />Study Tracker
                    </h1>

                    <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        Platform tracking belajar UTBK SNBT dengan{" "}
                        <span className="text-white">progress real-time</span>,{" "}
                        <span className="text-white">analisis kelemahan</span>, dan{" "}
                        <span className="text-white">gamification</span> yang bikin semangat.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link href="/onboarding">
                            <Button size="lg" className="bg-emerald-400 hover:bg-emerald-300 text-black rounded-2xl h-14 px-8 text-sm font-black shadow-lg shadow-emerald-400/20 group">
                                Mulai Tracking Gratis
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-white/5 hover:text-white rounded-2xl h-14 px-8 text-sm font-semibold">
                            <Play className="mr-2 w-4 h-4 fill-current" />
                            Lihat Demo
                        </Button>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center justify-center gap-6 text-zinc-500 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border-2 border-zinc-900" />
                                ))}
                            </div>
                            <span className="text-zinc-400 font-medium">500+ siswa aktif</span>
                        </div>
                        <div className="w-px h-4 bg-zinc-700" />
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-4 h-4 text-yellow-400">★</div>
                            ))}
                            <span className="text-zinc-400 font-medium ml-1">4.9/5</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- SECTION 2: STATS BANNER --- */}
            <section className="py-8 border-y border-white/5 bg-zinc-900/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "93", label: "Submateri Lengkap", icon: BookOpen },
                            { value: "7", label: "Subtes SNBT", icon: Target },
                            { value: "3x", label: "Lebih Efisien", icon: TrendingUp },
                            { value: "100%", label: "Gratis Selamanya", icon: Trophy },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
                                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: DASHBOARD PREVIEW --- */}
            <section className="py-24 md:py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight mb-4">
                            Dashboard yang <span className="text-emerald-400">Kamu Butuhkan</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                            Semua progress belajar dalam satu tempat. Real-time, interaktif, dan bikin ketagihan.
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ scale: platformScale, opacity: platformOpacity }}
                        className="relative rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(16,185,129,0.15)] border border-white/10 bg-zinc-900"
                    >
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-zinc-800/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-zinc-700/50 rounded-lg px-4 py-1.5 text-xs text-zinc-400 font-mono">
                                    studyflow.app/dashboard
                                </div>
                            </div>
                        </div>

                        {/* Dashboard mockup */}
                        <div className="aspect-[16/10] bg-zinc-950 p-6">
                            <div className="grid grid-cols-12 gap-4 h-full">
                                {/* Sidebar */}
                                <div className="col-span-2 bg-zinc-900 rounded-2xl p-4 space-y-3">
                                    {["Dashboard", "Tracking", "Analytics", "Tryout"].map((item, i) => (
                                        <div key={i} className={`px-3 py-2 rounded-lg text-xs font-semibold ${i === 0 ? "bg-emerald-400/20 text-emerald-400" : "text-zinc-500"}`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* Main content */}
                                <div className="col-span-10 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-bold text-white">Selamat belajar, Zain! 👋</div>
                                            <div className="text-xs text-zinc-500">Target: ITB - Teknik Informatika</div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-zinc-900 rounded-xl px-4 py-2">
                                            <Calendar className="w-4 h-4 text-emerald-400" />
                                            <span className="text-sm font-bold text-white">106 hari</span>
                                            <span className="text-xs text-zinc-500">tersisa</span>
                                        </div>
                                    </div>

                                    {/* Stats cards */}
                                    <div className="grid grid-cols-4 gap-3">
                                        {[
                                            { label: "Penalaran Umum", value: "31.75%", color: "from-blue-500 to-blue-600" },
                                            { label: "PBM / PPU", value: "8.33%", color: "from-purple-500 to-purple-600" },
                                            { label: "PK / PM", value: "39.13%", color: "from-orange-500 to-orange-600" },
                                            { label: "Literasi", value: "18.63%", color: "from-teal-500 to-teal-600" },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-zinc-900 rounded-xl p-4">
                                                <div className="text-xs text-zinc-500 mb-2">{stat.label}</div>
                                                <div className="text-xl font-black text-white mb-2">{stat.value}</div>
                                                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full`} style={{ width: stat.value }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress section */}
                                    <div className="bg-zinc-900 rounded-xl p-4 flex-1">
                                        <div className="text-sm font-bold text-white mb-3">Progress Minggu Ini</div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {["S", "S", "R", "K", "J", "S", "M"].map((day, i) => (
                                                <div key={i} className="text-center">
                                                    <div className="text-xs text-zinc-500 mb-2">{day}</div>
                                                    <div className={`aspect-square rounded-lg ${i < 5 ? "bg-emerald-400/20" : "bg-zinc-800"} flex items-center justify-center`}>
                                                        {i < 5 && <Check className="w-4 h-4 text-emerald-400" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 4: FEATURES --- */}
            <section className="py-24 md:py-32 bg-zinc-900/50">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight mb-4">
                            Semua yang Kamu Butuhkan
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                            Dari tracking submateri sampai analisis kelemahan, semua ada di sini.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Target,
                                title: "Progress Tracking",
                                description: "Track 93 submateri dengan checkbox Belajar, Latsol, dan Review. Persentase otomatis terhitung.",
                                color: "emerald"
                            },
                            {
                                icon: TrendingUp,
                                title: "Analisis Tryout",
                                description: "Input nilai tryout dan lihat tren progress. AI bantu identifikasi kelemahan.",
                                color: "blue"
                            },
                            {
                                icon: Trophy,
                                title: "Gamification",
                                description: "Streak harian, points, dan achievements. Belajar jadi lebih seru seperti main game.",
                                color: "purple"
                            },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group bg-zinc-800/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-800 hover:border-white/10 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: CTA --- */}
            <section className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tight mb-6">
                            Siap Upgrade Cara Belajar?
                        </h2>
                        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                            Gabung sekarang dan rasakan bedanya tracking belajar dengan StudyFlow. 100% gratis, selamanya.
                        </p>
                        <Link href="/onboarding">
                            <Button size="lg" className="bg-emerald-400 hover:bg-emerald-300 text-black rounded-2xl h-16 px-10 text-base font-black shadow-lg shadow-emerald-400/20 group">
                                Mulai Belajar Sekarang
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <BookOpen size={16} className="text-black" />
                            </div>
                            <span className="font-black text-base tracking-tight">StudyFlow</span>
                        </div>
                        <div className="text-zinc-500 text-sm">
                            © 2025 StudyFlow. Made with 💚 for SNBT 2026 warriors.
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">Masuk</Link>
                            <Link href="/onboarding" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors">Daftar</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
