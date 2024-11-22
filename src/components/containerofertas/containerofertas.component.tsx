import Oferta from "@/types/containeroferta/containeroferta.type";
import ContainerOferta from "../containeroferta/containeroferta.component";

interface ContainerOfertasProps {
  containerOfertas: Oferta[],
}

const ContainerOfertas = ({ containerOfertas }: ContainerOfertasProps) => {
  return (
    <section className="w-full mx-auto rounded-lg h-fit px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-8">
      {containerOfertas.map((containerOferta, index) => (
        <ContainerOferta key={index} containerOferta={containerOferta} />
      ))}
    </section>
  );
};

export default ContainerOfertas;