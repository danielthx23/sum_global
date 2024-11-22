'use client';

import React, { useEffect, useState } from 'react';
import Post from '@/types/post/post.type';
import Image from "next/image";
import { notFound, useParams } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import ComentarioForm from '@/components/comentarioform/comentarioform.component';
import Loader from '@/components/loader/loader.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import CardComentario from '@/components/cardcomentario/cardcomentario.component';

const PostDetails = () => {
    const [post, setPost] = useState<Post | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { usuario } = useAuth(); 
    const params = useParams();
    const id = params.postId; 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                toastAlerta(error instanceof Error ? error.message : 'Erro ao recuperar post', 'erro');
            } finally {
                setLoading(false);
            }
        };

        const fetchComentariosPost = async () => {
            try {
                const response = await fetch(`/api/comentario/post/${id}`);
                if (!response.ok) {
                    throw new Error('Falha ao recuperar comentarios do post');
                }
                const data = await response.json();
                setPost(prevPost => {
                    if (prevPost) {
                        return {
                            ...prevPost,
                            comentarios: data, 
                            idPost: prevPost.idPost, 
                            usuario: prevPost.usuario, 
                            titulo: prevPost.titulo, 
                            descricao: prevPost.descricao, 
                            imagem: prevPost.imagem, 
                            dataCadastro: prevPost.dataCadastro
                        };
                    }})
            } catch (error) {
                toastAlerta(error instanceof Error ? error.message : 'Erro ao recuperar comentarios do post', 'erro');
            } finally {
                setLoading(false);
            }
        }

        fetchPost();

        fetchComentariosPost();
    }, [id]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Post'} />;
    }

    if (!post) {
        return notFound();
    }

    return (
        <main className="w-full p-10">
            <section className='flex gap-8 items-center'>
                <Image
                    src={post.imagem || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
                    alt={`Post image`}
                    width={800}
                    height={400}
                    className="my-4 w-1/4 h-[300px] rounded-md object-cover"
                />
                <article className='flex flex-col gap-2 w-full'>
                    <h1 className="text-2xl font-bold">{post.titulo}</h1>
                    <p className="mb-4">{post.descricao}</p>
                    <div className='flex gap-4 items-center mb-4'>
                        <Image
                            src={post.usuario.imagemFoto || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
                            alt={`User  post profile picture`}
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <span>{post.usuario.nomeUsuario}</span>
                    </div>
                    <p>{post.dataCadastro.toString()}</p>
                </article>
            </section>
            <h2 className="text-xl font-semibold mt-6">Comentários:</h2>
            {usuario?.valorToken && <ComentarioForm postId={post.idPost} />}
            <div className="mt-4">
                {post.comentarios && post.comentarios.length > 0 ? (
                    post.comentarios.map(comentario => (
                        <CardComentario key={comentario.idComentario} comentario={comentario} />
                    ))
                ) : (
                    <p>Não há comentários para este post.</p>
                )}
            </div>
        </main>
    );
};

export default PostDetails;