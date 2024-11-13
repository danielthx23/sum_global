"use client";

import React, { ReactNode, useRef } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface CustomSwiperProps extends SwiperProps {
    id: string;
    slides: ReactNode[];
    arrowColor?: string; 
    bulletColor?: string; 
    bulletActiveColor?: string; 
}

const CustomSwiper = ({
    id,
    slides,
    arrowColor,
    bulletColor,
    bulletActiveColor,
    ...swiperProps
}: CustomSwiperProps) => {
    const swiperRef = useRef<SwiperRef>(null);

    return (
        <>
            <style jsx global>{`
                #Swiper-${id} .swiper-button-next,
                #Swiper-${id} .swiper-button-prev {
                    color: ${arrowColor};
                }

                #Swiper-${id} .swiper-pagination-bullet {
                    background-color: ${bulletColor};
                }

                #Swiper-${id} .swiper-pagination-bullet-active {
                    background-color: ${bulletActiveColor};
                }
            `}</style>
            
            <Swiper
                id={`Swiper-${id}`}
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                style={{
                    "--swiper-navigation-color": arrowColor,      
                    "--swiper-pagination-color": bulletActiveColor, 
                } as React.CSSProperties}
                {...swiperProps}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={`${id}-slide-${index}`} id={`${id}-slide-${index}`}>
                        {slide}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default CustomSwiper;
