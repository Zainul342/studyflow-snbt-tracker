import { useState, useEffect } from 'react';
import { Question, QuizConfig, QuizMode } from '@/types/quiz';
import { useRouter } from 'next/navigation';

interface UseQuizSessionProps {
    questions: Question[];
    config: QuizConfig;
}

export const useQuizSession = ({ questions, config }: UseQuizSessionProps) => {
    const router = useRouter();

    // -- STATE --
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({}); // valid questionId -> optionId
    const [isFinished, setIsFinished] = useState(false);

    // Timer
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Gamification
    const [hearts, setHearts] = useState(5);
    const [xp, setXp] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    // -- TIMER EFFECT --
    useEffect(() => {
        if (isFinished || isPaused) return;

        const interval = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isFinished, isPaused]);

    // -- ACTIONS --

    const submitAnswer = (optionId: string) => {
        if (answers[currentQuestion.id] || isFinished) return; // Prevent re-answering

        const isCorrect = currentQuestion.options.find(o => o.id === optionId)?.isCorrect;

        // Update Answers Map
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));

        // Update Stats
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXp(prev => prev + (hearts > 0 ? 10 : 1)); // Full XP if hearts > 0
        } else {
            setWrongCount(prev => prev + 1);
            setHearts(prev => Math.max(0, prev - 1));
        }
    };

    const nextQuestion = () => {
        if (!isLastQuestion) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const jumpToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
        }
    };

    const finishQuiz = () => {
        setIsFinished(true);
        // Here we would typically calculate final stats and push to DB
        // For now, we just redirect or show modal
        // router.push('/dashboard/latihan/result?session=...');
    };

    return {
        // State
        currentIndex,
        currentQuestion,
        questions,
        answers,
        hearts,
        xp,
        correctCount,
        wrongCount,
        elapsedSeconds,
        isFinished,

        // Computed
        progress: ((currentIndex + 1) / questions.length) * 100,
        currentAnswer: answers[currentQuestion.id], // The answer selected for current Q

        // Actions
        submitAnswer,
        nextQuestion,
        prevQuestion,
        jumpToQuestion,
        finishQuiz,
    };
};
