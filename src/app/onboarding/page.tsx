"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDB } from "@/lib/data/mock-db";

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
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState({
        name: "",
        targetUniversity: "",
        targetMajor: "",
        targetDate: "2026-05-01",
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validasi Nama
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            newErrors.name = "Nama tidak boleh kosong";
        } else if (trimmedName.length < 3) {
            newErrors.name = "Nama minimal 3 karakter";
        } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
            newErrors.name = "Nama hanya boleh berisi huruf dan spasi";
        }

        // Validasi PTN
        if (!formData.targetUniversity) {
            newErrors.targetUniversity = "Pilih target PTN Anda";
        }

        // Validasi Jurusan
        const trimmedMajor = formData.targetMajor.trim();
        if (!trimmedMajor) {
            newErrors.targetMajor = "Jurusan tidak boleh kosong";
        } else if (trimmedMajor.length < 2) {
            newErrors.targetMajor = "Jurusan minimal 2 karakter";
        }

        // Validasi Tanggal
        const selectedDate = new Date(formData.targetDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const oneYearFromNow = new Date(today);
        oneYearFromNow.setFullYear(today.getFullYear() + 1);

        if (selectedDate < today) {
            newErrors.targetDate = "Tanggal tidak boleh di masa lalu";
        } else if (selectedDate > oneYearFromNow) {
            newErrors.targetDate = "⚠️ Tanggal lebih dari 1 tahun dari sekarang";
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

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Calculate dynamic daily goal
        const targetDate = new Date(formData.targetDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Total submateri from structure (should be 93)
        const totalSubmateri = 93; // Could also use: getTotalSubmateriCount() if imported

        // Calculate daily goal (minimum 1 to avoid division issues)
        const dailyGoal = daysRemaining > 0
            ? Math.ceil(totalSubmateri / daysRemaining)
            : totalSubmateri; // If date is today, need to complete all

        mockDB.saveProfile({
            name: formData.name.trim(),
            targetUniversity: formData.targetUniversity,
            targetMajor: formData.targetMajor.trim(),
            targetDate: formData.targetDate,
            dailyGoalHours: dailyGoal,
        });

        router.push("/dashboard");
        setIsLoading(false);
    };

    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
        if (errors.name) {
            setErrors({ ...errors, name: undefined });
        }
    };

    const handleMajorChange = (value: string) => {
        setFormData({ ...formData, targetMajor: value });
        if (errors.targetMajor) {
            setErrors({ ...errors, targetMajor: undefined });
        }
    };

    const handleDateChange = (value: string) => {
        setFormData({ ...formData, targetDate: value });
        if (errors.targetDate) {
            setErrors({ ...errors, targetDate: undefined });
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700">
                            <Sparkles className="w-5 h-5 text-[#ccff00]" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2">Setup Your Profile</h1>
                        <p className="text-zinc-500 text-sm">
                            StudyFlow optimizes your SNBT preparation based on your personal goals.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-zinc-400">
                                Full Name *
                            </Label>
                            <Input
                                id="name"
                                placeholder="Zainul Mutaqin"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className={`bg-zinc-950/50 border-zinc-800 focus:border-[#ccff00] h-12 text-lg ${errors.name ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                            />
                            {errors.name && (
                                <div id="name-error" role="alert" className="flex items-center gap-2 text-red-400 text-xs mt-1">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Target PTN Field */}
                            <div className="space-y-2">
                                <Label htmlFor="univ" className="text-xs uppercase tracking-wider text-zinc-400">
                                    Target PTN *
                                </Label>
                                <Select
                                    value={formData.targetUniversity}
                                    onValueChange={(value) => {
                                        setFormData({ ...formData, targetUniversity: value });
                                        setErrors({ ...errors, targetUniversity: undefined });
                                    }}
                                >
                                    <SelectTrigger className={`bg-zinc-950/50 border-zinc-800 ${errors.targetUniversity ? "border-red-500" : ""
                                        }`}>
                                        <SelectValue placeholder="Pilih PTN" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        {PTN_LIST.map((ptn) => (
                                            <SelectItem
                                                key={ptn}
                                                value={ptn}
                                                className="text-white hover:bg-zinc-800 cursor-pointer"
                                            >
                                                {ptn}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.targetUniversity && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{errors.targetUniversity}</span>
                                    </div>
                                )}
                            </div>

                            {/* Jurusan Field */}
                            <div className="space-y-2">
                                <Label htmlFor="major" className="text-xs uppercase tracking-wider text-zinc-400">
                                    Jurusan *
                                </Label>
                                <Input
                                    id="major"
                                    placeholder="Informatika"
                                    value={formData.targetMajor}
                                    onChange={(e) => handleMajorChange(e.target.value)}
                                    className={`bg-zinc-950/50 border-zinc-800 ${errors.targetMajor ? "border-red-500 focus:border-red-500" : ""
                                        }`}
                                />
                                {errors.targetMajor && (
                                    <div className="flex items-center gap-1 text-red-400 text-xs">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{errors.targetMajor}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Target Date Field */}
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-xs uppercase tracking-wider text-zinc-400">
                                Target Date (SNBT) *
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.targetDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className={`bg-zinc-950/50 border-zinc-800 ${errors.targetDate ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                            />
                            {errors.targetDate && (
                                <div className={`flex items-center gap-2 text-xs mt-1 ${errors.targetDate.includes("⚠️") ? "text-yellow-400" : "text-red-400"
                                    }`}>
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.targetDate}</span>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#ccff00] text-black hover:bg-[#b0dd00] font-bold tracking-tight text-base mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Configuring..." : "Launch Dashboard"}
                            {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
