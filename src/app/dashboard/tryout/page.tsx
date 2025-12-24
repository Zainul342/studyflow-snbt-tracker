"use client";

import { useState } from "react";
import { Plus, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTryoutDialog } from "@/components/tryout/add-tryout-dialog";
import { TryoutHistory } from "@/components/tryout/tryout-history";
import { TryoutChart } from "@/components/tryout/tryout-chart";

export default function TryoutPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase">Tryout Tracker</h1>
                    <p className="text-zinc-400">Pantau perkembangan nilai TO kamu dari berbagai platform.</p>
                </div>
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-[#BFFF0B] text-black hover:bg-[#BFFF0B]/90 font-bold"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Input Nilai TO
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard label="Rata-rata Skor" value="643" trend="+12" icon={TrendingUp} color="text-[#BFFF0B]" />
                <StatsCard label="Total Tryout" value="4" trend="Kali" icon={Calendar} color="text-blue-400" />
                <StatsCard label="Target PTN" value="720" trend="Gap: -77" icon={TrendingUp} color="text-pink-400" />
            </div>

            {/* Chart Section */}
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-6">
                <h3 className="text-lg font-bold text-white mb-6">Grafik Progress</h3>
                <TryoutChart />
            </div>

            {/* History List */}
            <div className="w-full">
                <h3 className="text-lg font-bold text-white mb-4">Riwayat TO</h3>
                <TryoutHistory />
            </div>

            <AddTryoutDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </div>
    );
}

function StatsCard({ label, value, trend, icon: Icon, color }: any) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">{label}</p>
                    <h2 className="text-3xl font-black text-white">{value}</h2>
                </div>
                <div className={`p-2 rounded-sm bg-white/5 ${color}`}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-2">
                <span className={color}>{trend}</span> dari TO terakhir
            </p>
        </div>
    );
}
