"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'TO 1', score: 520 },
    { name: 'TO 2', score: 580 },
    { name: 'TO 3', score: 550 },
    { name: 'TO 4', score: 630 },
];

export function TryoutChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
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
                        domain={[400, 1000]}
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
