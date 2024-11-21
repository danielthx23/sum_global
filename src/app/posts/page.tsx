'use client'

import React, { useEffect, useState } from 'react';
import ListaPosts from "@/components/listaposts/listaposts.component";
import Post from "@/types/post/post.type";
import SearchBar from '@/components/searchbar/searchbar.component';
import Loader from '@/components/loader/loader.component';
import useAuth from '@/hooks/useauth/useauth.hook';
import Link from 'next/link';

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [perPage] = useState<number>(4);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const { usuario } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/post'); // Adjust the endpoint as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data);
                setDisplayedPosts(data.slice(0, perPage));
                setHasMore(data.length > perPage);
            } catch (error) {
                console.error('Error fetching posts:', error);
                alert('Failed to load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [perPage]);

    useEffect(() => {
        const filtered = posts.filter(post => 
            post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.descricao.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
        setDisplayedPosts(filtered.slice(0, perPage));
        setHasMore(filtered.length > perPage);
    }, [searchQuery, posts]);

    const loadMore = () => {
        const nextPage = page + 1;
        const nextItems = filteredPosts.slice(0, nextPage * perPage);
        setDisplayedPosts(nextItems);
        setPage(nextPage);
        setHasMore(nextItems.length < filteredPosts.length);
    };

    return (
        <main className="w-full p-10 flex justify-center items-center flex-col">
            <SearchBar onSearch={setSearchQuery} placeholder="Procurar por título ou descrição..." loading={loading} inputClassName='w-3/4 flex justify-center' />
            {usuario?.valorToken && (
                <div className='w-full py-8 flex justify-end'>
                    <Link href="/posts/create" className='px-4 py-2 bg-foreground text-background rounded-md m-4'>Criar novo Post</Link>
                </div>
            )}
            {loading ? (
                <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Posts'} />
            ) : (
                <>
                    <ListaPosts posts={displayedPosts} />
                    {hasMore && (
                        <footer className="container mx-auto p-4 mt-8 text-center">
                            <button
                                onClick={loadMore}
                                className={`bg-backgroundlight hover:bg-backgroundlight text-foreground font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <Loader classNameWrapper={''} classNameLoader={''} haveLabel={false} label={''} /> : 'Carregar Mais'}
                            </button>
                        </footer>
                    )}
                </>
            )}
        </main>
    );
}

export default Posts;