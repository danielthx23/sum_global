"use client"

import useAuth from "@/hooks/useauth/useauth.hook";
import Fornecimento from "@/types/fornecimento/fornecimento.type";
import Image from "next/image";
import Link from "next/link";
import { RiContractLine } from "react-icons/ri";
import AlterDeleteTooltip from "../alterdeletetooltip/alterdeletetooltip.component";

interface CardFornecimentoProps {
    fornecimento: Fornecimento;
}

const CardFornecimento = ({ fornecimento }: CardFornecimentoProps) => {
    const { usuario } = useAuth();
    
    return (
        <div className="w-full h-[500px] border border-foregroundopacity20 shadow-lg rounded-lg p-4 flex flex-col items-center flex-1 gap-4 bg-gradient-to-bl from-backgroundlight to-gradientcolor backdrop-blur-md">
            <figure className="w-full flex items-center justify-center rounded-lg">
                <Image
                    src={fornecimento.fornecimentoImagem ? fornecimento.fornecimentoImagem : "https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png"}
                    width={400}
                    height={300}
                    alt={'Imagem do fornecimento'}
                    className="h-44 object-cover w-full rounded-lg"
                />
            </figure>
            <aside className="w-full flex gap-4 px-4 items-center text-foreground">
                <Image
                    src={fornecimento.fornecedor?.usuario.imagemFoto ? fornecimento.fornecedor?.usuario.imagemFoto : 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
                    width={45}
                    height={45}
                    alt="Imagem da Fornecedora"
                    className="w-12 h-12 object-contain rounded-full"
                />
                    <h1 className="w-full">
                        {fornecimento?.fornecedor?.usuario?.razaoSocial ? fornecimento.fornecedor.usuario.razaoSocial : 'Fornecedora sem nome'}
                    </h1>
                    { usuario?.idUsuario && (
                <div className="w-fit flex justify-end">
                <AlterDeleteTooltip postId={usuario?.idUsuario} path={"/fornecimentos"}/>
            </div>
            )}
            </aside>
            <article className="h-fit px-4 w-full flex flex-col gap-4 flex-1 text-foreground">
                <h1 className="text-xl underline underline-offset-4">
                    Energia via {fornecimento.tipoEnergia}
                </h1>
                <h2 className="flex items-center gap-2">
                    <RiContractLine />
                    <p>
                        Tipo de contratração: {fornecimento.tipoContrato}
                    </p>
                </h2>
                <div className="flex items-align gap-4">
                    <ul className="flex flex-col gap-1 overflow-hidden">

                        <li
                            className="flex gap-3 items-center cursor-pointer z-10"
                        >
                            <p className="text-xl flex items-center gap-1">
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(fornecimento.precoKwh)} <span className="text-sm">por KwH</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <h3 className="text-xs">
                    * Contratação apenas paras regiões do: {fornecimento?.fornecedor?.regiao}
                </h3>
            </article>
            <Link 
                href={usuario?.valorToken ? `/fornecimentos/${fornecimento?.idFornecimento}` : "#"} 
                className={`bg-foreground text-center text-background w-full rounded-md py-2 px-2 hover:bg-background hover:text-foreground transition-all ease-in-out ${!usuario?.valorToken ? "cursor-not-allowed opacity-50" : ""}`}
            >
                {usuario?.valorToken ? "Entrar em contato com o fornecedor" : "Logue com sua conta antes"}
            </Link>
        </div>
    );
}

export default CardFornecimento;
