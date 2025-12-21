"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockDB } from "@/lib/data/mock-db";

interface StatusCheckboxProps {
    submateriId: string;
    type: "belajar" | "latsol" | "review";
    initialChecked?: boolean;
    label: string;
    onUpdate?: () => void;
}

export function StatusCheckbox({ submateriId, type, initialChecked = false, label, onUpdate }: StatusCheckboxProps) {
    const [isChecked, setIsChecked] = useState(initialChecked);
    const [isUpdating, setIsUpdating] = useState(false);

    // Sync state if initialChecked changes (e.g., from parent re-fetch)
    useEffect(() => {
        setIsChecked(initialChecked);
    }, [initialChecked]);

    const handleToggle = async () => {
        // Optimistic update
        const newValue = !isChecked;
        setIsChecked(newValue);
        setIsUpdating(true);

        try {
            // Simulate API call to DB
            await mockDB.updateProgress(submateriId, type, newValue);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert if failed
            setIsChecked(!newValue);
        } finally {
            setIsUpdating(false);
        }
    };

    const activeColor =
        type === "belajar" ? "bg-blue-500 border-blue-500 text-white" :
            type === "latsol" ? "bg-orange-500 border-orange-500 text-white" :
                "bg-green-500 border-green-500 text-white"; // review

    return (
        <div
            onClick={handleToggle}
            className={cn(
                "flex items-center gap-2 cursor-pointer group select-none transition-opacity",
                isUpdating && "opacity-70"
            )}
        >
            <div
                className={cn(
                    "w-5 h-5 rounded flex items-center justify-center border transition-all duration-200",
                    isChecked
                        ? activeColor
                        : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-500"
                )}
            >
                {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
            <span className={cn(
                "text-xs font-medium uppercase tracking-wider",
                isChecked ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"
            )}>
                {label}
            </span>
        </div>
    );
}
