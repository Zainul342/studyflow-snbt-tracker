"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute inset-0 bg-grid-white opacity-[0.02] bg-[length:50px_50px]" />

                {/* Loading Pulse */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-full bg-[#BFFF0B]/10 border border-[#BFFF0B]/20 flex items-center justify-center"
                    >
                        <Activity className="w-8 h-8 text-[#BFFF0B]" />
                    </motion.div>

                    <div className="text-center space-y-1">
                        <h2 className="text-white font-black uppercase tracking-widest text-sm">
                            System Initializing
                        </h2>
                        <p className="text-zinc-600 text-[10px] uppercase tracking-wider font-mono">
                            Verifying Credentials...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
