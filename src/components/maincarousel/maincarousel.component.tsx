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
    className={`h-[750px] bg-gradient-to-b from-[rgba(0,0,0,0)] to-background to-100% px-[2%] transition-all ease-in-out duration-700 overflow-hidden`}
  >
    <div className="w-full relative left-0 z-[1]">
                <div className="absolute -top-[7rem] left-0 h-[20rem] w-[20rem] rounded-full bg-[#ff2121] blur-2xl opacity-25"></div>
                <div className="absolute -top-[6rem] left-[15rem] h-[35rem] w-[35rem] rounded-full bg-[#3f35f1] blur-2xl opacity-25"></div>
                <div className="absolute -top-[8rem] left-[18rem] h-28 w-28 rounded-full bg-[#f9d832] blur-2xl opacity-25"></div>
                <div className="absolute -top-20 left-[40rem] h-[40rem] w-[40rem] rounded-full bg-[#f9d832] blur-2xl opacity-25"></div>
                <div className="absolute -top-0 left-[60rem] h-[30rem] w-[30rem] rounded-full bg-[#256aff] blur-2xl opacity-25"></div>
                <div className="absolute top-40 left-[80rem] h-96 w-96 rounded-full bg-[#8d35f1] blur-2xl opacity-25"></div>
                <div className="absolute top-10 left-[100rem] h-96 w-96 rounded-full bg-[#f9d832] blur-2xl opacity-25"></div>
            </div>
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