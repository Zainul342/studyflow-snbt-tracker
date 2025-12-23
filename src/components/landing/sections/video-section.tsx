"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-32 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-6">
                        Everything You Need
                        <br />
                        <span className="gradient-text-green">In One Place</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-3xl mx-auto">
                        Dapetin akses eksklusif ke sistem tracking, analitik, dan strategi belajar dari para <span className="text-white">top scorer</span>. Tiru cara main mereka.
                    </p>
                </motion.div>

                {/* Video Player Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-sm overflow-hidden glass-light"
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 rounded-sm bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </button>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <span className="text-white font-bold">StudyFlow in use</span>
                        <span className="text-white/60">00:48</span>
                    </div>
                </motion.div>

                {/* User Avatars */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-12 h-12 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0A0A0A]"
                            />
                        ))}
                    </div>
                    <span className="text-white/80 font-medium">Join 500+ others</span>
                </div>
            </div>
        </section>
    );
}
