"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle2, Maximize2, Minimize2, ChevronRight, Hash } from "lucide-react";
import { MISSION_DATA, DailyMission, Resource } from "@/lib/data/resource-db";
import { mockDB } from "@/lib/data/mock-db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AmbientBackground } from "@/components/layout/ambient-background";

// --- Components ---

function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<"focus" | "break">("focus"); // focus | break

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play sound?
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode: "focus" | "break") => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 rounded-full px-2 py-2 pr-6 shadow-xl backdrop-blur-xl">
            <div className="flex bg-white/5 rounded-full p-1">
                <button
                    onClick={() => switchMode("focus")}
                    className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                        mode === "focus" ? "bg-[#BFFF0B] text-black shadow-[0_0_15px_rgba(191,255,11,0.3)]" : "text-zinc-500 hover:text-white"
                    )}
                >
                    Focus
                </button>
                <button
                    onClick={() => switchMode("break")}
                    className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                        mode === "break" ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-zinc-500 hover:text-white"
                    )}
                >
                    Break
                </button>
            </div>

            <div className="font-mono text-2xl font-black text-white w-[80px] text-center tracking-widest">
                {formatTime(timeLeft)}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTimer}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                    {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// --- Main Page ---

export default function FocusPage() {
    const params = useParams();
    const router = useRouter();
    const [mission, setMission] = useState<DailyMission | null>(null);
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [lightsOff, setLightsOff] = useState(false);

    useEffect(() => {
        // Find Mission
        const missionId = Number(params.missionId);
        const found = MISSION_DATA.find((m) => m.day === missionId);

        if (found) {
            setMission(found);
            // Default select first video
            const firstVideo = found.resources.find(r => r.type === 'video');
            setActiveResource(firstVideo || found.resources[0]);

            // Sync Persistence
            const progress = mockDB.getMissionProgress();
            setIsCompleted(!!progress[found.day]);
        } else {
            // Handle 404
        }
    }, [params.missionId]);

    const handleComplete = () => {
        if (!mission) return;
        const newState = !isCompleted;
        mockDB.updateMissionProgress(mission.day, newState);
        setIsCompleted(newState);

        // Maybe trigger confetti or sound?
    };

    if (!mission) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">Loading Mission Data...</div>;

    return (
        <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
            {/* Ambient Base */}
            {!lightsOff && <AmbientBackground />}

            {/* Lights Off Overlay */}
            <div className={cn(
                "fixed inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-0",
                lightsOff ? "opacity-100" : "opacity-0"
            )} />

            {/* HEADER: Floating Toolbar */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 p-6 flex items-start justify-between pointer-events-none transition-opacity duration-500",
                    lightsOff ? "opacity-0 hover:opacity-100" : "opacity-100"
                )}
            >
                {/* Back Button */}
                <div className="pointer-events-auto">
                    <Link href="/tasks">
                        <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Exit Focus</span>
                        </button>
                    </Link>
                    <div className="mt-4 ml-2">
                        <div className="text-[10px] uppercase tracking-widest text-[#BFFF0B] mb-1">Current Mission</div>
                        <h1 className="text-xl font-black tracking-tight leading-tight max-w-[200px]">{mission.topic}</h1>
                    </div>
                </div>

                {/* Center: Pomodoro */}
                <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                    <PomodoroTimer />
                </div>

                {/* Right: Actions */}
                <div className="pointer-events-auto flex flex-col items-end gap-3">
                    <button
                        onClick={() => setLightsOff(!lightsOff)}
                        className={cn(
                            "w-12 h-12 rounded-full border flex items-center justify-center transition-all",
                            lightsOff
                                ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                : "bg-[#0A0A0A]/80 text-zinc-400 border-white/10 hover:text-white hover:border-white"
                        )}
                        title={lightsOff ? "Lights On" : "Lights Off"}
                    >
                        {lightsOff ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>

                    <button
                        onClick={handleComplete}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs transition-all shadow-lg border uppercase tracking-wider",
                            isCompleted
                                ? "bg-transparent text-[#BFFF0B] border-[#BFFF0B] shadow-[0_0_20px_rgba(191,255,11,0.1)]"
                                : "bg-[#BFFF0B] text-black border-[#BFFF0B] hover:bg-[#BFFF0B]/90 hover:scale-105"
                        )}
                    >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 border-2 border-black rounded-full" />}
                        {isCompleted ? "Completed" : "Mark Done"}
                    </button>
                </div>
            </motion.header>

            {/* MAIN CONTENT STAGE */}
            <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-6 md:p-12 pt-24">

                {/* Content Container */}
                <motion.div
                    layout
                    className={cn(
                        "w-full max-w-5xl aspect-video rounded-sm border border-white/10 overflow-hidden shadow-2xl transition-all duration-700 relative bg-black",
                        lightsOff ? "scale-105 shadow-[0_0_100px_rgba(0,0,0,0.8)] border-white/5" : "bg-[#0A0A0A]"
                    )}
                >
                    {activeResource ? (
                        <iframe
                            src={activeResource.url.includes("youtube")
                                ? activeResource.url.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/")
                                : activeResource.url.replace(/\/view(\?.*)?$/, "/preview")
                            }
                            title="Focus Content"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-500">No content selected</div>
                    )}
                </motion.div>

                {/* Resource Playlist (Bottom Bar) */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={cn(
                        "fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 transition-all duration-500",
                        lightsOff ? "translate-y-[200%]" : ""
                    )}
                >
                    {mission.resources.map((res, i) => (
                        <button
                            key={res.id}
                            onClick={() => setActiveResource(res)}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2",
                                activeResource?.id === res.id
                                    ? "bg-white/10 text-white shadow-inner"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                            )}
                        >
                            <span className="opacity-50 text-[9px]">0{i + 1}</span>
                            {res.category === 'materi' ? "📚" : "✍️"}
                            <span className="max-w-[100px] truncate">{res.title}</span>

                            {activeResource?.id === res.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-full border border-white/20"
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

            </main>

        </div>
    );
}
