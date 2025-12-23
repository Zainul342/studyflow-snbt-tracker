"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Timer, Sparkles } from "lucide-react";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
    description?: string;
}

export function ComingSoonModal({ isOpen, onClose, featureName, description }: ComingSoonModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-card border border-border rounded-lg shadow-2xl p-6 overflow-hidden"
                    >
                        {/* Background Gradient */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight mb-2 text-foreground">
                                {featureName}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {description || "We're cooking this up right now! Check back soon for updates."}
                            </p>

                            <div className="bg-muted/50 rounded-sm p-4 flex items-center gap-3 border border-border">
                                <Timer className="w-5 h-5 text-primary" />
                                <div className="text-sm">
                                    <span className="font-bold text-foreground block">ETA: Coming Soon</span>
                                    <span className="text-muted-foreground">Follow updates on our socials.</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
