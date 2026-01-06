"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ComingSoonModal } from "@/components/coming-soon-modal";
import { DashboardPreview } from "@/components/landing/dashboard-preview";

export function CreatorsSection() {
    return (
        <section id="creators" className="py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">Dibuat Sama Anak Kelas 12</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-8">
                        <div className="text-center group cursor-pointer">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-[#1A1A1A] border-4 border-primary/20 shadow-2xl group-hover:scale-105 transition-all duration-500">
                                <Image
                                    src="/zain.png"
                                    alt="Zain"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-foreground">Zain</h3>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                        <span className="font-medium">Baca cerita kita</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// SuccessStoriesSection dihapus karena mengandung testimoni fiktif
// Akan ditambahkan kembali jika sudah ada testimoni asli dari user nyata
export function SuccessStoriesSection() {
    return null;
}

export function PlatformSection() {
    return (
        <section id="platform" className="py-32 px-4 bg-card/30 border-y border-border/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-primary text-sm font-bold mb-2 uppercase tracking-wide">Dashboard</p>
                        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6 text-foreground">
                            Cockpit Perjuanganmu
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Gak perlu bingung mau belajar apa. Dashboard kita kasih kamu <span className="text-foreground font-bold">peta perang</span> yang jelas — track semua progress, deadline, dan target mu.
                        </p>
                        <Link href="/dashboard">
                            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-sm px-8 py-6 font-bold group text-lg">
                                Coba Sekarang
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden glass-light shadow-2xl shadow-primary/5 group transition-all hover:scale-[1.02] duration-500"
                    >
                        {/* Real-time Dashboard Preview Component */}
                        <div className="absolute inset-0 p-1">
                            <DashboardPreview />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function ProductsSection() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState({ name: "", desc: "" });

    const products = [
        { name: "Progress Tracker", status: "Available", color: "from-blue-500 to-blue-600", icon: Sparkles, link: "/dashboard" },
        { name: "Tryout Engine", status: "Coming Soon", color: "from-purple-500 to-purple-600", icon: ChevronRight, desc: "Real exam simulation with IRT scoring system." },
        { name: "AI Analytics", status: "Roadmap", color: "from-pink-500 to-pink-600", icon: Lock, desc: "Personalized study recommendations based on your weak points." },
    ];

    const handleProductClick = (product: any) => {
        if (product.status === "Available") {
            // Standard navigation handled by Link wrapper if I used one, but here I'll conditionally clear it
        } else {
            setActiveFeature({ name: product.name, desc: product.desc || "" });
            setModalOpen(true);
        }
    };

    return (
        <section className="py-32 px-4">
            <ComingSoonModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                featureName={activeFeature.name}
                description={activeFeature.desc}
            />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4 text-foreground">
                        Senjata
                        <span className="text-primary ml-4">Tempur</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tools yang bakal nemenin kamu sampai hari H.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, i) => {
                        const isAvailable = product.status === "Available";
                        const CardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => !isAvailable && handleProductClick(product)}
                                className="glass-light rounded-xl p-8 hover:border-primary/50 transition-all group cursor-pointer relative h-full flex flex-col"
                            >
                                {/* Rich Visual */}
                                <div className={`aspect-video rounded-lg bg-gradient-to-br ${product.color} mb-6 relative overflow-hidden shadow-lg group-hover:shadow-${product.color}/20 transition-all`}>
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <product.icon className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${isAvailable ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        {product.status}
                                    </span>
                                    {!isAvailable && <Lock className="w-4 h-4 text-muted-foreground" />}
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mt-2">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                    {product.desc || "Track your progress comprehensively."}
                                </p>
                            </motion.div>
                        );

                        return isAvailable ? (
                            <Link key={i} href={product.link || "#"}>
                                {CardContent}
                            </Link>
                        ) : (
                            <div key={i}>{CardContent}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function BenefitsSection() {
    return (
        <section id="benefits" className="py-32 px-4 bg-card/30 border-t border-border/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">Kenapa Harus Pake?</p>
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6 text-foreground">
                        Gak usah belajar keras.
                        <br />
                        Belajar <i className="text-primary">pinter</i> aja.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Input Gak Ribet",
                            description: "Log sesi belajar cuma butuh detik doang. Kamu tinggal fokus belajar, sisanya kita yang urus.",
                        },
                        {
                            title: "Tau Kelemahanmu",
                            description: "Sistem kita langsung kasih tau mana yang masih bolong. Gak usah buang waktu di materi yang udah bisa.",
                        },
                        {
                            title: "Update Terus",
                            description: "Kita update mingguan based on feedback dari user. Platform ini ikut berkembang bareng kamu.",
                        },
                    ].map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
                        >
                            <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
