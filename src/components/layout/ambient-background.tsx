"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0A]">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-[#0A0A0A] to-[#0A0A0A]" />

            {/* Moving Orbs - Hidden on mobile for performance */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="hidden md:block absolute -top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="hidden md:block absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"
            />

            {/* Grid Texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay w-full h-full pointer-events-none">
                <div className="absolute inset-0 bg-repeat w-full h-full opacity-[0.03]" style={{ backgroundImage: 'url("/noise.png")' }}></div>
            </div>
        </div>
    );
}
