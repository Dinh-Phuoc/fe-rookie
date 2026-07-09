'use client';

import { ButtonLink } from '@/components/ui/button-link';
import { Card, CardContent } from '@/components/ui/card';
import { TopicsGrid } from '@/components/topics-grid';
import { useTopics } from '@/lib/queries';
import { Skeleton } from '@/components/ui/skeleton';

const FEATURES = [
  {
    icon: '💡',
    title: 'Code ví dụ thực tế',
    desc: 'Mỗi câu hỏi có code ví dụ chạy được, giúp hiểu sâu thay vì học vẹt.',
  },
  {
    icon: '⚡',
    title: 'Nổi đau thực tế',
    desc: 'Biết lỗi khi dùng công nghệ cũ giúp nhớ lý do tồn tại của công nghệ mới.',
  },
  {
    icon: '📱',
    title: 'Vuốt để học',
    desc: 'Giao diện Swiper cho phép vuốt trái/phải, học mọi lúc mọi nơi trên di động.',
  },
  {
    icon: '🤖',
    title: 'Theo thời đại AI',
    desc: 'Cập nhật câu hỏi về LLM, Prompt Engineering, Function Calling — xu hướng tuyển dụng 2024-2025.',
  },
];

export default function HomePage() {
  const { data: topics } = useTopics();
  const topicCount = topics?.data.items.length ?? 0;

  return (
    <main className='min-h-screen'>
      {/* Hero */}
      <section className='bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-24'>
        <div className='mx-auto max-w-3xl text-center'>
          <span className='mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600'>
            ⚡ Bộ câu hỏi Fullstack Junior thời đại AI
          </span>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl'>
            Học phỏng vấn
            <br />
            <span className='bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent'>
              không cần học vẹt
            </span>
          </h1>
          <p className='mb-8 text-lg text-slate-600'>
            Mỗi câu hỏi có <strong>code ví dụ</strong> và <strong>nổi đau thực tế</strong>{' '}
            khi dùng công nghệ cũ. Vuốt trái/phải để học, nhớ lâu hơn cách học truyền
            thống.
          </p>
          <div className='flex flex-wrap justify-center gap-3'>
            <ButtonLink href='/topics'>Khám phá chủ đề</ButtonLink>
            <ButtonLink href='/quiz' variant='outline'>
              Luyện tập ngay
            </ButtonLink>
          </div>
        </div>

        {/* Stats */}
        <div className='mx-auto mt-12 flex justify-center gap-8 sm:gap-12'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-slate-900'>
              {topicCount > 0 ? (
                topicCount
              ) : (
                <Skeleton className='mx-auto h-7 w-8' />
              )}
            </div>
            <div className='text-xs font-medium uppercase tracking-wide text-slate-500'>Chủ đề</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-slate-900'>25+</div>
            <div className='text-xs font-medium uppercase tracking-wide text-slate-500'>Câu hỏi</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-slate-900'>100%</div>
            <div className='text-xs font-medium uppercase tracking-wide text-slate-500'>Miễn phí</div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16'>
        <div className='mb-8'>
          <h2 className='text-xl font-bold text-slate-900 sm:text-2xl'>Chủ đề học tập</h2>
          <p className='mt-2 text-sm text-slate-600'>Chọn chủ đề bạn muốn ôn luyện để bắt đầu.</p>
        </div>

        <TopicsGrid />
      </section>

      {/* Features */}
      <section className='bg-slate-50 px-4 py-12 sm:py-16'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-8'>
            <h2 className='text-xl font-bold text-slate-900 sm:text-2xl'>Tại sao chọn FlashDev?</h2>
            <p className='mt-2 text-sm text-slate-600'>
              Khác với cách học truyền thống, chúng tôi thiết kế theo cách bạn nhớ lâu nhất.
            </p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {FEATURES.map((f) => (
              <Card key={f.title}>
                <CardContent className='p-5'>
                  <div className='mb-3 text-2xl'>{f.icon}</div>
                  <h3 className='mb-2 font-semibold text-slate-900'>{f.title}</h3>
                  <p className='text-sm text-slate-600'>{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
