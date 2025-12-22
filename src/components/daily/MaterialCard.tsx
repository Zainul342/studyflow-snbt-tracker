import { MaterialContent } from "@/data/daily-content";
import { FileText, ExternalLink } from 'lucide-react';

interface MaterialCardProps {
    content: MaterialContent;
}

export function MaterialCard({ content }: MaterialCardProps) {
    return (
        <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all"
        >
            <div className="p-3 bg-zinc-800 rounded-md group-hover:bg-zinc-700 transition-colors">
                <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {content.fileType === 'pdf' ? 'Dokumen PDF' : 'Materi Pembelajaran'}
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5 truncate max-w-[200px]">
                    {content.url}
                </p>
            </div>
            <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </a>
    );
}
