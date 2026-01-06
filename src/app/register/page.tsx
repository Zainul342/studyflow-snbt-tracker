"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterPage() {
    const router = useRouter();
    const { signInWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 1. Create User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Update Profile Name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            // 3. Create Firestore Document
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: email,
                displayName: name,
                createdAt: Date.now(),
                role: "student",
                stats: {
                    level: 1,
                    xp: 0,
                    streak: 0
                },
                targetPTN: null,
                targetMajor: null,
                onboardingCompleted: false
            });

            // 4. Redirect
            router.push("/onboarding");
        } catch (err: any) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email is already registered.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Registration failed. Please try again.");
            }
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError("");
        try {
            await signInWithGoogle();
            router.push("/onboarding");
        } catch (err: unknown) {
            console.error("Google Sign-In Error:", err);
            // Show more specific error messages
            const firebaseError = err as { code?: string; message?: string };
            if (firebaseError.code === "auth/unauthorized-domain") {
                setError("Domain tidak ter-authorize. Tambahkan domain ini di Firebase Console.");
            } else if (firebaseError.code === "auth/popup-blocked") {
                setError("Popup diblokir. Izinkan popup untuk login dengan Google.");
            } else if (firebaseError.code === "auth/cancelled-popup-request") {
                setError("Login dibatalkan. Silakan coba lagi.");
            } else if (firebaseError.code === "auth/network-request-failed") {
                setError("Koneksi gagal. Periksa internet Anda.");
            } else {
                setError(`Google Sign-In failed: ${firebaseError.code || firebaseError.message || "Unknown error"}`);
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFFF0B] selection:text-black flex items-center justify-center relative overflow-hidden">

            {/* 1. Interactive Void Background (Matches Login) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid-white opacity-10 bg-[length:50px_50px]" />
                {/* The "Heartbeat" Glow - Slightly more Lime heavily for Register */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-900/10 blur-[120px] rounded-full mix-blend-screen"
                />
            </div>

            {/* 2. The Glass Monolith */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative z-10 w-full max-w-[420px] p-6 md:p-10 mx-4"
            >
                {/* Monolith Card */}
                <div className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]" />

                {/* Content Container */}
                <div className="relative z-20 space-y-8">

                    {/* A. Vibe Header */}
                    <div className="text-center space-y-2">
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 mb-4 whitespace-nowrap overflow-hidden"
                        >
                            <ShieldCheck className="w-3 h-3 text-[#BFFF0B]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#BFFF0B]">
                                Langkah Pertama
                            </span>
                        </motion.div>
                        <h1 className="text-3xl md:text-3xl font-black text-white tracking-tight">
                            Ambil Kendali<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BFFF0B] to-emerald-500">
                                Mimpimu.
                            </span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium">
                            Satu akun untuk atur semua kekacauan belajar.
                        </p>
                    </div>

                    {/* B. Tactile Forms */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}
                        <AuthInput
                            label="Nama Panggilan"
                            type="text"
                            placeholder="Zampir"
                            icon={User}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <AuthInput
                            label="Email Aktif"
                            type="email"
                            placeholder="pejuang@studyflow.id"
                            icon={Mail}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <AuthInput
                            label="Password Rahasia"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            isPassword
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* C. Action Area */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full h-12 bg-[#BFFF0B] hover:bg-[#BFFF0B] text-black font-bold uppercase tracking-widest rounded-sm group relative overflow-hidden transition-all"
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isLoading ? "Proses..." : "Gas Mulai Belajar"}
                                    {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                {/* Glitch/Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Button>
                        </div>

                        {/* Social Auth (Added to match Login) */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0A0A0A] px-2 text-zinc-700 font-bold tracking-widest">
                                    Or Continue With
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="w-full h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-sm font-medium text-xs uppercase tracking-wide flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fillRule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fillRule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fillRule="evenodd"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fillRule="evenodd"
                                />
                            </svg>
                            Google Account
                        </Button>


                        {/* Disclaimer */}
                        <p className="text-[10px] text-zinc-600 text-center px-4 leading-relaxed">
                            By initiating protocol, you agree to our <span className="text-zinc-400 hover:text-white cursor-pointer underline">Terms</span> and <span className="text-zinc-400 hover:text-white cursor-pointer underline">Privacy Policy</span>.
                        </p>
                    </form>

                    {/* D. The Switch */}
                    <div className="text-center pt-2 relative">
                        <div className="absolute top-0 left-10 right-10 border-t border-white/5" />
                        <div className="pt-6">
                            <Link href="/login" className="group">
                                <span className="text-zinc-500 text-xs">Already have clearance? </span>
                                <span className="text-[#BFFF0B] font-bold text-xs uppercase tracking-wide group-hover:text-white transition-colors border-b border-transparent group-hover:border-white">
                                    Access System
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENT: AuthInput (Local Reused)
// ----------------------------------------------------------------------

function AuthInput({
    label,
    type = "text",
    placeholder,
    icon: Icon,
    isPassword = false,
    value,
    onChange
}: {
    label: string,
    type?: string,
    placeholder: string,
    icon: any,
    isPassword?: boolean,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="group/input space-y-1.5">
            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1 group-focus-within/input:text-[#BFFF0B] transition-colors">
                {label}
            </label>
            <div className="relative transform group-focus-within/input:scale-[1.01] transition-transform duration-300">
                {/* Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                </div>

                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full h-12 bg-black/40 border border-white/10 rounded-sm pl-11 pr-12 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#BFFF0B] focus:bg-black/60 transition-all font-medium"
                />

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}

                {/* Corner Light Indicator */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#BFFF0B] opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#BFFF0B] opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
            </div>
        </div>
    );
}
