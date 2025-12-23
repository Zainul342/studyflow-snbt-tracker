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
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">Built by Students</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-8">
                        <div className="text-center group cursor-pointer">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-[#1A1A1A] border-4 border-primary/20 shadow-2xl group-hover:scale-105 transition-all duration-500">
                                <Image
                                    src="/creators/zain.png"
                                    alt="Zain"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-foreground">Zain</h3>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                        <span className="font-medium">Read our story</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function UpdatesSection() {
    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4 text-foreground">
                        Fresh from the
                        <br />
                        <span className="text-primary">Dev Oven</span>
                    </h2>
                    <p className="text-muted-foreground text-lg font-medium">
                        We ship updates faster than you can say "SNBT".
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Progress Dashboard", time: "4 days ago", tag: "New Feature", color: "bg-blue-500", desc: "Visualize your mastery." },
                        { title: "Tryout Analytics", time: "6 days ago", tag: "Update", color: "bg-purple-500", desc: "Deep dive into your scores." },
                        { title: "Study Streaks", time: "1 week ago", tag: "Gamification", color: "bg-pink-500", desc: "Don't break the chain!" },
                    ].map((update, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group border border-transparent"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-sm font-bold">
                                    {update.tag}
                                </span>
                                <span className="text-muted-foreground text-xs">{update.time}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{update.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{update.desc}</p>
                            <div className={`aspect-video rounded-lg ${update.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PlatformSection() {
    return (
        <section className="py-32 px-4 bg-card/30 border-y border-border/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-primary text-sm font-bold mb-2 uppercase tracking-wide">The Command Center</p>
                        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6 text-foreground">
                            Your Base of Operations
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Stop guessing what to study. Our dashboard gives you a clear <span className="text-foreground font-bold">Mission Control</span> interface to track every chapter, score, and deadline.
                        </p>
                        <Link href="/dashboard">
                            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-sm px-8 py-6 font-bold group text-lg">
                                Launch Dashboard
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
        { name: "Progress Tracker", status: "Available", color: "from-blue-500 to-blue-600", link: "/dashboard" },
        { name: "Tryout Engine", status: "Coming Soon", color: "from-purple-500 to-purple-600", desc: "Real exam simulation with IRT scoring system." },
        { name: "AI Analytics", status: "Roadmap", color: "from-pink-500 to-pink-600", desc: "Personalized study recommendations based on your weak points." },
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
                        The
                        <span className="text-primary ml-4">Armory</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Equipping you with improved tools for every stage of battle.
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
                                <div className={`aspect-video rounded-lg bg-gradient-to-br ${product.color} mb-6 opacity-30 group-hover:opacity-100 transition-all duration-500`} />

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
        <section className="py-32 px-4 bg-card/30 border-t border-border/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">Why Us?</p>
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6 text-foreground">
                        Stop studying hard.
                        <br />
                        Start studying <i className="text-primary">smart</i>.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Frictionless Input",
                            description: "Log your study sessions in seconds. We handle the data, you handle the learning.",
                        },
                        {
                            title: "Ruthless Analytics",
                            description: "Our AI identifies your weak spots immediately. No more wasting time on what you already know.",
                        },
                        {
                            title: "Living Toolkit",
                            description: "We push updates weekly based on REAL student feedback. This platform evolves with you.",
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
