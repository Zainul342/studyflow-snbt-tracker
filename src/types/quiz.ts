import { z } from 'zod';
import { Timestamp } from 'firebase/firestore';

// --- ENUMS & CONSTANTS ---

export const QuizDifficultySchema = z.enum(['easy', 'medium', 'hard']);
export type QuizDifficulty = z.infer<typeof QuizDifficultySchema>;

export const QuizModeSchema = z.enum(['santai', 'time-battle']); // santai = practice, time-battle = timed
export type QuizMode = z.infer<typeof QuizModeSchema>;

export const QuestionTypeSchema = z.enum(['multiple-choice']); // Extensible for future types (e.g., 'essay')
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

// --- 1. QUESTION SCHEMA ---

export const QuestionOptionSchema = z.object({
    id: z.string(), // e.g., "A", "B", "C", "D", "E"
    content: z.string(), // HTML or Markdown string
    isCorrect: z.boolean(),
});
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;

export const QuestionSchema = z.object({
    id: z.string(),
    content: z.string(), // The question text (supports HTML/Markdown)
    options: z.array(QuestionOptionSchema).min(2),
    explanation: z.string(), // Pembahasan
    subjectId: z.string(), // References 'id' in SUBTES_STRUCTURE (e.g., "pu")
    topicId: z.string(), // References 'id' in submateri (e.g., "pu-logika-dasar")
    difficulty: QuizDifficultySchema,
    type: QuestionTypeSchema.default('multiple-choice'),
    tags: z.array(z.string()).optional(), // Extra metadata
    createdAt: z.any(), // Firebase Timestamp or Date
    updatedAt: z.any().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;

// --- 2. USER ATTEMPT SCHEMA (HISTORY) ---

export const UserAnswerSchema = z.object({
    questionId: z.string(),
    selectedOptionId: z.string(),
    isCorrect: z.boolean(),
    timeSpentSeconds: z.number(), // Time spent on this specific question
});
export type UserAnswer = z.infer<typeof UserAnswerSchema>;

export const QuizAttemptSchema = z.object({
    id: z.string(),
    userId: z.string(),
    subjectId: z.string(),
    topicId: z.string().optional(), // If practicing a specific topic
    mode: QuizModeSchema,

    // Scoring
    score: z.number(), // Calculated IRT score or simple points
    correctCount: z.number(),
    wrongCount: z.number(),
    totalQuestions: z.number(),

    // Timing
    startedAt: z.any(), // Firestore Timestamp
    finishedAt: z.any().optional(), // Null if technically not finished but submitted?
    durationSeconds: z.number(),

    // Gamification
    ratingChange: z.number().optional(), // ELO rating change
    xpEarned: z.number().default(0),

    // Detail Answers
    answers: z.array(UserAnswerSchema),

    isFinished: z.boolean().default(false),
});

export type QuizAttempt = z.infer<typeof QuizAttemptSchema>;

// --- 3. QUIZ CONFIGURATION (CLIENT STATE) ---

export const QuizConfigSchema = z.object({
    mode: QuizModeSchema,
    subjectId: z.string(),
    topicIds: z.array(z.string()).optional(), // Can select multiple topics or 'all'
    questionCount: z.number().min(5).max(20), // Batasi per sesi biar gak lelah
    showTimer: z.boolean().default(true),
});

export type QuizConfig = z.infer<typeof QuizConfigSchema>;
