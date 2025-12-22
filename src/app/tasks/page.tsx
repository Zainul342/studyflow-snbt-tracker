"use client";

import { motion } from "framer-motion";
import { MISSION_DATA, DailyMission, Resource } from "@/lib/data/resource-db";
import { Rocket, Calendar, CheckCircle2, Clock, Globe, FileText, Youtube, MessageCircle, Check, Flame, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MissionModal } from "@/components/tracking/mission-modal";
import { mockDB } from "@/lib/data/mock-db";

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<DailyMission | null>(null);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [missionProgress, setMissionProgress] = useState<Record<number, boolean>>({});

    useEffect(() => {
        setMissionProgress(mockDB.getMissionProgress());
        const handleUpdate = () => {
            setMissionProgress(mockDB.getMissionProgress());
        };
        window.addEventListener("mission-updated" as any, handleUpdate);
        return () => window.removeEventListener("mission-updated" as any, handleUpdate);
    }, []);

    const openMission = (mission: DailyMission, resource: Resource | null = null) => {
        setSelectedMission(mission);
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    // Calculate Stats
    const totalMissions = MISSION_DATA.length;
    const completedCount = Object.values(missionProgress).filter(Boolean).length;
    const progressPercent = Math.round((completedCount / totalMissions) * 100);

    return (
        <div className="relative min-h-screen font-sans text-zinc-300 overflow-hidden bg-[#0A0A0A]">
            {/* Osmo Background Texture */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-12 mb-20">
                {/* Hero / Header Section */}
                <header className="mb-16 mt-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
                                    Studyflow Tracker
                                </span>
                                <span className="px-3 py-1 rounded-sm bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 text-[10px] font-bold tracking-widest uppercase text-[#BFFF0B] flex items-center gap-1.5">
                                    <Flame className="w-3 h-3" />
                                    On Streak
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-[0.9]">
                                MISSION<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">DASHBOARD</span>
                            </h1>
                            <p className="text-zinc-500 text-sm max-w-md leading-relaxed border-l-2 border-zinc-800 pl-4">
                                Fokus satu hari satu misi. Jadikan konsistensi sebagai senjata utamamu menaklukkan SNBT 2026.
                            </p>
                        </div>

                        {/* Stats Card - OSMO SHARP STYLE */}
                        <div className="flex gap-4">
                            <div className="p-6 rounded-sm bg-[#1A1A1A] border border-white/5 min-w-[140px]">
                                <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Target className="w-3 h-3" /> Progress
                                </div>
                                <div className="text-3xl font-black text-white">{progressPercent}%</div>
                                <div className="h-1 w-full bg-zinc-800 rounded-sm mt-3 overflow-hidden">
                                    <div className="h-full bg-[#BFFF0B]" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>
                            <div className="p-6 rounded-sm bg-[#1A1A1A] border border-white/5 min-w-[140px]">
                                <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Trophy className="w-3 h-3" /> Completed
                                </div>
                                <div className="text-3xl font-black text-white">
                                    {completedCount}<span className="text-lg text-zinc-600">/{totalMissions}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="space-y-8">
                    {MISSION_DATA.slice().reverse().map((mission, index) => {
                        const isToday = mission.date.includes("22") || mission.day === 22;
                        const isDone = missionProgress[mission.day];

                        return (
                            <motion.div
                                key={mission.day}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative pl-8 md:pl-12"
                            >
                                {/* Timeline Line */}
                                <div className={cn(
                                    "absolute left-[11px] top-0 bottom-0 w-[2px]",
                                    index === MISSION_DATA.length - 1 ? "bg-gradient-to-b from-zinc-800 to-transparent" : "bg-zinc-800",
                                    isToday && "bg-[#BFFF0B]"
                                )} />

                                {/* Connector Node - SHARP */}
                                <div className={cn(
                                    "absolute left-0 top-8 w-6 h-6 rounded-sm border-[2px] flex items-center justify-center transition-all z-20 bg-[#0A0A0A]",
                                    isToday
                                        ? "border-[#BFFF0B] text-[#BFFF0B] shadow-[0_0_20px_rgba(191,255,11,0.4)] scale-110"
                                        : isDone
                                            ? "border-emerald-500 text-emerald-500 bg-emerald-500/10"
                                            : "border-zinc-800 text-zinc-600 group-hover:border-zinc-600"
                                )}>
                                    {isToday ? (
                                        <div className="w-2 h-2 rounded-sm bg-current animate-pulse" />
                                    ) : isDone ? (
                                        <Check className="w-3 h-3" />
                                    ) : null}
                                </div>

                                {/* Card Content - OSMO BOX */}
                                <div className={cn(
                                    "relative rounded-sm border transition-all duration-300 overflow-hidden",
                                    isToday
                                        ? "bg-[#BFFF0B]/[0.02] border-[#BFFF0B]/50 shadow-[0_0_40px_rgba(191,255,11,0.05)]"
                                        : "bg-[#1A1A1A] border-white/5 hover:border-white/20"
                                )}>
                                    <div className="p-6 md:p-8">
                                        {/* Header Row */}
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm border",
                                                        isToday
                                                            ? "bg-[#BFFF0B] text-black border-[#BFFF0B]"
                                                            : isDone
                                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                                : "bg-white/5 text-zinc-400 border-white/5"
                                                    )}>
                                                        {isDone ? "Completed" : `Mission Day ${mission.day}`}
                                                    </span>
                                                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 opacity-60">
                                                        <Calendar className="w-3 h-3" />
                                                        {mission.date}
                                                    </span>
                                                </div>
                                                <h2 className={cn(
                                                    "text-2xl md:text-3xl font-black mb-2 transition-colors tracking-tight uppercase",
                                                    isToday ? "text-white" : isDone ? "text-zinc-500" : "text-zinc-200"
                                                )}>
                                                    {mission.topic}
                                                </h2>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-zinc-500 px-2 py-1 bg-black/40 rounded-sm border border-white/5">
                                                        {mission.subtest}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => openMission(mission)}
                                                className={cn(
                                                    "group/btn relative flex items-center gap-3 px-6 py-3 rounded-sm font-bold text-xs transition-all overflow-hidden border",
                                                    isToday
                                                        ? "bg-[#BFFF0B] text-black border-[#BFFF0B] hover:bg-[#BFFF0B]/90"
                                                        : isDone
                                                            ? "bg-zinc-800 text-[#BFFF0B] border-[#BFFF0B]/20"
                                                            : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                                                )}
                                            >
                                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                                                <span className="uppercase tracking-wider">{isDone ? "Review Again" : "Start Mission"}</span>
                                            </button>
                                        </div>

                                        <p className="text-sm text-zinc-400 mb-8 leading-relaxed max-w-2xl border-l-2 border-white/5 pl-4 ml-1">
                                            {mission.description}
                                        </p>

                                        {/* Resources Grid - SHARP */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {mission.resources.map((res) => (
                                                <div
                                                    key={res.id}
                                                    onClick={() => openMission(mission, res)}
                                                    className="relative flex items-center gap-4 p-4 rounded-sm bg-black/20 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group/item cursor-pointer overflow-hidden"
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-all border border-transparent",
                                                        res.type === 'video' && "bg-red-500/10 text-red-500 group-hover/item:border-red-500/50",
                                                        res.type === 'pdf' && "bg-blue-500/10 text-blue-500 group-hover/item:border-blue-500/50",
                                                        res.type === 'thread' && "bg-sky-500/10 text-sky-500 group-hover/item:border-sky-500/50",
                                                        res.type === 'web' && "bg-zinc-500/10 text-zinc-400 group-hover/item:border-zinc-500/50",
                                                    )}>
                                                        {res.type === 'video' && <Youtube className="w-5 h-5" />}
                                                        {res.type === 'pdf' && <FileText className="w-5 h-5" />}
                                                        {res.type === 'thread' && <MessageCircle className="w-5 h-5" />}
                                                        {res.type === 'web' && <Globe className="w-5 h-5" />}
                                                    </div>
                                                    <div className="overflow-hidden flex-1 z-10">
                                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                                            <span className={cn(
                                                                "text-[9px] font-black uppercase tracking-wider",
                                                                res.category === 'materi' ? "text-[#BFFF0B]" : "text-sky-400"
                                                            )}>
                                                                {res.category}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-xs font-bold text-zinc-300 group-hover/item:text-white truncate transition-colors">
                                                            {res.title}
                                                        </h4>
                                                    </div>
                                                    <div className="absolute right-4 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all">
                                                        <Rocket className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            ))}
                                            {mission.resources.length === 0 && (
                                                <div className="col-span-full py-6 text-center text-xs text-zinc-700 bg-black/20 rounded-sm border border-dashed border-zinc-800 font-mono uppercase tracking-widest">
                                                    No Resources Yet
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mission Modal / Focus Overlay */}
                <MissionModal
                    mission={selectedMission}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialResource={selectedResource}
                />
            </div>
        </div>
    );
}
