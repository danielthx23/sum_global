'use client';

import React, { useEffect, useState } from 'react';
import Post from '@/types/post/post.type';
import { notFound, useParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import DeleteForm from '@/components/deleteform/deleteform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import Loader from '@/components/loader/loader.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const DeletePostForm = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { usuario } = useAuth(); // Logged-in user
    const params = useParams();
    const id = params.postId; 
    const router = useRouter()

    useEffect(() => {
        if (!id) {
            setError('Post ID is required');
            setLoading(false);
            return;
        }

        const fetchPost = async () => {
            try {
                console.log(id)
                const response = await fetch(`/api/post/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                toastAlerta("Erro ao deletar Post:" + error, 'erro')
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Post'} />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!post) {
        return notFound();
    }
  
    const handleDelete = async (postToDelete: Post) => {
        try {
            const response = await fetch(`/api/post/${postToDelete.idPost}`, {
                method: 'DELETE',
            });

            if (response.status !== 500) {
                throw new Error('Failed to delete the post');
            } else {
                toastAlerta("Post deletado com sucesso!", 'erro')
                router.push('/posts')
            }

        } catch (error) {
            toastAlerta('Erro deletando post' + error, 'erro');
        }
    };

    if (!usuario) {
        return <SemPermissao />;
    }
  
    return (
        <DeleteForm
            item={post}
            itemName="post"
            itemSpecifiedName={post.titulo}
            onDelete={handleDelete}
        />
    );
};

export default DeletePostForm;