'use client';

import React from 'react';
import Link from 'next/link';
import { SUBTES_STRUCTURE } from '@/data/materi-structure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Calculator, PenTool, LayoutTemplate, Heart, Zap } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
    pu: <Brain className="h-8 w-8 text-blue-500" />,
    'pbm-ppu': <BookOpen className="h-8 w-8 text-yellow-500" />,
    'pk-pm': <Calculator className="h-8 w-8 text-green-500" />,
    lbind: <LayoutTemplate className="h-8 w-8 text-orange-500" />,
    lbeng: <PenTool className="h-8 w-8 text-purple-500" />,
};

export default function LatihanPage() {
    return (
        <div className="space-y-6">
            {/* --- GAMIFICATION BANNER --- */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 shadow-lg text-white">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Zap className="h-6 w-6 text-yellow-300" />
                            Health Power
                        </h2>
                        <p className="text-blue-100 max-w-lg mt-1">
                            Latihan soal bebas limit? Pro-In! Jaga Heart kamu tetep penuh biar dapet XP maksimal.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                        <Heart className="h-6 w-6 text-red-400 fill-red-400" />
                        <span className="text-xl font-bold">5</span>
                        <span className="text-sm opacity-80">(Max)</span>
                    </div>

                    <Button
                        className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold shadow-md border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all"
                    >
                        Upgrade SkulingPro
                    </Button>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-blue-900/20 rounded-full blur-2xl"></div>
            </div>

            {/* --- FILTER TABS (Visual Only for now) --- */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['Semua', 'SNBT', 'Sekolah/TKA', 'Kedinasan', 'Mandiri'].map((tab, idx) => (
                    <Button
                        key={tab}
                        variant={idx === 0 ? "default" : "outline"}
                        className={idx === 0 ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
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
                        <Card className="h-full border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                <div className="p-4 rounded-full bg-slate-50 group-hover:bg-blue-50 transition-colors">
                                    {icons[subtes.id] || <BookOpen className="h-8 w-8 text-gray-400" />}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg text-slate-800">{subtes.name}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">
                                        {subtes.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-2 flex flex-wrap gap-1 justify-center">
                                    <Badge variant="secondary" className="text-xs">
                                        {subtes.materi.length} Topik
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {subtes.code}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
