"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CARDS = [
    { title: "Materi Belajar", color: "bg-[#1e293b]", image: "📚" },
    { title: "Latihan Soal", color: "bg-[#b0dd00]", image: "📝" },
    { title: "Tryout Rutin", color: "bg-[#0f172a]", image: "🎯" },
    { title: "Progress Tracker", color: "bg-[#f4f4f5]", text: "black", image: "📊" },
    { title: "Analisis Minat", color: "bg-[#3f3f46]", image: "🧠" },
    { title: "Target Kampus", color: "bg-[#e2e8f0]", text: "black", image: "🏫" },
    { title: "Study Streaks", color: "bg-[#ccff00]", text: "black", image: "🔥" },
    { title: "Komunitas", color: "bg-[#09090b]", image: "👥" },
];

export default function ThreeDCarousel() {
    const wheelRef = useRef<HTMLDivElement>(null);
    const totalCards = CARDS.length;
    const radius = 450; // Tighter radius for "ring" look

    useEffect(() => {
        if (!wheelRef.current) return;

        // Initial positioning
        const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
        const angleStep = (2 * Math.PI) / totalCards;

        cards.forEach((card, i) => {
            const angle = i * angleStep;
            // Calculate x, z based on circle
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            // Rotation to face outwards
            const rotation = angle * (180 / Math.PI);

            gsap.set(card, {
                x: x,
                z: z,
                rotationY: rotation,
                transformOrigin: "center center",
                // Initial opacity based on position (approximate)
                opacity: z > 0 ? 1 : 0.4
            });
        });

        // Tilt the whole wheel for that "ring" effect
        gsap.set(wheelRef.current, { rotationX: -10, rotationZ: 5, transformOrigin: "center center" });

        // Infinite rotation
        // Infinite rotation with opacity updates
        const timeline = gsap.timeline({ repeat: -1 });
        
        timeline.to(wheelRef.current, {
            rotationY: -360,
            duration: 40, // Faster rotation
            ease: "linear",
            onUpdate: () => {
                // Dynamic Opacity "Fog" Effect
                if (!wheelRef.current) return;
                const currentRot = gsap.getProperty(wheelRef.current, "rotationY") as number;
                
                cards.forEach((card, i) => {
                    const angleStep = (2 * Math.PI) / totalCards;
                    const cardAngle = i * angleStep;
                    // Current rotation in radians
                    const rotRad = (currentRot * Math.PI) / 180;
                    
                    // Allow full 360 degree cycle tracking
                    const totalAngle = cardAngle + rotRad; 
                    
                    // Simple Z-depth simulation: cos(angle) dictates Z
                    // +1 is front, -1 is back
                    const zState = Math.cos(totalAngle);
                    
                    // Map -1..1 to 0.3..1 opacity
                    const opacity = gsap.utils.mapRange(-1, 1, 0.2, 1, zState);
                    
                    gsap.set(card, { opacity: opacity });
                });
            }
        });

        // Hover effect pause
        const onEnter = () => gsap.to(wheelRef.current, { timeScale: 0.1, duration: 0.5 });
        const onLeave = () => gsap.to(wheelRef.current, { timeScale: 1, duration: 0.5 });

        wheelRef.current.addEventListener("mouseenter", onEnter);
        wheelRef.current.addEventListener("mouseleave", onLeave);

        return () => {
            wheelRef.current?.removeEventListener("mouseenter", onEnter);
            wheelRef.current?.removeEventListener("mouseleave", onLeave);
        };
    }, [totalCards]);

    return (
        <div className="w-full h-[600px] md:h-[800px] overflow-hidden relative perspective-[2000px] flex items-center justify-center -mt-20">
            <div
                ref={wheelRef}
                className="w-[280px] h-[360px] relative preserve-3d"
                style={{ transformStyle: "preserve-3d" }}
            >
                {CARDS.map((card, i) => (
                    <div
                        key={i}
                        className={`carousel-card absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-2xl border border-white/10 ${card.color} ${card.text === 'black' ? 'text-black' : 'text-white'}`}
                    >
                        <div className="flex justify-between items-start opacity-80">
                            <span className="text-[10px] uppercase tracking-widest font-bold">StudyFlow</span>
                            <span className="text-xl">{card.image}</span>
                        </div>

                        <h3 className="text-3xl font-bold leading-tight">{card.title}</h3>

                        <div className="text-xs uppercase tracking-wide opacity-60">
                            Tap to explore
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
