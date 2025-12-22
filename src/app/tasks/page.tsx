"use client";

import { motion } from "framer-motion";
import { MISSION_DATA } from "@/lib/data/resource-db";
import { Rocket, Calendar, CheckCircle2, Clock, Globe, FileText, Youtube, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function TasksPage() {
    // Determine "current" day based on user context (Dec 23, 2025 = Day 23)
    // Since we only have data up to Day 21 in MISSION_DATA, we will render what we have.
    // In a real app, this would compare with new Date().

    return (
        <div className="p-8 pt-24 min-h-screen font-sans text-zinc-300">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
                    AGENDA HARIAN
                </h1>
                <p className="text-zinc-500 text-sm max-w-2xl">
                    Jadwal belajar harianmu yang terintegrasi. Fokus satu hari satu misi untuk konsistensi maksimal.
                </p>
            </header>

            <div className="max-w-4xl space-y-8">
                {MISSION_DATA.slice().reverse().map((mission, index) => {
                    // Logic to highlight "Today" ideally, but for now we list all
                    // We can map Day 21 as "Recent"
                    const isToday = mission.day === 23; // Placeholder logic

                    return (
                        <motion.div
                            key={mission.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "group relative pl-8 pb-8 border-l",
                                isToday ? "border-[#BFFF0B]" : "border-zinc-800"
                            )}
                        >
                            {/* Connector */}
                            <div className={cn(
                                "absolute -left-3 top-0 w-6 h-6 rounded-full border-4 flex items-center justify-center bg-[#0A0A0A]",
                                isToday
                                    ? "border-[#BFFF0B] text-[#BFFF0B]"
                                    : "border-zinc-800 text-zinc-600 group-hover:border-zinc-600 transition-colors"
                            )}>
                                {isToday && <Rocket className="w-3 h-3 fill-current" />}
                            </div>

                            <div className="glass-light p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all bg-zinc-900/40">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm",
                                                isToday ? "bg-[#BFFF0B] text-black" : "bg-zinc-800 text-zinc-400"
                                            )}>
                                                Day {mission.day}
                                            </span>
                                            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {mission.date}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-1">
                                            {mission.topic}
                                        </h2>
                                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                                            <span className="bg-zinc-800/50 px-2 py-0.5 rounded text-zinc-300 font-medium">
                                                {mission.subtest}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => alert("Start Mission " + mission.day)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all",
                                            isToday
                                                ? "bg-[#BFFF0B] text-black hover:bg-[#BFFF0B]/90 shadow-[0_0_15px_rgba(191,255,11,0.3)]"
                                                : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <Rocket className="w-3.5 h-3.5" />
                                        <span>Mulai Misi</span>
                                    </button>
                                </div>

                                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                    {mission.description}
                                </p>

                                {/* Resources Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {mission.resources.map((res) => (
                                        <a
                                            key={res.id}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group/item cursor-pointer"
                                        >
                                            <div className={cn(
                                                "mt-0.5 w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                                                res.type === 'video' && "bg-red-500/10 text-red-500",
                                                res.type === 'pdf' && "bg-blue-500/10 text-blue-500",
                                                res.type === 'thread' && "bg-sky-500/10 text-sky-500",
                                                res.type === 'web' && "bg-zinc-500/10 text-zinc-400",

                                            )}>
                                                {res.type === 'video' && <Youtube className="w-4 h-4" />}
                                                {res.type === 'pdf' && <FileText className="w-4 h-4" />}
                                                {res.type === 'thread' && <MessageCircle className="w-4 h-4" />}
                                                {res.type === 'web' && <Globe className="w-4 h-4" />}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="text-xs font-semibold text-zinc-300 group-hover/item:text-white truncate">
                                                    {res.title}
                                                </h4>
                                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                                                    {res.platform}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                    {mission.resources.length === 0 && (
                                        <div className="col-span-full py-4 text-center text-xs text-zinc-600 bg-white/[0.02] rounded-lg border-2 border-dashed border-zinc-900">
                                            Tidak ada resource tambahan untuk hari ini.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
