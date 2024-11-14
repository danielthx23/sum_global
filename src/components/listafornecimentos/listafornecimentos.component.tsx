"use client"

import { useEffect, useState } from "react";
import CardFornecimento from "../cardfornecimento/cardfornecimento.component";
import Fornecimento from "@/types/fornecimento/fornecimento.type";
import CustomSwiper from "../customswiper/customswiper.component";
import LinkRedirect from "../linkredirect/linkredirect.component";

interface ListaFornecimentosProps {
    fornecimentos: Fornecimento[]
}

const ListaFornecimentos = ({ fornecimentos }: ListaFornecimentosProps) => {
    const [slidesPerView, setSlidesPerView] = useState(4);

    const updateSlidesPerView = () => {
        const width = window.innerWidth;
        if (width < 940) { 
            setSlidesPerView(1);
        } else if (width < 1268) { 
            setSlidesPerView(2);
        } else if (width < 1824) { 
            setSlidesPerView(3);
        } else if (width > 1824) { 
            setSlidesPerView(4);
        }
    };

    useEffect(() => {
        updateSlidesPerView(); 
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    return (
        <div className="w-full h-fit px-10 py-12">
            <h1 className="text-3xl p-11 underline">Todos Fornecimentos de Energia</h1>
            <div className="absolute left-0 z-[-1]">
                <div className="absolute -top-20 left-0 h-96 w-96 rounded-full bg-[#2a0707] blur-2xl opacity-25"></div>
                <div className="absolute -top-10 left-[50rem] h-96 w-96 rounded-full bg-[#252007] blur-2xl opacity-25"></div>
                <div className="absolute -top-10 left-[20rem] h-96 w-96 rounded-full bg-[#09072f] blur-2xl opacity-25"></div>
            </div>
            <CustomSwiper 
                id={"Swiper-Fornecimento"}
                slides={fornecimentos.map((fornecimento) => (<CardFornecimento key={fornecimento.fornecimentoId} fornecimento={fornecimento}/>))}
                slidesPerView={slidesPerView}
                arrowColor="white"
                navigation={true}
                pagination={false}
                spaceBetween={50}
            />
            <aside className="p-8">
                <LinkRedirect link={"/Fornecimentos"} title={"Todos Fornecimentos"}/>
            </aside>
        </div>
    );
}

export default ListaFornecimentos;