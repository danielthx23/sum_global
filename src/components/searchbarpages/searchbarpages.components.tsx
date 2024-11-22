'use client'

import React, { useState, useCallback } from 'react';
import SearchBar from '../searchbar/searchbar.component'; 
import ModalItem from '../modalitem/modalitem.component';
import Input from '../input/input.component';
import Page from '@/types/page/page.type';
import SearchBarItem from '../searchitem/searchitem.component';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarPagesProps {
    pages: Page[];
}

const SearchBarPages: React.FC<SearchBarPagesProps> = ({ pages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalFilteredPages, setModalFilteredPages] = useState<Page[]>(pages);

    const handleModalSearch = useCallback((query: string) => {
        const lowercasedQuery = query.toLowerCase();
        setModalFilteredPages(
            pages.filter((page) => {
                return (
                    page.label.toLowerCase().includes(lowercasedQuery) ||
                    (page.subPages && page.subPages.some(subPage => subPage.label.toLowerCase().includes(lowercasedQuery)))
                );
            })
        );
    }, [pages]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="block sm:hidden flex items-center justify-center h-full w-full px-4">
                <button onClick={openModal} aria-label="Search">
                    <AiOutlineSearch size={24} className="text-foregroundopacity80" />
                </button>
            </div>

            <div className="hidden sm:block">
                <Input onClick={openModal} placeholder={'Buscar por páginas...'} />
            </div>

            <ModalItem
                open={isModalOpen}
                onClose={closeModal}
                modalClassName='z-[-1]'
                boxClassName='w-full max-w-md h-[500px] bg-backgroundopacity80 back rounded-2xl flex items-center shadow-md border border-foregroundopacity20'
                color='white'
            >
                <div className='w-full flex justify-center border-b border-foregroundopacity20 p-1'>
                    <SearchBar 
                        onSearch={handleModalSearch} 
                        placeholder="O que deseja buscar hoje?"
                        formClassName='w-full' 
                        inputClassName='placeholder-neutral-500 w-full px-8 py-4 rounded-2xl bg-transparent text-lg hover:bg-none'
                    />
                </div>
                <ul className='w-full p-2 flex flex-col gap-2 overflow-y-scroll h-full'>
                    {modalFilteredPages.map((page, index) => <SearchBarItem key={index} page={page} />)}
                </ul>
            </ModalItem>
        </div>
    );
};

export default SearchBarPages;
