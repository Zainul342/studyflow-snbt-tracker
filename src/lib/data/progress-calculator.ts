// Replikasi exact formula dari spreadsheet TTL

export interface ProgressData {
    belajar: boolean;
    latsol: boolean;
    review: boolean;
}

export interface SubtesProgress {
    subtesId: string;
    belajarPercentage: number;
    latsolPercentage: number;
    reviewPercentage: number;
    averagePercentage: number;
}

export function calculateSubtesProgress(
    submateriProgress: ProgressData[]
): SubtesProgress {
    const total = submateriProgress.length;

    const belajarCount = submateriProgress.filter(p => p.belajar).length;
    const latsolCount = submateriProgress.filter(p => p.latsol).length;
    const reviewCount = submateriProgress.filter(p => p.review).length;

    const belajarPercentage = total > 0 ? (belajarCount / total) * 100 : 0;
    const latsolPercentage = total > 0 ? (latsolCount / total) * 100 : 0;
    const reviewPercentage = total > 0 ? (reviewCount / total) * 100 : 0;

    const averagePercentage = (belajarPercentage + latsolPercentage + reviewPercentage) / 3;

    return {
        subtesId: '',
        belajarPercentage: parseFloat(belajarPercentage.toFixed(2)),
        latsolPercentage: parseFloat(latsolPercentage.toFixed(2)),
        reviewPercentage: parseFloat(reviewPercentage.toFixed(2)),
        averagePercentage: parseFloat(averagePercentage.toFixed(2))
    };
}

// Replicate exact spreadsheet formula for Dasbor
export function calculateDasborProgress(allSubtesProgress: SubtesProgress[]) {
    if (allSubtesProgress.length === 0) return 0;

    // Sama seperti spreadsheet: =average(H15:H21)
    const averageOfAverages = allSubtesProgress.reduce(
        (sum, progress) => sum + progress.averagePercentage,
        0
    ) / allSubtesProgress.length;

    return parseFloat(averageOfAverages.toFixed(2));
}

// Untuk PK/PM yang dipisah
export function calculatePKPMProgress(
    pkProgress: ProgressData[],
    pmProgress: ProgressData[]
) {
    return {
        pk: calculateSubtesProgress(pkProgress),
        pm: calculateSubtesProgress(pmProgress)
    };
}