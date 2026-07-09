'use client';

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Flashcard } from '@/types/flashcard';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.article`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: ${slideUp} 0.4s ease forwards;
  min-height: 360px;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    min-height: 280px;
    border-radius: 16px;
  }
`;

const CardHeader = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding: 12px 16px;
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ $variant: 'difficulty' | 'topic' }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  ${({ $variant }) =>
    $variant === 'difficulty'
      ? `
    background: #dbeafe;
    color: #1d4ed8;
  `
      : `
    background: #f1f5f9;
    color: #64748b;
  `}

  @media (max-width: 640px) {
    font-size: 10px;
    padding: 3px 8px;
  }
`;

const DifficultyDot = styled.span<{ $level: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 4px;
  background: ${({ $level }) =>
    $level === 'basic' ? '#22c55e' : $level === 'intermediate' ? '#f59e0b' : '#ef4444'};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  background: #f8fafc;
  color: #94a3b8;
  border: 1px solid #e2e8f0;
`;

const CardBody = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const QuestionText = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.5;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    font-size: 1rem;
    margin-bottom: 12px;
  }
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
  margin-bottom: 12px;
`;

const AnswerText = styled.p`
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.7;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

const SectionLabel = styled.h3`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 8px;
  margin-top: 0;
`;

const CodeBlock = styled.pre`
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  overflow-x: auto;
  font-size: 0.75rem;
  line-height: 1.6;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-word;

  code {
    font-family: inherit;
  }

  @media (max-width: 640px) {
    font-size: 0.7rem;
    padding: 12px;
    border-radius: 8px;
  }
`;

const CodeTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 4px;
`;

const PainPointCard = styled.div`
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 10px;
`;

const PainPointTitle = styled.p`
  font-size: 0.85rem;
  font-weight: 700;
  color: #b45309;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '⚡';
    font-size: 12px;
  }
`;

const PainPointDesc = styled.p`
  font-size: 0.8rem;
  color: #92400e;
  line-height: 1.6;
  margin-bottom: 4px;
`;

const PainPointConsequence = styled.p`
  font-size: 0.75rem;
  color: #b45309;
  background: rgba(180, 83, 9, 0.08);
  padding: 6px 10px;
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
  margin-top: 6px;
  font-style: italic;
`;

const FlipButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 640px) {
    font-size: 0.8rem;
    padding: 10px;
  }
`;

type FlashcardCardProps = {
  card: Flashcard;
};

const DIFFICULTY_LABEL: Record<string, string> = {
  basic: 'Cơ bản',
  intermediate: 'Trung bình',
  advanced: 'Nâng cao',
};

export function FlashcardCard({ card }: FlashcardCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <CardWrapper>
      <CardHeader>
        <BadgeGroup>
          <Badge $variant='difficulty'>
            <DifficultyDot $level={card.difficulty} />
            {DIFFICULTY_LABEL[card.difficulty] ?? card.difficulty}
          </Badge>
          <Badge $variant='topic'>{card.topicSlug}</Badge>
        </BadgeGroup>
        <Tags>
          {card.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </CardHeader>

      <CardBody>
        <QuestionText>{card.question}</QuestionText>

        {showAnswer && (
          <>
            <Divider />
            <AnswerText>{card.answer}</AnswerText>

            {card.codeExamples.length > 0 && (
              <>
                <SectionLabel>Ví dụ code</SectionLabel>
                {card.codeExamples.map((ex, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    {ex.title && <CodeTitle>{ex.title}</CodeTitle>}
                    <CodeBlock>
                      <code>{ex.code}</code>
                    </CodeBlock>
                  </div>
                ))}
              </>
            )}

            {card.painPoints.length > 0 && (
              <>
                <SectionLabel style={{ marginTop: 20, color: '#f59e0b' }}>
                  Nổi đau thường gặp
                </SectionLabel>
                {card.painPoints.map((pp, i) => (
                  <PainPointCard key={i}>
                    <PainPointTitle>{pp.title}</PainPointTitle>
                    <PainPointDesc>{pp.description}</PainPointDesc>
                    {pp.consequence && (
                      <PainPointConsequence>Hậu quả: {pp.consequence}</PainPointConsequence>
                    )}
                  </PainPointCard>
                ))}
              </>
            )}
          </>
        )}
      </CardBody>

      <FlipButton onClick={() => setShowAnswer((v) => !v)}>
        {showAnswer ? '▲ Ẩn đáp án' : '▼ Xem đáp án'}
      </FlipButton>
    </CardWrapper>
  );
}
