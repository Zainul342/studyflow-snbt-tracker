"use client";

import { motion } from "framer-motion";

export default function TopTicker() {
    return (
        <div className="w-full bg-[#ccff00] text-black overflow-hidden py-1 border-b border-black/10 z-50 relative">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                    className="flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest"
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span>EXPLORE THE STUDYFLOW CHECKPOINTS</span>
                            <span>✦</span>
                            <span>SIAP UTBK 2026</span>
                            <span>✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
