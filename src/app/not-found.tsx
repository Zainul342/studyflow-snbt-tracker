"use client";

import Link from "next/link";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden font-sans">
            <AmbientBackground />

            <div className="relative z-10 text-center px-4">
                <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
                    404
                </h1>

                <div className="-mt-12 md:-mt-16 relative">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 text-[#BFFF0B] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                        System Error
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Lost in the Void?
                    </h2>

                    <p className="text-zinc-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                        Halaman yang lo cari gak ketemu. Mungkin link-nya salah atau materinya udah dihapus dari database.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/dashboard">
                            <Button className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold rounded-sm px-8 h-12">
                                <Home className="mr-2 w-4 h-4" />
                                Back to Base
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-sm px-8 h-12">
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                Landing Page
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
