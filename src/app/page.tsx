import MainCarousel from "@/components/maincarousel/maincarousel.component";
import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.interface";
import SolarPanel from "../../public/importantimages/solarpanelnobackground.png"

export default function Home() {
  const slides: CarouselSlide[] = [
    {
      title: "Diversos Fornecedores de Energia Limpa",
      subtitle: "Encontre fornecedores com 100% de energia renovável e preços competitivos no mercado.",
      image: SolarPanel,
      link: "/fornecedores",
      alt: "Fornecedores de energia limpa",
      textColor: "#00ff15"
    },
    {
      title: "Torne-se um Usuário de Energia Limpa",
      subtitle: "Descubra os 3 requisitos para adotar energia limpa (500Kw-1000Kw mínimo).",
      image: "https://picsum.photos/seed/picsum/1200/800",
      link: "/como-adotar",
      alt: "Adote energia limpa",
      textColor: "#ff0000"
    },
    {
      title: "Gerencie Certificados de Energia Limpa",
      subtitle: "Oferecemos dashboards para gestão de certificados de energia renovável.",
      image: "https://picsum.photos/seed/picsum/1200/800",
      link: "/certificados",
      alt: "Certificados de energia limpa",
      textColor: "#00ff11"
    }
  ];

  return (
    <main className="relative">
      <MainCarousel slides={slides} />
    </main>
  );
}
