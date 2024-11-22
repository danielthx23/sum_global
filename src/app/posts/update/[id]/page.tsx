'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import PostsForm from '../../_components/postsform/postsform.component';
import Loader from '@/components/loader/loader.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import useAuth from '@/hooks/useauth/useauth.hook';
import Post from '@/types/post/post.type';
import { FormState } from '@/hooks/useform/useform.hook';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const UpdatePostForm = () => {
    const { usuario } = useAuth();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error('Erro recuperando Post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                toastAlerta('Erro recuperando Post: ' + error, 'erro');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Post'} />;
    }

    if (!post) {
        return notFound();
    }

    if (!usuario || usuario.idUsuario !== post.usuario.idUsuario) {
        return <SemPermissao />;
    }

    const handlePostUpdate = async (values: FormState) => {
        try {
            const response = await fetch(`/api/post/${post.idPost}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    usuario: usuario,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toastAlerta('Post atualizado com sucesso!', 'sucesso');
                router.push('/posts')
            } else {
                throw new Error(result.message || 'Falha ao atualizar post');
            }
        } catch (error) {
            toastAlerta(error instanceof Error ? error.message : 'Erro ao atualizar Post', 'erro');
        }
    };

    return (
        <div>
            <PostsForm
                onSubmit={handlePostUpdate}
                initialPost={{
                    idPost: post.idPost,
                    titulo: post.titulo,
                    descricao: post.descricao,
                    imagem: post.imagem,
                    usuario: post.usuario,
                    dataCadastro: post.dataCadastro
                }}
                isUpdate={true} 
            />
        </div>
    );
};

export default UpdatePostForm;
