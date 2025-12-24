import { DailyFeed } from "@/components/daily/DailyFeed";
import { mockDailyData } from "@/data/daily-content";
import { Zap } from 'lucide-react';

export default function DailyPage() {
    return (
        <div className="bg-black text-white p-4 md:p-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3 md:gap-4 uppercase tracking-tight">
                            <Zap className="w-7 h-7 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
                            Latihan Harian
                        </h1>
                        <p className="text-zinc-400 mt-2 text-sm md:text-lg">
                            Tantangan harianmu untuk menjaga konsistensi belajar.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-zinc-300">Live Updates</span>
                    </div>
                </div>

                {/* Content Feed */}
                <DailyFeed items={mockDailyData} />

            </div>
        </div>
    );
}
