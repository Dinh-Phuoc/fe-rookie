import Link from 'next/link';
import styled from 'styled-components';
import { getTopics } from '@/lib/api';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

const HeroSection = styled.section`
  padding: 64px 24px 48px;
  text-align: center;
  background: linear-gradient(180deg, #f8fafc 0%, white 100%);

  @media (max-width: 640px) {
    padding: 48px 16px 32px;
  }
`;

const HeroInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  @media (max-width: 640px) {
    font-size: 0.7rem;
    padding: 5px 12px;
    margin-bottom: 16px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 20px;

  span {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroDesc = styled.p`
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.7;
  margin: 0 0 28px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 640px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 640px) {
    gap: 20px;
    margin-top: 32px;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .number {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.03em;
  }

  .label {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 500;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  @media (max-width: 640px) {
    .number {
      font-size: 1.5rem;
    }
    .label {
      font-size: 0.7rem;
    }
  }
`;

const TopicsSection = styled.section`
  padding: 40px 24px 64px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 640px) {
    padding: 32px 16px 48px;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 28px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px;
  }

  p {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
  }

  @media (max-width: 640px) {
    margin-bottom: 20px;
    h2 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const TopicCard = styled(Link)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const TopicTitle = styled.h3`
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

const TopicMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const TopicBadge = styled.span`
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 600;
`;


const FeatureSection = styled.section`
  background: #f8fafc;
  padding: 56px 24px;

  @media (max-width: 640px) {
    padding: 40px 16px;
  }
`;

const FeatureInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 32px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;

  .icon {
    font-size: 1.75rem;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6px;
  }

  p {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
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
  title: 'FlashDev – Học phỏng vấn Fullstack qua Flashcard',
  description:
    'Tổng hợp bộ câu hỏi phỏng vấn Fullstack Junior thời đại AI. JavaScript, TypeScript, NestJS, MongoDB, Next.js, DevOps, AI & LLM.',
};

export default async function HomePage() {
  const topics = await getTopics();


  return (
    <>
      <HeroSection>
        <HeroInner>
          <Eyebrow>
            ⚡ Bộ câu hỏi Fullstack Junior thời đại AI
          </Eyebrow>
          <HeroTitle>
            Học phỏng vấn
            <br />
            <span>không cần học vẹt</span>
          </HeroTitle>
          <HeroDesc>
            Mỗi câu hỏi có <strong>code ví dụ</strong> và <strong>nổi đau thực tế</strong>{' '}
            khi dùng công nghệ cũ. Vuốt trái/phải để học, nhớ lâu hơn cách học truyền
            thống.
          </HeroDesc>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button asChild size='lg'>
              <Link href='/topics'>Khám phá chủ đề</Link>
            </Button>
            <Button asChild variant='outline' size='lg'>
              <Link href='/quiz'>Luyện tập ngay</Link>
            </Button>
          </div>

          <StatsRow>
            <StatItem>
              <div className='number'>{topics.data.items.length}</div>
              <div className='label'>Chủ đề</div>
            </StatItem>
            <StatItem>
              <div className='number'>25+</div>
              <div className='label'>Câu hỏi</div>
            </StatItem>
            <StatItem>
              <div className='number'>100%</div>
              <div className='label'>Miễn phí</div>
            </StatItem>
          </StatsRow>
        </HeroInner>
      </HeroSection>

      <TopicsSection>
        <SectionHeader>
          <h2>Chủ đề học tập</h2>
          <p>Chọn chủ đề bạn muốn ôn luyện để bắt đầu.</p>
        </SectionHeader>

        <TopicGrid>
          {topics.data.items.map((topic) => (
            <TopicCard key={topic._id} href={`/topics/${topic.slug}`}>
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>
                {TOPIC_ICONS[topic.slug] ?? '📚'}
              </div>
              <TopicTitle>{topic.title}</TopicTitle>
              <TopicDesc>{topic.description}</TopicDesc>
              <TopicMeta>
                <TopicBadge>Xem flashcard →</TopicBadge>
              </TopicMeta>
            </TopicCard>
          ))}
        </TopicGrid>
      </TopicsSection>

      <FeatureSection>
        <FeatureInner>
          <SectionHeader>
            <h2>Tại sao chọn FlashDev?</h2>
            <p>Khác với cách học truyền thống, chúng tôi thiết kế theo cách bạn nhớ lâu nhất.</p>
          </SectionHeader>

          <FeatureGrid>
            <FeatureCard>
              <div className='icon'>💡</div>
              <h3>Code ví dụ thực tế</h3>
              <p>Mỗi câu hỏi có code ví dụ chạy được, giúp hiểu sâu thay vì học vẹt.</p>
            </FeatureCard>
            <FeatureCard>
              <div className='icon'>⚡</div>
              <h3>Nổi đau thực tế</h3>
              <p>Biết lỗi khi dùng công nghệ cũ giúp nhớ lý do tồn tại của công nghệ mới.</p>
            </FeatureCard>
            <FeatureCard>
              <div className='icon'>📱</div>
              <h3>Vuốt để học</h3>
              <p>Giao diện Swiper cho phép vuốt trái/phải, học mọi lúc mọi nơi trên di động.</p>
            </FeatureCard>
            <FeatureCard>
              <div className='icon'>🤖</div>
              <h3>Theo thời đại AI</h3>
              <p>Cập nhật câu hỏi về LLM, Prompt Engineering, Function Calling — xu hướng tuyển dụng 2024-2025.</p>
            </FeatureCard>
          </FeatureGrid>
        </FeatureInner>
      </FeatureSection>
    </>
  );
}
