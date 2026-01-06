/**
 * Comprehensive PTN (Perguruan Tinggi Negeri) and Major Data
 * For use in onboarding and settings forms
 */

// Top PTN organized by tier/popularity
export const PTN_LIST = [
    // Tier 1 - Top 10 National
    "Universitas Indonesia (UI)",
    "Institut Teknologi Bandung (ITB)",
    "Universitas Gadjah Mada (UGM)",
    "Institut Pertanian Bogor (IPB)",
    "Institut Teknologi Sepuluh Nopember (ITS)",
    "Universitas Airlangga (UNAIR)",
    "Universitas Padjadjaran (UNPAD)",
    "Universitas Diponegoro (UNDIP)",
    "Universitas Brawijaya (UB)",
    "Universitas Hasanuddin (UNHAS)",

    // Tier 2 - Strong Regional
    "Universitas Sumatera Utara (USU)",
    "Universitas Sebelas Maret (UNS)",
    "Universitas Andalas (UNAND)",
    "Universitas Sriwijaya (UNSRI)",
    "Universitas Udayana (UNUD)",
    "Universitas Pendidikan Indonesia (UPI)",
    "Universitas Negeri Yogyakarta (UNY)",
    "Universitas Negeri Jakarta (UNJ)",
    "Universitas Negeri Malang (UM)",
    "Universitas Negeri Semarang (UNNES)",

    // Tier 3 - Specialized & Regional
    "Universitas Jenderal Soedirman (UNSOED)",
    "Universitas Lampung (UNILA)",
    "Universitas Riau (UNRI)",
    "Universitas Syiah Kuala (USK)",
    "Universitas Negeri Surabaya (UNESA)",
    "Universitas Negeri Medan (UNIMED)",
    "Universitas Negeri Padang (UNP)",
    "Universitas Negeri Makassar (UNM)",
    "Universitas Tanjungpura (UNTAN)",
    "Universitas Mulawarman (UNMUL)",

    // Tier 4 - Other Notable PTN
    "Universitas Jember (UNEJ)",
    "Universitas Mataram (UNRAM)",
    "Universitas Bengkulu (UNIB)",
    "Universitas Jambi (UNJA)",
    "Universitas Palangka Raya (UPR)",
    "Universitas Lambung Mangkurat (ULM)",
    "Universitas Sam Ratulangi (UNSRAT)",
    "Universitas Cenderawasih (UNCEN)",
    "Universitas Nusa Cendana (UNDANA)",
    "Universitas Halu Oleo (UHO)",

    // Politeknik & Institut Khusus
    "Politeknik Negeri Jakarta (PNJ)",
    "Politeknik Negeri Bandung (POLBAN)",
    "Politeknik Elektronika Negeri Surabaya (PENS)",
    "Institut Seni Indonesia Yogyakarta (ISI Yogya)",
    "Institut Seni Indonesia Denpasar (ISI Denpasar)",
    "Sekolah Tinggi Akuntansi Negara (STAN)",
    "Institut Pemerintahan Dalam Negeri (IPDN)",
    "Sekolah Tinggi Ilmu Statistik (STIS)",
] as const;

// Popular majors organized by field
export const POPULAR_MAJORS = [
    // Kesehatan
    "Kedokteran",
    "Kedokteran Gigi",
    "Farmasi",
    "Keperawatan",
    "Kesehatan Masyarakat",
    "Gizi",

    // Teknik
    "Teknik Informatika",
    "Teknik Elektro",
    "Teknik Mesin",
    "Teknik Sipil",
    "Teknik Kimia",
    "Teknik Industri",
    "Sistem Informasi",
    "Arsitektur",

    // MIPA
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Statistika",
    "Ilmu Komputer",

    // Ekonomi & Bisnis
    "Manajemen",
    "Akuntansi",
    "Ekonomi Pembangunan",
    "Ilmu Ekonomi",
    "Bisnis Digital",

    // Hukum & Sosial
    "Ilmu Hukum",
    "Ilmu Komunikasi",
    "Hubungan Internasional",
    "Ilmu Politik",
    "Administrasi Publik",
    "Psikologi",
    "Sosiologi",

    // Pendidikan
    "Pendidikan Guru SD (PGSD)",
    "Pendidikan Matematika",
    "Pendidikan Bahasa Inggris",
    "Pendidikan Bahasa Indonesia",

    // Pertanian & Kehutanan
    "Agribisnis",
    "Agroteknologi",
    "Teknologi Pangan",
    "Kehutanan",
    "Perikanan",

    // Seni & Humaniora
    "Sastra Inggris",
    "Sastra Indonesia",
    "Desain Komunikasi Visual",
    "Desain Interior",
    "Seni Rupa",
] as const;

// Short names for display (optional)
export const PTN_SHORT_NAMES: Record<string, string> = {
    "Universitas Indonesia (UI)": "UI",
    "Institut Teknologi Bandung (ITB)": "ITB",
    "Universitas Gadjah Mada (UGM)": "UGM",
    "Institut Pertanian Bogor (IPB)": "IPB",
    "Institut Teknologi Sepuluh Nopember (ITS)": "ITS",
    "Universitas Airlangga (UNAIR)": "UNAIR",
    "Universitas Padjadjaran (UNPAD)": "UNPAD",
    "Universitas Diponegoro (UNDIP)": "UNDIP",
    "Universitas Brawijaya (UB)": "UB",
    "Universitas Hasanuddin (UNHAS)": "UNHAS",
};

export type PTNName = typeof PTN_LIST[number];
export type MajorName = typeof POPULAR_MAJORS[number];
