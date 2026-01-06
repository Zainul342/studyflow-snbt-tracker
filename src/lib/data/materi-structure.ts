// Data seed lengkap dari spreadsheet TTL - 7 Subtes SNBT
// Total: 93 Submateri (berdasarkan spreadsheet)

export const SUBTES_STRUCTURE = [
    {
        id: "pu",
        name: "Penalaran Umum",
        code: "PU",
        description: "Tes Penalaran Umum",
        order: 1,
        materi: [
            {
                id: "pu-logika-dasar",
                name: "Logika Dasar",
                order: 1,
                submateri: [
                    { id: "pu-ld-1", name: "Logika Matematika (Dasar)", order: 1 },
                    { id: "pu-ld-2", name: "Proposisi, Kalimat Terbuka/Tertutup", order: 2 },
                    { id: "pu-ld-3", name: "Logika Kuantor, Operasi Logika", order: 3 }
                ]
            },
            {
                id: "pu-penalaran-deduktif",
                name: "Penalaran Deduktif",
                order: 2,
                submateri: [
                    { id: "pu-pd-1", name: "Silogisme", order: 4 },
                    { id: "pu-pd-2", name: "Modus Ponens", order: 5 },
                    { id: "pu-pd-3", name: "Modus Tollens", order: 6 },
                    { id: "pu-pd-4", name: "Memperkuat/Memperlemah Argumen", order: 7 },
                    { id: "pu-pd-5", name: "Evaluasi Bukti", order: 8 },
                    { id: "pu-pd-6", name: "Simpulan", order: 9 }
                ]
            },
            {
                id: "pu-penalaran-induktif",
                name: "Penalaran Induktif",
                order: 3,
                submateri: [
                    { id: "pu-pi-1", name: "Generalisasi", order: 10 },
                    { id: "pu-pi-2", name: "Analogi", order: 11 },
                    { id: "pu-pi-3", name: "Hubungan Kausalitas", order: 12 }
                ]
            },
            {
                id: "pu-penalaran-kuantitatif",
                name: "Penalaran Kuantitatif",
                order: 4,
                submateri: [
                    { id: "pu-pk-1", name: "Teori dan Jenis Bilangan", order: 13 },
                    { id: "pu-pk-2", name: "Sifat-sifat Bilangan", order: 14 },
                    { id: "pu-pk-3", name: "Statistik Dasar", order: 15 },
                    { id: "pu-pk-4", name: "Grafik/Tabel", order: 16 },
                    { id: "pu-pk-5", name: "Soal Cerita", order: 17 },
                    { id: "pu-pk-6", name: "Peluang Dasar dan Pencacahan", order: 18 },
                    { id: "pu-pk-7", name: "Barisan dan Deret", order: 19 },
                    { id: "pu-pk-8", name: "Persentase", order: 20 },
                    { id: "pu-pk-9", name: "Diskon dan Bunga Bank", order: 21 }
                ]
            }
        ]
    },
    {
        id: "pbm-ppu",
        name: "Pemahaman Bacaan dan Menulis / Pengetahuan dan Pemahaman Umum",
        code: "PBM/PPU",
        description: "Gabungan PBM dan PPU",
        order: 2,
        materi: [
            {
                id: "pbm-ejaan",
                name: "Ejaan",
                order: 1,
                submateri: [
                    { id: "pbm-ejaan-1", name: "Huruf Kapital dan Ejaan (EYD V)", order: 1 },
                    { id: "pbm-ejaan-2", name: "Tanda Baca", order: 2 },
                    { id: "pbm-ejaan-3", name: "Makna Imbuhan", order: 3 }
                ]
            },
            {
                id: "pbm-konjungsi-partikel",
                name: "Konjungsi dan Partikel",
                order: 2,
                submateri: [
                    { id: "pbm-kp-1", name: "Preposisi", order: 4 },
                    { id: "pbm-kp-2", name: "Kata hubung/Konjungsi", order: 5 },
                    { id: "pbm-kp-3", name: "Partikel dan Bentuk Terikat", order: 6 }
                ]
            },
            {
                id: "pbm-pembentukan-kata",
                name: "Pembentukan Kata",
                order: 3,
                submateri: [
                    { id: "pbm-pk-1", name: "Bentuk/Jenis Kata", order: 7 },
                    { id: "pbm-pk-2", name: "Kata Baku dan Tidak Baku", order: 8 }
                ]
            },
            {
                id: "ppu-makna-kata",
                name: "Makna Kata",
                order: 4,
                submateri: [
                    { id: "ppu-mk-1", name: "Penggunaan Istillah/Kata", order: 9 },
                    { id: "ppu-mk-2", name: "Perubahan Makna Kata", order: 10 },
                    { id: "ppu-mk-3", name: "Makna Bertingkat/Hierarkis", order: 11 }
                ]
            },
            {
                id: "pbm-frasa-klausa",
                name: "Frasa dan Klausa",
                order: 5,
                submateri: [
                    { id: "pbm-fk-1", name: "Kata Berpasangan", order: 12 },
                    { id: "pbm-fk-2", name: "Frasa/Kelompok Kata", order: 13 },
                    { id: "pbm-fk-3", name: "Klausa", order: 14 }
                ]
            },
            {
                id: "pbm-struktur-kalimat",
                name: "Struktur Kalimat",
                order: 6,
                submateri: [
                    { id: "pbm-sk-1", name: "Struktur Kalimat/Tata Kalimat", order: 15 },
                    { id: "pbm-sk-2", name: "Jenis Kalimat", order: 16 },
                    { id: "pbm-sk-3", name: "Hubungan Antar Kalimat", order: 17 }
                ]
            },
            {
                id: "ppu-aplikasi-kalimat",
                name: "Aplikasi Kalimat",
                order: 7,
                submateri: [
                    { id: "ppu-ak-1", name: "Semantik/Tata Makna", order: 18 },
                    { id: "ppu-ak-2", name: "Kalimat Majemuk", order: 19 },
                    { id: "ppu-ak-3", name: "Transformasi Kalimat", order: 20 },
                    { id: "ppu-ak-4", name: "Inti Kalimat", order: 21 },
                    { id: "pbm-ak-5", name: "Kalimat Efektif/Tidak Efektif", order: 22 },
                    { id: "pbm-ak-6", name: "Kalimat Sumbang", order: 23 },
                    { id: "ppu-ak-7", name: "Kelogisan Kalimat", order: 24 }
                ]
            },
            {
                id: "ppu-paragraf",
                name: "Paragraf",
                order: 8,
                submateri: [
                    { id: "ppu-paragraf-1", name: "Hubungan Antar Kalimat", order: 25 },
                    { id: "ppu-paragraf-2", name: "Kepaduan paragraf", order: 26 },
                    { id: "ppu-paragraf-3", name: "Kalimat Utama dalam Teks", order: 27 }
                ]
            },
            {
                id: "ppu-bacaan",
                name: "Bacaan",
                order: 9,
                submateri: [
                    { id: "ppu-bacaan-1", name: "Tema dan Topik", order: 28 },
                    { id: "ppu-bacaan-2", name: "Gagasan/Ide Pokok", order: 29 },
                    { id: "ppu-bacaan-3", name: "Ungkapan", order: 30 }
                ]
            },
            {
                id: "ppu-bahasa-panda",
                name: "Bahasa Panda",
                order: 10,
                submateri: [
                    { id: "ppu-bp-1", name: "Bahasa Hipotesis", order: 31 }
                ]
            }
        ]
    },
    {
        id: "pk-pm",
        name: "Pengetahuan Kuantitatif / Penalaran Matematika",
        code: "PK/PM",
        description: "Gabungan PK dan PM",
        order: 3,
        materi: [
            {
                id: "pkpm-operasi-dasar",
                name: "Operasi Matematika Dasar",
                order: 1,
                submateri: [
                    { id: "pkpm-od-1", name: "Operasi MTK Dasar (PEMDAS)", order: 1 },
                    { id: "pkpm-od-2", name: "Operasi Pecahan, Desimal, Persentase", order: 2 },
                    { id: "pkpm-od-3", name: "Sistem Koordinat", order: 3 }
                ]
            },
            {
                id: "pm-bilangan",
                name: "Bilangan",
                order: 2,
                isPM: true,
                submateri: [
                    { id: "pm-bil-1", name: "Teori dan Jenis Bilangan", order: 4 },
                    { id: "pm-bil-2", name: "Sifat-sifat Bilangan", order: 5 },
                    { id: "pm-bil-3", name: "KPK, FPB dan Aplikasinya", order: 6 }
                ]
            },
            {
                id: "pk-aljabar-dasar",
                name: "Aljabar Dasar",
                order: 3,
                isPK: true,
                submateri: [
                    { id: "pk-aj-1", name: "Operasi Aljabar Sederhana", order: 7 },
                    { id: "pk-aj-2", name: "Penyederhanaan, Faktorisasi, Distribusi Aljabar", order: 8 }
                ]
            },
            {
                id: "pm-aljabar-lanjut",
                name: "Aljabar Lanjut",
                order: 4,
                isPM: true,
                submateri: [
                    { id: "pm-aj-1", name: "Persamaan Aljabar", order: 9 },
                    { id: "pm-aj-2", name: "Pertidaksamaan Aljabar", order: 10 }
                ]
            },
            {
                id: "pm-perbandingan",
                name: "Perbandingan",
                order: 5,
                isPM: true,
                submateri: [
                    { id: "pm-perband-1", name: "Konsep Perbandingan", order: 11 }
                ]
            },
            {
                id: "pk-akar-pangkat-log",
                name: "Akar, Pangkat, Logaritma",
                order: 6,
                isPK: true,
                submateri: [
                    { id: "pk-apl-1", name: "Akar dan Eksponen", order: 12 },
                    { id: "pk-apl-2", name: "Logaritma*", order: 13, isAdvanced: true }
                ]
            },
            {
                id: "pk-himpunan-fungsi",
                name: "Himpunan, Fungsi dan Persamaan Garis",
                order: 7,
                isPK: true,
                submateri: [
                    { id: "pk-hf-1", name: "Himpunan", order: 14 },
                    { id: "pk-hf-2", name: "Persamaan Garis Lurus", order: 15 },
                    { id: "pk-hf-3", name: "Fungsi, Relasi, Komposisi, Invers", order: 16 },
                    { id: "pk-hf-4", name: "Persamaan dan Fungsi Kuadrat", order: 17 }
                ]
            },
            {
                id: "pm-sistem-persamaan",
                name: "Sistem Persamaan",
                order: 8,
                isPM: true,
                submateri: [
                    { id: "pm-sp-1", name: "SPLDV/SPLTV", order: 18 },
                    { id: "pm-sp-2", name: "Persamaan Berbentuk Flowchart", order: 19 }
                ]
            },
            {
                id: "pm-geometri",
                name: "Geometri",
                order: 9,
                isPM: true,
                submateri: [
                    { id: "pm-geo-1", name: "Kesebangunan dan Bangun Datar Kompleks", order: 20 }
                ]
            },
            {
                id: "pk-geometri",
                name: "Geometri PK",
                order: 10,
                isPK: true,
                submateri: [
                    { id: "pk-geo-1", name: "Sudut dan Operasi Sudut", order: 21 },
                    { id: "pk-geo-2", name: "Sifat Bangun Datar dan Ruang", order: 22 },
                    { id: "pk-geo-3", name: "Trigonometri Dasar", order: 23 },
                    { id: "pk-geo-4", name: "Dimensi Tiga", order: 24, isAdvanced: true }
                ]
            },
            {
                id: "pm-geometri-lanjut",
                name: "Geometri Lanjut",
                order: 11,
                isPM: true,
                submateri: [
                    { id: "pm-geo-l-1", name: "Jarak Titik, Garis dan Bidang", order: 25, isAdvanced: true },
                    { id: "pm-geo-l-2", name: "Bangun Datar, Luas dan Keliling", order: 26, isAdvanced: true },
                    { id: "pm-geo-l-3", name: "Bangun Ruang, Luas dan Volume", order: 27, isAdvanced: true }
                ]
            },
            {
                id: "pkpm-statistik-peluang",
                name: "Statistika dan Peluang",
                order: 12,
                submateri: [
                    { id: "pkpm-sp-1", name: "Statistik Dasar dan Penyajian Data", order: 28 },
                    { id: "pm-sp-2", name: "Penyebaran Data/Tendensi Sentral", order: 29, isPM: true },
                    { id: "pkpm-sp-3", name: "Peluang Dasar dan Pencacahan", order: 30 },
                    { id: "pm-sp-4", name: "Peluang Kejadian, Kombinasi, Permutasi", order: 31, isPM: true }
                ]
            },
            {
                id: "pkpm-barisan-deret",
                name: "Barisan dan Deret",
                order: 13,
                submateri: [
                    { id: "pkpm-bd-1", name: "Barisan-Deret Aritmatika", order: 32 },
                    { id: "pkpm-bd-2", name: "Barisan-Deret Geometri", order: 33 },
                    { id: "pkpm-bd-3", name: "Deret Tak Hingga", order: 34 }
                ]
            },
            {
                id: "pm-aritmatika-sosial",
                name: "Aritmatika Sosial",
                order: 14,
                isPM: true,
                submateri: [
                    { id: "pm-as-1", name: "Aritmatika Sosial", order: 35 },
                    { id: "pm-as-2", name: "Bunga dan Diskon", order: 36 }
                ]
            },
            {
                id: "pk-matriks-transformasi",
                name: "Matriks dan Transformasi",
                order: 15,
                isPK: true,
                submateri: [
                    { id: "pk-mt-1", name: "Matriks*", order: 37, isAdvanced: true },
                    { id: "pk-mt-2", name: "Transformasi Geometri*", order: 38, isAdvanced: true }
                ]
            },
            {
                id: "pk-kalkulus",
                name: "Kalkulus",
                order: 16,
                isPK: true,
                submateri: [
                    { id: "pk-kalk-1", name: "Limit/Turunan Dasar*", order: 39, isAdvanced: true }
                ]
            }
        ]
    },
    {
        id: "lbind",
        name: "Literasi Bahasa Indonesia",
        code: "LBI",
        description: "Literasi dalam Bahasa Indonesia",
        order: 4,
        materi: [
            {
                id: "lbind-semua",
                name: "Semua Materi LBI",
                order: 1,
                submateri: [
                    { id: "lbind-1", name: "Menentukan tema dan unsur teks", order: 1 },
                    { id: "lbind-2", name: "Struktur Teks", order: 2 },
                    { id: "lbind-3", name: "Makna Implisit dan Eksplisit", order: 3 },
                    { id: "lbind-4", name: "Mencari Info Relevan", order: 4 },
                    { id: "lbind-5", name: "Menyimpulkan Isi bacaan", order: 5 },
                    { id: "lbind-6", name: "Unsur Teks Eksplanatif", order: 6 },
                    { id: "lbind-7", name: "Tema dan Nilai Teks Sastra", order: 7 },
                    { id: "lbind-8", name: "Menilai dan Menghubungkan Informasi", order: 8 }
                ]
            }
        ]
    },
    {
        id: "lbeng",
        name: "Literasi Bahasa Inggris",
        code: "LBE",
        description: "Literasi dalam Bahasa Inggris",
        order: 5,
        materi: [
            {
                id: "lbeng-semua",
                name: "Semua Materi LBE",
                order: 1,
                submateri: [
                    { id: "lbeng-1", name: "Topic and Main Idea", order: 1 },
                    { id: "lbeng-2", name: "Conclusion", order: 2 },
                    { id: "lbeng-3", name: "Summary of Passage", order: 3 },
                    { id: "lbeng-4", name: "Specific Information", order: 4 },
                    { id: "lbeng-5", name: "Finding Detail Info", order: 5 },
                    { id: "lbeng-6", name: "Purpose of the Text", order: 6 },
                    { id: "lbeng-7", name: "Author's Tone/Attitude", order: 7 },
                    { id: "lbeng-8", name: "Writer's motive", order: 8 },
                    { id: "lbeng-9", name: "Synonym and Antonym", order: 9 },
                    { id: "lbeng-10", name: "Word's meaning", order: 10 },
                    { id: "lbeng-11", name: "Contextual Meaning", order: 11 },
                    { id: "lbeng-12", name: "Reference and Inference", order: 12 },
                    { id: "lbeng-13", name: "Restating sentences/phrases", order: 13 },
                    { id: "lbeng-14", name: "True/false statement", order: 14 },
                    { id: "lbeng-15", name: "Detailing Facts", order: 15 },
                    { id: "lbeng-16", name: "Comparing two texts", order: 16 },
                    { id: "lbeng-17", name: "Text structure", order: 17 }
                ]
            }
        ]
    }
];

// Helper functions
export const getTotalSubmateriCount = (): number => {
    let count = 0;
    SUBTES_STRUCTURE.forEach(subtes => {
        subtes.materi.forEach(materi => {
            count += materi.submateri.length;
        });
    });
    return count; // Should be 93
};

export const getSubtesById = (id: string) => {
    return SUBTES_STRUCTURE.find(subtes => subtes.id === id);
};

export const getMateriById = (id: string) => {
    for (const subtes of SUBTES_STRUCTURE) {
        for (const materi of subtes.materi) {
            if (materi.id === id) return materi;
        }
    }
    return null;
};

export const getSubmateriById = (id: string) => {
    for (const subtes of SUBTES_STRUCTURE) {
        for (const materi of subtes.materi) {
            for (const submateri of materi.submateri) {
                if (submateri.id === id) return submateri;
            }
        }
    }
    return null;
};

// Untuk seeding database
export const getAllSubmateri = () => {
    const allSubmateri: Array<{
        id: string;
        name: string;
        materiId: string;
        subtesId: string;
        order: number;
        isAdvanced?: boolean;
        isPK?: boolean;
        isPM?: boolean;
    }> = [];

    SUBTES_STRUCTURE.forEach(subtes => {
        subtes.materi.forEach(materi => {
            materi.submateri.forEach(submateri => {
                allSubmateri.push({
                    id: submateri.id,
                    name: submateri.name,
                    materiId: materi.id,
                    subtesId: subtes.id,
                    order: submateri.order,
                    isAdvanced: (submateri as any).isAdvanced || false,
                    isPK: (materi as any).isPK || false,
                    isPM: (materi as any).isPM || false
                });
            });
        });
    });

    return allSubmateri;
};