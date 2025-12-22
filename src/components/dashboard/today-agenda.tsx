"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const agendaItems = [
    {
        id: 1,
        title: "Latsol Penalaran Umum",
        subtitle: "Paket 3 - 20 Soal",
        time: "09:00 - 10:30",
        status: "upcoming", // completed, active, upcoming
        type: "latsol",
        icon: Calendar
    },
    {
        id: 2,
        title: "Review Materi PPU",
        subtitle: "Kalimat Efektif & Ejaan",
        time: "13:00 - 14:30",
        status: "upcoming",
        type: "review",
        icon: BookOpen
    },
    {
        id: 3,
        title: "Drill Kuantitatif",
        subtitle: "Aljabar Dasar",
        time: "19:30 - 21:00",
        status: "upcoming",
        type: "drill",
        icon: Clock
    },
];

export function TodayAgenda() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-800/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-800 hover:border-white/10 transition-all duration-300 min-h-[350px] flex flex-col"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-white text-lg font-bold flex items-center gap-2">
                        Target Hari Ini
                        <span className="bg-emerald-400/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-black">3</span>
                    </h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-1">Senin, 22 Des 2025</p>
                </div>
                <button className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3 flex-1">
                {agendaItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "group relative overflow-hidden rounded-2xl p-4 border transition-all duration-300",
                            item.status === "active"
                                ? "bg-emerald-400/10 border-emerald-400/20"
                                : "bg-zinc-900/50 border-white/5 hover:border-white/10 hover:bg-zinc-900"
                        )}
                    >
                        {/* Active Status Indicator */}
                        {item.status === "active" && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400" />
                        )}

                        <div className="flex items-start gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                                item.status === "active"
                                    ? "bg-emerald-400/20 border-emerald-400/30 text-emerald-400"
                                    : "bg-zinc-800 border-zinc-700/50 text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-600"
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={cn(
                                        "text-sm font-bold truncate",
                                        item.status === "active" ? "text-emerald-100" : "text-zinc-300 group-hover:text-white"
                                    )}>
                                        {item.title}
                                    </h4>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                        item.status === "active"
                                            ? "bg-emerald-400/20 border-emerald-400/20 text-emerald-400"
                                            : "bg-zinc-800 border-zinc-700 text-zinc-500"
                                    )}>
                                        {item.time}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500 font-medium truncate group-hover:text-zinc-400">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-zinc-500 text-xs">
                    "Konsistensi adalah kunci kemenangan." 🔥
                </p>
            </div>
        </motion.div>
    );
}
