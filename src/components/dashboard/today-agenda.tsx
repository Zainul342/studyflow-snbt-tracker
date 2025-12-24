"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Calendar, ArrowRight, BookOpen, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_AGENDA = [
    {
        id: 1,
        title: "Latsol Penalaran Umum",
        subtitle: "Paket 3 - 20 Soal",
        time: "09:00 - 10:30",
        type: "latsol",
        icon: Calendar,
        completed: false
    },
    {
        id: 2,
        title: "Review Materi PPU",
        subtitle: "Kalimat Efektif & Ejaan",
        time: "13:00 - 14:30",
        type: "review",
        icon: BookOpen,
        completed: false
    },
    {
        id: 3,
        title: "Drill Kuantitatif",
        subtitle: "Aljabar Dasar",
        time: "19:30 - 21:00",
        type: "drill",
        icon: Clock,
        completed: false
    },
];

export function TodayAgenda() {
    const [items, setItems] = useState(INITIAL_AGENDA);

    const toggleItem = (id: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                // If checking the item (changing from false to true)
                if (!item.completed) {
                    // Ideally play sound here
                    // new Audio('/sounds/check.mp3').play();
                }
                return { ...item, completed: !item.completed };
            }
            return item;
        }));
    };

    const completedCount = items.filter(i => i.completed).length;
    const allCompleted = completedCount === items.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-white/10 transition-all duration-300 min-h-[350px] flex flex-col relative overflow-hidden"
        >
            {/* Success Overlay when all completed */}
            <AnimatePresence>
                {allCompleted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-emerald-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" }}
                            className="w-16 h-16 bg-emerald-400 text-black rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20"
                        >
                            <PartyPopper className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">
                            Misi Selesai!
                        </h3>
                        <p className="text-emerald-200 text-sm font-medium max-w-[200px]">
                            Gokil! 3/3 target hari ini hancur lebur. Istirahat dulu, Pejuang.
                        </p>
                        <button
                            onClick={() => setItems(INITIAL_AGENDA)}
                            className="mt-6 text-xs font-bold text-emerald-400 uppercase tracking-widest hover:text-white transition-colors"
                        >
                            Reset Misi (Demo)
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white text-lg font-bold flex items-center gap-2">
                        Target Hari Ini
                        <span className="bg-[#BFFF0B]/20 text-[#BFFF0B] text-xs px-2 py-0.5 rounded-sm font-black">
                            {completedCount}/{items.length}
                        </span>
                    </h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">
                        Selesaikan satu per satu.
                    </p>
                </div>
            </div>

            <div className="space-y-3 flex-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={cn(
                            "group relative overflow-hidden rounded-sm p-4 border transition-all duration-300 cursor-pointer select-none",
                            item.completed
                                ? "bg-zinc-900/30 border-zinc-800 opacity-60 grayscale"
                                : "bg-zinc-900/50 border-white/5 hover:border-[#BFFF0B]/30 hover:bg-zinc-900 shadow-sm"
                        )}
                    >
                        {/* Strikethrough Line */}
                        <div className={cn(
                            "absolute left-4 right-4 top-1/2 h-[2px] bg-zinc-600 origin-left transition-transform duration-300 z-10",
                            item.completed ? "scale-x-100" : "scale-x-0"
                        )} />

                        <div className="flex items-start gap-4">
                            {/* Checkbox */}
                            <div className={cn(
                                "w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border transition-all duration-300",
                                item.completed
                                    ? "bg-zinc-800 border-zinc-700 text-zinc-500"
                                    : "bg-zinc-800 border-zinc-700 text-transparent group-hover:border-[#BFFF0B] group-hover:text-[#BFFF0B]/20"
                            )}>
                                <Check className={cn("w-5 h-5 transition-all", item.completed && "text-emerald-500 scale-110")} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={cn(
                                        "text-sm font-bold truncate transition-colors",
                                        item.completed ? "text-zinc-500" : "text-zinc-200 group-hover:text-[#BFFF0B]"
                                    )}>
                                        {item.title}
                                    </h4>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors",
                                        item.completed
                                            ? "bg-zinc-800 border-zinc-800 text-zinc-600"
                                            : "bg-zinc-800 border-zinc-700 text-zinc-500"
                                    )}>
                                        {item.time}
                                    </span>
                                </div>
                                <p className={cn(
                                    "text-xs font-medium truncate transition-colors",
                                    item.completed ? "text-zinc-600" : "text-zinc-500"
                                )}>
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-zinc-500 text-xs">
                    "Centang hijau adalah addictive." 💊
                </p>
            </div>
        </motion.div>
    );
}
