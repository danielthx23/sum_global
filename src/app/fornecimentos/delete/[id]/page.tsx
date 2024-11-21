'use client';

import React, { useEffect, useState } from 'react';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { useParams } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import DeleteForm from '@/components/deleteform/deleteform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';

const DeleteFornecimentoForm = () => {
    const [fornecimento, setFornecimento] = useState<Fornecimento | null>(null);
    const params = useParams();
    const id = params.id;
    const { usuario } = useAuth();

    useEffect(() => {
        const fetchFornecimento = async () => {
            try {
                const response = await fetch(`/api/fornecimento/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar fornecimento');
                }
                const data = await response.json();
                setFornecimento(data);
            } catch (error) {
                toastAlerta(
                    error instanceof Error ? error.message : 'Erro ao buscar fornecimento',
                    'erro'
                );
            }
        };

        fetchFornecimento();
    }, [id]);

    if (!fornecimento) {
        return <div>Fornecimento não encontrado</div>;
    }

    if (!usuario || usuario.idUsuario !== fornecimento.fornecedor?.usuario?.idUsuario) {
        return <SemPermissao />;
    }

    const handleDelete = async (fornecimentoToDelete: Fornecimento) => {
        try {
            const response = await fetch(`/api/fornecimentos/${fornecimentoToDelete.idFornecimento}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir o fornecimento');
            }

            toastAlerta('Fornecimento excluído com sucesso!', 'sucesso');
        } catch (error) {
            toastAlerta(
                error instanceof Error ? error.message : 'Erro ao excluir fornecimento',
                'erro'
            );
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
function toastAlerta(arg0: string, arg1: string) {
    throw new Error('Function not implemented.');
}

