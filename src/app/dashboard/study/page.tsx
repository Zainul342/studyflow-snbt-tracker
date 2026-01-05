import { HierarchyTree } from "@/components/tracking/hierarchy-tree";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StudyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-0 uppercase">Peta Materi</h1>
          <p className="text-sm text-zinc-400">Pilih subtes di bawah untuk mulai mencentang progressmu.</p>
        </div>
      </div>

      <HierarchyTree />
    </div>
  );
}
