'use client'

import React, { useEffect, useState } from 'react';
import ListaPosts from "@/components/listaposts/listaposts.component";
import Loader from '@/components/loader/loader.component';
import useAuth from '@/hooks/useauth/useauth.hook';
import Post from "@/types/post/post.type";
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const MyPosts = () => {
    const { usuario } = useAuth(); 
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (usuario) {
                try {
                    const response = await fetch(`/api/post/usuario/${usuario.idUsuario}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch posts');
                    }
                    const data = await response.json();
                    setUserPosts(data);
                } catch (error) {
                    toastAlerta("Falha ao recuperar Posts por Usuário: " + error, 'erro')
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [usuario]);

    if (loading) {
        return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando seus Posts'} />;
    }

    if (userPosts && userPosts.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <h2 className="text-xl font-semibold">Você ainda não possui posts.</h2>
                <p className="text-gray-500 mt-4">Que tal criar o seu primeiro post?</p>
            </div>
        );
    }

    return (
        <main className="w-full p-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6">Meus Posts</h1>
            <ListaPosts posts={userPosts} />
        </main>
    );
};

export default MyPosts;