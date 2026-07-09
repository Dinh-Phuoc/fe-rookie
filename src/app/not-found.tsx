import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 24px;
`;

const Code = styled.div`
  font-size: 6rem;
  font-weight: 900;
  color: #e2e8f0;
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -0.05em;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px;
`;

const Desc = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  margin: 0 0 32px;
  max-width: 400px;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  background: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Code>404</Code>
      <Title>Trang không tồn tại</Title>
      <Desc>
        Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </Desc>
      <HomeButton href='/'>
        ← Quay về trang chủ
      </HomeButton>
    </Wrapper>
  );
}
