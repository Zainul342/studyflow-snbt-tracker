import { HierarchyTree } from "@/components/tracking/hierarchy-tree";

export default function StudyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase">Peta Materi</h1>
        <p className="text-zinc-400">Pilih subtes di bawah untuk mulai mencentang progressmu.</p>
      </div>

      <HierarchyTree />
    </div>
  );
}
