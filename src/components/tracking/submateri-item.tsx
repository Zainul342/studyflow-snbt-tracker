"use client";

import { useState, useEffect } from "react";
import { BookOpen, CheckCircle2, Clock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockDB, ProgressStatus } from "@/lib/data/mock-db";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface SubmateriItemProps {
    id: string;
    name: string;
}

export function SubmateriItem({ id, name }: SubmateriItemProps) {
    const { user } = useAuth();

    // Local state for optimistic UI updates
    const [status, setStatus] = useState<ProgressStatus>({
        belajar: false,
        latsol: false,
        review: false,
        lastUpdated: "",
    });

    // Load initial state
    useEffect(() => {
        const allProgress = mockDB.getAllProgress();
        if (allProgress[id]) {
            setStatus(allProgress[id]);
        }

        // Listen for global updates (in case changed elsewhere)
        const handleUpdate = (e: CustomEvent) => {
            if (e.detail.submateriId === id) {
                setStatus(e.detail.updated);
            }
        };

        window.addEventListener("progress-updated" as any, handleUpdate);
        return () => window.removeEventListener("progress-updated" as any, handleUpdate);
    }, [id]);

    const toggleStatus = async (type: keyof Omit<ProgressStatus, "lastUpdated">) => {
        const newValue = !status[type];

        // 1. Optimistic Update
        const newStatus = { ...status, [type]: newValue };
        setStatus(newStatus);

        // 2. Persist to Firestore
        if (user?.uid) {
            const userRef = doc(db, "users", user.uid);
            // We use dot notation "progress.submateriId" to update only this specific field in the map
            // This requires the document to exist.
            try {
                // Construct the dynamic key for the map
                const fieldPath = `progress.${id}`;
                await setDoc(userRef, {
                    progress: {
                        [id]: { [type]: newValue }
                    }
                }, { merge: true });
            } catch (err) {
                console.error("Failed to save progress:", err);
                // Rollback if needed (omitted for brevity)
            }
        } else {
            // Fallback for non-logged in (shouldn't happen in protected route)
            mockDB.updateSubmateriProgress(id, { [type]: newValue });
        }
    };

    return (
        <div className="group flex items-center justify-between py-2.5 px-4 border-b border-zinc-800/50 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Status Indicator Dot - Subtle now */}
                <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors shrink-0",
                    status.review ? "bg-[#BFFF0B]" :
                        status.latsol ? "bg-orange-400" :
                            status.belajar ? "bg-blue-400" : "bg-zinc-800"
                )} />

                <span className={cn(
                    "text-xs font-medium truncate transition-colors cursor-default",
                    (status.belajar || status.latsol || status.review) ? "text-zinc-300" : "text-zinc-500 group-hover:text-zinc-400"
                )}>
                    {name}
                </span>
            </div>

            {/* Checkbox Actions - Fixed Width for Spreadsheet alignment */}
            <div className="flex items-center gap-2 ml-4">
                <ActionToggle
                    active={status.belajar}
                    onClick={() => toggleStatus("belajar")}
                    icon={BookOpen}
                    activeClass="text-blue-400 bg-blue-400/10"
                    inactiveClass="text-zinc-700 hover:text-zinc-500"
                    tooltip="Status: Sudah Belajar Materi"
                />

                <ActionToggle
                    active={status.latsol}
                    onClick={() => toggleStatus("latsol")}
                    icon={Clock}
                    activeClass="text-orange-400 bg-orange-400/10"
                    inactiveClass="text-zinc-700 hover:text-zinc-500"
                    tooltip="Status: Sudah Latihan Soal"
                />

                <ActionToggle
                    active={status.review}
                    onClick={() => toggleStatus("review")}
                    icon={Trophy}
                    activeClass="text-[#BFFF0B] bg-[#BFFF0B]/10"
                    inactiveClass="text-zinc-700 hover:text-zinc-500"
                    tooltip="Status: Sudah Review / Mastered"
                />
            </div>
        </div>
    );
}

function ActionToggle({ active, onClick, icon: Icon, activeClass, inactiveClass, tooltip }: any) {
    return (
        <button
            onClick={onClick}
            title={tooltip}
            className={cn(
                "w-8 h-8 md:w-7 md:h-7 rounded-sm flex items-center justify-center transition-all",
                active ? activeClass : inactiveClass
            )}
        >
            <Icon className="w-3.5 h-3.5" />
        </button>
    );
}
