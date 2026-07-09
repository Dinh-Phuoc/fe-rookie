'use client';

import styled from 'styled-components';
import { Badge } from '@/components/ui/badge';
import { Flashcard } from '@/types/flashcard';

const CardContainer = styled.article`
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 20px;
    background: var(--color-card);
    color: var(--color-card-foreground);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.04);
`;

const CardTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
`;

const BlockTitle = styled.h4`
    margin-top: 16px;
    margin-bottom: 6px;
    font-weight: 600;
`;

const CodeBlock = styled.pre`
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    overflow-x: auto;
    font-size: 0.875rem;
`;

type FlashcardItemProps = {
    card: Flashcard;
};

export function FlashcardItem({ card }: FlashcardItemProps) {
    return (
        <CardContainer>
            <div className='mb-2 flex items-center gap-2'>
                <Badge variant='secondary'>{card.difficulty}</Badge>
                <span className='text-sm text-muted-foreground'>{card.topicSlug}</span>
            </div>
            <CardTitle>{card.question}</CardTitle>
            <p>{card.answer}</p>

            {card.codeExamples.length > 0 ? (
                <>
                    <BlockTitle>Vi du code</BlockTitle>
                    {card.codeExamples.map((example, index) => (
                        <div key={`${card._id}-example-${index}`} className='mb-3'>
                            {example.title ? (
                                <p className='mb-1 text-sm font-medium text-muted-foreground'>
                                    {example.title}
                                </p>
                            ) : null}
                            <CodeBlock>{example.code}</CodeBlock>
                        </div>
                    ))}
                </>
            ) : null}

            {card.painPoints.length > 0 ? (
                <>
                    <BlockTitle>Noi dau thuong gap</BlockTitle>
                    {card.painPoints.map((painPoint, index) => (
                        <div
                            key={`${card._id}-pain-${index}`}
                            className='mb-3 rounded-md border border-amber-200 bg-amber-50 p-3'
                        >
                            <p className='font-semibold text-amber-700'>{painPoint.title}</p>
                            <p className='text-sm text-amber-800'>{painPoint.description}</p>
                            {painPoint.consequence ? (
                                <p className='mt-1 text-sm text-amber-900'>
                                    Hau qua: {painPoint.consequence}
                                </p>
                            ) : null}
                        </div>
                    ))}
                </>
            ) : null}
        </CardContainer>
    );
}
