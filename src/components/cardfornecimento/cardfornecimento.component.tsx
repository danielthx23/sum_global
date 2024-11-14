"use client"

import Fornecimento from "@/types/fornecimento/fornecimento.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { GiPaper } from "react-icons/gi";

interface CardFornecimentoProps {
    fornecimento: Fornecimento;
}

const CardFornecimento = ({ fornecimento }: CardFornecimentoProps) => {
    return (
        <div className="w-full h-[550px] border border-neutral-900 rounded-lg p-4 flex flex-col items-center flex-1 gap-4 bg-gradient-to-bl from-[rgba(0,0,0,0.9)] to-[rgba(0,6,17,0.9)] backdrop-blur-md">
            <figure className="flex items-center justify-center rounded-lg">
                <Image
                    src={fornecimento.fornecimentoImagem}
                    width={400}
                    height={300}
                    alt={fornecimento.tipoDeFornecimento.origem}
                    className="h-44 object-cover rounded-lg"
                />
            </figure>
            <aside className="w-full flex gap-4 px-4">
                <Image
                    src={fornecimento.fornecedor.usuario.imgFoto ? fornecimento.fornecedor.usuario.imgFoto : 'https://imgs.search.brave.com/hnv7vXIodfLJQNFH92BaNbebUI7aCcHzIYcPDeRcUeE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9wcm9maWxl/LWNpcmNsZS1pY29u/LTI1NngyNTYtY205/MWdxbTIucG5n'}
                    width={45}
                    height={45}
                    alt="Imagem da Fornecedora"
                    className="w-12 h-12 object-contain rounded-full"
                />
                <div>
                    <h1>
                        {fornecimento.fornecedor.usuario.nmUsuario ? fornecimento.fornecedor.usuario.nmUsuario : 'Fornecedora sem nome'}
                    </h1>
                </div>
            </aside>
            <article className="h-fit px-4 flex flex-col gap-4 flex-1">
                <h1 className="text-xl underline underline-offset-4">
                    Energia via {fornecimento.tipoDeFornecimento.origem}
                </h1>
                <h2 className="flex items-center gap-2">
                    <GiPaper/>
                    <p>
                        Tipo de contratração {fornecimento.tipoDeContratacao}
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
                                }).format(fornecimento.precoPorKWH)} por KwH
                            </p>
                        </li>
                    </ul>
                </div>
                <h3 className="text-xs">
                    * Contratação apenas paras regiões de: {fornecimento.fornecedor.regiao}
                </h3>
            </article>
            <button className="bg-[#26A5EF] w-full rounded-md py-2 px-2 hover:bg-white hover:text-[#26A5EF] transition-all ease-in-out">
                Entrar em contato com o fornecedor
            </button>
        </div>
    );
}

export default CardFornecimento;