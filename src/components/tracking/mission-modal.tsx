"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Youtube, FileText, MessageCircle, Globe, CheckCircle2, Calendar } from "lucide-react";
import { DailyMission, Resource } from "@/lib/data/resource-db";
import { cn } from "@/lib/utils";

interface MissionModalProps {
    mission: DailyMission | null;
    isOpen: boolean;
    onClose: () => void;
}

export function MissionModal({ mission, isOpen, onClose }: MissionModalProps) {
    if (!mission) return null;

    // Helper to get first video for embed
    const firstVideo = mission.resources.find(r => r.type === 'video');
    const embedUrl = firstVideo ? firstVideo.url.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/") : null;

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
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* LEFT COLUMN: Main Content (Video/Study) */}
                        <div className="flex-1 flex flex-col border-r border-zinc-800 bg-black">
                            <div className="flex-1 relative flex items-center justify-center bg-zinc-900/50">
                                {embedUrl ? (
                                    <iframe
                                        src={embedUrl}
                                        title={firstVideo?.title}
                                        className="w-full h-full absolute inset-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                                            <FileText className="w-8 h-8 text-zinc-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-300">Tidak ada video utama</h3>
                                        <p className="text-zinc-500 mt-2">Silakan pelajari materi dari resource yang tersedia.</p>
                                    </div>
                                )}
                            </div>

                            {/* Player Controls / Meta */}
                            <div className="h-16 border-t border-zinc-800 flex items-center justify-between px-6 bg-[#0A0A0A]">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded bg-[#BFFF0B]/10 flex items-center justify-center text-[#BFFF0B] font-bold text-xs">
                                        D{mission.day}
                                    </div>
                                    <span className="text-sm font-semibold text-white truncate max-w-[300px]">
                                        {mission.topic}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* Placeholder for future timer/controls */}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Resources & Checklist */}
                        <div className="w-full md:w-[350px] flex flex-col bg-[#0F0F0F]">

                            {/* Header */}
                            <div className="p-6 border-b border-zinc-800">
                                <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#BFFF0B]" />
                                    MISI HARIAN
                                </h3>
                                <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {mission.date}
                                </p>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                                {/* Description */}
                                <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Instruksi</h4>
                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                        {mission.description}
                                    </p>
                                </div>

                                {/* Resource List */}
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-1">
                                        Resources ({mission.resources.length})
                                    </h4>
                                    <div className="space-y-2">
                                        {mission.resources.map((res) => (
                                            <a
                                                key={res.id}
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all group",
                                                    res.type === 'video' && embedUrl && res.url.includes(embedUrl.split('?')[0]) ? "bg-zinc-800 border-[#BFFF0B]/30" : "bg-transparent"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-8 h-8 rounded flex items-center justify-center shrink-0",
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
                                                <div className="overflow-hidden text-left">
                                                    <p className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                                                        {res.title}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-500 uppercase">
                                                        {res.platform}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="p-4 border-t border-zinc-800 bg-[#0A0A0A]">
                                <button onClick={() => alert("Mark as Complete (Logic Coming Soon)")} className="w-full py-2.5 rounded-lg bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Selesai Misi Ini
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
