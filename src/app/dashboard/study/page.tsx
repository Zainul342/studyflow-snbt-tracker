import { HierarchyTree } from "@/components/tracking/hierarchy-tree";

export default function StudyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Materi Tracker</h1>
        <p className="text-zinc-400">Track your learning progress across all 7 Subtes SNBT.</p>
      </div>

      <HierarchyTree />
    </div>
  );
}
