'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Flashcard } from '@/types/flashcard';
import { FlashcardCard } from './flashcard-card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperStyles = createGlobalStyle`
  .swiper-pagination-bullet {
    background: #94a3b8 !important;
    opacity: 0.6;
    width: 8px !important;
    height: 8px !important;
    transition: all 0.3s ease;
  }
  .swiper-pagination-bullet-active {
    background: #3b82f6 !important;
    opacity: 1;
    width: 24px !important;
    border-radius: 4px !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #3b82f6 !important;
    width: 40px !important;
    height: 40px !important;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    &::after {
      font-size: 18px !important;
      font-weight: 700;
    }
  }
  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    background: #f1f5f9;
    box-shadow: 0 4px 16px rgba(0,0,0,0.16);
  }
  .swiper-button-disabled {
    opacity: 0.3 !important;
  }
  .swiper {
    padding: 0 0 60px 0 !important;
  }

  @media (max-width: 640px) {
    .swiper-button-next,
    .swiper-button-prev {
      display: none !important;
    }
    .swiper-pagination-bullet-active {
      width: 16px !important;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 0 56px;

  @media (max-width: 640px) {
    padding: 0 4px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  font-size: 18px;
  color: #3b82f6;

  &:hover {
    background: #f8fafc;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 8px;
`;

const NextButton = styled(NavigationButton)`
  right: 8px;
`;

const Counter = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`;

type FlashcardSwiperProps = {
  cards: Flashcard[];
};

export function FlashcardSwiper({ cards }: FlashcardSwiperProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handlePrev() {
    swiperRef.current?.slidePrev();
  }

  function handleNext() {
    swiperRef.current?.slideNext();
  }

  return (
    <Wrapper>
      <SwiperStyles />
      <PrevButton onClick={handlePrev} aria-label='Câu hỏi trước'>
        ‹
      </PrevButton>

      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={24}
        slidesPerView={1}
        centeredSlides={true}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        style={{ width: '100%', maxWidth: 800 }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card._id}>
            <FlashcardCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>

      <NextButton onClick={handleNext} aria-label='Câu hỏi tiếp theo'>
        ›
      </NextButton>

      <Counter>
        <span>
          {activeIndex + 1} / {cards.length}
        </span>
      </Counter>
    </Wrapper>
  );
}
