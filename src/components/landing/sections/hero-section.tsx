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
                    className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFFF0B] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BFFF0B]"></span>
                    </div>
                    <span className="text-[#BFFF0B] text-sm font-bold tracking-wide">SNBT 2026 • 106 HARI LAGI</span>
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] mb-8 tracking-tighter text-foreground">
                    Ubah <span className="gradient-text-purple italic pr-2">Overwhelmed</span> <br className="hidden sm:block" />
                    Jadi Terkendali.
                </h1>

                <p className="text-muted-foreground text-lg sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Satu tempat untuk semua materi. Centang progress setiap hari, <br className="hidden sm:block" />
                    <span className="text-foreground font-semibold">tidur nyenyak setiap malam.</span>
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-foreground text-background text-lg font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Mulai Centang Pertamamu
                    </a>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Gratis selamanya.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
