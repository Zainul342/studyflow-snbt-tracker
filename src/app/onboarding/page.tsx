"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Target, Calendar, Award, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDB } from "@/lib/data/mock-db";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// PTN List
const PTN_LIST = [
    "ITB", "UI", "UGM", "ITS", "IPB", "UNPAD", "UNDIP", "UNAIR",
    "UB", "UNHAS", "USU", "UNSRI", "UNAND", "UNS", "UDAYANA"
];

interface FormErrors {
    name?: string;
    targetUniversity?: string;
    targetMajor?: string;
    targetDate?: string;
}

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState({
        name: "", // Usually passed from auth, but kept for standalone feel
        targetUniversity: "",
        targetMajor: "",
        targetDate: "2026-05-01",
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validasi Nama
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            newErrors.name = "ID Required";
        }

        // Validasi PTN
        if (!formData.targetUniversity) {
            newErrors.targetUniversity = "Target Required";
        }

        // Validasi Jurusan
        const trimmedMajor = formData.targetMajor.trim();
        if (!trimmedMajor) {
            newErrors.targetMajor = "Major Required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate network delay & calibration
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Calculate dynamic daily goal logic (retained)
        const targetDate = new Date(formData.targetDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const totalSubmateri = 93;
        const dailyGoal = daysRemaining > 0
            ? Math.ceil(totalSubmateri / daysRemaining)
            : totalSubmateri;

        try {
            // 4. Save to Firestore
            if (user?.uid) {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    displayName: formData.name.trim(), // Update name definition if changed
                    targetPTN: formData.targetUniversity,
                    targetMajor: formData.targetMajor.trim(),
                    targetDate: formData.targetDate,
                    "stats.dailyGoal": dailyGoal
                });
            }

            router.push("/dashboard");
        } catch (error) {
            console.error("Error saving profile:", error);
            // Optionally set an error state here
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFFF0B] selection:text-black flex items-center justify-center relative overflow-hidden">

            {/* 1. Interactive Void Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-white opacity-10 bg-[length:50px_50px]" />
                <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen"
                />
            </div>

            {/* 2. The Glass Monolith */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="relative z-10 w-full max-w-[480px] p-6 md:p-10 mx-4"
            >
                {/* Monolith Card */}
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl" />

                {/* Content Container */}
                <div className="relative z-20 space-y-8">

                    {/* A. Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-indigo-500/10 border border-indigo-500/20 mb-4">
                            <Sparkles className="w-3 h-3 text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                Langkah Terakhir
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-3xl font-black text-white uppercase tracking-tighter">
                            Set<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Target
                            </span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium">
                            Kita mulai dari akhir. Mau masuk mana?
                        </p>
                    </div>

                    {/* B. Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                Kode Nama (Display Name)
                            </label>
                            <div className="relative group/input">
                                <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Zampir"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 bg-black/40 border border-white/10 rounded-sm pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 focus:bg-black/60 transition-all font-medium"
                                />
                                {errors.name && <span className="text-[10px] text-red-500 absolute -bottom-4 right-0">{errors.name}</span>}
                            </div>
                        </div>

                        {/* PTN Selection */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                PTN Impian
                            </label>
                            <div className="relative group/select">
                                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within/select:text-indigo-400 transition-colors z-10" />
                                <select
                                    value={formData.targetUniversity}
                                    onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                                    className="w-full h-12 bg-black/40 border border-white/10 rounded-sm pl-11 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-black/60 transition-all font-medium appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="bg-[#1A1A1A] text-zinc-500">Pilih Kampus...</option>
                                    {PTN_LIST.map(ptn => (
                                        <option key={ptn} value={ptn} className="bg-[#1A1A1A] text-white">{ptn}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
                                {errors.targetUniversity && <span className="text-[10px] text-red-500 absolute -bottom-4 right-0">{errors.targetUniversity}</span>}
                            </div>
                        </div>

                        {/* Major Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                Jurusan (Prodi)
                            </label>
                            <div className="relative group/input">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors font-black text-xs">
                                    M
                                </div>
                                <input
                                    type="text"
                                    placeholder="Contoh: Teknik Informatika"
                                    value={formData.targetMajor}
                                    onChange={(e) => setFormData({ ...formData, targetMajor: e.target.value })}
                                    className="w-full h-12 bg-black/40 border border-white/10 rounded-sm pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 focus:bg-black/60 transition-all font-medium"
                                />
                                {errors.targetMajor && <span className="text-[10px] text-red-500 absolute -bottom-4 right-0">{errors.targetMajor}</span>}
                            </div>
                        </div>

                        {/* Date Input */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                                Tanggal Perang (UTBK)
                            </label>
                            <div className="relative group/input">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors" />
                                <input
                                    type="date"
                                    value={formData.targetDate}
                                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                    className="w-full h-12 bg-black/40 border border-white/10 rounded-sm pl-11 pr-4 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 focus:bg-black/60 transition-all font-medium [color-scheme:dark]"
                                />
                            </div>
                        </div>


                        {/* Action Button */}
                        <div className="pt-4">
                            <Button
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest rounded-sm group relative overflow-hidden transition-all border border-indigo-400/20"
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? "Menyiapkan Markas..." : "Masuk Dashboard"}
                                    {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Button>
                        </div>

                    </form>
                </div>
            </motion.div>
        </div>
    );
}
