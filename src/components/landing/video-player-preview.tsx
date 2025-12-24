"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Maximize2, SkipForward, BookOpen, Trophy, BarChart3, GraduationCap } from "lucide-react";

export function VideoPlayerPreview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);

    const slides = [
        {
            icon: GraduationCap,
            title: "Welcome to StudyFlow",
            subtitle: "The ultimate toolkit for SNBT fighters.",
            color: "text-primary"
        },
        {
            icon: BarChart3,
            title: "Smart Analytics",
            subtitle: "Identify your weak points instantly.",
            color: "text-blue-500"
        },
        {
            icon: Trophy,
            title: "Gamified Learning",
            subtitle: "Earn streaks and badges as you learn.",
            color: "text-orange-500"
        },
        {
            icon: BookOpen,
            title: "Expert Materials",
            subtitle: "Curated by top university students.",
            color: "text-purple-500"
        }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setCurrentSlide((curr) => (curr + 1) % slides.length);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 50); // 5 seconds per slide roughly
        }
        return () => clearInterval(interval);
    }, [isPlaying, slides.length]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative w-full h-full bg-black/90 flex flex-col overflow-hidden group select-none">
            {/* Main Screen Area */}
            <div className="flex-1 relative flex items-center justify-center">
                {/* Background Animation */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:30px_30px]" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-center z-10 flex flex-col items-center"
                    >
                        {(() => {
                            const SlideIcon = slides[currentSlide].icon;
                            return (
                                <>
                                    <div className={`p-6 rounded-full bg-white/5 backdrop-blur-sm mb-6 ${isPlaying ? 'animate-pulse' : ''} ring-1 ring-white/10`}>
                                        <SlideIcon className={`w-16 h-16 ${slides[currentSlide].color}`} />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                        {slides[currentSlide].title}
                                    </h3>
                                    <p className="text-white/60 text-lg md:text-xl font-medium">
                                        {slides[currentSlide].subtitle}
                                    </p>
                                </>
                            );
                        })()}
                    </motion.div>
                </AnimatePresence>

                {/* Big Play Button Overlay (When Paused) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayPause}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_-5px_var(--primary)] text-black pl-2"
                        >
                            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                        </motion.button>
                        <p className="absolute bottom-1/3 text-white/50 text-sm font-bold tracking-widest uppercase animate-pulse">
                            Click to Preview
                        </p>
                    </div>
                )}
            </div>

            {/* Video Controls Bar */}
            <div className={`h-16 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end px-6 pb-4 transition-opacity duration-300 ${!isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden cursor-pointer">
                    <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${((currentSlide * 100) + progress) / slides.length}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                        <button onClick={handlePlayPause} className="hover:text-primary transition-colors">
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                        </button>
                        <button
                            onClick={() => {
                                setProgress(0);
                                setCurrentSlide((prev) => (prev + 1) % slides.length);
                            }}
                            className="hover:text-primary transition-colors"
                        >
                            <SkipForward className="w-5 h-5 fill-current" />
                        </button>

                        <div className="text-xs font-mono text-white/60 space-x-1">
                            <span>0{currentSlide + 1}:00</span>
                            <span>/</span>
                            <span>0{slides.length}:00</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 group/vol cursor-pointer">
                            <Volume2 className="w-5 h-5" />
                            <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                <div className="w-16 h-1 bg-white/20 rounded-full ml-2">
                                    <div className="w-[70%] h-full bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                        <Maximize2 className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
