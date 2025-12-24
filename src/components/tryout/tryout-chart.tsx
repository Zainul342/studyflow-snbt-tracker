"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TryoutChart({ data }: { data?: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-zinc-800 rounded-sm">
                <p className="text-zinc-500 text-sm">Belum ada data grafik.</p>
            </div>
        );
    }

    // Format data for chart
    // We want chronological order
    const chartData = data.map((item, index) => ({
        name: `TO ${index + 1}`,
        score: item.score,
        date: item.date, // optional context
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#71717a"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#71717a"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                        domain={[0, 1000]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#09090b',
                            border: '1px solid #27272a',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '12px'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#BFFF0B"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#09090b', stroke: '#BFFF0B', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#BFFF0B' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
