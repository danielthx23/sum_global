import MainCarousel from "@/components/maincarousel/maincarousel.component";
import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.type";
import SolarPanel from "../../public/importantimages/solarpanelnobackground.png"
import BulbClean from "../../public/importantimages/bulbclean.png"
import GreenCertificate from "../../public/importantimages/certificate.png"
import AnalyticsStatus from "../../public/importantimages/analytics.png"
import ForumIcon from "../../public/importantimages/chat.png"
import EnergySuppliersIcon from "../../public/importantimages/energysuppliericon.png"
import MainCarouselSlideList from "@/components/maincarouselslidelist/maincarouselslidelist.component";
import ListItem from "@/types/listitem/listitem.type";
import { FaBolt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { PiNetworkFill } from "react-icons/pi";
import ListaFornecimentos from "@/components/listafornecimentos/listafornecimentos.component";
import ContainerOfertas from "@/components/containerofertas/containerofertas.component";
import Oferta from "@/types/containeroferta/containeroferta.type";

export default function Home() {

  const slideList: ListItem[] = [
    {
      label: "Ter carga igual ou superior a 500 kW",
      icon: <FaBolt />
    },
    {
      label: "Caso carga inferior deve ser representada como comercializadora varejista",
      icon: <FaShop />
    },
    {
      label: "Possuir uma concessionário local para o serviço de distribuição",
      icon: <PiNetworkFill />
    }
  ];

  const slides: CarouselSlide[] = [
    {
      title: "Diversos Fornecedores de Energia Limpa",
      subtitle: "Encontre fornecedores com 100% de energia renovável com preços competitivos no mercado.",
      image: SolarPanel,
      link: "/fornecimentos",
      alt: "Fornecedores de energia limpa",
      textColor: "#ffffff",
    },
    {
      title: "Torne-se um Usuário de Energia Limpa",
      subtitle: "Descubra os 3 dos requisitos para adotar energia limpa:",
      image: BulbClean,
      link: "/fornecimentos",
      alt: "Adote energia limpa",
      textColor: "#080808",
      listItems: <MainCarouselSlideList listItems={slideList} />
    },
    {
      title: "Gerencie Certificados de Energia Limpa",
      subtitle: "Oferecemos dashboards para gestão de certificados de energia renovável.",
      image: GreenCertificate,
      link: "/certificados/usuario",
      alt: "Certificados de energia limpa",
      textColor: "#080808"
    }
  ];

    const ofertaContainers: Oferta[] = [
      {
        titulo: "Consulte nossos dashboards para fazer gestões e gerar certificados!",
        link: "/certificados/usuario",
        label: "Dashboard",
        imagem: AnalyticsStatus,
      },
      {
        titulo: "Envie posts de discussões, perguntas e comentários no nosso fórum!",
        link: "/posts",
        label: "Acessar Fórum",
        imagem: ForumIcon, 
      },
      {
        titulo: "Conheça fornecedores de energia renovável e encontre soluções específicas!",
        link: "/fornecimentos",
        label: "Ver Fornecedores",
        imagem: EnergySuppliersIcon, 
      },
    ];    

  return (
    <main className="relative">
      <MainCarousel slides={slides} />
      <ListaFornecimentos title={"Conheça nossos Fornecedores de Energia Limpa!"} link={"/Fornecimentos"} label={"Ver todos Fornecimentos"} reversed={false}/>
      <ContainerOfertas containerOfertas={ofertaContainers} />
      <ListaFornecimentos title={"Fornecimentos Gerados via Energia Solar!"} link={"/Fornecimentos"} label={"Ver todos Fornecimentos"} reversed={true}/>
    </main>
  );
}
