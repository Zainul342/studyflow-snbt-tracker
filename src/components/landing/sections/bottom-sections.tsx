"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// TestimonialsSection dihapus karena mengandung testimoni fiktif
// Akan ditambahkan kembali jika sudah ada testimoni asli

export function TestimonialsSection() {
    return null; // Section dihapus sementara
}

export function PricingSection() {
    return (
        <section className="py-32 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="border border-white/10 rounded-sm p-4 bg-[#0A0A0A]">
                    <div className="bg-[#1A1A1A] rounded-sm p-12 text-center">
                        <h2 className="text-4xl font-black mb-8">Harga Simpel</h2>
                        <div className="text-6xl font-black mb-2">Gratis</div>
                        <p className="text-white/60 mb-12">selama masa Beta</p>

                        <div className="flex flex-col gap-4 max-w-md mx-auto mb-12 text-left">
                            {["Akses Penuh ke Dashboard", "Progress Tracking Unlimited", "Sistem Tryout", "Akses Komunitas"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-green-500" />
                                    </div>
                                    <span className="text-white/80">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/register">
                            <Button className="w-full max-w-md bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-black py-6 rounded-sm">
                                Mulai Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ShowcaseGallery dihapus karena menggunakan placeholder image eksternal yang gagal load
export function ShowcaseGallery() {
    return null; // Section dihapus
}

export function FinalCTA() {
    return (
        <section className="py-40 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[clamp(3.5rem,10vw,8rem)] leading-[0.8] font-black tracking-tighter mb-12">
                    Siap
                    <br />
                    Mendominasi?
                    <Star className="inline w-[0.3em] h-[0.3em] text-[#BFFF0B] fill-[#BFFF0B] align-top ml-4" />
                </h2>
                <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12">
                    Gabung jadi member dan buka full akses ke <span className="text-white font-bold">Arsenal Belajarmu</span>. Jangan sampai nyesel pas hari-H.
                </p>
                <Link href="/register">
                    <Button className="bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black text-xl font-black px-12 py-8 rounded-sm">
                        Amankan Tempatmu
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        // MARQUEE FOOTER
        <div className="border-t border-white/10 bg-[#0A0A0A] relative overflow-hidden flex flex-col items-center">
            {/* Infinite Marquee */}
            <div className="relative w-full overflow-hidden whitespace-nowrap py-10 opacity-30 select-none pointer-events-none">
                <div className="inline-flex animate-[marquee_30s_linear_infinite]">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-[13.5vw] font-black text-white leading-none tracking-tighter mx-8">
                            STUDYFLOW
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(10)].map((_, i) => (
                        <span key={`dup-${i}`} className="text-[13.5vw] font-black text-white leading-none tracking-tighter mx-8">
                            STUDYFLOW
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer Content */}
            <div className="w-full max-w-[95vw] pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-wider backdrop-blur-sm z-10">
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
    );
}

