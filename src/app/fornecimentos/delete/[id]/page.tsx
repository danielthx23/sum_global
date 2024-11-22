'use client';

import React, { useEffect, useState } from 'react';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { useParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import DeleteForm from '@/components/deleteform/deleteform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Loader from '@/components/loader/loader.component';

const DeleteFornecimentoForm = () => {
    const [fornecimento, setFornecimento] = useState<Fornecimento | null>(null);
    const params = useParams();
    const id = params.id;
    const { usuario } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const fetchFornecimento = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/fornecimento/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar fornecimento');
                }
                const data = await response.json();
                setFornecimento(data);
            } catch (error) {
                toastAlerta(
                    'Erro ao buscar fornecimento: ' + error,
                    'erro'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFornecimento();
    }, [id]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Fornecimento'} />;
    }

    if (!fornecimento) {
        return <div>Fornecimento não encontrado</div>;
    }

    if (!usuario || usuario.idUsuario !== fornecimento.fornecedor?.usuario?.idUsuario) {
        return <SemPermissao />;
    }

    const handleDelete = async (fornecimentoToDelete: Fornecimento) => {
        try {
            const response = await fetch(`/api/fornecimento/${fornecimentoToDelete.idFornecimento}`, {
                method: 'DELETE',
            });

            if (response.status !== 500) {
                throw new Error('Falha ao deletar fornecimento');
            } else {
                toastAlerta("Fornecimento deletado com sucesso!", 'erro')
                router.push('/fornecimentos')
            }

        } catch (error) {
            toastAlerta('Erro deletando fornecimento' + error, 'erro');
        }
    };

    return (
        <DeleteForm
            item={fornecimento}
            onDelete={handleDelete}
            itemName="fornecimento"
            itemSpecifiedName={fornecimento.tipoEnergia}
        />
    );
};

export default DeleteFornecimentoForm;

