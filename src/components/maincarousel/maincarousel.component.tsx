'use client'

import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.interface";
import CustomSwiper from "../customswiper/customswiper.component";
import MainCarouselSlide from "../maincarouselslide/maincarouselslide.component";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

interface MainCarouselProps {
  slides: CarouselSlide[],
}

const MainCarousel = ({ slides }: MainCarouselProps) => {

  const [slideColor, setSlideColor] = useState<string>("#FFE205");

  const changeSlideColorPerIndex = (index: number) => {
    switch (index) {
      case 0:
        setSlideColor("#FFE205"); 
        break;
      case 1:
        setSlideColor("#33FF57"); 
        break;
      case 2:
        setSlideColor("#3357FF"); 
        break;
      case 3:
        setSlideColor("#F1C40F"); 
        break;
      default:
        setSlideColor("#FFFFFF"); 
        break;
    }
  };
  
return (
  <section
    style={{ backgroundColor: slideColor }} 
    className={`h-[900px] bg-gradient-to-b from-[rgba(0,0,0,0)] from-60% to-background to-90% px-[2%] transition-all ease-in-out duration-700`}
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