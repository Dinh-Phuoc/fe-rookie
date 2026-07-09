import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StyledRegistry from './styled-registry';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'vietnamese'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flashdev.local'),
  title: {
    default: 'FlashDev – Học phỏng vấn Fullstack qua Flashcard',
    template: '%s | FlashDev',
  },
  description:
    'Tổng hợp bộ câu hỏi phỏng vấn Fullstack Junior thời đại AI. JavaScript, TypeScript, NestJS, MongoDB, Next.js, DevOps, AI & LLM. Mỗi câu hỏi có code ví dụ và nổi đau thực tế.',
  keywords: [
    'phỏng vấn fullstack',
    'javascript interview',
    'typescript',
    'nestjs',
    'mongodb',
    'nextjs',
    'flashcard',
    'học lập trình',
  ],
  authors: [{ name: 'FlashDev' }],
  openGraph: {
    locale: 'vi_VN',
    type: 'website',
    siteName: 'FlashDev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StyledRegistry>
          <SiteHeader />
          <div className='min-h-screen flex flex-col bg-background'>
            {children}
          </div>
          <SiteFooter />
        </StyledRegistry>
      </body>
    </html>
  );
}
