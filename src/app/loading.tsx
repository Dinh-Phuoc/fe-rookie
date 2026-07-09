import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  color: #64748b;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.p`
  font-size: 0.9rem;
  margin: 0;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Spinner />
      <Text>Đang tải dữ liệu...</Text>
    </Wrapper>
  );
}
