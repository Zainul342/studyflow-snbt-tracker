'use client';

import React, { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuizSession } from '@/hooks/useQuizSession';
import { MOCK_QUESTIONS } from '@/data/mock-questions'; // Later replace with DB fetch
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, CheckCircle, XCircle, ChevronLeft, ChevronRight, AlertCircle, Flag } from 'lucide-react';

export default function QuizPlayPage({ params }: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = use(params);
    const searchParams = useSearchParams();

    // Parse Config from URL
    const mode = (searchParams.get('mode') as 'santai' | 'time-battle') || 'santai';
    // const count = parseInt(searchParams.get('count') || '5');

    // Initialize Session
    // TODO: Filter questions by subjectId & topic
    const {
        currentQuestion,
        currentIndex,
        questions,
        answers,
        hearts,
        xp,
        correctCount,
        wrongCount,
        elapsedSeconds,
        progress,
        currentAnswer,
        submitAnswer,
        nextQuestion,
        prevQuestion,
        // jumpToQuestion,
        finishQuiz,
    } = useQuizSession({
        questions: MOCK_QUESTIONS, // Mock for now
        config: {
            mode,
            subjectId,
            questionCount: 5,
            showTimer: true
        }
    });

    const formatTime = (secs: number) => {
        const min = Math.floor(secs / 60);
        const sec = secs % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const isAnswered = !!currentAnswer;

    return (
        <div className="flex flex-col h-screen bg-slate-50 overscroll-none">

            {/* --- 1. STICKY HEADER --- */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700">
                        <ChevronLeft />
                    </Button>
                    <div>
                        <h1 className="text-sm font-bold text-slate-800 hidden md:block">
                            Pengerjaan {subjectId.toUpperCase()}
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{formatTime(elapsedSeconds)}</span>
                            <span>• {mode === 'santai' ? 'Santai' : 'Timed'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Progress Bar for Mobile */}
                    <div className="w-24 md:w-48 hidden sm:block">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <Button
                        variant={isAnswered ? "default" : "secondary"}
                        className={isAnswered ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={finishQuiz}
                    >
                        Akhiri
                    </Button>
                </div>
            </header>

            {/* --- 2. STATUS BAR (GAMIFICATION) --- */}
            <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                    <span className="font-medium text-slate-600">Soal {currentIndex + 1}/{questions.length}</span>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200 font-bold">
                        <Trophy className="w-3 h-3" />
                        XP {xp}
                    </div>
                    <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200 font-bold">
                        <Heart className={`w-3 h-3 ${hearts > 0 ? 'fill-red-600' : 'fill-slate-300'}`} />
                        {hearts}
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                    <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" /> {correctCount}
                    </div>
                    <div className="flex items-center gap-1 text-red-500">
                        <XCircle className="w-4 h-4" /> {wrongCount}
                    </div>
                </div>
            </div>

            {/* --- 3. MAIN SPLIT CONTENT --- */}
            <main className="flex-1 overflow-hidden">
                <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-0 lg:gap-6 lg:p-6">

                    {/* LEFT: QUESTION PANE */}
                    <div className="lg:col-span-6 overflow-y-auto p-4 lg:bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-slate-200 custom-scrollbar">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                                    {currentQuestion.difficulty}
                                </Badge>
                                <Badge variant="secondary" className="text-slate-500">
                                    {currentQuestion.topicId}
                                </Badge>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 h-8 text-xs">
                                <Flag className="w-3 h-3 mr-1" /> Laporkan
                            </Button>
                        </div>

                        {/* Question Content (HTML/Markdown) */}
                        <div
                            className="prose prose-slate max-w-none text-slate-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
                        />

                        {/* Explanation (Shown only if answered in Santai Mode) */}
                        {isAnswered && mode === 'santai' && (
                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-bottom-2">
                                <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4" /> Pembahasan
                                </h3>
                                <div
                                    className="prose prose-sm prose-blue max-w-none text-slate-700"
                                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                />
                            </div>
                        )}
                    </div>

                    {/* RIGHT: OPTIONS SIDEBAR */}
                    <div className="lg:col-span-4 bg-slate-50 lg:bg-transparent p-4 lg:p-0 border-t lg:border-0 border-slate-200 sticky bottom-0 z-40">
                        <div className="flex flex-col gap-3 h-full">
                            <div className="flex-1 space-y-3">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = currentAnswer === option.id;
                                    const showCorrect = isAnswered && mode === 'santai' && option.isCorrect;
                                    const showWrong = isAnswered && mode === 'santai' && isSelected && !option.isCorrect;

                                    let styleClass = "border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300"; // Default
                                    if (isSelected) styleClass = "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500";
                                    if (showCorrect) styleClass = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                                    if (showWrong) styleClass = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";

                                    return (
                                        <button
                                            key={option.id}
                                            disabled={isAnswered}
                                            onClick={() => submitAnswer(option.id)}
                                            className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 group ${styleClass}`}
                                        >
                                            <div className={`
                                 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors
                                 ${isSelected || showCorrect || showWrong ? 'bg-current text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}
                              `}>
                                                {option.id}
                                            </div>
                                            <div className="py-1 text-sm font-medium">
                                                {option.content}
                                            </div>
                                            {showCorrect && <CheckCircle className="ml-auto w-5 h-5 text-green-600 shrink-0" />}
                                            {showWrong && <XCircle className="ml-auto w-5 h-5 text-red-600 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200 lg:border-none">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={prevQuestion}
                                    disabled={currentIndex === 0}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                                </Button>
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    onClick={nextQuestion}
                                    disabled={!questions[currentIndex + 1]} // Disable if last question
                                >
                                    Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
