"use client";

import { motion } from "framer-motion";
import {
    Home,
    BookOpen,
    BarChart2,
    Target,
    Settings,
    MoreHorizontal,
    Bell,
    Search
} from "lucide-react";

export function DashboardPreview() {
    return (
        <div className="w-full h-full bg-background text-foreground rounded-xl overflow-hidden shadow-2xl border border-border flex text-[10px] md:text-xs">
            {/* Sidebar */}
            <div className="w-48 bg-card border-r border-border p-4 flex flex-col hidden sm:flex">
                <div className="mb-8 font-black text-lg tracking-tighter">StudyFlow</div>

                <div className="space-y-1">
                    <NavItem icon={Home} label="Overview" active />
                    <NavItem icon={BookOpen} label="Materi" />
                    <NavItem icon={BarChart2} label="Progress" />
                    <NavItem icon={Target} label="Tryout" />
                </div>

                <div className="mt-auto space-y-1">
                    <NavItem icon={Settings} label="Settings" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-background">
                {/* Header */}
                <div className="h-14 border-b border-border flex items-center justify-between px-6">
                    <div className="text-muted-foreground font-medium">Mission Control</div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <Bell className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    </div>
                </div>

                {/* Dashboard Scroll Area */}
                <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
                    {/* Welcome Banner */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Selamat Pagi, Zain 👋</h2>
                            <p className="text-muted-foreground">Target: <span className="text-foreground">UI - Ilkom</span></p>
                        </div>
                        <div className="bg-primary text-black font-bold px-3 py-1.5 rounded-sm flex items-center gap-2">
                            Lanjut Belajar
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="grid grid-cols-3 gap-4 h-40">
                        <div className="col-span-2 bg-card rounded-lg border border-border p-4 flex flex-col">
                            <div className="flex justify-between mb-4">
                                <span className="font-bold">Weekly Focus</span>
                                <span className="text-muted-foreground">Last 7 Days</span>
                            </div>
                            <div className="flex-1 flex items-end gap-2 px-2">
                                {[40, 65, 30, 85, 55, 90, 45].map((h, i) => (
                                    <div key={i} className="flex-1 bg-muted rounded-sm relative group">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-primary/50 to-primary rounded-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card rounded-lg border border-border p-4">
                            <span className="font-bold block mb-4">Progress</span>
                            <div className="space-y-4">
                                <ProgressBar label="PU" value={78} color="#BFFF0B" />
                                <ProgressBar label="PPU" value={62} color="#6B4FFF" />
                                <ProgressBar label="PBM" value={45} color="#EC4899" />
                            </div>
                        </div>
                    </div>

                    {/* Recent Items */}
                    <div className="space-y-3">
                        <div className="bg-card p-3 rounded-lg border border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-sm bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">PU</div>
                                <div>
                                    <div className="font-bold">Penalaran Umum</div>
                                    <div className="text-muted-foreground text-[10px]">Subtest 1 • 12 Materi</div>
                                </div>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Overlay Vignette for "Preview" feel */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
            </div>
        </div>
    );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer ${active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <Icon className="w-4 h-4" />
            <span className="font-medium text-[10px]">{label}</span>
        </div>
    );
}

function ProgressBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-[10px] font-bold">{label}</span>
                <span className="text-[10px] text-muted-foreground">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
}
