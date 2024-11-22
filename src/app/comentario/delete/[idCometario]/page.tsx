'use client';

import React, { useEffect, useState } from 'react';
import Comentario from '@/types/comentario/comentario.type';
import { notFound, useParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import DeleteForm from '@/components/deleteform/deleteform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Loader from '@/components/loader/loader.component';

const DeleteComentarioForm = () => {
    const [comentario, setComentario] = useState<Comentario | null>(null);
    const params = useParams();
    const id = params.id;
    const { usuario } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchComentario = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/comentario/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar comentário');
                }
                const data = await response.json();
                setComentario(data);
            } catch (error) {
                toastAlerta(
                    'Erro ao buscar comentário: ' + error,
                    'erro'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchComentario();
    }, [id]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Comentário'} />;
    }

    if (!comentario) {
        return notFound();
    }

    if (!usuario || usuario.idUsuario !== comentario.usuario?.idUsuario) {
        return <SemPermissao />;
    }

    const handleDelete = async (comentarioToDelete: Comentario) => {
        try {
            const response = await fetch(`/api/comentario/${comentarioToDelete.idComentario}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao deletar comentário');
            } else {
                toastAlerta("Comentário deletado com sucesso!", 'sucesso');
                router.push('/comentarios');
            }
        } catch (error) {
            toastAlerta('Erro ao deletar comentário: ' + error, 'erro');
        }
    };

    return (
        <DeleteForm
            item={comentario}
            onDelete={handleDelete}
            itemName="comentário"
            itemSpecifiedName={comentario.titulo}
        />
    );
};

export default DeleteComentarioForm;
