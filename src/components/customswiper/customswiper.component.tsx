"use client";

import React, { ReactNode, useRef } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

interface CustomSwiperProps extends SwiperProps {
    id: string;
    slides: ReactNode[];
    setChangePerIndex?: (slideIndex: number) => void; 
}

const CustomSwiper = ({
    id,
    slides,
    setChangePerIndex,
    ...swiperProps
}: CustomSwiperProps) => {
    const swiperRef = useRef<SwiperRef>(null);

    return (
        <Swiper
            id={`Swiper-${id}`}
            ref={swiperRef}
            onRealIndexChange={(swiperInstance) => {
                const currentIndex = swiperInstance.realIndex;
                if (setChangePerIndex) {
                    setChangePerIndex(currentIndex);
                }
            }}
            {...swiperProps}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={`${id}-slide-${index}`} id={`${id}-slide-${index}`}>
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CustomSwiper;
