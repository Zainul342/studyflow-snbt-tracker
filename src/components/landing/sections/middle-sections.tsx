"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CreatorsSection() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-[#BFFF0B] text-sm font-bold mb-4">Created by</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-8">
                        <div className="text-center">
                            <div className="w-32 h-32 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-black">Zain</h3>
                            <p className="text-white/60">Ardiansyah</p>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group">
                        <span className="font-medium">About us</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function UpdatesSection() {
    const updates = [
        { title: "Progress Dashboard", time: "4 days ago", tag: "New Feature", color: "bg-blue-500" },
        { title: "Tryout Analytics", time: "6 days ago", tag: "Update", color: "bg-purple-500" },
        { title: "Study Streaks", time: "1 week ago", tag: "New Feature", color: "bg-pink-500" },
    ];

    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4">
                        Latest updates
                        <br />
                        from StudyFlow
                    </h2>
                    <p className="text-[#BFFF0B] text-lg font-medium">
                        New stuff is added every week!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {updates.map((update, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-sm p-6 hover:border-white/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs bg-[#BFFF0B]/20 text-[#BFFF0B] px-3 py-1 rounded-sm font-bold">
                                    {update.tag}
                                </span>
                                <span className="text-white/40 text-xs">{update.time}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{update.title}</h3>
                            <div className={`aspect-video rounded-sm ${update.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PlatformSection() {
    return (
        <section className="py-32 px-4 bg-[#1A1A1A]/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/60 text-sm font-bold mb-2">(The Dashboard)</p>
                        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6">
                            The platform
                        </h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">
                            Built for SNBT warriors, our dashboard gives you access to comprehensive tracking,
                            analytics, and study techniques. Track, analyze, and dominate.
                        </p>
                        <Link href="/dashboard">
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-sm px-6 py-6 font-bold group">
                                About the Dashboard
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-sm overflow-hidden glass-light"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function ProductsSection() {
    const products = [
        { name: "Progress Tracker", status: "Available", color: "from-blue-500 to-blue-600" },
        { name: "Tryout System", status: "Available", color: "from-purple-500 to-purple-600" },
        { name: "AI Analytics", status: "Coming Soon", color: "from-pink-500 to-pink-600" },
    ];

    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4">
                        A growing toolkit for
                        <br />
                        <span className="gradient-text-purple">SNBT warriors</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Access everything with a single account:
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-sm p-8 hover:border-white/20 transition-all group cursor-pointer"
                        >
                            <div className={`aspect-video rounded-sm bg-gradient-to-br ${product.color} mb-6 opacity-50 group-hover:opacity-70 transition-opacity`} />
                            <span className="text-xs bg-[#BFFF0B]/20 text-[#BFFF0B] px-3 py-1 rounded-sm font-bold">
                                {product.status}
                            </span>
                            <h3 className="text-2xl font-bold text-white mt-4">{product.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function BenefitsSection() {
    const benefits = [
        {
            title: "Input Tanpa Ribet",
            description: "Sistem kami nyatet histori belajar lo otomatis. Fokus belajar aja, biar kami yang urus datanya.",
        },
        {
            title: "Tahu Kelemahan Lo",
            description: "AI bakal \"nunjuk\" materi mana yang lo masih merah. Hajar yang kurang, pertahankan yang jago.",
        },
        {
            title: "Update Tiap Minggu",
            description: "Toolkit ini hidup. Fitur baru bakal terus muncul seiring persiapan lo menuju hari-H.",
        },
    ];

    return (
        <section className="py-32 px-4 bg-[#1A1A1A]/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-white/60 text-sm font-bold mb-4">Why StudyFlow?</p>
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6">
                        Level up your game and join
                        <br />
                        students who love studying
                        <br />
                        as much as you do.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-white/60 leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
