'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  &.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GithubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 640px) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: ${({ $isOpen }) => ($isOpen ? '16px' : '0')};
  max-height: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MobileNavLink = styled(Link)`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
`;

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Header>
      <HeaderWrapper>
        <Inner>
          <Logo href='/' onClick={() => setIsMobileMenuOpen(false)}>
            ⚡ <span>FlashDev</span>
          </Logo>

          <Nav>
            <NavLink href='/'>Trang chủ</NavLink>
            <NavLink href='/topics'>Chủ đề</NavLink>
            <NavLink href='/quiz'>Luyện tập</NavLink>
          </Nav>

          <Actions>
            <GithubLink href='https://github.com' target='_blank' rel='noopener noreferrer'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
              </svg>
              GitHub
            </GithubLink>
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label='Menu'>
              {isMobileMenuOpen ? (
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M18 6L6 18M6 6l12 12' />
                </svg>
              ) : (
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <path d='M3 12h18M3 6h18M3 18h18' />
                </svg>
              )}
            </MobileMenuButton>
          </Actions>
        </Inner>

        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileNav>
            <MobileNavLink href='/' onClick={() => setIsMobileMenuOpen(false)}>
              Trang chủ
            </MobileNavLink>
            <MobileNavLink href='/topics' onClick={() => setIsMobileMenuOpen(false)}>
              Chủ đề
            </MobileNavLink>
            <MobileNavLink href='/quiz' onClick={() => setIsMobileMenuOpen(false)}>
              Luyện tập
            </MobileNavLink>
          </MobileNav>
        </MobileMenu>
      </HeaderWrapper>
    </Header>
  );
}
