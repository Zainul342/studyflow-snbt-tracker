"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileMenu({ onClose }: { onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col pointer-events-auto"
        >
            {/* Menu Container */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full bg-[#0A0A0A] border-b border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-none"
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-white hover:text-white/70 transition-colors"
                    >
                        <X className="w-5 h-5" />
                        <span className="font-bold text-sm">Close</span>
                    </button>

                    <div className="text-xl font-black tracking-tighter text-white">
                        STUDYFLOW
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/login" onClick={onClose} className="hidden sm:block text-sm font-bold text-white/70 hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link href="/register" onClick={onClose}>
                            <Button size="sm" className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold h-8 text-xs rounded-sm">
                                Join
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Menu Content Grid */}
                <div className="p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

                        {/* Column 1: Feature Links */}
                        <div className="md:col-span-3 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Our Toolkit</h4>
                                <ul className="space-y-4">
                                    {[
                                        { name: "Progress Tracker", isNew: false },
                                        { name: "Tryout System", isNew: true },
                                        { name: "Icon Library", isNew: false },
                                        { name: "Community", isNew: false },
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <Link
                                                href="#"
                                                onClick={onClose}
                                                className="group flex items-center gap-3 text-2xl font-bold text-white hover:text-[#BFFF0B] transition-colors"
                                            >
                                                {item.name}
                                                {item.isNew && (
                                                    <span className="text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded-sm font-bold">
                                                        NEW
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Column 2: Explore & Socials */}
                        <div className="md:col-span-4 space-y-8">
                            <div>
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">Explore</h4>
                                <ul className="space-y-4">
                                    <li><Link href="/showcase" onClick={onClose} className="text-lg font-medium text-white/70 hover:text-white">Success Stories</Link></li>
                                    <li><Link href="/updates" onClick={onClose} className="text-lg font-medium text-white/70 hover:text-white">Updates</Link></li>
                                    <li><Link href="/pricing" onClick={onClose} className="text-lg font-medium text-white/70 hover:text-white">Pricing</Link></li>
                                    <li><Link href="/about" onClick={onClose} className="text-lg font-medium text-white/70 hover:text-white">About Us</Link></li>
                                </ul>
                            </div>

                            {/* Social Icons (Mockup) */}
                            <div className="flex gap-2 mt-auto pt-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-white/60 hover:text-white">
                                        <ArrowRight className="w-4 h-4 -rotate-45" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Featured Card */}
                        <div className="md:col-span-5">
                            <div className="relative h-full min-h-[300px] rounded-sm bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5 p-8 flex flex-col items-center justify-center text-center overflow-hidden group">
                                <div className="absolute inset-0 bg-[#BFFF0B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="inline-block px-3 py-1 bg-purple-500 rounded-full text-[10px] font-bold text-white mb-6">
                                    MILESTONE
                                </span>

                                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">
                                    We hit 1,600
                                    <br />
                                    Members!
                                </h3>

                                <Link href="/register" onClick={onClose}>
                                    <Button className="bg-white text-black hover:bg-zinc-200 font-bold px-8 rounded-sm mb-8">
                                        Join them
                                    </Button>
                                </Link>

                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-zinc-800" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* GIANT FOOTER */}
                <div className="mt-auto border-t border-white/10 bg-[#0A0A0A] relative overflow-hidden">
                    {/* Giant Typography */}
                    <div className="relative h-[15vw] min-h-[100px] flex items-center justify-center overflow-hidden select-none pointer-events-none opacity-20">
                        <h1 className="text-[25vw] font-black text-white leading-none tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                            STUDYFLOW
                        </h1>
                    </div>

                    {/* Footer Links */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider backdrop-blur-sm">
                        <div className="flex gap-4">
                            {["Licensing", "T&Cs", "Privacy", "Cookies"].map((item) => (
                                <Link key={item} href="#" className="hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-sm">
                                    {item}
                                </Link>
                            ))}
                        </div>

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
