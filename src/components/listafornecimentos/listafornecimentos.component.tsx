"use client";

import { useEffect, useState } from "react";
import CardFornecimento from "../cardfornecimento/cardfornecimento.component";
import Fornecimento from "@/types/fornecimento/fornecimento.type";
import CustomSwiper from "../customswiper/customswiper.component";
import LinkRedirect from "../linkredirect/linkredirect.component";
import Loader from "../loader/loader.component";
import { toastAlerta } from "@/utils/toastalert/toastalert.util";
import Link from "next/link";
import useAuth from "@/hooks/useauth/useauth.hook";

interface ListaFornecimentosProps {
    title: string;
    link: string;
    label: string;
    reversed?: boolean;
}

const ListaFornecimentos = ({ title, link, label, reversed }: ListaFornecimentosProps) => {
    const [slidesPerView, setSlidesPerView] = useState(4);
    const [fornecimentos, setFornecimentos] = useState<Fornecimento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { usuario } = useAuth();

    const updateSlidesPerView = () => {
        const width = window.innerWidth;
        if (width < 940) {
            setSlidesPerView(1);
        } else if (width < 1268) {
            setSlidesPerView(2);
        } else if (width < 1824) {
            setSlidesPerView(3);
        } else {
            setSlidesPerView(4);
        }
    };

    useEffect(() => {
        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);
        return () => window.removeEventListener("resize", updateSlidesPerView);
    }, []);

    useEffect(() => {
        const fetchFornecimentos = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/fornecimento");
                if (!response.ok) {
                    throw new Error("Falha ao recuperar fornecimentos");
                }
                const data: Fornecimento[] = await response.json();
                setFornecimentos(data);
            } catch (error) {
                toastAlerta("Erro ao recuperar fornecimentos", 'erro')
            } finally {
                setLoading(false);
            }
        };

        fetchFornecimentos();
    }, []);

    return (
        <div className="w-full h-fit px-10 py-20 overflow-x-hidden">
            <h1 className="text-[2rem] pb-32 text-center font-black bg-gradient-to-t from-foreground to-foregroundlight text-transparent bg-clip-text">
                {title}
            </h1>
            <div className="w-full relative left-0 z-[-1]">
                <div
                    className={`absolute -left-10 -top-[10rem] blur-3xl w-screen ${
                        reversed ? "bg-gradient-to-l" : "bg-gradient-to-r"
                    } from-gradientcolor via-transparent to-gradientcolor h-96`}
                ></div>
                <div
                    className={`absolute -top-[10rem] ${
                        reversed ? "left-5" : "right-5"
                    } w-16 h-16 bg-yellow-100 dark:bg-gray-200 blur-lg rounded-full`}
                ></div>
                <div
                    className={`absolute -top-[10rem] ${
                        reversed ? "left-5" : "right-5"
                    } w-20 h-20 bg-yellow-300 dark:bg-gray-600 blur-lg rounded-full z-1`}
                ></div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-[400px]">
                    <Loader
                        classNameWrapper={"w-full h-full flex flex-col gap-4 justify-center items-center"}
                        classNameLoader={"w-14 h-14"}
                        haveLabel={true}
                        label={"Carregando Fornecimentos"}
                    />
                </div>
            ) : fornecimentos.length === 0 ? (
                <div className="text-center flex flex-col gap-2 justify-center items-center h-[400px]">
                    <p className="text-lg mb-4">Parece que ainda não há nenhum fornecimento.</p>
                    {usuario?.valorToken && usuario?.tipoConta == 'fornecedor' && <Link href="/fornecimentos/create" className="w-fit bg-backgroundlight text-foreground hover:bg-foreground hover:text-backgroundlight transition-all ease-in-out px-8 py-3 rounded-md">
                        Seja o primeiro a criar
                    </Link>}
                </div>
            ) : (
                <CustomSwiper
                    id={"Swiper-Fornecimento"}
                    slides={fornecimentos.map((fornecimento) => (
                        <CardFornecimento
                            key={fornecimento.idFornecimento}
                            fornecimento={fornecimento}
                        />
                    ))}
                    slidesPerView={slidesPerView}
                    arrowColor="white"
                    navigation={true}
                    pagination={false}
                    spaceBetween={50}
                />
            )}
            <aside className="p-8 underline">
                <div className="absolute -left-10 blur-3xl w-screen bg-gradient-to-r from-gradientcolor to-transparent h-96 z-[-1]"></div>
                <LinkRedirect link={link} title={label} />
            </aside>
        </div>
    );
};

export default ListaFornecimentos;
