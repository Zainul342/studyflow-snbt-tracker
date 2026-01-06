'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Trophy, Heart, Clock, Target, CheckCircle, XCircle,
    ArrowLeft, RotateCcw, Home, ChevronRight, Sparkles
} from 'lucide-react';

function QuizResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse results from URL params
    const correct = parseInt(searchParams.get('correct') || '0');
    const wrong = parseInt(searchParams.get('wrong') || '0');
    const total = parseInt(searchParams.get('total') || '0');
    const xp = parseInt(searchParams.get('xp') || '0');
    const hearts = parseInt(searchParams.get('hearts') || '5');
    const time = parseInt(searchParams.get('time') || '0');
    const mode = searchParams.get('mode') || 'santai';
    const subjectId = searchParams.get('subject') || '';

    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const formatTime = (secs: number) => {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    // Determine grade and message
    const getGradeInfo = (acc: number) => {
        if (acc >= 90) return { grade: 'S', color: 'text-yellow-500', bg: 'bg-yellow-50', message: 'SEMPURNA! 🔥' };
        if (acc >= 80) return { grade: 'A', color: 'text-green-500', bg: 'bg-green-50', message: 'Excellent! 💪' };
        if (acc >= 70) return { grade: 'B', color: 'text-blue-500', bg: 'bg-blue-50', message: 'Bagus! 👍' };
        if (acc >= 60) return { grade: 'C', color: 'text-orange-500', bg: 'bg-orange-50', message: 'Cukup baik' };
        return { grade: 'D', color: 'text-red-500', bg: 'bg-red-50', message: 'Perlu latihan lagi' };
    };

    const gradeInfo = getGradeInfo(accuracy);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-slate-800">Latihan Selesai!</h1>
                    <p className="text-slate-500">Berikut adalah hasil latihanmu</p>
                </div>

                {/* Main Grade Card */}
                <Card className={`border-2 ${gradeInfo.bg} overflow-hidden`}>
                    <CardContent className="pt-8 pb-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className={`text-8xl font-black ${gradeInfo.color}`}>
                                {gradeInfo.grade}
                            </div>
                            {accuracy >= 80 && (
                                <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
                            )}
                        </div>
                        <p className="text-xl font-semibold text-slate-700">{gradeInfo.message}</p>
                        <div className="mt-4 flex justify-center gap-2">
                            <Badge variant="secondary" className="text-sm">
                                {mode === 'santai' ? 'Mode Santai' : 'Mode Waktu'}
                            </Badge>
                            {subjectId && (
                                <Badge variant="outline" className="text-sm uppercase">
                                    {subjectId}
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-4 pb-3 text-center">
                            <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                            <p className="text-2xl font-bold text-slate-800">{accuracy}%</p>
                            <p className="text-xs text-slate-500">Akurasi</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-4 pb-3 text-center">
                            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                            <p className="text-2xl font-bold text-green-600">+{xp}</p>
                            <p className="text-xs text-slate-500">XP Earned</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-4 pb-3 text-center">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                            <p className="text-2xl font-bold text-slate-800">{formatTime(time)}</p>
                            <p className="text-xs text-slate-500">Total Waktu</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-4 pb-3 text-center">
                            <Heart className={`w-6 h-6 mx-auto mb-2 ${hearts > 0 ? 'text-red-500 fill-red-500' : 'text-slate-300'}`} />
                            <p className="text-2xl font-bold text-slate-800">{hearts}/5</p>
                            <p className="text-xs text-slate-500">Hearts Left</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Accuracy Progress */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                            <span>Detail Jawaban</span>
                            <span className="text-sm font-normal text-slate-500">{correct}/{total} Benar</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Progress value={accuracy} className="h-3" />

                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">{correct} Benar</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-500">
                                <XCircle className="w-4 h-4" />
                                <span className="font-medium">{wrong} Salah</span>
                            </div>
                        </div>

                        {/* Encouragement based on hearts */}
                        {hearts === 0 && (
                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-sm text-amber-800">
                                💡 <strong>Tip:</strong> Hearts kamu habis. XP yang didapat berkurang 90%.
                                Istirahat sebentar atau review materi untuk memulihkan focus!
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12"
                        onClick={() => router.push('/dashboard/latihan')}
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Kembali ke Menu
                    </Button>

                    {subjectId && (
                        <Button
                            size="lg"
                            className="h-12 bg-blue-600 hover:bg-blue-700"
                            onClick={() => router.push(`/dashboard/latihan/${subjectId}`)}
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Latihan Lagi
                        </Button>
                    )}
                </div>

                {/* View Answers Link */}
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2 flex items-center justify-center gap-1 group">
                    Lihat Pembahasan Lengkap
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        </div>
    );
}

export default function QuizResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        }>
            <QuizResultContent />
        </Suspense>
    );
}
