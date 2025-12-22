export type ContentType = 'VIDEO' | 'QUIZ' | 'MATERIAL';

export interface QuizContent {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface VideoContent {
    videoId: string; // YouTube ID
    platform: 'youtube';
    duration?: string;
}

export interface MaterialContent {
    url: string; // Drive link or direct PDF
    fileType: 'pdf' | 'doc' | 'link';
}

export interface DailyItem {
    id: string;
    date: string; // ISO Date YYYY-MM-DD
    type: ContentType;
    title: string;
    description?: string;
    tags?: string[];
    content: QuizContent | VideoContent | MaterialContent;
    completed?: boolean; // User progress (local state for now)
}

export const mockDailyData: DailyItem[] = [
    {
        id: 'd1',
        date: new Date().toISOString().split('T')[0],
        type: 'QUIZ',
        title: 'Latihan Soal PU - Silogisme',
        description: 'Tentukan simpulan yang paling tepat dari premis yang diberikan.',
        tags: ['Penalaran Umum', 'Logika'],
        content: {
            question: 'Semua mamalia bernapas dengan paru-paru. Ikan paus adalah mamalia. Jadi...',
            options: [
                'Ikan paus bernapas dengan insang.',
                'Ikan paus bernapas dengan paru-paru.',
                'Semua yang bernapas dengan paru-paru adalah ikan paus.',
                'Ikan paus tidak bernapas.',
                'Sebagian mamalia bernapas dengan insang.'
            ],
            correctAnswerIndex: 1,
            explanation: 'Karena Ikan Paus adalah mamalia, dan semua mamalia bernapas dengan paru-paru, maka Ikan Paus bernapas dengan paru-paru (Modus Ponens).'
        }
    },
    {
        id: 'd2',
        date: new Date().toISOString().split('T')[0],
        type: 'VIDEO',
        title: 'Pembahasan Trik Cepat PPU',
        description: 'Video pembahasan soal PPU tipe HOTS durasi 5 menit.',
        tags: ['PPU', 'Video Pembahasan'],
        content: {
            videoId: 'dQw4w9WgXcQ', // Placeholder Link
            platform: 'youtube',
            duration: '05:00'
        }
    },
    {
        id: 'd3',
        date: new Date().toISOString().split('T')[0],
        type: 'MATERIAL',
        title: 'Ringkasan Materi Sejarah SNBT',
        description: 'Link ke dokumen ringkasan materi Kerajaan Hindu-Buddha.',
        tags: ['Literasi', 'Sejarah'],
        content: {
            url: 'https://docs.google.com/document/d/1ExampleDriveLink',
            fileType: 'link'
        }
    }
];
