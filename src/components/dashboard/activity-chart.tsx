"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const data = [
    { name: "Mon", hours: 4.5 },
    { name: "Tue", hours: 6.2 },
    { name: "Wed", hours: 3.8 },
    { name: "Thu", hours: 7.5 },
    { name: "Fri", hours: 5.0 },
    { name: "Sat", hours: 8.4 },
    { name: "Sun", hours: 6.5 },
];

export function ActivityChart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 group bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:border-white/10 transition-all duration-300 min-h-[350px] flex flex-col justify-between"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <TrendingUp className="w-6 h-6 text-[#BFFF0B]" />
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold">Aktivitas Belajar</h3>
                        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">7 Hari Terakhir</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white">41.9 jam</div>
                    <p className="text-[#BFFF0B] text-xs font-bold uppercase tracking-wider">+12% vs minggu lalu</p>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#BFFF0B" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#BFFF0B" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                            }}
                            itemStyle={{ color: '#BFFF0B', fontWeight: 'bold' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="hours"
                            stroke="#BFFF0B"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorHours)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
