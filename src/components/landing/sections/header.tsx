"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
        >
            <div className="pointer-events-auto glass-dark w-[90vw] sm:w-[500px] rounded-sm px-4 py-2 flex items-center justify-between border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl shadow-black/50">
                {/* Menu Trigger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                    <Menu className="w-4 h-4 group-hover:text-[#BFFF0B] transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Menu</span>
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
                    <div className="relative w-6 h-6 rounded-sm overflow-hidden border border-white/20">
                        <Image src="/logo.png" alt="StudyFlow" fill className="object-cover" />
                    </div>
                    <div className="text-sm font-black tracking-tight text-white group-hover:text-[#BFFF0B] transition-colors">
                        STUDYFLOW
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:block">
                        <span className="text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer">
                            Login
                        </span>
                    </Link>
                    <Link href="/register">
                        <Button
                            size="sm"
                            className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black text-xs font-black rounded-sm h-8 px-5"
                        >
                            Join
                        </Button>
                    </Link>
                </div>
            </div>

        </motion.header >
    );
}
