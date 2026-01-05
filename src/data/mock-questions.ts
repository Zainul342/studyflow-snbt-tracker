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
    }
];
