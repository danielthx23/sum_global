'use client'

import React, { useRef } from 'react';
import Input from '../input/input.component';
import useForm, { FormState } from '@/hooks/useform/useform.hook';
import { FaSearch } from 'react-icons/fa';
import Loader from '../loader/loader.component';

interface SearchBarProps {
    onSearch?: (query: string) => void;
    onFilterChange?: () => void; 
    formClassName?: string;
    inputClassName?: string; 
    placeholder?: string;
    loading?: boolean; 
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onFilterChange,
    formClassName,
    inputClassName,
    placeholder = "Buscar...", 
    loading = false, 
}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const submitCallback = async (values: FormState) => {
        if (onSearch && values.query) {
            onSearch(values.query);
        }
    };

    const { data, handleChange, handleSubmit } = useForm(
        formRef,
        { query: '' }, 
        submitCallback
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        if (onFilterChange) {
            onFilterChange(); 
        }
        if (onSearch) {
            onSearch(e.target.value); 
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={`w-full flex justify-center ${formClassName}`}>
            <div className="relative w-full">
                <Input
                    type="text"
                    name="query"
                    value={data.query}
                    handleChange={(_, e) => handleInputChange(e)} 
                    placeholder={placeholder}
                    className={`w-full pr-10 ${inputClassName}`} 
                    wrapperClassName='w-full'
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                    aria-label="Search"
                    disabled={loading} 
                >
                    {loading ? (
                        <Loader classNameWrapper={'w-fit h-fit'} classNameLoader={'w-fit h-fit border-foregroundopacity20'} haveLabel={false} label={''}/>
                    ) : (
                        <FaSearch className="text-foregroundopacity20" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;