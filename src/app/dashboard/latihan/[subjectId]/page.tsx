'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSubtesById } from '@/data/materi-structure';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // We might need to install/check this
import { ArrowLeft, Clock, Zap, BookOpen, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Fallback if RadioGroup not available, use simple div selection
// Assuming Select is available.

export default function QuizSetupPage({ params }: { params: Promise<{ subjectId: string }> }) {
    const router = useRouter();
    const { subjectId } = use(params);
    const subtesData = getSubtesById(subjectId);

    const [mode, setMode] = useState<'santai' | 'time-battle'>('santai');
    const [questionCount, setQuestionCount] = useState('5');
    const [selectedTopic, setSelectedTopic] = useState('all');

    if (!subtesData) {
        return <div>Subject Not Found</div>;
    }

    const handleStart = () => {
        // Construct query params
        const query = new URLSearchParams({
            mode,
            count: questionCount,
            topic: selectedTopic,
        });
        router.push(`/dashboard/latihan/${subjectId}/play?${query.toString()}`);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Menu
            </Button>

            <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-blue-100/50">
                    <BookOpen className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{subtesData.name}</h1>
                    <p className="text-slate-500">Konfigurasi sesi latihanmu</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* --- LEFT COL: CONFIG --- */}
                <div className="space-y-6">

                    {/* 1. Mode Selection */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" /> Pilih Mode
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div
                                className={`cursor-pointer border-2 rounded-lg p-3 flex items-start gap-3 transition-all ${mode === 'santai' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200'}`}
                                onClick={() => setMode('santai')}
                            >
                                <div className="mt-1"><Zap className="h-5 w-5 text-blue-500" /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Mode Santai</h3>
                                    <p className="text-xs text-slate-500">Waktu bebas, maksimalkan akurasi. Feedback pembahasan langsung muncul.</p>
                                </div>
                            </div>

                            <div
                                className={`cursor-pointer border-2 rounded-lg p-3 flex items-start gap-3 transition-all ${mode === 'time-battle' ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-200'}`}
                                onClick={() => setMode('time-battle')}
                            >
                                <div className="mt-1"><Clock className="h-5 w-5 text-red-500" /></div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Kalahkan Waktu</h3>
                                    <p className="text-xs text-slate-500">Simulasi tekanan ujian. 1 menit/soal. Feedback di akhir.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Question Count */}
                    <Card>
                        <CardContent className="pt-6">
                            <Label className="mb-2 block">Jumlah Soal</Label>
                            <Select value={questionCount} onValueChange={setQuestionCount}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jumlah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5 Soal (Pemanasan)</SelectItem>
                                    <SelectItem value="10">10 Soal (Latihan)</SelectItem>
                                    <SelectItem value="15">15 Soal (Serius)</SelectItem>
                                    <SelectItem value="20">20 Soal (Tryout Mini)</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                </div>

                {/* --- RIGHT COL: TOPIC & PREVIEW --- */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Topik Spesifik</CardTitle>
                            <CardDescription>Pilih 'Semua Topik' untuk campuran</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih topik" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                    <SelectItem value="all" className="font-bold">✨ Semua Topik (Campuran)</SelectItem>
                                    {subtesData.materi.map((materi) => (
                                        <React.Fragment key={materi.id}>
                                            {materi.submateri.map((sub) => (
                                                <SelectItem key={sub.id} value={sub.id}>
                                                    {sub.name}
                                                </SelectItem>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Estimasi Waktu</span>
                                    <span className="font-medium text-slate-800">
                                        {mode === 'santai' ? '~ Bebas' : `${parseInt(questionCount) * 1.5} Menit`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">XP Potential</span>
                                    <span className="font-medium text-green-600">
                                        +{parseInt(questionCount) * 15} XP
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button size="lg" className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" onClick={handleStart}>
                        <PlayCircle className="mr-2 h-6 w-6" /> Mulai Latihan
                    </Button>
                </div>
            </div>
        </div>
    );
}
