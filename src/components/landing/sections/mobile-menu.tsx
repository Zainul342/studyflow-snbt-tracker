"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowRight, LayoutDashboard, Sparkles, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoonModal } from "@/components/coming-soon-modal";

export function MobileMenu({ onClose }: { onClose: () => void }) {
    const [mounted, setMounted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState({ name: "", desc: "" });

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleFeatureClick = (name: string, desc: string, isAvailable: boolean) => {
        if (!isAvailable) {
            setActiveFeature({ name, desc });
            setModalOpen(true);
        } else {
            onClose();
        }
    };

    if (!mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col pointer-events-auto"
        >
            <ComingSoonModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                featureName={activeFeature.name}
                description={activeFeature.desc}
            />

            {/* Menu Container */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full bg-background border-b border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-none"
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-foreground hover:text-foreground/70 transition-colors"
                    >
                        <X className="w-5 h-5" />
                        <span className="font-bold text-sm">Close</span>
                    </button>

                    <div className="text-xl font-black tracking-tighter text-foreground">
                        STUDYFLOW
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/login" onClick={onClose} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                            Login
                        </Link>
                        <Link href="/register" onClick={onClose}>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-bold h-8 text-xs rounded-sm">
                                Join
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Menu Content Grid */}
                <div className="p-6 overflow-y-auto bg-background h-full">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

                        {/* Column 1: Feature Links */}
                        <div className="md:col-span-3 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Our Toolkit</h4>
                                <ul className="space-y-4">
                                    {[
                                        { name: "Progress Tracker", link: "/dashboard", available: true, icon: LayoutDashboard },
                                        { name: "Tryout System", link: "#", available: false, desc: "Computer Based Test (CBT) simulation with IRT scoring.", icon: Sparkles },
                                        { name: "Material Bank", link: "#", available: false, desc: "Comprehensive summary of SNBT subjects.", icon: BookOpen },
                                        { name: "Community", link: "#", available: false, desc: "Join thousands of other SNBT fighters.", icon: Users },
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <div
                                                onClick={() => handleFeatureClick(item.name, item.desc || "", item.available)}
                                                className="group flex items-center gap-3 text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
                                            >
                                                {item.available ? (
                                                    <Link href={item.link} className="flex items-center gap-2 w-full">
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    <span className="flex items-center gap-2 w-full">
                                                        {item.name}
                                                        {!item.available && (
                                                            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm font-bold border border-border">
                                                                SOON
                                                            </span>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Column 2: Explore & Socials */}
                        <div className="md:col-span-4 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Explore</h4>
                                <ul className="space-y-4">
                                    <li><Link href="#creators" onClick={onClose} className="text-lg font-medium text-foreground/70 hover:text-foreground">Success Stories</Link></li>
                                    <li><Link href="#updates" onClick={onClose} className="text-lg font-medium text-foreground/70 hover:text-foreground">Updates</Link></li>
                                    <li><Link href="#products" onClick={onClose} className="text-lg font-medium text-foreground/70 hover:text-foreground">Roadmap</Link></li>
                                    <li><Link href="#benefits" onClick={onClose} className="text-lg font-medium text-foreground/70 hover:text-foreground">Why StudyFlow?</Link></li>
                                </ul>
                            </div>

                            {/* Social Icons (Mockup) */}
                            <div className="flex gap-2 mt-auto pt-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 cursor-pointer transition-colors text-muted-foreground hover:text-foreground">
                                        <ArrowRight className="w-4 h-4 -rotate-45" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Featured Card */}
                        <div className="md:col-span-5">
                            <div className="relative h-full min-h-[300px] rounded-sm bg-card border border-border p-8 flex flex-col items-center justify-center text-center overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="inline-block px-3 py-1 bg-primary rounded-full text-[10px] font-bold text-black mb-6">
                                    START NOW
                                </span>

                                <h3 className="text-4xl font-black text-foreground mb-6 tracking-tight">
                                    Your Dream PTN
                                    <br />
                                    Awaits.
                                </h3>

                                <Link href="/dashboard" onClick={onClose}>
                                    <Button className="bg-foreground text-background hover:bg-foreground/90 font-bold px-8 rounded-sm mb-8">
                                        Go to Dashboard
                                    </Button>
                                </Link>

                                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                                    <span>Free Forever.</span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                                    <span>No Credit Card.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GIANT FOOTER */}
                <div className="mt-auto border-t border-border bg-card relative overflow-hidden">
                    {/* Giant Typography */}
                    <div className="relative h-[15vw] min-h-[100px] flex items-center justify-center overflow-hidden select-none pointer-events-none opacity-10">
                        <h1 className="text-[25vw] font-black text-foreground leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                            STUDYFLOW
                        </h1>
                    </div>

                    {/* Footer Links */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider backdrop-blur-sm">
                        <div className="hidden sm:block">
                            © 2026 STUDYFLOW INC.
                        </div>

                        <div className="flex items-center gap-2">
                            <span>CREATED BY</span>
                            <span className="bg-purple-600 text-white px-2 py-1 rounded-sm">ZAIN</span>
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-sm">ANTIGRAVITY</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}
