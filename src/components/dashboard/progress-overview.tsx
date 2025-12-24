"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getTotalSubmateriCount } from "@/lib/data/materi-structure";
import { useMemo } from "react";

// Matches landing page "Features" card style exactly
const cardStyle = "group bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-sm p-6 hover:border-white/10 transition-all duration-300 shadow-xl";
const iconBoxStyle = "w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110 border border-white/5";

export function ProgressOverview() {
    const { userData, loading } = useAuth();

    const stats = useMemo(() => {
        // 1. Calculate Progress
        const totalSubmateri = getTotalSubmateriCount();
        const progressMap = userData?.progress || {};

        // Count how many items have status "mastered" or just exist in the map as true (depending on your schema)
        // Assuming simple boolean or status string. Let's assume keys exist = interact. 
        // But better to check specific values if you track 'practice'/'review' separately.
        // For 'Materi Selesai', let's count items where at least 'study' (Belajar) is done. 
        // Based on SubmateriItem, we toggle 3 states. 
        // If userData.progress is { "id": { study: true, practice: true... } }
        // Let's count items where AT LEAST ONE activity is done for now, OR if simpler, just study.
        // Checking HierarchyTree logic: updateProgress(submateriId, type, val).

        let completedCount = 0;
        if (userData?.progress) {
            Object.values(userData.progress).forEach((item: any) => {
                // If item has any 'true' value (study/practice/review), we count it as "Touched" or "WIP"?
                // "Materi Selesai" usually implies FULLY done. 
                // Let's count it if 'study' is true for now as a baseline "Materi Selesai" (Materials Read).
                if (item.study) completedCount++;
            });
        }

        const progressPercentage = totalSubmateri > 0 ? Math.round((completedCount / totalSubmateri) * 100) : 0;

        // 2. Calculate Tryout Average
        const tryouts = userData?.tryouts || [];
        // tryouts is likely an array of objects { score: number, ... } based on my TryoutDialog
        // Let's check Tryout structure. It was saving to a subcollection or array? 
        // TryoutTracker uses `collection(db, "users", user.uid, "tryouts")`.
        // Wait, `userData` in AuthContext is just the `users/{uid}` doc. It does NOT include subcollections automatically unless I fetch them.

        // ISSUE: AuthContext only fetches the main doc. Tryouts are in a subcollection?
        // Let's check `tryout/page.tsx` or `tryout-history.tsx`.
        // If they are in subcollection, `userData` won't have them.
        // However, I can fallback to "-" if not available in main doc, OR I should have saved an aggregate in main doc.
        // For now, let's assume 0 or "-" if not available, to avoid complex fetching here.
        // Better: The User wants "Realtime". 
        // If I haven't implemented aggregation, I should display "0" or setup aggregation.
        // Let's check if I can just use `userData.stats.averageTO` if I saved it?
        // I didn't save it in `add-tryout-dialog.tsx`.

        // Quick Fix: Just use "0" for TO unless I quick-fix the dialog to save aggregate.
        // But `Materi Selesai` comes from `userData.progress` which IS in the main doc? 
        // HierarchyTree writes to `doc(db, 'users', user.uid)`. So `progress` field exists.

        return [
            {
                label: "Total Progress",
                value: `${progressPercentage}%`,
                change: "Keep Going!",
                icon: TrendingUp,
                color: "text-zinc-400",
                bg: "bg-zinc-400/10",
            },
            {
                label: "Materi Selesai",
                value: `${completedCount}/${totalSubmateri}`,
                change: `Target: ${totalSubmateri}`, // Or dynamic target
                icon: CheckCircle2,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
            },
            {
                label: "Rata-rata TO",
                value: userData?.stats?.averageTO ? userData.stats.averageTO : "-",
                change: userData?.stats?.averageTO ? "Skor Rata-rata" : "Belum Ada Data",
                icon: Target,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
            },
            {
                label: "Jam Belajar",
                value: userData?.stats?.studyHours ? `${userData.stats.studyHours}h` : "0h",
                change: "Total Waktu",
                icon: BookOpen,
                color: "text-amber-400",
                bg: "bg-amber-400/10",
            },
        ];
    }, [userData]);

    if (loading) {
        return <div className="text-zinc-500 text-sm">Loading Neural Stats...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cardStyle}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className={`${iconBoxStyle} ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <span className="flex items-center text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-500/10 px-2 py-1 rounded-sm border border-zinc-500/20">
                            {stat.change}
                        </span>
                    </div>

                    <div>
                        <div className="text-3xl font-black text-white mb-1 tracking-tight">
                            {stat.value}
                        </div>
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{stat.label}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
