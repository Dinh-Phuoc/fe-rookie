import Link from 'next/link';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  border-top: 1px solid #e2e8f0;
  background: white;
  padding: 40px 24px 28px;
  margin-top: auto;

  @media (max-width: 640px) {
    padding: 32px 16px 24px;
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Brand = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 10px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 0.95rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const Column = styled.div`
  h3 {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    margin: 0 0 14px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a {
    font-size: 0.85rem;
    color: #475569;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #3b82f6;
    }
  }

  @media (max-width: 640px) {
    h3 {
      font-size: 0.65rem;
    }
    a {
      font-size: 0.8rem;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f1f5f9;
  margin-bottom: 20px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 14px;

  a {
    font-size: 0.75rem;
    color: #94a3b8;
    text-decoration: none;

    &:hover {
      color: #3b82f6;
    }
  }

  @media (max-width: 640px) {
    gap: 12px;
    a {
      font-size: 0.7rem;
    }
  }
`;

export function SiteFooter() {
  return (
    <FooterWrapper>
      <Inner>
        <Grid>
          <Brand>
            <h2>⚡ FlashDev</h2>
            <p>
              Bộ câu hỏi phỏng vấn Fullstack Junior thời đại AI. Mỗi câu hỏi có code ví dụ
              và nổi đau thực tế để nhớ kiến thức lâu hơn.
            </p>
          </Brand>

          <Column>
            <h3>Chủ đề</h3>
            <ul>
              <li><Link href='/topics/javascript-typescript'>JavaScript & TypeScript</Link></li>
              <li><Link href='/topics/nestjs'>NestJS</Link></li>
              <li><Link href='/topics/mongodb'>MongoDB</Link></li>
              <li><Link href='/topics/nextjs-react'>Next.js & React</Link></li>
            </ul>
          </Column>

          <Column>
            <h3>Khác</h3>
            <ul>
              <li><Link href='/topics'>Tất cả chủ đề</Link></li>
              <li><Link href='/quiz'>Luyện tập</Link></li>
              <li><a href='/sitemap.xml' target='_blank'>Sitemap</a></li>
              <li><a href='https://github.com' target='_blank' rel='noopener noreferrer'>GitHub</a></li>
            </ul>
          </Column>
        </Grid>

        <Divider />

        <Bottom>
          <Copyright suppressHydrationWarning>
            © 2026 FlashDev. Phát triển bởi cộng đồng developer Việt Nam.
          </Copyright>
          <BottomLinks>
            <a href='/privacy'>Chính sách bảo mật</a>
            <a href='/terms'>Điều khoản sử dụng</a>
          </BottomLinks>
        </Bottom>
      </Inner>
    </FooterWrapper>
  );
}
