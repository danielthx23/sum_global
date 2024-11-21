import { StaticImageData } from "next/image";

export default interface Oferta {
    imagem?: string | StaticImageData,
    titulo: string,
    subtitulo?: string,
    texto?: string,
    link: string,
    label: string,
  }
  