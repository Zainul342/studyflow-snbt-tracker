import { SUBTES_STRUCTURE } from "@/lib/data/materi-structure";
import { UserProgressMap } from "@/lib/data/mock-db";

export interface ProgressStats {
    totalItems: number;
    completedItems: number;
    globalPercentage: number;
    subtesStats: Record<string, {
        name: string;
        total: number;
        completed: number;
        percentage: number;
    }>;
}

export function calculateProgress(progressMap: UserProgressMap): ProgressStats {
    const stats: ProgressStats = {
        totalItems: 0,
        completedItems: 0,
        globalPercentage: 0,
        subtesStats: {}
    };

    // Iterate through structure to count total possible checkboxes vs checked ones
    SUBTES_STRUCTURE.forEach(subtes => {
        let subtesTotal = 0;
        let subtesCompleted = 0;

        subtes.materi.forEach(materi => {
            materi.submateri.forEach(sub => {
                // Each submateri has 3 checkpoints: Belajar, Latsol, Review
                // We count each as 1 point
                const totalPoints = 3;
                subtesTotal += totalPoints;

                const userP = progressMap[sub.id];
                if (userP) {
                    if (userP.belajar) subtesCompleted++;
                    if (userP.latsol) subtesCompleted++;
                    if (userP.review) subtesCompleted++;
                }
            });
        });

        stats.totalItems += subtesTotal;
        stats.completedItems += subtesCompleted;

        stats.subtesStats[subtes.id] = {
            name: subtes.name,
            total: subtesTotal,
            completed: subtesCompleted,
            percentage: subtesTotal === 0 ? 0 : Math.round((subtesCompleted / subtesTotal) * 100)
        };
    });

    stats.globalPercentage = stats.totalItems === 0
        ? 0
        : Math.round((stats.completedItems / stats.totalItems) * 100);

    return stats;
}
