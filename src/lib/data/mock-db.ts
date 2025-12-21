
"use client";

import { SUBTES_STRUCTURE, getAllSubmateri } from "./materi-structure";

// Types
export type ProgressStatus = {
    belajar: boolean;
    latsol: boolean;
    review: boolean;
    lastUpdated: string;
};

export type UserProgressMap = Record<string, ProgressStatus>;

export type UserProfile = {
    name: string;
    targetUniversity: string;
    targetMajor: string;
    targetDate: string;
    dailyGoalHours?: number; // Calculated based on days until target
    createdAt: string;
};

// Storage Keys
const STORAGE_KEYS = {
    PROGRESS: "studyflow_progress",
    PROFILE: "studyflow_profile",
    SETTINGS: "studyflow_settings"
};

// Mock Database Service
export const mockDB = {
    // === Profile Methods ===
    getProfile: (): UserProfile | null => {
        if (typeof window === "undefined") return null;
        const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
        return data ? JSON.parse(data) : null;
    },

    saveProfile: (profile: Partial<UserProfile>): UserProfile => {
        const current = mockDB.getProfile() || {
            name: "Guest Student",
            targetUniversity: "ITB",
            targetMajor: "Teknik Informatika",
            targetDate: "2026-04-01",
            createdAt: new Date().toISOString()
        };

        const updated = { ...current, ...profile };
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
        return updated;
    },

    // === Progress Methods ===
    getAllProgress: (): UserProgressMap => {
        if (typeof window === "undefined") return {};
        const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return data ? JSON.parse(data) : {};
    },

    updateSubmateriProgress: (submateriId: string, updates: Partial<ProgressStatus>): ProgressStatus => {
        const allProgress = mockDB.getAllProgress();
        const current = allProgress[submateriId] || {
            belajar: false,
            latsol: false,
            review: false,
            lastUpdated: new Date().toISOString()
        };

        const updated = {
            ...current,
            ...updates,
            lastUpdated: new Date().toISOString()
        };

        allProgress[submateriId] = updated;
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));

        // Trigger event for real-time updates across components
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("progress-updated", { detail: { submateriId, updated } }));
        }

        return updated;
    },

    // === Analytics Helper ===
    calculateStats: () => {
        const progress = mockDB.getAllProgress();
        const allSubmateri = getAllSubmateri();
        const totalItems = allSubmateri.length;

        let completedBelajar = 0;
        let completedLatsol = 0;
        let completedReview = 0; // "Mastered" if all 3 checked

        allSubmateri.forEach(item => {
            const p = progress[item.id];
            if (p?.belajar) completedBelajar++;
            if (p?.latsol) completedLatsol++;
            if (p?.review) completedReview++;
        });

        return {
            totalItems,
            completedBelajar,
            completedLatsol,
            completedReview,
            percentBelajar: (completedBelajar / totalItems) * 100,
            percentLatsol: (completedLatsol / totalItems) * 100,
            percentMastered: (completedReview / totalItems) * 100
        };
    },

    // === Reset ===
    resetAll: () => {
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
        window.location.reload();
    },

    // Aliases for compatibility
    getUserProgress: () => mockDB.getAllProgress(),
    updateProgress: (submateriId: string, type: "belajar" | "latsol" | "review", value: boolean) => {
        return mockDB.updateSubmateriProgress(submateriId, { [type]: value });
    }
};
