import { Question } from '../types/quiz';

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-pu-001',
    subjectId: 'pu', // Penalaran Umum
    topicId: 'pu-penalaran-deduktif', // Silogisme
    content: `
      <p>Semua mamalia bernapas dengan paru-paru. Paus adalah mamalia.</p>
      <p>Kesimpulan yang paling tepat adalah...</p>
    `,
    options: [
      { id: 'A', content: 'Paus bernapas dengan insang', isCorrect: false },
      { id: 'B', content: 'Paus bernapas dengan paru-paru', isCorrect: true },
      { id: 'C', content: 'Sebagian paus bernapas dengan paru-paru', isCorrect: false },
      { id: 'D', content: 'Paus bukan mamalia', isCorrect: false },
      { id: 'E', content: 'Semua hewan laut bernapas dengan paru-paru', isCorrect: false },
    ],
    explanation: `
      <p><strong>Analisis:</strong></p>
      <ul>
        <li>Premis 1 (Mayor): Semua M adalah P (Semua mamalia bernapas dengan paru-paru)</li>
        <li>Premis 2 (Minor): S adalah M (Paus adalah mamalia)</li>
        <li>Kesimpulan: S adalah P (Paus bernapas dengan paru-paru)</li>
      </ul>
      <p>Ini adalah bentuk silogisme kategorik standar (Modus Barbara).</p>
    `,
    difficulty: 'easy',
    type: 'multiple-choice',
    tags: ['silogisme', 'deduktif'],
    createdAt: new Date(),
  },
  {
    id: 'q-ppu-001',
    subjectId: 'pbm-ppu',
    topicId: 'ppu-makna-kata',
    content: `
      <p>Kata "radikal" dalam kalimat tersebut memiliki makna...</p>
      <blockquote class="border-l-4 border-gray-500 pl-4 italic">
        "Perubahan iklim menuntut langkah-langkah radikal dari pemerintah."
      </blockquote>
    `,
    options: [
      { id: 'A', content: 'Keras dan kasar', isCorrect: false },
      { id: 'B', content: 'Mendasar dan menyeluruh', isCorrect: true },
      { id: 'C', content: 'Beraneka ragam', isCorrect: false },
      { id: 'D', content: 'Sangat cepat', isCorrect: false },
      { id: 'E', content: 'Berbahaya', isCorrect: false },
    ],
    explanation: `
      <p>Dalam konteks kalimat ini, <strong>radikal</strong> bermakna "secara menyeluruh; habis-habisan; mendasar".</p>
      <p>Pemerintah diminta mengambil langkah yang menyelesaikan akar masalah, bukan hanya permukaan.</p>
    `,
    difficulty: 'medium',
    type: 'multiple-choice',
    tags: ['semantik', 'makna-kata'],
    createdAt: new Date(),
  },
  {
    id: 'q-pk-001',
    subjectId: 'pk-pm',
    topicId: 'pk-aljabar-dasar',
    content: `
      <p>Jika $x + 2y = 10$ dan $x - y = 4$, maka nilai dari $x \cdot y$ adalah...</p>
    `,
    options: [
      { id: 'A', content: '10', isCorrect: false },
      { id: 'B', content: '12', isCorrect: true },
      { id: 'C', content: '14', isCorrect: false },
      { id: 'D', content: '16', isCorrect: false },
      { id: 'E', content: '18', isCorrect: false },
    ],
    explanation: `
      <p><strong>Langkah Penyelesaian:</strong></p>
      <ol>
        <li>Eliminasi x:<br>
          (x + 2y = 10)<br>
          (x - y = 4)  -<br>
          --------------<br>
          3y = 6 &rarr; y = 2
        </li>
        <li>Substitusi y ke pers. 2:<br>
          x - 2 = 4 &rarr; x = 6
        </li>
        <li>Hitung x . y:<br>
          6 * 2 = 12
        </li>
      </ol>
    `,
    difficulty: 'medium',
    type: 'multiple-choice',
    tags: ['aljabar', 'spldv'],
    createdAt: new Date(),
  },
  {
    id: 'q-pu-002',
    subjectId: 'pu',
    topicId: 'pu-penalaran-induktif',
    content: `
      <p>Perhatikan pola berikut:</p>
      <ul>
        <li>Semua bunga mawar di taman ini berwarna merah.</li>
        <li>Bunga yang saya petik dari taman ini adalah bunga mawar.</li>
      </ul>
      <p>Kesimpulan yang paling tepat adalah...</p>
    `,
    options: [
      { id: 'A', content: 'Semua bunga di taman ini berwarna merah', isCorrect: false },
      { id: 'B', content: 'Bunga yang saya petik berwarna merah', isCorrect: true },
      { id: 'C', content: 'Tidak ada bunga kuning di taman ini', isCorrect: false },
      { id: 'D', content: 'Bunga mawar selalu berwarna merah', isCorrect: false },
      { id: 'E', content: 'Taman ini hanya berisi bunga mawar', isCorrect: false },
    ],
    explanation: `
      <p><strong>Analisis:</strong></p>
      <p>Dari premis pertama, kita tahu semua mawar di taman berwarna merah.</p>
      <p>Dari premis kedua, bunga yang dipetik adalah mawar dari taman tersebut.</p>
      <p>Maka, bunga yang dipetik pasti berwarna merah.</p>
    `,
    difficulty: 'easy',
    type: 'multiple-choice',
    tags: ['silogisme', 'deduktif'],
    createdAt: new Date(),
  },
  {
    id: 'q-pk-002',
    subjectId: 'pk-pm',
    topicId: 'pk-geometri',
    content: `
      <p>Sebuah segitiga sama sisi memiliki keliling 36 cm. Berapakah luas segitiga tersebut?</p>
    `,
    options: [
      { id: 'A', content: '36√3 cm²', isCorrect: true },
      { id: 'B', content: '48√3 cm²', isCorrect: false },
      { id: 'C', content: '24√3 cm²', isCorrect: false },
      { id: 'D', content: '12√3 cm²', isCorrect: false },
      { id: 'E', content: '72√3 cm²', isCorrect: false },
    ],
    explanation: `
      <p><strong>Penyelesaian:</strong></p>
      <ol>
        <li>Keliling = 3s = 36 → s = 12 cm</li>
        <li>Luas segitiga sama sisi = (s² × √3) / 4</li>
        <li>= (144 × √3) / 4 = 36√3 cm²</li>
      </ol>
    `,
    difficulty: 'medium',
    type: 'multiple-choice',
    tags: ['geometri', 'luas'],
    createdAt: new Date(),
  },
  {
    id: 'q-ppu-002',
    subjectId: 'pbm-ppu',
    topicId: 'ppu-paragraf',
    content: `
      <p>Bacalah paragraf berikut!</p>
      <blockquote class="border-l-4 border-gray-500 pl-4 italic">
        "Meskipun teknologi AI berkembang pesat, peran manusia tetap tidak tergantikan. Kreativitas, empati, dan kemampuan berpikir kritis adalah keunggulan manusia yang sulit ditiru mesin. Oleh karena itu, pendidikan harus fokus mengembangkan soft skills."
      </blockquote>
      <p>Gagasan utama paragraf tersebut adalah...</p>
    `,
    options: [
      { id: 'A', content: 'AI akan menggantikan semua pekerjaan manusia', isCorrect: false },
      { id: 'B', content: 'Pendidikan harus fokus pada pengembangan soft skills manusia', isCorrect: true },
      { id: 'C', content: 'Teknologi AI berkembang sangat pesat', isCorrect: false },
      { id: 'D', content: 'Mesin tidak memiliki kreativitas', isCorrect: false },
      { id: 'E', content: 'Manusia lebih baik dari mesin', isCorrect: false },
    ],
    explanation: `
      <p><strong>Analisis:</strong></p>
      <p>Kalimat utama berada di akhir paragraf: "pendidikan harus fokus mengembangkan soft skills."</p>
      <p>Kalimat sebelumnya mendukung gagasan bahwa kemampuan manusia yang unik perlu dikembangkan melalui pendidikan.</p>
    `,
    difficulty: 'medium',
    type: 'multiple-choice',
    tags: ['paragraf', 'gagasan-utama'],
    createdAt: new Date(),
  }
];
