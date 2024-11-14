import MainCarousel from "@/components/maincarousel/maincarousel.component";
import CarouselSlide from "@/types/maincarouselslide/maincarouselslide.type";
import SolarPanel from "../../public/importantimages/solarpanelnobackground.png"
import BulbClean from "../../public/importantimages/bulbclean.png"
import GreenCertificate from "../../public/importantimages/certificate.png"
import MainCarouselSlideList from "@/components/maincarouselslidelist/maincarouselslidelist.component";
import ListItem from "@/types/listitem/listitem.type";
import { FaBolt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { PiNetworkFill } from "react-icons/pi";
import ListaFornecimentos from "@/components/listafornecimentos/listafornecimentos.component";
import Fornecimento from "@/types/fornecimento/fornecimento.type";
import TipoDeFornecimento from "@/types/tipodefornecimento/tipodefornecimento.type";
import Fornecedor from "@/types/fornecedor/fornecedor.type";
import Usuario from "@/types/usuario/usuario.type";

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
      link: "/fornecedores",
      alt: "Fornecedores de energia limpa",
      textColor: "#ffffff",
    },
    {
      title: "Torne-se um Usuário de Energia Limpa",
      subtitle: "Descubra os 3 dos requisitos para adotar energia limpa:",
      image: BulbClean,
      link: "/como-adotar",
      alt: "Adote energia limpa",
      textColor: "#080808",
      listItems: <MainCarouselSlideList listItems={slideList} />
    },
    {
      title: "Gerencie Certificados de Energia Limpa",
      subtitle: "Oferecemos dashboards para gestão de certificados de energia renovável.",
      image: GreenCertificate,
      link: "/certificados",
      alt: "Certificados de energia limpa",
      textColor: "#080808"
    }
  ];

  const usuario1: Usuario = {
    idUsuario: 1,
    nmUsuario: "João Silva",
    razaoSocial: "João Silva Energia LTDA",
    cnpj: "12.345.678/0001-90",
    cpf: "123.456.789-00",
    flConta: "Empresarial",
    nmSenha: "senhaSegura123",
    imgFoto: "https://picsum.photos/300/300",
    dsTokem: "token_de_autenticacao_joao",
    dtCadastro: new Date("2023-01-01")
};

const usuario2: Usuario = {
    idUsuario: 2,
    nmUsuario: "Maria Oliveira",
    razaoSocial: "Maria Oliveira Energia S/A",
    cnpj: "98.765.432/0001-10",
    cpf: "987.654.321-00",
    flConta: "Empresarial",
    nmSenha: "senhaSegura456",
    imgFoto: "https://picsum.photos/300/300",
    dsTokem: "token_de_autenticacao_maria",
    dtCadastro: new Date("2023-02-01")
};

// Exemplo de fornecedores
const fornecedor1: Fornecedor = {
    fornecedorId: 1,
    usuario: usuario1,
    energiaPrimaria: "Solar",
    dataDeOperacao: new Date("2023-01-01"),
    status: "Ativo",
    capacidadeDeEnergia: 100,
    licenciatura: "Licença A",
    regiao: "Sudeste"
};

const fornecedor2: Fornecedor = {
    fornecedorId: 2,
    usuario: usuario2,
    energiaPrimaria: "Eólica",
    dataDeOperacao: new Date("2023-02-01"),
    status: "Ativo",
    capacidadeDeEnergia: 200,
    licenciatura: "Licença B",
    regiao: "Sul"
};

// Exemplo de tipos de fornecimento (substitua com a implementação real)
const tipoDeFornecimento1: TipoDeFornecimento = {
    tipoDeFornecimentoId: 1,
    origem: "garaio",
    processo: "da minha bunda",
    tipoDeEnergia: "solar",
};

const tipoDeFornecimento2: TipoDeFornecimento = {
    tipoDeFornecimentoId: 2,
    origem: "Aga",
    processo: "ogm",
    tipoDeEnergia: "Hidroeletrica",
};

    // Array de fornecimentos
    const listaDeFornecimentos: Fornecimento[] = [
        {
            fornecimentoId: 1,
            fornecedor: fornecedor1,
            fornecimentoImagem: "https://picsum.photos/1000",
            tipoDeContratacao: "Mensal",
            precoPorKWH: 0.50,
            dataDeVencimento: new Date("2023-12-31"),
            tipoDeFornecimento: tipoDeFornecimento1
        },
        {
            fornecimentoId: 2,
            fornecedor: fornecedor2,
            fornecimentoImagem: "https://picsum.photos/1000",
            tipoDeContratacao: "Anual",
            precoPorKWH: 0.45,
            dataDeVencimento: new Date("2024-12-31"),
            tipoDeFornecimento: tipoDeFornecimento2
        }
    ];

  return (
    <main className="relative">
      <MainCarousel slides={slides} />
      <ListaFornecimentos fornecimentos={listaDeFornecimentos}/>
    </main>
  );
}
