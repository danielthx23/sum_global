import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.type";
import Image from "next/image";
import Link from "next/link";

interface MainCarouselSlideProps {
  mainCarouselSlide: CarouselSlide;
}

const MainCarouselSlide = ({ mainCarouselSlide}: MainCarouselSlideProps) => {  
  return (
    <div
      className="h-full w-full py-12 md:py-12 lg:py-24 xl:py-24 flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-center items-center overflow-hidden relative"
    >
      <div className="flex flex-col gap-0 xl:gap-20 lg:gap-20 md:gap-0 xs:gap-0 sm:gap-0 z-10 w-fit h-fit items-center">
        <article className={`w-11/12 flex flex-col gap-4 justify-start`} style={{"color": mainCarouselSlide.textColor}}>
          <h1 className={`text-lg md:text-xl sm:text-lg xs:text-lg lg:text-2xl xl:text-2xl font-bold text-left w-full`}>{mainCarouselSlide.title}</h1>
          <h2 className={`text-md md:text-lg sm:text-md xs:text-md lg:text-xl xl:text-xl text-left w-full `}>{mainCarouselSlide.subtitle}</h2>
          {mainCarouselSlide.listItems && mainCarouselSlide.listItems}
        </article>
        <div className="w-11/12 ">
          <Link
            href={mainCarouselSlide.link}
            className="font-bold bg-foreground w-fit px-12 py-4 rounded-lg transition-all duration-200 ease-in-out hover:bg-transparent 
            text-background outline-2 hover:outline hover:outline-foreground hover:text-foreground hidden xl:block lg:block md:hidden xs:hidden sm:hidden"
          >
            Saiba mais
          </Link>
        </div>
      </div>

      <figure className="w-fit h-fit flex items-center">
        <Image
          className="w-[350px] xs:w-[350px] sm:w-[350px] md:w-[350px] lg:w-[400px] xl:w-[400px] object-contain z-10"
          width={400}
          height={400}
          src={mainCarouselSlide.image}
          alt={mainCarouselSlide.alt}
        />
        <Image
          className="w-fit h-[600px] pr-16 opacity-20 absolute object-contain blur-xl"
          width={1000}
          height={700}
          src={mainCarouselSlide.image}
          alt={mainCarouselSlide.alt}
        />
      </figure>
      <Link
            href={mainCarouselSlide.link}
            className="font-bold bg-foreground w-fit px-10 py-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-transparent 
            text-background outline-2 hover:outline hover:outline-foreground hover:text-foreground block xl:hidden lg:hidden md:block xs:block sm:block"
          >
            Saiba mais
          </Link>
    </div>
  );
};

export default MainCarouselSlide;