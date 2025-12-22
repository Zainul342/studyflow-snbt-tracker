import { DailyItem } from "@/data/daily-content";
import { VideoCard } from "./VideoCard";
import { QuizCard } from "./QuizCard";
import { MaterialCard } from "./MaterialCard";
import { Badge } from "@/components/ui/badge"; // Assuming Shadcn/Radix likely exists or I'll use standard tailwind
import { CalendarDays, Video, BrainCircuit, FileText } from 'lucide-react';

interface DailyFeedProps {
    items: DailyItem[];
}

export function DailyFeed({ items }: DailyFeedProps) {
    return (
        <div className="space-y-8">
            {items.map((item) => (
                <div key={item.id} className="bg-zinc-950 border border-white/5 rounded-xl p-6 shadow-sm hover:border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${item.type === 'VIDEO' ? 'bg-red-500/10 text-red-400' :
                                    item.type === 'QUIZ' ? 'bg-blue-500/10 text-blue-400' :
                                        'bg-yellow-500/10 text-yellow-400'
                                }`}>
                                {item.type === 'VIDEO' && <Video className="w-5 h-5" />}
                                {item.type === 'QUIZ' && <BrainCircuit className="w-5 h-5" />}
                                {item.type === 'MATERIAL' && <FileText className="w-5 h-5" />}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <CalendarDays className="w-3 h-3" />
                                    <span>{item.date}</span>
                                    <span>•</span>
                                    <span>{item.tags?.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-zinc-400 text-sm mb-6">{item.description}</p>

                    <div className="pl-0 md:pl-4 border-l-2 border-zinc-900 md:border-l-0">
                        {/* Content Switching Logic */}
                        {item.type === 'VIDEO' && item.content && 'platform' in item.content && (
                            <VideoCard content={item.content} />
                        )}
                        {item.type === 'QUIZ' && item.content && 'question' in item.content && (
                            <QuizCard content={item.content} />
                        )}
                        {item.type === 'MATERIAL' && item.content && 'url' in item.content && (
                            <MaterialCard content={item.content} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
