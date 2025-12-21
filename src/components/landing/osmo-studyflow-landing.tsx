"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Menu,
    ArrowRight,
    BookOpen,
    Play,
    Check,
    Zap,
    Target,
    TrendingUp,
    Calendar,
    Trophy,
    Star,
    Users,
    Sparkles,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OsmoStudyFlowLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Smooth scroll setup
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

        // Connect Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(() => {});
        };
    }, []);

    return (
        <div ref={containerRef} className="relative bg-[#0A0A0A] text-white overflow-x-hidden">
            
            {/* HEADER */}
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            
            {/* MARQUEE BANNER */}
            <MarqueeBanner />
            
            {/* HERO SECTION */}
            <HeroSection />
            
            {/* ANIMATED CARDS SHOWCASE */}
            <ShowcaseSection />
            
            {/* VIDEO SECTION */}
            <VideoSection />
            
            {/* CREATORS SECTION */}
            <CreatorsSection />
            
            {/* UPDATES FEED */}
            <UpdatesSection />
            
            {/* PLATFORM OVERVIEW */}
            <PlatformSection />
            
            {/* PRODUCTS CAROUSEL */}
            <ProductsSection />
            
            {/* BENEFITS */}
            <BenefitsSection />
            
            {/* TESTIMONIALS */}
            <TestimonialsSection />
            
            {/* PRICING */}
            <PricingSection />
            
            {/* SHOWCASE GALLERY */}
            <ShowcaseGallery />
            
            {/* FINAL CTA */}
            <FinalCTA />
            
            {/* FOOTER */}
            <Footer />
        </div>
    );
}

// Header Component
function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4"
        >
            <div className="glass max-w-7xl mx-auto rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                        <span className="text-sm font-medium hidden sm:inline">Menu</span>
                    </button>
                    
                    <div className="w-px h-6 bg-white/10 hidden sm:block" />
                    
                    <Link href="/" className="flex items-center gap-2">
                        <div className="text-2xl font-bold tracking-tight">
                            STUDYFLOW
                        </div>
                    </Link>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link href="/login">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/onboarding">
                        <Button 
                            size="sm"
                            className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold rounded-xl"
                        >
                            Join
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}

// Marquee Banner
function MarqueeBanner() {
    return (
        <div className="fixed top-[72px] left-0 right-0 z-40 bg-[#BFFF0B] py-2 overflow-hidden">
            <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-4">
                        <span className="text-black font-bold text-sm">EXPLORE THE STUDYFLOW SHOWCASE</span>
                        <Star className="w-4 h-4 text-black fill-black" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Hero Section
function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8"
                >
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BFFF0B] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BFFF0B]"></span>
                    </div>
                    <span className="text-[#BFFF0B] text-sm font-bold">SNBT 2026 • 106 HARI LAGI</span>
                </motion.div>
                
                {/* Main Headline */}
                <h1 className="text-[clamp(3rem,10vw,7rem)] leading-[0.9] font-black tracking-tight mb-8">
                    Dev Toolkit{" "}
                    <Star className="inline w-[0.6em] h-[0.6em] text-purple-500 fill-purple-500" />{" "}
                    <br />
                    <span className="gradient-text-purple">Built to Flex</span>
                </h1>
                
                <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                    Platform packed with <span className="text-white">SNBT resources</span>,{" "}
                    <span className="text-white">progress tracking</span>, and a{" "}
                    <span className="text-white">study system</span> that makes you unstoppable
                </p>
            </motion.div>
        </section>
    );
}

// Showcase Section with 3D Cards
function ShowcaseSection() {
    const showcaseItems = [
        { title: "Progress Tracking", image: "/api/placeholder/400/300", color: "from-blue-500 to-blue-600" },
        { title: "Smart Analytics", image: "/api/placeholder/400/300", color: "from-purple-500 to-purple-600" },
        { title: "Tryout System", image: "/api/placeholder/400/300", color: "from-pink-500 to-pink-600" },
        { title: "Study Streaks", image: "/api/placeholder/400/300", color: "from-orange-500 to-orange-600" },
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
                            className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
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

// Video Section
function VideoSection() {
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
                        StudyFlow is an ever-growing platform with
                        <br />
                        <span className="gradient-text-green">SNBT resources</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-3xl mx-auto">
                        Get exclusive access to the tracking system, analytics, and study techniques behind top SNBT scorers.
                    </p>
                </motion.div>
                
                {/* Video Player Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-3xl overflow-hidden glass-light"
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
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
                                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0A0A0A]"
                            />
                        ))}
                    </div>
                    <span className="text-white/80 font-medium">Join 500+ others</span>
                </div>
            </div>
        </section>
    );
}

// Creators Section
function CreatorsSection() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-[#BFFF0B] text-sm font-bold mb-4">Created by</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-8">
                        <div className="text-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4" />
                            <h3 className="text-3xl font-black">Zain</h3>
                            <p className="text-white/60">Ardiansyah</p>
                        </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group">
                        <span className="font-medium">About us</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Updates Section
function UpdatesSection() {
    const updates = [
        { title: "Progress Dashboard", time: "4 days ago", tag: "New Feature", color: "bg-blue-500" },
        { title: "Tryout Analytics", time: "6 days ago", tag: "Update", color: "bg-purple-500" },
        { title: "Study Streaks", time: "1 week ago", tag: "New Feature", color: "bg-pink-500" },
    ];
    
    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4">
                        Latest updates
                        <br />
                        from StudyFlow
                    </h2>
                    <p className="text-[#BFFF0B] text-lg font-medium">
                        New stuff is added every week!
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {updates.map((update, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-3xl p-6 hover:border-white/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs bg-[#BFFF0B]/20 text-[#BFFF0B] px-3 py-1 rounded-full font-bold">
                                    {update.tag}
                                </span>
                                <span className="text-white/40 text-xs">{update.time}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{update.title}</h3>
                            <div className={`aspect-video rounded-2xl ${update.color} opacity-50 group-hover:opacity-70 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Platform Section
function PlatformSection() {
    return (
        <section className="py-32 px-4 bg-[#1A1A1A]/50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/60 text-sm font-bold mb-2">(The Dashboard)</p>
                        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6">
                            The platform
                        </h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">
                            Built for SNBT warriors, our dashboard gives you access to comprehensive tracking,
                            analytics, and study techniques. Track, analyze, and dominate.
                        </p>
                        <Link href="/dashboard">
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-6 py-6 font-bold group">
                                About the Dashboard
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-light"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Products Section
function ProductsSection() {
    const products = [
        { name: "Progress Tracker", status: "Available", color: "from-blue-500 to-blue-600" },
        { name: "Tryout System", status: "Available", color: "from-purple-500 to-purple-600" },
        { name: "AI Analytics", status: "Coming Soon", color: "from-pink-500 to-pink-600" },
    ];
    
    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tight mb-4">
                        A growing toolkit for
                        <br />
                        <span className="gradient-text-purple">SNBT warriors</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Access everything with a single account:
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-3xl p-8 hover:border-white/20 transition-all group cursor-pointer"
                        >
                            <div className={`aspect-video rounded-2xl bg-gradient-to-br ${product.color} mb-6 opacity-50 group-hover:opacity-70 transition-opacity`} />
                            <span className="text-xs bg-[#BFFF0B]/20 text-[#BFFF0B] px-3 py-1 rounded-full font-bold">
                                {product.status}
                            </span>
                            <h3 className="text-2xl font-bold text-white mt-4">{product.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Benefits Section
function BenefitsSection() {
    const benefits = [
        {
            title: "Track Faster and Better",
            description: "Our system saves you hours of manual tracking. Focus on studying, not spreadsheets.",
        },
        {
            title: "Smart Analytics",
            description: "AI-powered insights help you identify weak areas and optimize your study strategy.",
        },
        {
            title: "Always Growing",
            description: "We keep adding new features and improvements. Your toolkit never stops expanding.",
        },
    ];
    
    return (
        <section className="py-32 px-4 bg-[#1A1A1A]/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-white/60 text-sm font-bold mb-4">Why StudyFlow?</p>
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-6">
                        Level up your game and join
                        <br />
                        students who love studying
                        <br />
                        as much as you do.
                    </h2>
                </motion.div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-white/60 leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            name: "Ahmad Rizki",
            role: "ITB 2025",
            quote: "StudyFlow helped me track my progress systematically. Got into my dream university!",
        },
        {
            name: "Siti Nurhaliza",
            role: "UI 2025",
            quote: "The analytics feature is a game-changer. I could see exactly where I needed to improve.",
        },
    ];
    
    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight">
                        StudyFlow's Global
                        <br />
                        <span className="gradient-text-green">Community</span>
                    </h2>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-3xl p-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed">{testimonial.quote}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Pricing Section
function PricingSection() {
    return (
        <section className="py-32 px-4 bg-[#1A1A1A]/50">
            <div className="max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-4">
                        Pricing for
                        <br />
                        <span className="gradient-text-purple">Students</span>
                    </h2>
                    <p className="text-white/60 text-lg">Choose the plan that fits you best.</p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-light rounded-3xl p-12 max-w-md mx-auto"
                >
                    <span className="text-xs bg-[#BFFF0B]/20 text-[#BFFF0B] px-3 py-1 rounded-full font-bold">
                        BEST VALUE
                    </span>
                    <h3 className="text-4xl font-black text-white mt-6 mb-2">Free Forever</h3>
                    <p className="text-white/60 mb-8">
                        All features included. No credit card required.
                    </p>
                    <Link href="/onboarding">
                        <Button className="w-full bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold rounded-xl py-6">
                            Get Started
                        </Button>
                    </Link>
                    <div className="mt-8 space-y-3 text-left">
                        {["Progress Tracking", "Tryout Analytics", "Study Streaks", "Community Access"].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-[#BFFF0B]" />
                                <span className="text-white/80">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Showcase Gallery
function ShowcaseGallery() {
    return (
        <section className="py-32 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black tracking-tight mb-4">
                        Made with
                        <br />
                        <span className="gradient-text-purple">StudyFlow</span>
                    </h2>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-light rounded-3xl p-6 hover:border-white/20 transition-all group cursor-pointer"
                        >
                            <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-50 group-hover:opacity-70 transition-opacity mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Success Story #{i}</h3>
                            <p className="text-white/60 text-sm">Student achieved their dream university</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Final CTA
function FinalCTA() {
    return (
        <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0A0A0A]"
                                />
                            ))}
                        </div>
                        <span className="text-white/80 font-medium">Join 500+ others</span>
                    </div>
                    
                    <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tight mb-6">
                        Ready to
                        <br />
                        <span className="gradient-text-green">level up?</span>
                    </h2>
                    
                    <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
                        Become a member to unlock the full StudyFlow toolkit today.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/onboarding">
                            <Button className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold rounded-xl px-8 py-6 text-lg">
                                Become a member
                            </Button>
                        </Link>
                        <Link href="/faq">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-xl px-8 py-6 text-lg">
                                FAQs
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Footer
function Footer() {
    return (
        <footer className="py-16 px-4 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-white font-bold mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link href="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="/tracking" className="text-white/60 hover:text-white transition-colors">Tracking</Link></li>
                            <li><Link href="/analytics" className="text-white/60 hover:text-white transition-colors">Analytics</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Community</h3>
                        <ul className="space-y-2">
                            <li><Link href="/showcase" className="text-white/60 hover:text-white transition-colors">Showcase</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="/updates" className="text-white/60 hover:text-white transition-colors">Updates</Link></li>
                            <li><Link href="/faq" className="text-white/60 hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Subscribe to Newsletter</h3>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
                            />
                            <Button className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold rounded-xl">
                                →
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
                    <div className="text-white/40 text-sm mb-4 md:mb-0">
                        © 2025 StudyFlow. Made with 💜 for SNBT warriors.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">Login</Link>
                        <Link href="/onboarding" className="text-white/60 hover:text-white text-sm transition-colors">Join StudyFlow</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}