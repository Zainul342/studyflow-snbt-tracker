"use client";

import { motion } from "framer-motion";
import { VideoPlayerPreview } from "@/components/landing/video-player-preview";

export function VideoSection() {

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
                        Semua Senjatamu,
                        <br />
                        <span className="gradient-text-green">Satu Command Center</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        Dapetin akses eksklusif ke sistem tracking, analitik, dan strategi belajar dari para <span className="text-foreground font-bold">top scorer</span>. Tiru cara main mereka.
                    </p>
                </motion.div>

                {/* Video Player Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-xl overflow-hidden glass-light shadow-2xl border border-border"
                >
                    <VideoPlayerPreview />
                </motion.div>

                {/* User Avatars */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-12 h-12 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-background"
                            />
                        ))}
                    </div>
                    <span className="text-muted-foreground font-medium">Bareng pejuang lainnya</span>
                </div>
            </div>
        </section>
    );
}
