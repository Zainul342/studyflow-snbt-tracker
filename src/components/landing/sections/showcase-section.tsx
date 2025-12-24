"use client";

import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, ListTodo, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShowcaseSection() {
    const showcaseItems = [
        { title: "Materi Gigitan Kecil", icon: ListTodo, color: "from-blue-500 to-blue-600" },
        { title: "Progress Jujur", icon: BarChart3, color: "from-purple-500 to-purple-600" },
        { title: "Central Brain", icon: BrainCircuit, color: "from-pink-500 to-pink-600" },
        { title: "Anti Wacana", icon: Zap, color: "from-orange-500 to-orange-600" },
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
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer border border-white/10"
                        >
                            {/* Rich Styles Gradient */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110",
                                item.color
                            )} />

                            {/* Floating Glow Orb */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-[50px] rounded-full"
                            />

                            {/* Noise Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />

                            {/* Inner Highlight/Glass Effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

                            {/* Content */}
                            <div className="relative h-full p-8 flex flex-col justify-between">
                                <div className="p-3 bg-white/10 w-fit rounded-lg backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-colors">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-white mb-2 leading-tight tracking-tight">
                                        {item.title}
                                    </h3>
                                    <div className="h-1 w-12 bg-white/50 rounded-full group-hover:w-full transition-all duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
