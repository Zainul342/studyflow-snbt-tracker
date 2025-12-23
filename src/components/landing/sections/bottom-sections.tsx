"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Ahmad Rizki",
            role: "ITB 2025",
            quote: "StudyFlow helped me track my progress systematically. Got into my dream university!",
        },
        {
            name: "Siti Nurhaliza",
            role: "UI 2025",
            quote: "The analytics feature is a game-changer. I could see exactly where I needed to improve.",
        },
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
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight">
                        StudyFlow's Global
                        <br />
                        <span className="gradient-text-green">Community</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-sm p-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500" />
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed">{testimonial.quote}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PricingSection() {
    return (
        <section className="py-32 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="border border-white/10 rounded-sm p-4 bg-[#0A0A0A]">
                    <div className="bg-[#1A1A1A] rounded-sm p-12 text-center">
                        <h2 className="text-4xl font-black mb-8">Simple Pricing</h2>
                        <div className="text-6xl font-black mb-2">Free</div>
                        <p className="text-white/60 mb-12">during Beta period</p>

                        <div className="flex flex-col gap-4 max-w-md mx-auto mb-12 text-left">
                            {["Full Access to Dashboard", "Unlimited Progress Tracking", "Tryout System", "Community Access"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-green-500" />
                                    </div>
                                    <span className="text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/register">
                            <Button className="w-full max-w-md bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-black py-6 rounded-sm">
                                Start Free Trial
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ShowcaseGallery() {
    return (
        <section className="py-32 px-0 overflow-hidden">
            <div className="flex gap-4 animate-[marquee_40s_linear_infinite]">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="relative w-[400px] aspect-video rounded-sm overflow-hidden flex-shrink-0 bg-white/5">
                        <Image
                            src={`https://placehold.co/800x450/1e1e1e/FFF?text=Dashboard+Preview`}
                            alt="Showcase"
                            fill
                            className="object-cover opacity-50 hover:opacity-100 transition-opacity duration-700"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export function FinalCTA() {
    return (
        <section className="py-40 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[clamp(3.5rem,10vw,8rem)] leading-[0.8] font-black tracking-tighter mb-12">
                    Ready to
                    <br />
                    Dominate?
                    <Star className="inline w-[0.3em] h-[0.3em] text-[#BFFF0B] fill-[#BFFF0B] align-top ml-4" />
                </h2>
                <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12">
                    Gabung jadi member dan buka full akses ke <span className="text-white font-bold">The Armory</span>. Jangan sampai nyesel pas hari-H.
                </p>
                <Link href="/register">
                    <Button className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black text-xl font-black px-12 py-8 rounded-sm">
                        Secure Your Spot
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        // MARQUEE FOOTER
        <div className="border-t border-white/10 bg-[#0A0A0A] relative overflow-hidden flex flex-col items-center">
            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden whitespace-nowrap py-10 opacity-30 select-none pointer-events-none">
                <div className="inline-flex animate-[marquee_30s_linear_infinite]">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-[13.5vw] font-black text-white leading-none tracking-tighter mx-8">
                            STUDYFLOW
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(10)].map((_, i) => (
                        <span key={`dup-${i}`} className="text-[13.5vw] font-black text-white leading-none tracking-tighter mx-8">
                            STUDYFLOW
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer Content */}
            <div className="w-full max-w-[95vw] pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider backdrop-blur-sm z-10">
                <div className="flex gap-4">
                    {["Licensing", "T&Cs", "Privacy", "Cookies"].map((item) => (
                        <Link key={item} href="#" className="hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-sm">
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="hidden sm:block">
                    © 2026 STUDYFLOW INC.
                </div>

                <div className="flex items-center gap-2">
                    <span>CREATED BY</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-sm">ZAIN</span>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-sm">ANTIGRAVITY</span>
                </div>
            </div>
        </div>
    );
}
