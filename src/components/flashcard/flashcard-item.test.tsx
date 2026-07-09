import { render, screen } from '@testing-library/react';
import { FlashcardItem } from './flashcard-item';

describe('FlashcardItem', () => {
    it('renders question, answer and pain point', () => {
        render(
            <FlashcardItem
                card={{
                    _id: '1',
                    topicSlug: 'nestjs',
                    slug: 'di',
                    question: 'DI la gi?',
                    answer: 'Dependency Injection giup giam coupling.',
                    difficulty: 'basic',
                    tags: ['nestjs'],
                    isPublished: true,
                    codeExamples: [
                        {
                            language: 'typescript',
                            code: 'constructor(private readonly usersService: UsersService) {}',
                            title: 'Inject service',
                        },
                    ],
                    painPoints: [
                        {
                            title: 'Dung new truc tiep',
                            description: 'Kho mock test.',
                            consequence: 'Maintain cost cao.',
                        },
                    ],
                }}
            />,
        );

        expect(screen.getByText('DI la gi?')).toBeInTheDocument();
        expect(screen.getByText('Dependency Injection giup giam coupling.')).toBeInTheDocument();
        expect(screen.getByText('Noi dau thuong gap')).toBeInTheDocument();
        expect(screen.getByText('Dung new truc tiep')).toBeInTheDocument();
    });
});
