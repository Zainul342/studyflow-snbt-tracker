"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { mockDB } from "@/lib/data/mock-db";
import { Sparkles, Target } from "lucide-react";

export default function DashboardPage() {
    const [userName, setUserName] = useState("Student");

    useEffect(() => {
        const profile = mockDB.getProfile();
        if (profile?.name) {
            const firstName = profile.name.split(" ")[0];
            setUserName(firstName);
        }
    }, []);

    return (
        <div className="flex flex-col gap-10 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B4FFF]/10 border border-[#6B4FFF]/20 mb-4">
                        <Target size={12} className="text-[#6B4FFF]" />
                        <span className="text-[10px] font-black text-[#6B4FFF] uppercase tracking-wider">Operational Status: Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                        Command <span className="text-[#6B4FFF]">Center</span>
                    </h1>
                    <p className="text-zinc-500 text-lg font-medium">
                        Welcome back, <span className="text-white font-bold">{userName}</span>. The battlefield is ready.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl backdrop-blur-sm">
                    <Sparkles size={16} className="text-[#BFFF0B]" />
                    <span className="text-sm font-bold text-zinc-300">SNBT 2026 Strategy</span>
                </div>
            </motion.div>

            <StatsGrid />
        </div>
    );
}
