"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-sm blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-sm px-4 py-2 mb-8"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-[#BFFF0B] opacity-75"></span>
                        <span className="relative inline-flex rounded-sm h-2 w-2 bg-[#BFFF0B]"></span>
                    </div>
                    <span className="text-[#BFFF0B] text-sm font-bold">SNBT 2026 • 106 HARI LAGI</span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-[clamp(3.5rem,11vw,8rem)] leading-[0.85] mb-8 tracking-tighter">
                    The SNBT Toolkit{" "}
                    <Star className="inline w-[0.4em] h-[0.4em] text-purple-500 fill-purple-500 mb-4" />{" "}
                    <br />
                    <span className="gradient-text-purple font-light tracking-tight">Built for Warriors</span>
                </h1>

                <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                    Platform lengkap dengan <span className="text-white">progress tracking</span>,{" "}
                    <span className="text-white">analytics</span>, dan sistem belajar yang terstruktur.{" "}
                    <span className="text-white">Gak ada lagi cerita belajar tanpa arah.</span>
                </p>
            </motion.div>
        </section>
    );
}
