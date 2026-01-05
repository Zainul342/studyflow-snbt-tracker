import { Question, QuestionOption } from '../types/quiz';
import { v4 as uuidv4 } from 'uuid';

interface RawQuestion {
    number: string;
    text: string;
    options: { id: string; text: string }[];
    answerKey: string;
    explanation: string;
}

export function parseQuizFromRawText(
    rawText: string,
    subjectId: string = 'general',
    topicId: string = 'general'
): Partial<Question>[] {
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line);
    const questions: Partial<Question>[] = [];

    let currentQ: Partial<RawQuestion> | null = null;

    // Regex patterns
    const questionStartRegex = /^(\d+)\.\s*(.+)/; // "1. Pertanyaan..."
    const optionRegex = /^([A-E])\.\s*(.+)/; // "A. Pilihan..."
    const keyRegex = /^(Kunci|Jawaban|Ans):\s*([A-E])/i; // "Kunci: A"
    const explanationStartRegex = /^(Pembahasan|Penjelasan):/i; // "Pembahasan: ..."

    let isCollectingExplanation = false;

    lines.forEach((line) => {
        // 1. Detect Question Start
        const qMatch = line.match(questionStartRegex);
        if (qMatch) {
            if (currentQ) {
                questions.push(transformToSchema(currentQ, subjectId, topicId));
            }
            currentQ = {
                number: qMatch[1],
                text: qMatch[2],
                options: [],
                answerKey: '',
                explanation: ''
            };
            isCollectingExplanation = false;
            return;
        }

        // 2. Detect Option
        const optMatch = line.match(optionRegex);
        if (optMatch && currentQ && !isCollectingExplanation) {
            currentQ.options = currentQ.options || [];
            currentQ.options.push({
                id: optMatch[1],
                text: optMatch[2]
            });
            return;
        }

        // 3. Detect Answer Key
        const keyMatch = line.match(keyRegex);
        if (keyMatch && currentQ) {
            currentQ.answerKey = keyMatch[2].toUpperCase();
            return;
        }

        // 4. Detect Explanation
        if (line.match(explanationStartRegex) && currentQ) {
            isCollectingExplanation = true;
            currentQ.explanation = line.replace(explanationStartRegex, '').trim();
            return;
        }

        // 5. Append text (multiline support)
        if (currentQ) {
            if (isCollectingExplanation) {
                currentQ.explanation += `\n${line}`;
            } else if (currentQ.options && currentQ.options.length > 0) {
                // Appending to last option? Or just ignore? 
                // Simple parser assumption: Options are single line mostly.
            } else {
                // Appending to question text
                currentQ.text += `\n${line}`;
            }
        }
    });

    // Push last question
    if (currentQ) {
        questions.push(transformToSchema(currentQ, subjectId, topicId));
    }

    return questions;
}

function transformToSchema(raw: any, subjectId: string, topicId: string): Partial<Question> {
    const options: QuestionOption[] = raw.options.map((opt: any) => ({
        id: opt.id,
        content: opt.text,
        isCorrect: opt.id === raw.answerKey
    }));

    return {
        id: uuidv4(),
        subjectId,
        topicId,
        content: `<p>${raw.text.replace(/\n/g, '<br/>')}</p>`,
        options,
        explanation: `<p>${raw.explanation.replace(/\n/g, '<br/>')}</p>`,
        difficulty: 'medium', // Default
        type: 'multiple-choice',
        createdAt: new Date(),
    };
}
