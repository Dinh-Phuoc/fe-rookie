export type FlashcardDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface Topic {
    _id: string;
    slug: string;
    title: string;
    description: string;
    order: number;
    isPublished: boolean;
}

export interface CodeExample {
    language: string;
    code: string;
    title?: string;
}

export interface PainPoint {
    title: string;
    description: string;
    consequence?: string;
}

export interface Flashcard {
    _id: string;
    topicSlug: string;
    slug: string;
    question: string;
    answer: string;
    difficulty: FlashcardDifficulty;
    codeExamples: CodeExample[];
    painPoints: PainPoint[];
    tags: string[];
    isPublished: boolean;
}

export interface ApiListResponse<T> {
    code: string;
    message: string;
    data: {
        items: T[];
        total: number;
    };
}

export interface ApiDetailResponse<T> {
    code: string;
    message: string;
    data: T;
}
