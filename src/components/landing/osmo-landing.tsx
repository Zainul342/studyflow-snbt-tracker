"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
    ArrowRight,
    Asterisk,
    Play,
    Check,
    Zap,
    Users
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

    // Platform Zoom
    const platformScale = useTransform(scrollYProgress, [0.1, 0.25], [0.85, 1]);
    const platformOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

    return (
        <div ref={containerRef} className="relative min-h-[500vh] bg-[#F3F3F3] text-[#121212] font-sans selection:bg-[#ccff00] selection:text-black overflow-x-hidden">

            {/* HEADER */}
            <header className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
                <div className="bg-[#1b1b1b]/80 backdrop-blur-md pointer-events-auto text-white h-[52px] rounded-full flex items-center justify-between px-1.5 w-full max-w-[440px] border border-white/5 shadow-2xl transition-all duration-300">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white hover:bg-transparent rounded-full h-9 px-4 text-xs font-medium"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="flex flex-col gap-0.5 mr-2">
                            <div className="w-3 h-[1px] bg-current"></div>
                            <div className="w-3 h-[1px] bg-current"></div>
                        </div>
                        Menu
                    </Button>

                    <div className="font-black text-lg tracking-tighter absolute left-1/2 -translate-x-1/2">
                        STUDYFLOW
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Link href="/login">
                            <Button size="sm" className="bg-[#2c2c2c] hover:bg-[#3a3a3a] text-gray-300 rounded-full h-9 px-4 text-xs font-semibold transition-all">
                                Login
                            </Button>
                        </Link>
                        <Link href="/onboarding">
                            <Button size="sm" className="bg-[#ccff00] hover:bg-[#d9ff33] text-black rounded-full h-9 px-4 text-xs font-black transition-all">
                                Join
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- SECTION 1: HERO & FLOATING CARDS --- */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-60 relative overflow-hidden bg-[#F3F3F3]">
                <motion.div className="z-20 text-center px-4 max-w-5xl">
                    <h1 className="text-[clamp(3rem,10vw,6rem)] leading-[0.85] font-black tracking-tighter text-[#121212] mb-12">
                        Dev Toolkit <span className="text-[#6343e5] inline-flex items-center align-middle h-[0.8em]"><Asterisk size={80} strokeWidth={3} /></span> <br />
                        Built to Flex
                    </h1>

                    <p className="text-[#121212]/60 text-lg md:text-xl font-medium max-w-xl mx-auto mb-10 leading-snug">
                        Access everything you need to dominate the <br className="hidden md:block" /> SNBT 2026 entrance exam.
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4 text-[#121212]/30 text-[10px] font-black uppercase tracking-[0.2em]">
                            <span>Play Toolkit Reel</span>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-20 h-11 bg-black rounded-xl flex items-center justify-center text-white cursor-pointer shadow-lg group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Play className="fill-white w-3 h-3 relative z-10" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* FLOATING CARDS ARC */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[600px] pointer-events-none z-10">
                    {[
                        { title: "Dashboard", rotate: -25, x: "-40%", y: "30%", color: "bg-blue-600" },
                        { title: "Analytics", rotate: -15, x: "-25%", y: "15%", color: "bg-purple-600" },
                        { title: "Tryouts", rotate: -5, x: "-10%", y: "5%", color: "bg-zinc-800" },
                        { title: "Progress", rotate: 5, x: "10%", y: "5%", color: "bg-orange-600" },
                        { title: "Library", rotate: 15, x: "25%", y: "15%", color: "bg-teal-600" },
                        { title: "Community", rotate: 25, x: "40%", y: "30%", color: "bg-indigo-600" },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 300, opacity: 0, rotate: card.rotate }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bg-white rounded-2xl shadow-2xl p-1.5 border border-black/5"
                            style={{
                                width: "240px",
                                height: "170px",
                                left: "50%",
                                bottom: "0",
                                transform: `translateX(${card.x}) translateY(-${card.y}) rotate(${card.rotate}deg)`,
                            }}
                        >
                            <div className={`w-full h-full ${card.color} rounded-xl overflow-hidden relative border border-white/10`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-wider">
                                    {card.title}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 2: THE PLATFORM --- */}
            <section className="py-24 md:py-40 relative z-10 bg-[#F3F3F3]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-tighter mb-6">
                        The platform <span className="text-[#6343e5]/20 inline-flex items-center align-middle h-[0.7em]"><Asterisk size={60} strokeWidth={2} /></span>
                    </h2>
                    <p className="text-[#121212]/50 text-base md:text-lg font-medium max-w-xl mx-auto mb-20 leading-snug">
                        Platform packed with subject materials, analytic resources,<br className="hidden md:block" /> track progress, and complete mockups simulations.
                    </p>

                    <motion.div
                        style={{ scale: platformScale, opacity: platformOpacity }}
                        className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white bg-[#09090b] aspect-[16/10] mx-auto max-w-6xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#6343e5]/5 to-transparent"></div>
                        <img
                            src="/studyflow_dashboard_check_1766102544223.png"
                            alt="Dashboard Interface"
                            className="w-full h-full object-cover object-top opacity-100"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                        <div className="absolute bottom-10 left-10 text-white text-left z-20">
                            <div className="text-[#ccff00] text-[10px] font-black uppercase tracking-[0.3em] mb-3">Welcome to</div>
                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">The Vault</h3>
                        </div>

                        {/* Browser dots */}
                        <div className="absolute top-6 left-8 flex gap-2 z-20">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 3: GROWING TOOLKIT --- */}
            <section className="py-24 md:py-40 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center mb-24 z-20 relative">
                    <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.9] mb-10">
                        A growing toolkit for<br />
                        ambitious students
                    </h2>
                    <div className="flex justify-center flex-wrap gap-2">
                        <span className="bg-[#121212] text-white px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider shadow-lg">NEW TOOLKIT</span>
                        <div className="flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-1.5 text-zinc-400 text-xs font-medium">
                            <Zap size={10} className="fill-zinc-400" />
                            Access everything with a single membership
                        </div>
                    </div>
                </div>

                <div className="relative h-[550px] w-full max-w-6xl mx-auto px-4">
                    {/* Horizontal arc layout */}
                    <div className="flex items-end justify-center gap-4 h-full pb-10">
                        {/* Purple Card */}
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="w-[300px] h-[400px] bg-[#6343e5] rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-xl rotate-[-4deg] relative z-10"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-4xl font-black tracking-tighter leading-none mb-3">Community <br /> Learning</h3>
                                <p className="text-white/60 text-sm font-medium">Connect with fellow SNBT warriors.</p>
                            </div>
                            <Button className="bg-white text-black hover:bg-gray-100 rounded-full w-full h-11 font-black text-xs uppercase tracking-wider">Join Now</Button>
                        </motion.div>

                        {/* Center Dark Card */}
                        <motion.div
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="w-[340px] h-[480px] bg-[#121212] rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl z-20"
                        >
                            <div className="text-center mt-6">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10">
                                    <Asterisk size={40} className="text-white" />
                                </div>
                                <h3 className="text-5xl font-black tracking-tighter leading-none">The Vault</h3>
                                <p className="text-white/40 mt-6 text-sm font-medium leading-relaxed">Our ever-growing database of SNBT tracking resources.</p>
                            </div>
                            <div className="bg-zinc-900/50 rounded-2xl p-1.5 border border-white/5">
                                <img src="/studyflow_dashboard_check_1766102544223.png" className="rounded-xl w-full h-24 object-cover object-top opacity-60" alt="Vault preview" />
                            </div>
                        </motion.div>

                        {/* Green Card */}
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="w-[300px] h-[400px] bg-[#ccff00] rounded-[2.5rem] p-8 text-black flex flex-col justify-between shadow-xl rotate-[4deg] relative z-10"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-4xl font-black tracking-tighter leading-none mb-3">Mockups <br /> Simulation</h3>
                                <p className="text-black/40 text-sm font-medium">Real-time SNBT exam environment.</p>
                            </div>
                            <Button className="bg-black text-white hover:bg-zinc-800 rounded-full w-full h-11 font-black text-xs uppercase tracking-wider">Discover</Button>
                        </motion.div>
                    </div>

                    {/* Background decorations */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-zinc-100 -z-0 rounded-full hidden md:block"></div>
                </div>
            </section>


            {/* --- SECTION 5: PRICING --- */}
            <section className="py-24 md:py-40 bg-[#F3F3F3] text-[#121212]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.9] mb-8">
                            Everything you need in <br /> one membership.
                        </h2>

                        <div className="flex justify-center gap-1 bg-zinc-200/50 p-1 rounded-full w-fit mx-auto mb-16 border border-zinc-200">
                            <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">Monthly</button>
                            <button className="px-6 py-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-full">Lifetime</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {/* Member Card */}
                        <div className="bg-[#121212] text-white rounded-[2.5rem] p-10 flex flex-col relative group transition-all duration-500 overflow-hidden min-h-[580px]">
                            <div className="bg-[#ccff00] text-black text-[8px] font-black px-3 py-1.5 rounded-full w-fit mb-10 tracking-[0.2em] uppercase">FREE FOREVER</div>
                            <div className="mb-10">
                                <h3 className="text-4xl font-black tracking-tighter mb-4">Member</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black tracking-tighter">Rp 0</span>
                                </div>
                            </div>
                            <div className="space-y-4 mb-12 flex-1 pt-6 border-t border-white/5">
                                {[
                                    { text: "Access to 7 standard subtes", locked: false },
                                    { text: "Basic progress tracking", locked: false },
                                    { text: "Community study circles", locked: false },
                                    { text: "Daily study goal calculation", locked: false },
                                    { text: "Mock exam (limited)", locked: true },
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <div className={`rounded-full p-1 ${feat.locked ? "bg-white/5 text-white/20" : "bg-[#ccff00] text-black"}`}>
                                            <Check size={10} strokeWidth={4} />
                                        </div>
                                        <span className={feat.locked ? "text-white/20" : "text-white"}>{feat.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full rounded-full bg-white text-black hover:bg-gray-100 h-14 font-black text-xs uppercase tracking-[0.15em] relative z-10">Get Started</Button>
                        </div>

                        {/* Lifetime Card */}
                        <div className="bg-[#6343e5] text-white rounded-[2.5rem] p-10 flex flex-col relative group transition-all duration-500 overflow-hidden min-h-[580px] shadow-[0_40px_80px_-20px_rgba(99,67,229,0.4)]">
                            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-20 group-hover:rotate-12 transition-transform duration-700">
                                <Zap size={140} className="fill-white" />
                            </div>
                            <div className="bg-white/10 text-white text-[8px] font-black px-3 py-1.5 rounded-full w-fit mb-10 tracking-[0.2em] uppercase">MOST POPULAR</div>
                            <div className="mb-10">
                                <h3 className="text-4xl font-black tracking-tighter mb-4">Lifetime</h3>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-6xl font-black tracking-tighter">Rp 99k</span>
                                    <span className="text-lg line-through text-white/30 font-bold">199k</span>
                                </div>
                            </div>
                            <div className="space-y-4 mb-12 flex-1 pt-6 border-t border-white/10">
                                {[
                                    { text: "Everything in Member, plus:", locked: false },
                                    { text: "Complete exam simulations", locked: false },
                                    { text: "Weakness analysis algorithm", locked: false },
                                    { text: "Priority task management", locked: false },
                                    { text: "Early access to new features", locked: false },
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <div className="bg-[#ccff00]/20 text-[#ccff00] rounded-full p-1">
                                            <Check size={10} strokeWidth={4} />
                                        </div>
                                        <span>{feat.text}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full rounded-full bg-white text-black hover:bg-gray-100 h-14 font-black text-xs uppercase tracking-[0.15em] relative z-10">Upgrade Now</Button>
                        </div>
                    </div>

                    {/* FAQ Mockup */}
                    <div className="mt-32 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-black tracking-tighter">Got questions?<br />We&apos;ve got answers.</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                "How does the tracking system work?",
                                "Can I access the materials offline?",
                                "What makes StudyFlow different from others?",
                                "Is there a dedicated support team?"
                            ].map((q, i) => (
                                <div key={i} className="group border-b border-zinc-200 py-6 flex items-center justify-between cursor-pointer hover:px-2 transition-all">
                                    <span className="text-lg font-black tracking-tight text-[#121212]/80 group-hover:text-black">{q}</span>
                                    <ArrowRight size={18} className="text-zinc-300 group-hover:text-[#6343e5] group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: FOOTER --- */}
            <footer className="bg-white pt-32 pb-8 text-black relative overflow-hidden border-t border-zinc-100">
                <div className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Newsletter */}
                        <div>
                            <h4 className="text-xl font-black tracking-tight mb-8">Subscribe to the StudyFlow Newsletter</h4>
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <input type="text" placeholder="First name" className="bg-zinc-100 border-none rounded-xl px-6 py-4 w-full text-sm font-medium focus:ring-2 focus:ring-[#6343e5] outline-none transition-all" />
                                <input type="email" placeholder="yourname@email.com" className="bg-zinc-100 border-none rounded-xl px-6 py-4 w-full text-sm font-medium focus:ring-2 focus:ring-[#6343e5] outline-none transition-all" />
                            </div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-5 h-5 rounded bg-zinc-100 border border-zinc-200 flex items-center justify-center cursor-pointer">
                                    <div className="w-2.5 h-2.5 rounded-[2px] bg-[#6343e5] opacity-20"></div>
                                </div>
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">I agree to the <Link href="/privacy" className="underline hover:text-black">Privacy Policy</Link></span>
                                <Button className="ml-auto bg-black text-white hover:bg-zinc-800 rounded-xl px-8 h-12 font-black text-xs uppercase tracking-wider">Get updates</Button>
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-3 gap-10">
                            {[
                                { title: "Product", links: ["The Vault", "Tryout Simulation", "Analysis Algorithm", "Community", "Mockups"] },
                                { title: "Community", links: ["Showcase", "About StudyFlow", "Discord Community"] },
                                { title: "Membership", links: ["Updates", "Pricing", "FAQs", "Support"] },
                            ].map((group, i) => (
                                <div key={i}>
                                    <h5 className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-6">{group.title}</h5>
                                    <ul className="space-y-3">
                                        {group.links.map((link, j) => (
                                            <li key={j}>
                                                <Link href="#" className="text-sm font-black text-zinc-500 hover:text-black transition-colors">{link}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom row buttons */}
                    <div className="mt-20 flex flex-wrap items-center gap-4">
                        <Link href="/login">
                            <Button className="bg-[#121212] text-white hover:bg-black rounded-full px-8 h-11 font-black text-xs uppercase tracking-wider">Login</Button>
                        </Link>
                        <Link href="/onboarding">
                            <Button className="bg-[#ff4d4d] text-white hover:bg-[#ff3333] rounded-full px-8 h-11 font-black text-xs uppercase tracking-wider">Join StudyFlow</Button>
                        </Link>

                        <div className="flex items-center gap-4 ml-auto">
                            {["linkedin", "instagram", "twitter"].map((social, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-all">
                                    <Asterisk size={16} className="text-zinc-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Giant Text Marquee */}
                <div className="mt-20 pointer-events-none select-none overflow-hidden border-t border-zinc-100">
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap py-10"
                    >
                        {Array(6).fill("STUDYFLOW ").map((text, i) => (
                            <span key={i} className="text-[20vw] font-black leading-none tracking-tighter text-[#121212]">
                                {text}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Legal Bar */}
                <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        {["LICENSING", "T&CS", "PRIVACY", "COOKIES"].map((item, i) => (
                            <span key={i} className="bg-zinc-100 text-[8px] font-black px-2 py-1 rounded tracking-widest text-zinc-400 hover:text-black cursor-pointer transition-colors">{item}</span>
                        ))}
                    </div>
                    <div className="text-[8px] font-bold text-zinc-300 tracking-[0.2em] uppercase">
                        © 2025 STUDYFLOW SUPPLY B.V.
                    </div>
                    <div className="text-[8px] font-bold text-zinc-300 tracking-[0.2em] uppercase">
                        CREATED BY <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded ml-1">DENNIS</span> <span className="bg-[#6343e5] text-white px-1.5 py-0.5 rounded ml-1">ILJA</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
