import Link from 'next/link';
import styled from 'styled-components';
import { notFound } from 'next/navigation';
import { FlashcardSwiper } from '@/components/flashcard/flashcard-swiper';
import { getFlashcards, getTopics } from '@/lib/api';
import type { Metadata } from 'next';

const PageWrapper = styled.main`
  min-height: 100vh;
  background: #f8fafc;
`;

const PageHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const PageInner = styled.div`
  max-width: 1200px;
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

const PageTitle = styled.h1`
  font-size: 1.375rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const PageDesc = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  @media (max-width: 640px) {
    padding: 24px 16px 48px;
  }
`;

const SwiperSection = styled.section`
  margin-bottom: 40px;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 16px;

  h2 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .count {
    font-size: 0.75rem;
    color: #94a3b8;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    padding: 0;
    margin-bottom: 12px;
    h2 {
      font-size: 0.875rem;
    }
  }
`;

const DifficultyIcon = styled.span`
  margin-right: 4px;
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 0.85rem;
  color: #1e40af;
  line-height: 1.6;
  margin-top: 28px;

  @media (max-width: 640px) {
    font-size: 0.8rem;
    padding: 12px 14px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #64748b;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #0f172a;
  }

  p {
    font-size: 0.875rem;
    margin: 0;
  }
`;

type TopicDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TopicDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Flashcard: ${slug}`,
    description: `Học nhanh chủ đề ${slug} với bộ câu hỏi có code ví dụ và nổi đau thực tế.`,
  };
}

const DIFFICULTY_CONFIG = [
  { key: 'basic', label: 'Cơ bản', icon: '🌱' },
  { key: 'intermediate', label: 'Trung bình', icon: '🌿' },
  { key: 'advanced', label: 'Nâng cao', icon: '🌳' },
];

export default async function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { slug } = await params;
  const [topics, flashcards] = await Promise.all([getTopics(), getFlashcards(slug)]);

  const topic = topics.data.items.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const groupedByDifficulty = DIFFICULTY_CONFIG.map((d) => ({
    ...d,
    cards: flashcards.data.items.filter((c) => c.difficulty === d.key),
  }));

  return (
    <PageWrapper>
      <PageHeader>
        <PageInner>
          <Breadcrumb>
            <Link href='/'>Trang chủ</Link>
            <span>/</span>
            <Link href='/topics'>Chủ đề</Link>
            <span>/</span>
            <span>{topic.title}</span>
          </Breadcrumb>
          <PageTitle>{topic.title}</PageTitle>
          <PageDesc>{topic.description}</PageDesc>
        </PageInner>
      </PageHeader>

      <Content>
        {flashcards.data.items.length === 0 ? (
          <EmptyState>
            <h3>Chưa có câu hỏi nào</h3>
            <p>Chủ đề này hiện chưa có flashcard. Quay lại sau nhé!</p>
          </EmptyState>
        ) : (
          groupedByDifficulty.map(
            (group) =>
              group.cards.length > 0 && (
                <SwiperSection key={group.key}>
                  <SectionLabel>
                    <h2>
                      <DifficultyIcon>{group.icon}</DifficultyIcon>
                      {group.label}
                    </h2>
                    <span className='count'>({group.cards.length} câu)</span>
                  </SectionLabel>
                  <FlashcardSwiper cards={group.cards} />
                </SwiperSection>
              ),
          )
        )}

        <InfoBox>
          💡 <strong>Mẹo:</strong> Vuốt trái/phải để xem câu hỏi tiếp theo. Nhấn{' '}
          <strong>Xem đáp án</strong> để hiện câu trả lời, code ví dụ và nổi đau
          thường gặp. Dùng bàn phím mũi tên ← → để navigate.
        </InfoBox>
      </Content>
    </PageWrapper>
  );
}
