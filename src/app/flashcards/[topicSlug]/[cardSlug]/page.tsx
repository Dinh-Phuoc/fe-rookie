import Link from 'next/link';
import styled from 'styled-components';
import { notFound } from 'next/navigation';
import { FlashcardCard } from '@/components/flashcard/flashcard-card';
import { getFlashcardDetail } from '@/lib/api';
import type { Metadata } from 'next';

const PageWrapper = styled.main`
  min-height: 100vh;
  background: #f8fafc;
`;

const PageHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const PageInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 10px;
  flex-wrap: wrap;

  a {
    color: #3b82f6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  @media (max-width: 640px) {
    padding: 20px 16px 48px;
  }
`;

type FlashcardDetailPageProps = {
  params: Promise<{ topicSlug: string; cardSlug: string }>;
};

export async function generateMetadata({ params }: FlashcardDetailPageProps): Promise<Metadata> {
  const { topicSlug, cardSlug } = await params;

  try {
    const card = await getFlashcardDetail(topicSlug, cardSlug);
    return {
      title: card.data.question,
      description: card.data.answer.slice(0, 160),
      openGraph: {
        title: card.data.question,
        description: card.data.answer.slice(0, 160),
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Không tìm thấy flashcard',
    };
  }
}

export default async function FlashcardDetailPage({ params }: FlashcardDetailPageProps) {
  const { topicSlug, cardSlug } = await params;
  let card;

  try {
    const response = await getFlashcardDetail(topicSlug, cardSlug);
    card = response.data;
  } catch {
    notFound();
  }

  return (
    <PageWrapper>
      <PageHeader>
        <PageInner>
          <Breadcrumb>
            <Link href='/'>Trang chủ</Link>
            <span>/</span>
            <Link href={`/topics/${topicSlug}`}>{topicSlug}</Link>
            <span>/</span>
            <span>{cardSlug}</span>
          </Breadcrumb>
        </PageInner>
      </PageHeader>

      <Content>
        <FlashcardCard card={card} />
      </Content>
    </PageWrapper>
  );
}
