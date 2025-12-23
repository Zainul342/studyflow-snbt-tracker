"use client";

import { motion } from "framer-motion";

export function ShowcaseSection() {
    const showcaseItems = [
        { title: "Progress Tracking", image: "https://placehold.co/400x300/1e1e1e/FFF?text=Tracking", color: "from-blue-500 to-blue-600" },
        { title: "Smart Analytics", image: "https://placehold.co/400x300/1e1e1e/FFF?text=Analytics", color: "from-purple-500 to-purple-600" },
        { title: "Tryout System", image: "https://placehold.co/400x300/1e1e1e/FFF?text=Tryout", color: "from-pink-500 to-pink-600" },
        { title: "Study Streaks", image: "https://placehold.co/400x300/1e1e1e/FFF?text=Streaks", color: "from-orange-500 to-orange-600" },
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
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80`} />
                            <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm" />
                            <div className="relative h-full p-6 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
