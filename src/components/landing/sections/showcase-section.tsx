"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Target, Zap } from "lucide-react";

export function ShowcaseSection() {
    const showcaseItems = [
        { title: "Progress Tracking", icon: BarChart3, color: "from-blue-500 to-blue-600" },
        { title: "Smart Analytics", icon: BrainCircuit, color: "from-purple-500 to-purple-600" },
        { title: "Tryout System", icon: Target, color: "from-pink-500 to-pink-600" },
        { title: "Study Streaks", icon: Zap, color: "from-orange-500 to-orange-600" },
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {showcaseItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            className="group relative aspect-[4/5] rounded-sm overflow-hidden cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Animated Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

                            {/* Abstract Pattern Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />

                            {/* Darker Gradient for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative h-full p-6 flex flex-col justify-end">
                                <item.icon className="w-12 h-12 text-white/50 mb-auto group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                                <h3 className="text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
