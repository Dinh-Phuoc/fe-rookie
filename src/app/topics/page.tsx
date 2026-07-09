import Link from 'next/link';
import styled from 'styled-components';
import { getTopics } from '@/lib/api';
import type { Metadata } from 'next';

const PageWrapper = styled.main`
  min-height: 100vh;
  background: #f8fafc;
`;

const PageHeader = styled.div`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 28px 24px;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

const PageInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const PageDesc = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 64px;

  @media (max-width: 640px) {
    padding: 24px 16px 48px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const TopicCard = styled(Link)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const TopicTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const TopicDesc = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  flex: 1;
`;

const TopicArrow = styled.span`
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 600;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 14px;

  a {
    color: #3b82f6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TOPIC_ICONS: Record<string, string> = {
  'javascript-typescript': '🔧',
  'nestjs': '🏗️',
  'mongodb': '🍃',
  'nextjs-react': '⚛️',
  'devops': '🚀',
  'ai-llm': '🤖',
};

export const metadata: Metadata = {
  title: 'Chủ đề học tập',
  description: 'Danh sách chủ đề phỏng vấn Fullstack: JavaScript, TypeScript, NestJS, MongoDB, Next.js, DevOps, AI.',
};

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <PageWrapper>
      <PageHeader>
        <PageInner>
          <Breadcrumb>
            <Link href='/'>Trang chủ</Link>
            <span>/</span>
            <span>Chủ đề</span>
          </Breadcrumb>
          <PageTitle>Tất cả chủ đề</PageTitle>
          <PageDesc>
            {topics.data.items.length} chủ đề phỏng vấn Fullstack – chọn một chủ đề để bắt đầu học.
          </PageDesc>
        </PageInner>
      </PageHeader>

      <Content>
        <Grid>
          {topics.data.items.map((topic) => (
            <TopicCard key={topic._id} href={`/topics/${topic.slug}`}>
              <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>
                {TOPIC_ICONS[topic.slug] ?? '📚'}
              </div>
              <TopicTitle>{topic.title}</TopicTitle>
              <TopicDesc>{topic.description}</TopicDesc>
              <TopicArrow>
                Học ngay →
              </TopicArrow>
            </TopicCard>
          ))}
        </Grid>
      </Content>
    </PageWrapper>
  );
}
