"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

export default function HeroTitle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

            tl.from(title1Ref.current, { y: 120, opacity: 0, rotateX: -20 }, 0)
                .from(title2Ref.current, { y: 120, opacity: 0, rotateX: -20 }, 0.1)
                .from(".hero-pill", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, 0.8);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center text-center z-10 pt-32 pb-16 relative">
            <div className="flex items-center gap-2 md:gap-4">
                <h1
                    ref={title1Ref}
                    className="text-[16vw] md:text-[10rem] leading-[0.85] tracking-[-0.06em] text-[#1a1a1a]"
                    style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700 }}
                >
                    Siap SNBT
                </h1>
                <span className="text-[8vw] md:text-[6rem] text-[#6366f1]" style={{ fontFamily: "'Clash Display', sans-serif" }}>✦</span>
                <h1
                    ref={title2Ref}
                    className="text-[16vw] md:text-[10rem] leading-[0.85] tracking-[-0.06em] text-[#1a1a1a]"
                    style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700 }}
                >
                    Tembus PTN
                </h1>
            </div>

            <div className="mt-12 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-x-2 gap-y-3 text-sm md:text-lg px-4 text-zinc-600 font-medium">
                <span>Platform packed with</span>
                <span className="hero-pill px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-900 font-semibold shadow-sm">Bank Soal</span>
                <span>&</span>
                <span className="hero-pill px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-900 font-semibold shadow-sm">Tryout System</span>
                <span>resources,</span>
                <span className="hero-pill px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-900 font-semibold shadow-sm">progress tracking</span>
                <span>,</span>
                <span className="hero-pill px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-900 font-semibold shadow-sm">analytics</span>
                <span>and a</span>
                <span className="hero-pill px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-900 font-semibold shadow-sm">comprehensive study plan</span>
            </div>
        </div>
    );
}
