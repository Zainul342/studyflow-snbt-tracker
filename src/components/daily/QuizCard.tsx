'use client';

import { useState } from 'react';
import { QuizContent } from "@/data/daily-content";
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
    content: QuizContent;
}

export function QuizCard({ content }: QuizCardProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (index: number) => {
        if (isSubmitted) return;
        setSelected(index);
    };

    const handleSubmit = () => {
        if (selected === null) return;
        setIsSubmitted(true);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="text-lg font-medium text-white/90">{content.question}</div>
            <div className="flex flex-col gap-2">
                {content.options.map((option, index) => {
                    let optionClass = "p-3 rounded-md border text-sm transition-all cursor-pointer ";

                    if (isSubmitted) {
                        if (index === content.correctAnswerIndex) {
                            optionClass += "bg-green-500/20 border-green-500/50 text-green-200";
                        } else if (index === selected) {
                            optionClass += "bg-red-500/20 border-red-500/50 text-red-200";
                        } else {
                            optionClass += "bg-zinc-900 border-zinc-800 text-zinc-400 opacity-50";
                        }
                    } else {
                        if (selected === index) {
                            optionClass += "bg-blue-500/20 border-blue-500 text-blue-200";
                        } else {
                            optionClass += "bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600";
                        }
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={optionClass}
                        >
                            <div className="flex justify-between items-center">
                                <span>{option}</span>
                                {isSubmitted && index === content.correctAnswerIndex && (
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                )}
                                {isSubmitted && index === selected && index !== content.correctAnswerIndex && (
                                    <XCircle className="w-5 h-5 text-red-400" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!isSubmitted ? (
                <button
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium rounded-md transition-colors"
                >
                    Jawab
                </button>
            ) : (
                <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <p className="text-xs font-bold text-blue-300 mb-1">Pembahasan:</p>
                    <p className="text-sm text-blue-100/80">{content.explanation}</p>
                </div>
            )}
        </div>
    );
}
