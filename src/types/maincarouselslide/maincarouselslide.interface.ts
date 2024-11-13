import { StaticImageData } from "next/image";

export default interface CarouselSlide {
    title: string;
    image: StaticImageData | string;
    link: string;
    alt: string;
    subtitle: string;
    textColor: string;
  }