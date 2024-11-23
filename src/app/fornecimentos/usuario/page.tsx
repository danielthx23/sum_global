'use client';

import CardFornecimento from "@/components/cardfornecimento/cardfornecimento.component";
import Loader from "@/components/loader/loader.component";
import useAuth from "@/hooks/useauth/useauth.hook";
import Fornecimento from "@/types/fornecimento/fornecimento.type";
import { toastAlerta } from "@/utils/toastalert/toastalert.util";
import Link from "next/link";
import { useEffect, useState } from "react";

const MeusFornecimentos = () => {
    const { usuario } = useAuth();
    const [filteredFornecimentos, setFilteredFornecimentos] = useState<Fornecimento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserFornecimentos = async () => {
            if (usuario) {
                setLoading(true);
                try {
                    const response = await fetch(`/api/fornecimento/usuario/${usuario.idUsuario}`);
                    
                    if (response.status === 404) {
                        toastAlerta('Nenhum fornecimento encontrado para este usuário.', 'info');
                        return; 
                    }
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch fornecimentos');
                    }
    
                    const data = await response.json();
                    setFilteredFornecimentos(data);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        toastAlerta(`Falha ao recuperar fornecimentos por usuário. Erro: ${error.message}`, 'erro');
                    } else {
                        toastAlerta('Erro desconhecido ao recuperar fornecimentos.', 'erro');
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
    
        fetchUserFornecimentos();
    }, [usuario]);


    if (loading) {
        return <Loader classNameWrapper={"h-screen w-full flex flex-col gap-4 items-center justify-center"} classNameLoader={"w-14 h-14"} haveLabel={true} label={"Carregando seus fornecimentos"} />;
    }

    return (
        <main className="w-full p-10 flex flex-col items-center">
            {filteredFornecimentos.length === 0 ? (
                <div className="w-full text-center py-8 h-screen flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-xl font-semibold">Você ainda não possui Fornecimentos.</h2>
                    {usuario?.tipoConta === 'fornecedor' && (<><p className="text-gray-500 mt-4">Que tal criar o seu primeiro Fornecimento?</p>
                    <Link href="/fornecimentos/create" className='mt-4 px-8 py-2 bg-foreground text-background hover:bg-background hover:text-foreground transition-all ease-in-out rounded-md'>Criar Fornecimento</Link></>)}
                </div>
            ) : (
                <>
                <h1 className="text-2xl font-bold mb-6">Meus Fornecimentos</h1>
                <div className="w-full p-8 grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredFornecimentos.map((fornecimento) => (
                        <CardFornecimento key={fornecimento.idFornecimento} fornecimento={fornecimento} />
                    ))}
                </div>
                </>
            )}
        </main>
    );
};

export default MeusFornecimentos;
