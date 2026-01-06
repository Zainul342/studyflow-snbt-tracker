'use client';

import React from 'react';
import Link from 'next/link';
import { SUBTES_STRUCTURE } from '@/data/materi-structure';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Calculator, PenTool, LayoutTemplate, Heart, Zap, Sparkles, ArrowRight } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
    pu: <Brain className="h-8 w-8 text-[#6B4FFF]" />,
    'pbm-ppu': <BookOpen className="h-8 w-8 text-[#BFFF0B]" />,
    'pk-pm': <Calculator className="h-8 w-8 text-emerald-400" />,
    lbind: <LayoutTemplate className="h-8 w-8 text-orange-400" />,
    lbeng: <PenTool className="h-8 w-8 text-pink-400" />,
};

export default function LatihanPage() {
    return (
        <div className="space-y-6">
            {/* --- GAMIFICATION BANNER --- */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#6B4FFF]/20 to-[#6B4FFF]/5 border border-[#6B4FFF]/20 p-6">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-2">
                            <Zap className="h-6 w-6 text-[#BFFF0B]" />
                            Focus Power
                        </h2>
                        <p className="text-zinc-400 max-w-lg mt-1 text-sm">
                            Jaga Heart kamu tetap penuh untuk mendapat XP maksimal di setiap latihan.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                        <span className="text-xl font-black text-white">5</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">(Max)</span>
                    </div>

                    <Button className="bg-[#BFFF0B] text-black hover:bg-[#BFFF0B]/90 font-black text-xs uppercase tracking-wider">
                        <Sparkles className="h-4 w-4 mr-2" />
                        StudyFlow Pro
                    </Button>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#6B4FFF]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-[#6B4FFF]/5 rounded-full blur-2xl"></div>
            </div>

            {/* --- FILTER TABS --- */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['Semua', 'SNBT', 'Sekolah/TKA', 'Kedinasan', 'Mandiri'].map((tab, idx) => (
                    <Button
                        key={tab}
                        variant={idx === 0 ? "default" : "ghost"}
                        className={idx === 0
                            ? "bg-[#6B4FFF]/20 text-[#6B4FFF] border border-[#6B4FFF]/30 hover:bg-[#6B4FFF]/30 text-xs font-bold uppercase tracking-wider"
                            : "text-zinc-500 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wider border border-transparent"}
                        size="sm"
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            {/* --- SUBJECTS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SUBTES_STRUCTURE.map((subtes) => (
                    <Link href={`/dashboard/latihan/${subtes.id}`} key={subtes.id} className="group">
                        <Card className="h-full bg-white/[0.02] border border-white/5 hover:border-[#6B4FFF]/30 transition-all duration-300 hover:bg-white/[0.04] cursor-pointer overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="p-4 rounded-lg bg-white/5 group-hover:bg-[#6B4FFF]/10 transition-colors border border-white/5 group-hover:border-[#6B4FFF]/20">
                                    {icons[subtes.id] || <BookOpen className="h-8 w-8 text-zinc-500" />}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-black text-lg text-white group-hover:text-[#BFFF0B] transition-colors">{subtes.name}</h3>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {subtes.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-2 flex flex-wrap gap-2 justify-center">
                                    <Badge variant="secondary" className="text-[10px] bg-white/5 text-zinc-400 border border-white/10 uppercase tracking-wider font-bold">
                                        {subtes.materi.length} Topik
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px] text-[#6B4FFF] border-[#6B4FFF]/30 uppercase tracking-wider font-bold">
                                        {subtes.code}
                                    </Badge>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-[#BFFF0B] font-bold uppercase tracking-wider">
                                    Mulai Latihan <ArrowRight className="h-3 w-3" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

