import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Oferta from "@/types/containeroferta/containeroferta.type";
import ContainerOferta from "../containeroferta/containeroferta.component";

interface ContainerOfertasProps {
  containerOfertas: Oferta[],
}

const ContainerOfertas = ({containerOfertas}: ContainerOfertasProps) => {
  return (
    <section className="w-full mx-auto rounded-lg h-fit px-12 grid grid-cols-3 justify-center items-center gap-8">
      {containerOfertas.map((containerOferta, index) => <ContainerOferta key={index} containerOferta={containerOferta} />)}
    </section>
  );
};

export default ContainerOfertas;
