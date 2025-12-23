"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Youtube, FileText, MessageCircle, Globe, CheckCircle2, Calendar, ExternalLink, ChevronRight, Check, Maximize2 } from "lucide-react";
import Link from "next/link";
import { DailyMission, Resource } from "@/lib/data/resource-db";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { mockDB } from "@/lib/data/mock-db";

interface MissionModalProps {
    mission: DailyMission | null;
    isOpen: boolean;
    onClose: () => void;
    initialResource?: Resource | null;
}

export function MissionModal({ mission, isOpen, onClose, initialResource }: MissionModalProps) {
    const [activeResource, setActiveResource] = useState<Resource | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (mission) {
            const progress = mockDB.getMissionProgress();
            setIsCompleted(!!progress[mission.day]);

            if (mission.resources.length > 0) {
                if (initialResource) {
                    setActiveResource(initialResource);
                } else {
                    const firstVideo = mission.resources.find(r => r.type === 'video');
                    setActiveResource(firstVideo || mission.resources[0]);
                }
            } else {
                setActiveResource(null);
            }
        }
    }, [mission, initialResource]);

    const handleComplete = () => {
        if (!mission) return;
        const newState = !isCompleted;
        mockDB.updateMissionProgress(mission.day, newState);
        setIsCompleted(newState);
    };

    if (!mission) return null;

    const renderPlayer = () => {
        if (!activeResource) return (
            <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-300">Pilih materi untuk memulai</h3>
            </div>
        );

        let embedUrl = activeResource.url;

        // Platform specific embed logic
        if (activeResource.platform === 'youtube') {
            embedUrl = activeResource.url.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/");
            return (
                <iframe
                    src={embedUrl}
                    title={activeResource.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            );
        }

        if (activeResource.platform === 'drive') {
            // Convert /view or /edit to /preview for embedding
            embedUrl = activeResource.url.replace(/\/view(\?.*)?$/, "/preview").replace(/\/edit(\?.*)?$/, "/preview");
            return (
                <iframe
                    src={embedUrl}
                    className="w-full h-full bg-white"
                    allow="autoplay"
                />
            );
        }

        if (activeResource.platform === 'twitter') {
            // Twitter threads are hard to iframe directly due to CSP. 
            // We'll show a "Focus View" placeholder with a button to open in new tab if iframe fails,
            // but first let's try a standard intent or embed.
            return (
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center mb-6">
                        <MessageCircle className="w-10 h-10 text-sky-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">Twitter / X Thread</h3>
                    <p className="text-zinc-400 max-w-sm mb-8">
                        Thread Twitter berisi rangkuman materi dan latihan soal interaktif dari komunitas.
                    </p>
                    <a
                        href={activeResource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black hover:bg-sky-400 transition-all group"
                    >
                        BACA THREAD SEKARANG
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            );
        }

        // Default or Web
        return (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center bg-zinc-900/20">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                    <Globe className="w-10 h-10 text-zinc-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{activeResource.title}</h2>
                <p className="text-zinc-500 mb-8 max-w-sm">Materi ini tersedia di platform eksternal resmi.</p>
                <a
                    href={activeResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-all"
                >
                    BUKA DI TAB BARU
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content - OSMO SHARP */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="relative w-full max-w-[95vw] h-[90vh] bg-[#0A0A0A] border-[2px] border-white/10 rounded-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
                    >
                        {/* Close Button - Sharp */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-[60] p-2.5 rounded-sm bg-black border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all backdrop-blur-xl shadow-xl"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* LEFT COLUMN: Main Content (Player) */}
                        <div className="flex-1 flex flex-col border-r border-white/5 bg-black relative min-h-0">
                            <div className="flex-1 relative bg-[#050505] overflow-hidden">
                                {renderPlayer()}
                            </div>

                            {/* Mission Info Bar - Sharp */}
                            <div className="h-20 border-t border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A]/80 backdrop-blur-xl">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-sm bg-[#BFFF0B] flex items-center justify-center text-black font-black text-sm shadow-[0_0_20px_rgba(191,255,11,0.2)]">
                                        D{mission.day}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                                            {mission.topic}
                                        </h3>
                                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">
                                            {activeResource?.title || "Misi Sedang Berjalan"}
                                        </p>
                                    </div>
                                </div>

                                <Link href={`/focus/${mission.day}`} className="hidden md:block mr-2">
                                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-sm font-black text-xs transition-all bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 uppercase tracking-wider group">
                                        <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Focus Mode
                                    </button>
                                </Link>

                                <button
                                    onClick={handleComplete}
                                    className={cn(
                                        "hidden md:flex items-center gap-2 px-6 py-2.5 rounded-sm font-black text-xs transition-all shadow-lg hover:bg-opacity-90 active:scale-95 border",
                                        isCompleted
                                            ? "bg-zinc-800 text-[#BFFF0B] border-[#BFFF0B]/20"
                                            : "bg-[#BFFF0B] text-black border-[#BFFF0B]"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                                    {isCompleted ? "MISI SELESAI" : "SELESAIKAN MISI"}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Resources & Timeline */}
                        <div className="w-full md:w-[400px] flex flex-col bg-[#0A0A0A] min-h-0 relative">
                            {/* Grid Texture */}
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none opacity-50" />

                            {/* Header */}
                            <div className="p-8 pb-6 relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-black text-[#BFFF0B] tracking-[0.2em] uppercase">
                                        Content Navigation
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {mission.date}
                                    </div>
                                </div>
                                <h1 className="text-xl font-black text-white leading-tight uppercase">
                                    {mission.topic}
                                </h1>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8 scrollbar-hide relative z-10">

                                {/* Description - Sharp */}
                                <div className="p-5 rounded-sm bg-zinc-900/50 border border-white/5">
                                    <p className="text-sm text-zinc-400 leading-relaxed border-l-2 border-[#6B4FFF] pl-3">
                                        {mission.description}
                                    </p>
                                </div>

                                {/* Resource List - Split by Category */}
                                <div className="space-y-8">

                                    {/* Zona Belajar (Materi) */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4 px-1">
                                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em]">
                                                📚 Zona Belajar (Materi)
                                            </h4>
                                            <span className="text-[10px] text-white/20 font-mono">
                                                {mission.resources.filter(r => r.category === 'materi').length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {mission.resources.filter(r => r.category === 'materi').map((res) => (
                                                <ResourceItem
                                                    key={res.id}
                                                    res={res}
                                                    isActive={activeResource?.id === res.id}
                                                    onSelect={() => setActiveResource(res)}
                                                />
                                            ))}
                                            {mission.resources.filter(r => r.category === 'materi').length === 0 && (
                                                <p className="text-xs text-zinc-600 italic px-4 py-2 bg-white/5 rounded-sm border border-dashed border-zinc-800">Tidak ada materi khusus hari ini.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Zona Latihan (Latsol) */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4 px-1">
                                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em]">
                                                ✍️ Zona Latihan (Soal)
                                            </h4>
                                            <span className="text-[10px] text-white/20 font-mono">
                                                {mission.resources.filter(r => r.category === 'latsol').length} Items
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {mission.resources.filter(r => r.category === 'latsol').map((res) => (
                                                <ResourceItem
                                                    key={res.id}
                                                    res={res}
                                                    isActive={activeResource?.id === res.id}
                                                    onSelect={() => setActiveResource(res)}
                                                />
                                            ))}
                                            {mission.resources.filter(r => r.category === 'latsol').length === 0 && (
                                                <p className="text-xs text-zinc-600 italic px-4 py-2 bg-white/5 rounded-sm border border-dashed border-zinc-800">Gunakan materi di atas untuk pemahaman.</p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Extracted Component for cleaner code
function ResourceItem({ res, isActive, onSelect }: { res: Resource, isActive: boolean, onSelect: () => void }) {
    return (
        <button
            onClick={onSelect}
            className={cn(
                "w-full flex items-center gap-4 p-4 rounded-sm border transition-all duration-300 group relative overflow-hidden",
                isActive
                    ? "bg-[#BFFF0B] border-[#BFFF0B] text-black shadow-[0_10px_30px_rgba(191,255,11,0.2)]"
                    : "bg-white/5 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/10"
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-colors",
                isActive
                    ? "bg-black/10 text-black border border-black/10"
                    : cn(
                        "bg-zinc-900 border border-white/5",
                        res.type === 'video' && "text-red-500",
                        res.type === 'pdf' && "text-blue-500",
                        res.type === 'thread' && "text-sky-500",
                        res.type === 'web' && "text-zinc-400",
                    )
            )}>
                {res.type === 'video' && <Youtube className="w-5 h-5" />}
                {res.type === 'pdf' && <FileText className="w-5 h-5" />}
                {res.type === 'thread' && <MessageCircle className="w-5 h-5" />}
                {res.type === 'web' && <Globe className="w-5 h-5" />}
            </div>
            <div className="overflow-hidden text-left flex-1">
                <p className={cn(
                    "text-xs font-black truncate leading-tight uppercase tracking-tight",
                    isActive ? "text-black" : "text-zinc-200 group-hover:text-white"
                )}>
                    {res.title}
                </p>
                <p className={cn(
                    "text-[9px] font-bold uppercase mt-1 tracking-widest",
                    isActive ? "text-black/50" : "text-zinc-500"
                )}>
                    {res.platform}
                </p>
            </div>

            {!isActive && <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />}
            {isActive && <motion.div layoutId="activeResource" className="absolute left-0 w-1 h-6 bg-black rounded-r-sm" />}
        </button>
    );
}
