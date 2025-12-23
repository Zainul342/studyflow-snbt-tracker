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
        <div className="group flex items-center justify-between p-3 rounded-sm bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800 transition-all">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Status Indicator Dot */}
                <div className={cn(
                    "w-2 h-2 rounded-full transition-colors shrink-0",
                    status.review ? "bg-[#BFFF0B] shadow-[0_0_8px_rgba(191,255,11,0.5)]" :
                        status.latsol ? "bg-orange-400" :
                            status.belajar ? "bg-blue-400" : "bg-zinc-700 group-hover:bg-zinc-600"
                )} />

                <span className={cn(
                    "text-xs font-medium truncate transition-colors cursor-default",
                    (status.belajar || status.latsol || status.review) ? "text-zinc-200" : "text-zinc-400 group-hover:text-zinc-300"
                )}>
                    {name}
                </span>
            </div>

            {/* Checkbox Actions */}
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-3">
                {/* Belajar Toggle */}
                <ActionToggle
                    active={status.belajar}
                    onClick={() => toggleStatus("belajar")}
                    icon={BookOpen}
                    activeClass="bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30"
                    inactiveClass="text-zinc-600 hover:text-blue-400 hover:bg-blue-400/10"
                    tooltip="Selesai Belajar"
                    label="B"
                />

                {/* Latsol Toggle */}
                <ActionToggle
                    active={status.latsol}
                    onClick={() => toggleStatus("latsol")}
                    icon={Clock}
                    activeClass="bg-orange-400/20 text-orange-400 border-orange-400/30 hover:bg-orange-400/30"
                    inactiveClass="text-zinc-600 hover:text-orange-400 hover:bg-orange-400/10"
                    tooltip="Selesai Latsol"
                    label="L"
                />

                {/* Review Toggle */}
                <ActionToggle
                    active={status.review}
                    onClick={() => toggleStatus("review")}
                    icon={Trophy}
                    activeClass="bg-[#BFFF0B]/20 text-[#BFFF0B] border-[#BFFF0B]/30 hover:bg-[#BFFF0B]/30"
                    inactiveClass="text-zinc-600 hover:text-[#BFFF0B] hover:bg-[#BFFF0B]/10"
                    tooltip="Selesai Review"
                    label="R"
                />
            </div>
        </div>
    );
}

function ActionToggle({ active, onClick, icon: Icon, activeClass, inactiveClass, tooltip, label }: any) {
    return (
        <button
            onClick={onClick}
            title={tooltip}
            className={cn(
                "w-7 h-7 rounded-sm flex items-center justify-center border border-transparent transition-all text-[10px] font-black uppercase",
                active ? activeClass : inactiveClass
            )}
        >
            {/* Show Icon on Hover, Label otherwise? Or just Label? Let's use Label for compact "B L R" look, looks cleaner for devs */}
            {label}
        </button>
    );
}
