import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.type";
import Image from "next/image";
import Link from "next/link";

interface MainCarouselSlideProps {
  mainCarouselSlide: CarouselSlide;
}

const MainCarouselSlide = ({ mainCarouselSlide}: MainCarouselSlideProps) => {  
  return (
    <div
      className="h-[700px] w-full flex justify-center items-center overflow-hidden relative"
    >
      <Image
          className="w-fit h-full right-60 opacity-20 absolute object-contain blur-xl"
          width={1200}
          height={800}
          src={mainCarouselSlide.image}
          alt={mainCarouselSlide.alt}
        />
      <div className="flex flex-col gap-20 z-10 w-fit h-fit items-center">
        <article className={`w-11/12 flex flex-col gap-4 justify-start`} style={{"color": mainCarouselSlide.textColor}}>
          <h1 className={`text-2xl font-bold text-left w-full`}>{mainCarouselSlide.title}</h1>
          <h2 className={`text-xl text-left w-full `}>{mainCarouselSlide.subtitle}</h2>
          {mainCarouselSlide.listItems && mainCarouselSlide.listItems}
        </article>
        <div className="w-11/12 ">
          <Link
            href={mainCarouselSlide.link}
            className="font-bold bg-foreground w-fit px-12 py-4 rounded-lg transition-all duration-200 ease-in-out hover:bg-transparent 
            text-background outline-2 hover:outline hover:outline-foreground hover:text-foreground"
          >
            Saiba mais
          </Link>
        </div>
      </div>

      <figure className="w-fit h-fit flex items-center">
        <Image
          className="w-[400px] object-contain z-10"
          width={400}
          height={400}
          src={mainCarouselSlide.image}
          alt={mainCarouselSlide.alt}
        />
      </figure>
    </div>
  );
};

export default MainCarouselSlide;