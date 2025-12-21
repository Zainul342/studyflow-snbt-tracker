"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import {
    ArrowRight,
    Menu,
    Asterisk,
    Play,
    Check,
    Zap,
    Globe,
    Users,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OsmoLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // --- ANIMATION VALUES ---

    // Hero Parallax
    const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
    const ringRotate = useTransform(scrollYProgress, [0, 0.2], [0, 45]);

    // Platform Zoom
    const platformScale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);
    const platformOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

    // Card Tilt Effect
    const x = useMotionValue(0);
    const yMove = useMotionValue(0);
    const rotateX = useTransform(yMove, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        yMove.set(yPct * 200);
    }

    // Ring Data (Mock Subtes)
    const ringItems = [
        { title: "Penalaran Umum", color: "bg-blue-500" },
        { title: "Pengetahuan Kuantitatif", color: "bg-orange-500" },
        { title: "Pemahaman Bacaan", color: "bg-green-500" },
        { title: "Pengetahuan Umum", color: "bg-purple-500" },
        { title: "Literasi Inggris", color: "bg-pink-500" },
        { title: "Literasi Indo", color: "bg-teal-500" },
        { title: "Matematika", color: "bg-yellow-500" },
    ];

    return (
        <div ref={containerRef} className="relative min-h-[500vh] bg-[#F3F3F3] text-[#121212] font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

            {/* HEADER */}
            <header className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
                <div className="bg-[#121212] pointer-events-auto text-white h-12 rounded-full flex items-center justify-between px-2 w-[340px] md:w-[400px] shadow-2xl transition-all hover:scale-105 duration-300">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full h-8 px-3 text-xs uppercase tracking-wider"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-3 h-3 mr-2" />
                        Menu
                    </Button>

                    <div className="font-bold text-sm tracking-tighter flex items-center gap-1">
                        <Asterisk className="w-3 h-3 text-[#ccff00] animate-spin-slow" />
                        STUDYFLOW
                    </div>

                    <Link href="/dashboard">
                        <Button size="sm" className="bg-[#ccff00] hover:bg-[#bbe000] text-black rounded-full h-8 px-4 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105">
                            Launch
                        </Button>
                    </Link>
                </div>
            </header>

            {/* --- SECTION 1: HERO & RING --- */}
            <section className="h-[120vh] flex flex-col items-center pt-32 relative overflow-hidden">
                <motion.div style={{ y: heroY }} className="z-10 text-center px-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="bg-[#121212] text-white px-2 py-1 text-[10px] tracking-widest uppercase rounded">V 1.0</span>
                        <span className="text-[10px] tracking-widest uppercase text-gray-500">Regular Updates</span>
                    </div>

                    <h1 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-bold tracking-tighter text-[#121212] mx-auto max-w-5xl">
                        SNBT Toolkit <span className="text-[#6343e5] inline-flex items-center align-middle"><Asterisk className="w-[0.8em] h-[0.8em]" /></span> <br />
                        Built to Flex
                    </h1>
                </motion.div>

                {/* ROTATING RING */}
                <div className="absolute top-[40vh] w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] flex items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ rotate: ringRotate }}
                        className="w-full h-full rounded-full border border-dashed border-gray-300 relative animate-spin-slow-reverse" // Added CSS animation for constant slow spin + scroll boost
                    >
                        {ringItems.map((item, i) => (
                            <div
                                key={i}
                                className="absolute w-32 h-20 md:w-48 md:h-32 bg-white rounded-xl shadow-xl flex items-center justify-center p-4 text-center border border-gray-100"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${i * (360 / ringItems.length)}deg) translate(0, -50%) translateX(35vw) rotate(-${i * (360 / ringItems.length)}deg)`
                                }}
                            >
                                <div className={`w-3 h-3 rounded-full ${item.color} absolute top-2 left-2`}></div>
                                <span className="font-bold text-sm md:text-lg leading-tight">{item.title}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute top-[80vh] flex flex-col items-center z-20">
                    <div className="flex items-center gap-4 text-gray-400 text-sm uppercase tracking-widest mb-8">
                        <span>Play Mockup Reel</span>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-12 bg-black rounded-lg flex items-center justify-center text-white cursor-pointer shadow-xl"
                    >
                        <Play className="fill-white w-4 h-4" />
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 2: THE PLATFORM --- */}
            <section className="py-32 relative z-10 bg-[#F3F3F3]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tighter mb-4">The platform</h2>
                    <p className="text-gray-500 max-w-xl mx-auto mb-16">
                        Platform packed with mockups, analytics & tracking resources, icons, and a complete progress course.
                    </p>

                    <motion.div
                        style={{ scale: platformScale, opacity: platformOpacity }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-black aspect-video mx-auto max-w-5xl"
                    >
                        <img
                            src="/studyflow_dashboard_check_1766102544223.png"
                            alt="Dashboard Interface"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 text-white text-left">
                            <div className="text-[#ccff00] text-xs font-bold uppercase tracking-widest mb-2">Welcome</div>
                            <h3 className="text-3xl font-bold">The Vault</h3>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 3: GROWING TOOLKIT (3D CARDS) --- */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tighter leading-none mb-8">
                        A growing toolkit for<br />
                        creative students
                    </h2>
                    <div className="flex justify-center gap-2">
                        <span className="bg-[#121212] text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
                        <span className="text-gray-500 text-sm">Access everything with a single membership</span>
                    </div>
                </div>

                <div className="h-[600px] w-full max-w-[1400px] mx-auto relative perspective-1000" onMouseMove={handleMouse}>
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="w-full h-full flex justify-center items-center gap-8 relative"
                    >
                        {/* Card 1 */}
                        <div className="w-[300px] h-[450px] bg-[#6343e5] rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-2xl transform translate-y-12 rotate-[-6deg] hover:translate-y-0 hover:rotate-0 transition-all duration-500">
                            <div>
                                <Users className="w-10 h-10 mb-4" />
                                <h3 className="text-4xl font-bold tracking-tighter">Community</h3>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-100 rounded-full w-full">Join Now</Button>
                        </div>

                        {/* Card 2 (Center) */}
                        <div className="w-[340px] h-[500px] bg-[#121212] rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-2xl z-10 transform hover:scale-105 transition-all duration-500">
                            <div className="text-center mt-8">
                                <Asterisk className="w-16 h-16 mx-auto text-white mb-4" />
                                <h3 className="text-5xl font-bold tracking-tighter">The Vault</h3>
                                <p className="text-gray-400 mt-4 text-sm">Our ever-growing dashboard packed with resources.</p>
                            </div>
                            <img src="/studyflow_dashboard_check_1766102544223.png" className="rounded-xl mt-4 opacity-50 block h-32 object-cover object-top" />
                        </div>

                        {/* Card 3 */}
                        <div className="w-[300px] h-[450px] bg-[#ccff00] rounded-[2rem] p-8 text-black flex flex-col justify-between shadow-2xl transform translate-y-12 rotate-[6deg] hover:translate-y-0 hover:rotate-0 transition-all duration-500">
                            <div>
                                <Layout className="w-10 h-10 mb-4" />
                                <h3 className="text-4xl font-bold tracking-tighter">Tryout Page</h3>
                            </div>
                            <Button className="bg-[#121212] text-white hover:bg-black/80 rounded-full w-full">Discover</Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 4: COMMUNITY & MAP --- */}
            <section className="py-32 bg-[#F3F3F3] flex flex-col md:flex-row items-center justify-center gap-12 px-6">
                <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-[#121212] rounded-full flex items-center justify-center relative shadow-2xl">
                    <Globe className="text-[#ccff00] w-24 h-24 animate-pulse" strokeWidth={1} />
                    <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-90"></div>
                    <div className="absolute inset-0 border-[1px] border-dashed border-white/10 rounded-full scale-75 animate-spin-slow"></div>
                    <div className="absolute bottom-12 text-center w-full">
                        <p className="text-[#ccff00] font-handwriting text-xl -rotate-6">StudyFlow&apos;s Global <br /> Community</p>
                    </div>
                </div>

                <div className="w-full max-w-lg bg-[#6343e5] rounded-[2.5rem] p-10 text-white shadow-2xl min-h-[450px] flex flex-col justify-center text-center">
                    <h3 className="text-4xl font-bold mb-6 tracking-tight">The creative student&apos;s cheat code.</h3>
                    <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 overflow-hidden border-2 border-white">
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
                    </div>
                    <p className="text-sm opacity-80 mb-8">
                        &quot;StudyFlow is a one-stop shop, offering everything from snippets to help you set up your site to advanced analytics and interactions.&quot;
                    </p>
                    <div className="inline-block bg-[#121212] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase self-center">
                        SNBT 2026
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: PRICING --- */}
            <section className="py-32 bg-[#121212] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-2">Pricing for individuals</h2>
                        <p className="text-gray-500">Simple pricing for everyone.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-[#F3F3F3] text-black rounded-3xl p-8 flex flex-col relative group hover:scale-[1.02] transition-transform">
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold mb-2">Member</h3>
                                <p className="text-gray-500 text-sm">Free forever</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-bold tracking-tighter">Rp 0</span>
                            </div>
                            <div className="space-y-4 mb-8 flex-1">
                                {["Access to 7 Subtes", "Basic Analytics", "Community Forum"].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className="bg-black text-white rounded-full p-1"><Check size={10} /></div>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full rounded-full bg-[#6343e5] hover:bg-[#5035c0] text-white h-12">Get Started</Button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#6343e5] text-white rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-[0_0_40px_rgba(99,67,229,0.3)]">
                            <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold mb-2">Lifetime</h3>
                                <p className="text-white/70 text-sm">One time payment</p>
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold tracking-tighter">Rp 99k</span>
                                    <span className="text-sm line-through opacity-50">Rp 199k</span>
                                </div>
                            </div>
                            <div className="space-y-4 mb-8 flex-1">
                                {["Everything in Member", "Advanced Forecast", "Tryout Simulation", "Priority Support"].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className="bg-[#ccff00] text-black rounded-full p-1"><Check size={10} /></div>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full rounded-full bg-white text-black hover:bg-gray-100 h-12">Upgrade Now</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: FOOTER --- */}
            <footer className="bg-[#121212] pt-32 pb-8 text-white relative overflow-hidden">
                {/* Made with... */}
                <div className="relative z-10 flex flex-col items-center mb-32">
                    <div className="flex items-center gap-8 md:gap-16">
                        <span className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tighter">Made</span>
                        <div className="w-[200px] h-[120px] md:w-[300px] md:h-[180px] rounded-2xl overflow-hidden border-2 border-[#ccff00] relative rotate-[-4deg]">
                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                                <p className="text-center text-xs p-4">Simulating SNBT Environment...</p>
                            </div>
                        </div>
                        <span className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tighter">with</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-[clamp(3rem,6vw,5rem)] font-bold tracking-tighter">StudyFlow</span>
                    </div>
                    <div className="absolute top-1/2 right-[20%] translate-x-full -translate-y-1/2">
                        <p className="font-handwriting text-[#ccff00] -rotate-12 text-xl">These folks are<br />talented</p>
                        <svg className="w-12 h-12 text-[#ccff00] rotate-90" viewBox="0 0 100 100">
                            <path d="M10,50 Q50,10 90,50" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                {/* Scrolling Footer Text */}
                <div className="border-t border-white/10 pt-8 mt-20">
                    <div className="flex overflow-hidden">
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                            className="flex gap-0 whitespace-nowrap"
                        >
                            {Array(4).fill(" STUDYFLOW SNBT 2026 ").map((text, i) => (
                                <span key={i} className="text-[15vw] font-bold leading-none tracking-tighter opacity-100 select-none">
                                    {text}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="flex justify-center mt-12 mb-12">
                        <div className="bg-[#222] rounded-full px-4 py-2 flex items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400">
                            <span>Made</span>
                            <span>With</span>
                            <span className="bg-white text-black px-1 rounded">Next.js 15</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
