import { VideoContent } from "@/data/daily-content";

interface VideoCardProps {
    content: VideoContent;
}

export function VideoCard({ content }: VideoCardProps) {
    return (
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black border border-white/10 shadow-lg">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${content.videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
