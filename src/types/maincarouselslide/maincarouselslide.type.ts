import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export default interface CarouselSlide {
    title: string;
    image: StaticImageData | string;
    link: string;
    alt: string;
    subtitle: string;
    textColor: string;
    listItems?: ReactNode;
  }