'use client';

import CardCertificado from "@/components/cardcertificado/cardcertificado.component";
import Loader from "@/components/loader/loader.component";
import SemPermissao from "@/components/sempermissao/sempermissao.component";
import useAuth from "@/hooks/useauth/useauth.hook";
import Certificado from "@/types/certificado/certificado.type";
import { toastAlerta } from "@/utils/toastalert/toastalert.util";
import { useEffect, useState } from "react";

const MyCertificados = () => {
    const { usuario } = useAuth();  
    const [filteredCertificados, setFilteredCertificados] = useState<Certificado[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCertificados = async () => {
            if (!usuario) return;
    
            setLoading(true);
    
            try {
                const response = await fetch(`/api/certificado/usuario/${usuario.idUsuario}`);
                
                if (response.status === 404) {
                    toastAlerta('Nenhum certificado encontrado para este usuário.', 'info');
                    return; 
                }
    
                if (!response.ok) {
                    throw new Error('Failed to fetch certificados');
                }
    
                const data = await response.json();
                setFilteredCertificados(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toastAlerta(`Falha ao recuperar certificados para o usuário. Erro: ${error.message}`, 'erro');
                } else {
                    toastAlerta('Erro desconhecido ao recuperar certificados.', 'erro');
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchCertificados();
    }, [usuario]);
    

    if (!usuario?.valorToken) {
        return <SemPermissao/>
    }

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={"w-14 h-14"} haveLabel={true} label={'Carregando seus certificados'} />;
    }

    return (
        <main className="w-full p-10 flex flex-col items-center">
            {filteredCertificados.length === 0 ? (
                <div className="w-full text-center py-8 h-screen flex flex-col gap-4 justify-center items-center">
                    <h2 className="text-xl font-semibold">Você ainda não possui Certificados.</h2>
                    <p className="text-gray-500 mt-4">Utilize os dashboards para ser elegivel a um!</p>
                </div>
            ) : (
                <>
                <h1 className="text-2xl font-bold mb-6">Meus Certificados</h1>
                <div className="w-full p-8 grid grid-cols-4 gap-4">
                    {filteredCertificados.map((certificado) => (
                        <CardCertificado key={certificado.idCertificado} certificado={certificado} />
                    ))}
                </div>
                </>
            )}
            <section className="w-full mt-10 p-6 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                <p className="text-gray-500">Esta seção está em desenvolvimento. Em breve, você poderá visualizar estatísticas e informações relevantes sobre seus certificados.</p>
            </section>
        </main>
    );
};

export default MyCertificados;