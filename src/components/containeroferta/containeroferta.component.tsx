import Link from "next/link";
import Image from "next/image";
import Oferta from "@/types/containeroferta/containeroferta.type";

interface ContainerOfertaProps {
  containerOferta: Oferta
}

const ContainerOferta = ({ 
  containerOferta
}: ContainerOfertaProps) => {
  return (
    <section className="w-full rounded-lg h-[600px] bg-backgroundlight my-8 backdrop-blur-lg bg-opacity-10 px-36 flex flex-col justify-center items-center gap-8 text-center border border-foregroundopacity20">
      <article className="max-w-2xl flex flex-col items-center gap-4">
        <h1 className="text-xl text-foreground font-black">{containerOferta.titulo}</h1>
        {containerOferta.subtitulo && <h2 className="text-xl text-foregroundopacity70">{containerOferta.subtitulo}</h2>}
        {containerOferta.texto && <p className="text-lg text-foregroundopacity50">{containerOferta.texto}</p>}
      </article>

      {containerOferta.imagem && (
        <figure className="relative w-[150px] lg:w-[250px] h-auto">
          <Image
            src={containerOferta.imagem}
            alt={containerOferta.titulo}
            width={250}
            height={250}
            className="object-contain"
            priority
          />
        </figure>
      )}

      <Link 
        href={containerOferta.link} 
        className="px-8 py-3 text-lg font-medium text-foreground border-2 border-foregroundopacity20 rounded-md bg-background hover:bg-background hover:text-foreground transition-all duration-200 ease-in-out"
      >
        {containerOferta.label}
      </Link>
    </section>
  );
};

export default ContainerOferta;
