"use client";

import TopTicker from "./ticker";
import Navbar from "./navbar";
import HeroTitle from "./hero-title";
import ThreeDCarousel from "./3d-carousel";

export default function OsmoHero() {
    return (
        <div className="relative min-h-screen bg-white text-black font-sans selection:bg-[#ccff00] selection:text-black overflow-hidden">
            <TopTicker />
            <Navbar />

            <main className="relative pt-20">
                <HeroTitle />
                <ThreeDCarousel />

                {/* Play/Reel Overlay Section (Bottom) */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-8 pointer-events-none opacity-50 md:opacity-100">
                    <span className="text-[5rem] md:text-[8rem] font-bold text-zinc-100 uppercase tracking-tighter select-none">Start</span>
                    <div className="w-48 h-32 bg-black rounded-lg shadow-2xl flex items-center justify-center text-white font-bold relative group cursor-pointer pointer-events-auto transition-transform hover:scale-110">
                        <span className="z-10 relative">Dashboard?</span>
                        <div className="absolute inset-0 bg-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg duration-300 blur-lg -z-10"></div>
                    </div>
                    <span className="text-[5rem] md:text-[8rem] font-bold text-zinc-100 uppercase tracking-tighter select-none">Now</span>
                </div>
            </main>

            {/* Background radial gradient for subtle depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-zinc-50 to-zinc-100 -z-10"></div>
        </div>
    );
}
