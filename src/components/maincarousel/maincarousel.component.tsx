'use client'

import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.type";
import CustomSwiper from "../customswiper/customswiper.component";
import MainCarouselSlide from "../maincarouselslide/maincarouselslide.component";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

interface MainCarouselProps {
  slides: CarouselSlide[],
}

const MainCarousel = ({ slides }: MainCarouselProps) => {

  const [slideColor, setSlideColor] = useState<string>("#34325e");

  const changeSlideColorPerIndex = (index: number) => {
    switch (index) {
      case 0:
        setSlideColor("#34325e"); 
        break;
      case 1:
        setSlideColor("#6dff80"); 
        break;
      case 2:
        setSlideColor("#59ffac"); 
        break;
    }
  };
  
return (
  <section
    style={{ backgroundColor: slideColor }} 
    className={`h-[650px] bg-gradient-to-b from-[rgba(0,0,0,0)] to-background to-100% px-[2%] transition-all ease-in-out duration-700`}
  >
    <CustomSwiper 
    id={"maincarousel"}
      modules={[Navigation, Pagination]}
      navigation={true}
      pagination={{ clickable: true }}
      spaceBetween={50}
      arrowColor="var(--foregroundlight)"         
      bulletColor="var(--foregroundlight)"    
      bulletActiveColor="var(--foregroundlight)" 
      onRealIndexChange={(swiperInstance: { realIndex: number }) => {
        const currentIndex = swiperInstance.realIndex;
        if (changeSlideColorPerIndex) {
          changeSlideColorPerIndex(currentIndex)
        }
    }}
      slides={slides.map((slide, index) => (
        <MainCarouselSlide
          key={index} 
          mainCarouselSlide={slide}        
        />
      ))} 
    />
    </section>
);
  }
  
  export default MainCarousel;