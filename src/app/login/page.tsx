"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Asterisk, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center relative overflow-hidden selection:bg-[#ccff00]">
            {/* Header / Logo */}
            <div className="absolute top-10 left-10 flex items-center gap-1.5 font-black text-xs uppercase tracking-widest text-zinc-400">
                <Link href="/" className="flex items-center gap-1.5 hover:text-black transition-colors">
                    <div className="relative w-4 h-4">
                        <Image src="/logo.png" alt="StudyFlow Logo" fill className="object-contain" />
                    </div>
                    StudyFlow
                </Link>
            </div>

            <div className="absolute top-10 right-10">
                <Link href="/onboarding">
                    <Button variant="ghost" className="text-zinc-400 hover:text-black hover:bg-transparent font-black text-[10px] uppercase tracking-widest">
                        Join StudyFlow
                    </Button>
                </Link>
            </div>

            {/* FLOATING DECORATIONS */}
            <div className="absolute inset-0 pointer-events-none">
                {[
                    { title: "Dashboard", rotate: -15, x: "15%", y: "20%", color: "bg-blue-600" },
                    { title: "Analytics", rotate: 10, x: "75%", y: "15%", color: "bg-purple-600" },
                    { title: "Vault", rotate: -8, x: "10%", y: "70%", color: "bg-zinc-800" },
                    { title: "Tryouts", rotate: 12, x: "80%", y: "65%", color: "bg-orange-600" },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        className="absolute bg-white rounded-2xl shadow-xl p-1.5 border border-black/5"
                        style={{
                            width: "200px",
                            height: "140px",
                            left: card.x,
                            top: card.y,
                            rotate: `${card.rotate}deg`
                        }}
                    >
                        <div className={`w-full h-full ${card.color} rounded-xl overflow-hidden relative`}>
                            <div className="absolute inset-0 bg-white/10 opacity-40"></div>
                            <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-tighter">
                                {card.title}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* LOGIN FORM CARD */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px] px-6 relative z-10"
            >
                <div className="bg-white rounded-[2.5rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/20">
                    <div className="mb-10 text-center">
                        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                            <Image src="/logo.png" alt="StudyFlow Logo" fill className="object-contain p-2" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter">Login to StudyFlow</h1>
                        <p className="text-zinc-400 text-sm font-medium mt-2">Welcome back to the vault.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-zinc-100 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#6343e5] outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-zinc-100 border-none rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#6343e5] outline-none transition-all"
                            />
                            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-[#6343e5] hover:text-[#5035c0]">
                                Show
                            </button>
                        </div>

                        <div className="flex justify-end p-1">
                            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-black transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <Button className="w-full bg-black text-white hover:bg-zinc-800 rounded-2xl h-14 font-black transition-all shadow-lg mt-4 group">
                            Login
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-zinc-100 text-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Don&apos;t have an account?</span>
                        <Link href="/onboarding" className="ml-2 text-[10px] font-black uppercase tracking-widest text-[#6343e5] hover:underline">
                            Join StudyFlow
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
