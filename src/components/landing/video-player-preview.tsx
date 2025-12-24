"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play, Pause, Volume2, Maximize2, SkipForward,
    LayoutDashboard, BookOpen, CheckCircle2, BarChart2, Calendar,
    Settings, LogOut, Search, Video,
    TrendingUp, Target, Clock, Trophy, MoreHorizontal, MousePointer2, ChevronRight, CheckCircle
} from "lucide-react";

// --- Components adapted from User Screenshot ---

function Sidebar({ activeTab }: { activeTab: string }) {
    return (
        <div className="w-64 bg-zinc-950 border-r border-white/5 p-4 flex flex-col h-full hidden sm:flex font-sans">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                    <div className="w-3 h-3 bg-black transform rotate-45" />
                </div>
                <div className="font-black text-lg tracking-tighter text-white">STUDYFLOW</div>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Navigation</div>
                    <div className="space-y-1">
                        <NavItem icon={LayoutDashboard} label="DASHBOARD" active={activeTab === 'Overview'} />
                        <NavItem icon={BookOpen} label="MATERI BELAJAR" active={activeTab === 'Materi'} />
                        <NavItem icon={CheckCircle2} label="CEK PROGRESS" />
                        <NavItem icon={BarChart2} label="ANALITIK PROGRES" active={activeTab === 'Progress'} />
                        <NavItem icon={Calendar} label="AGENDA HARIAN" />
                    </div>
                </div>

                <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Account</div>
                    <div className="space-y-1">
                        <NavItem icon={Settings} label="SETTINGS" />
                        <NavItem icon={LogOut} label="LOGOUT" />
                    </div>
                </div>
            </div>

            <div className="mt-auto bg-zinc-900/50 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    AC
                </div>
                <div>
                    <div className="text-sm font-bold text-white">AKUN</div>
                    <div className="text-[10px] text-yellow-500 font-bold flex items-center gap-1">
                        ⚡ WARRIOR
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group ${active ? 'bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
            <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'group-hover:text-white'}`} />
            <span className="font-bold text-[11px] uppercase tracking-wide">{label}</span>
            {active && (
                <motion.div layoutId="activeNav" className="absolute right-2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            )}
        </div>
    );
}

function TopBar() {
    return (
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-zinc-950">
            <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5 text-zinc-500 w-96">
                <Search className="w-4 h-4" />
                <span className="text-xs">Search concepts, tasks...</span>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                    <Video className="w-4 h-4" />
                    <span className="text-xs font-bold">Tutorial</span>
                </button>
            </div>
        </div>
    );
}

const DashboardScene = ({ progress }: { progress: number }) => (
    <div className="w-full h-full bg-[#09090b] text-white p-8 overflow-hidden font-sans">
        {/* Welcome Header */}
        <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight">
                    Selamat Pagi, <span className="text-[#BFFF0B]">akun chrome</span> 👋
                </h1>
                <p className="text-zinc-400 text-sm">
                    Siap untuk mengejar target <span className="text-white font-bold">Target Universitas - Target Jurusan</span> hari ini?
                </p>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg border border-white/10 bg-zinc-900 hover:bg-zinc-800 text-sm font-bold transition-colors flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Materi
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#BFFF0B] text-black text-sm font-bold hover:shadow-[0_0_20px_-5px_#BFFF0B] transition-all flex items-center gap-2">
                    🚀 Lanjut Belajar
                </button>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard
                icon={TrendingUp} iconColor="text-[#BFFF0B]" iconBg="bg-[#BFFF0B]/10"
                value="45%" label="TOTAL PROGRESS"
                badge="+12.5%" badgeColor="text-[#BFFF0B] bg-[#BFFF0B]/10"
            />
            <StatCard
                icon={CheckCircle} iconColor="text-blue-500" iconBg="bg-blue-500/10"
                value="28/146" label="MATERI SELESAI"
                badge="TARGET: 50" badgeColor="text-zinc-400 bg-zinc-800"
            />
            <StatCard
                icon={Target} iconColor="text-purple-500" iconBg="bg-purple-500/10"
                value="645" label="RATA-RATA TO"
                badge="+28 POIN" badgeColor="text-purple-400 bg-purple-500/10"
            />
            <StatCard
                icon={BookOpen} iconColor="text-orange-500" iconBg="bg-orange-500/10"
                value="42.5h" label="JAM BELAJAR"
                badge="MINGGU INI" badgeColor="text-yellow-500 bg-yellow-500/10"
            />
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-3 gap-6 h-[280px]">
            {/* Activity Graph */}
            <div className="col-span-2 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 rounded-md bg-[#BFFF0B]/10">
                                <TrendingUp className="w-4 h-4 text-[#BFFF0B]" />
                            </div>
                            <h3 className="font-bold">Aktivitas Belajar</h3>
                        </div>
                        <p className="text-xs text-zinc-500">7 HARI TERAKHIR</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black">41.9 jam</div>
                        <div className="text-xs font-bold text-[#BFFF0B]">+12% VS MINGGU LALU</div>
                    </div>
                </div>

                {/* SVG Graph Simulation */}
                <div className="absolute bottom-0 left-0 right-0 h-32 px-4">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,40 L0,30 C10,25 20,35 30,28 C40,20 50,15 60,25 C70,35 80,20 90,25 L100,28 L100,40 Z" fill="url(#gradient)" opacity="0.2" />
                        <path d="M0,30 C10,25 20,35 30,28 C40,20 50,15 60,25 C70,35 80,20 90,25 L100,28" fill="none" stroke="#BFFF0B" strokeWidth="0.5" />
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#BFFF0B" />
                                <stop offset="100%" stopColor="#BFFF0B" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* X-Axis Labels */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] text-zinc-600 font-medium">
                    <span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>

            {/* Today's Target */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            Target Hari Ini
                            <span className="bg-[#BFFF0B] text-black text-[10px] px-1.5 rounded font-black">3</span>
                        </h3>
                        <p className="text-xs text-zinc-500 uppercase mt-1">SENIN, 22 DES 2025</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>
                </div>

                <div className="space-y-3 flex-1">
                    <TaskItem title="Latsol Penalaran Umum" sub="Paket 3 - 20 Soal" time="09:00 - 10:30" />
                    <TaskItem title="Review Materi PPU" sub="Kalimat Efektif & Ejaan" time="13:00 - 14:30" />
                    <TaskItem title="Drill Kuantitatif" sub="Aljabar Dasar" time="19:30 - 21:00" />
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-zinc-500 italic text-center">
                    "Konsistensi adalah kunci kemenangan." 🔥
                </div>
            </div>
        </div>
    </div>
);

function StatCard({ icon: Icon, iconColor, iconBg, value, label, badge, badgeColor }: any) {
    return (
        <div className="bg-zinc-900/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-32 group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold ${badgeColor}`}>
                    {badge}
                </div>
            </div>
            <div>
                <div className="text-2xl font-black text-white tracking-tight mb-1">{value}</div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</div>
            </div>
        </div>
    );
}

function TaskItem({ title, sub, time }: any) {
    return (
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-white/5 group-hover:border-white/10">
                <Calendar className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-xs truncate">{title}</div>
                <div className="text-[10px] text-zinc-500 truncate">{sub}</div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 border border-white/5 rounded px-1.5 py-0.5 whitespace-nowrap">
                {time}
            </div>
        </div>
    );
}

// --- Video Player Main ---

export function VideoPlayerPreview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Timeline control
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 0.2; // Even slower for detail view
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlayPause = () => setIsPlaying(!isPlaying);

    // Initial Cursor Pos
    const cursorX = useMemo(() => isPlaying ? 100 + (progress * 5) : 500, [progress, isPlaying]);
    const cursorY = useMemo(() => isPlaying ? 200 + Math.sin(progress / 5) * 50 : 300, [progress, isPlaying]);

    return (
        <div className="relative w-full aspect-video bg-black flex flex-col overflow-hidden group select-none font-sans border border-white/10 rounded-xl shadow-2xl">
            {/* Top Bar / Recording UI */}
            <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-start z-30 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {isPlaying ? 'REC' : 'PAUSED'}
                    </span>
                </div>
            </div>

            {/* Main Application Area */}
            <div className="flex-1 flex overflow-hidden relative opacity-100 bg-[#09090b]">
                <Sidebar activeTab={progress > 30 ? (progress > 60 ? 'Progress' : 'Materi') : 'Overview'} />

                <div className="flex-1 flex flex-col h-full relative">
                    <TopBar />
                    <DashboardScene progress={progress} />

                    {/* VIGNETTE & GRAIN */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50" />
                </div>

                {/* Simulated Mouse Cursor */}
                <motion.div
                    animate={{
                        x: cursorX,
                        y: cursorY,
                        scale: isPlaying ? [1, 0.9, 1] : 1
                    }}
                    transition={{
                        type: "tween",
                        ease: "linear",
                        duration: 0.2
                    }}
                    className={`absolute left-0 top-0 z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 ${!isPlaying && 'opacity-0'}`}
                >
                    <MousePointer2 className="w-6 h-6 text-white drop-shadow-xl fill-black stroke-[1.5px]" />
                </motion.div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-40 transition-all cursor-pointer" onClick={handlePlayPause}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-[#BFFF0B] flex items-center justify-center shadow-[0_0_40px_-5px_#BFFF0B] text-black pl-1.5"
                    >
                        <Play className="w-8 h-8 fill-current" />
                    </motion.button>
                </div>
            )}

            {/* Progress Bar Bottom */}
            <div className="h-1 bg-white/10 w-full relative z-50">
                <motion.div
                    className="h-full bg-[#BFFF0B]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-40" />
        </div>
    );
}
