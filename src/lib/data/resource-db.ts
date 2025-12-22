export type ResourceType = 'video' | 'pdf' | 'thread' | 'web';
export type Platform = 'youtube' | 'drive' | 'twitter' | 'website' | 'other';

export interface Resource {
    id: string;
    type: ResourceType;
    title: string;
    url: string;
    platform: Platform;
    description?: string;
}

export interface DailyMission {
    day: number;
    date: string;
    subtest: string; // e.g., "PU", "PK", "LBE"
    topic: string;
    description: string;
    resources: Resource[];
}

export const MISSION_DATA: DailyMission[] = [
    {
        day: 15,
        date: "Senin, 15 Desember 2025",
        subtest: "PK/PM",
        topic: "FUNDAMENTAL MTK (Operasi Bilangan & Pecahan)",
        description: "Menghabiskan soal-soal yang belum terselesaikan di day 11-13, atau latsol sepuasnya di web TTL.",
        resources: [
            {
                id: "d15-1",
                type: "web",
                title: "Latihan Soal Web TTL",
                url: "https://teamtanpales.id",
                platform: "website",
                description: "Pilih menu operasi bilangan, kerjakan 20 soal dengan waktu seminimal mungkin."
            }
        ]
    },
    {
        day: 16,
        date: "Selasa, 16 Desember 2025",
        subtest: "Lit. Bahasa Inggris",
        topic: "Topic and Main Idea, Conclusion, Summary",
        description: "Materi dan Latsol Literasi Bahasa Inggris. Fokus pada pemahaman bacaan.",
        resources: [
            // Playlist
            { id: "d16-v1", type: "video", title: "Video Materi 1", url: "https://youtu.be/acvtozNHiV8", platform: "youtube" },
            { id: "d16-v2", type: "video", title: "Video Materi 2", url: "https://youtu.be/mRMAUKfvBmE", platform: "youtube" },
            { id: "d16-v3", type: "video", title: "Video Materi 3", url: "https://youtu.be/sJNttdP-NcY", platform: "youtube" },
            { id: "d16-v4", type: "video", title: "Video Materi 4", url: "https://youtu.be/CHXEKGjAy9E", platform: "youtube" },
            // Threads
            { id: "d16-t1", type: "thread", title: "Materi & Latsol 1", url: "https://x.com/journreis/status/1648292038243414016", platform: "twitter" },
            { id: "d16-t2", type: "thread", title: "Materi & Latsol 2", url: "https://x.com/forpsikoUI/status/1835191853781483981", platform: "twitter" },
            { id: "d16-t3", type: "thread", title: "Materi & Latsol 3", url: "https://x.com/ceuramah/status/1886596480435413135", platform: "twitter" },
            { id: "d16-t4", type: "thread", title: "Materi & Latsol 4", url: "https://x.com/nalately/status/1766464983364477121", platform: "twitter" },
            { id: "d16-t5", type: "thread", title: "Materi & Latsol 5", url: "https://x.com/nalately/status/1763672319539769678", platform: "twitter" },
            { id: "d16-t6", type: "thread", title: "Materi & Latsol 6", url: "https://x.com/studytwtnaara/status/1831554634076582256", platform: "twitter" },
        ]
    },
    {
        day: 17,
        date: "Rabu, 17 Desember 2025",
        subtest: "LBE",
        topic: "Drilling Vocab & Reading Articles",
        description: "Drilling vocab Oxford 3000/5000 dan membaca artikel berita internasional.",
        resources: [
            { id: "d17-d1", type: "pdf", title: "Oxford 5000 Vocab", url: "https://drive.google.com/file/d/1lDyL7sqsgFXNmGbbE7TvsMcAbM11Qxc_/view", platform: "drive" },
            { id: "d17-d2", type: "pdf", title: "Oxford 3000 Vocab", url: "https://drive.google.com/file/d/1lAh6uSuqBVT0mmtuyqz16oG0turOE5r3/view", platform: "drive" },
            { id: "d17-w1", type: "web", title: "CNN News", url: "https://cnn.com", platform: "website" },
            { id: "d17-w2", type: "web", title: "BBC News", url: "https://bbc.com", platform: "website" },
        ]
    },
    {
        day: 18,
        date: "Kamis, 18 Desember 2025",
        subtest: "PU",
        topic: "Penalaran Deduktif (Modus Ponens, Tollens, Silogisme)",
        description: "Mempelajari logika dasar penarikan kesimpulan.",
        resources: [
            // Materi
            { id: "d18-w1", type: "web", title: "Blog Zenius: Silogisme", url: "https://www.zenius.net/blog/apa-itu-silogisme-ponens-tollens", platform: "website" },
            { id: "d18-t1", type: "thread", title: "Materi Twitter 1", url: "https://x.com/airaasafeplaces/status/1822956830445957274", platform: "twitter" },
            { id: "d18-t2", type: "thread", title: "Materi Twitter 2", url: "https://x.com/SkulingID/status/1826923083795697837", platform: "twitter" },
            { id: "d18-t3", type: "thread", title: "Materi Twitter 3", url: "https://x.com/rasya_belajar/status/1780949237527982515", platform: "twitter" },
            // Playlist
            { id: "d18-v1", type: "video", title: "Video Pembahasan 1", url: "https://www.youtube.com/watch?v=qS-Jweiz4fc", platform: "youtube" },
            { id: "d18-v2", type: "video", title: "Video Pembahasan 2", url: "https://youtu.be/NQU36fApM3E", platform: "youtube" },
            { id: "d18-v3", type: "video", title: "Video Pembahasan 3", url: "https://youtu.be/0oc3gL0V-N4", platform: "youtube" },
            { id: "d18-v4", type: "video", title: "Video Pembahasan 4", url: "https://youtu.be/60QAJ6C0zSk", platform: "youtube" },
            // Latsol
            { id: "d18-t4", type: "thread", title: "Latsol Thread", url: "https://x.com/nalately/status/1764030763056730479", platform: "twitter" },
            { id: "d18-d1", type: "pdf", title: "Latsol Drive 1", url: "https://drive.google.com/file/d/1Z2J28Ir6FYEC0Uwzq8HcoaOtyT31SgNo/view", platform: "drive" },
        ]
    },
    {
        day: 19,
        date: "Jumat, 19 Desember 2025",
        subtest: "PU",
        topic: "Memperkuat/Memperlemah Pernyataan",
        description: "Evaluasi bukti dan simpulan dalam argumen.",
        resources: [
            { id: "d19-w1", type: "web", title: "Quipper Blog", url: "https://www.quipper.com/id/blog/masuk-ptn/argumentasi-tps-penalaran-umum/", platform: "website" },
            { id: "d19-t1", type: "thread", title: "Materi Thread 1", url: "https://x.com/638873hra/status/1871531142303863236", platform: "twitter" },
            { id: "d19-v1", type: "video", title: "Video Materi 1", url: "https://youtu.be/9GFUeiCiH6M", platform: "youtube" },
            { id: "d19-v2", type: "video", title: "Video Materi 2", url: "https://youtu.be/Y-YUodLlaec", platform: "youtube" },
        ]
    },
    {
        day: 20,
        date: "Sabtu, 20 Desember 2025",
        subtest: "PU",
        topic: "Review & Latsol Logika Dasar",
        description: "Full latihan soal logika dasar dan penalaran deduktif.",
        resources: [
            { id: "d20-d1", type: "pdf", title: "Latsol Logika Folder 1", url: "https://drive.google.com/drive/folders/1Cj1lx7c03aNGrIuencqjSpzaZRCiGxjQ", platform: "drive" },
            { id: "d20-d2", type: "pdf", title: "Latsol Logika Folder 2", url: "https://drive.google.com/drive/folders/1-X716ziFi0hCYYANJ8YBvCqLAtDrYv9w", platform: "drive" },
            { id: "d20-v1", type: "video", title: "Pembahasan Logika Video", url: "https://youtu.be/yJL6gK_jqkI", platform: "youtube" },
            { id: "d20-t1", type: "thread", title: "Latsol Deduktif Thread", url: "https://x.com/wookieehuftt/status/1860504434310299776", platform: "twitter" },
        ]
    },
    {
        day: 21,
        date: "Minggu, 21 Desember 2025",
        subtest: "Rest",
        topic: "Istirahat / Tryout / Review",
        description: "Review materi, kerjakan TO, atau istirahat total.",
        resources: []
    }
];
