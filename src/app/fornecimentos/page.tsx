'use client';

import React, { useEffect, useState } from 'react';
import CardFornecimento from '@/components/cardfornecimento/cardfornecimento.component';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import Select from '@/components/select/select.component';
import Input from '@/components/input/input.component';
import SearchBar from '@/components/searchbar/searchbar.component';
import Loader from '@/components/loader/loader.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Link from 'next/link';
import useAuth from '@/hooks/useauth/useauth.hook';

const Fornecimentos = () => {
    const [fornecimentos, setFornecimentos] = useState<Fornecimento[]>([]);
    const [filteredArray, setFilteredArray] = useState<Fornecimento[]>([]);
    const [selectedTipoDeContratacao, setSelectedTipoDeContratacao] = useState<string>("");
    const [maxPreco, setMaxPreco] = useState<number>(Infinity);
    const [minPreco, setMinPreco] = useState<number>(0);
    const [selectedTipoDeEnergia, setSelectedTipoDeEnergia] = useState<string>("");
    const [selectedRegiao, setSelectedRegiao] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { usuario } = useAuth();

    useEffect(() => {
        const fetchFornecimentos = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/fornecimento`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar fornecimentos.');
                }
                const data: Fornecimento[] = await response.json();
                setFornecimentos(data);
            } catch (error) {
                toastAlerta(
                    error instanceof Error ? error.message : "Erro ao carregar fornecimentos.",
                    "erro"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFornecimentos();
    }, []);

    useEffect(() => {
        const filtersApply = (list: Fornecimento[]): Fornecimento[] => {
            return list.filter((fornecimento) => {
                const matchesTipoDeContratacao = selectedTipoDeContratacao
                    ? fornecimento.tipoContrato === selectedTipoDeContratacao
                    : true;

                const matchesPreco = fornecimento.precoKwh <= maxPreco && fornecimento.precoKwh >= minPreco;

                const matchesTipoDeEnergia = selectedTipoDeEnergia
                    ? fornecimento.tipoEnergia === selectedTipoDeEnergia
                    : true;

                const matchesRegiao = selectedRegiao
                    ? fornecimento.fornecedor?.regiao === selectedRegiao
                    : true;

                const matchesSearchQuery = searchQuery
                    ? fornecimento?.fornecedor?.usuario?.nomeUsuario
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    : true;

                return matchesTipoDeContratacao && matchesPreco && matchesTipoDeEnergia && matchesRegiao && matchesSearchQuery;
            });
        };

        const filtered = filtersApply(fornecimentos);
        setFilteredArray(filtered);
    }, [fornecimentos, selectedTipoDeContratacao, maxPreco, minPreco, selectedTipoDeEnergia, selectedRegiao, searchQuery]);

    const resetFilters = () => {
        setSelectedTipoDeContratacao("");
        setMaxPreco(Infinity);
        setMinPreco(0);
        setSelectedTipoDeEnergia("");
        setSelectedRegiao("");
        setSearchQuery("");
    };


    return (
        <main className="w-full flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-center items-center p-4">
            <aside className="w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4 p-4 flex flex-col justify-center gap-4">
                <h2 className="text-lg font-bold">Filtros</h2>
                <Select
                    id="tipoContrato"
                    label="Tipo de Contratação:"
                    options={[
                        { value: "", label: "Todos" },
                        { value: "Mensal", label: "Mensal" },
                        { value: "Anual", label: "Anual" }
                    ]}
                    handleChange={(value) => setSelectedTipoDeContratacao(value)}
                    value={selectedTipoDeContratacao}
                />
                <Input
                    type="number"
                    id="minPreco"
                    label="Preço mínimo por kWh:"
                    value={minPreco}
                    handleChange={(value) => setMinPreco(parseFloat(value) || 0)}
                />
                <Input
                    type="number"
                    id="maxPreco"
                    label="Preço máximo por kWh:"
                    value={maxPreco === Infinity ? "" : maxPreco}
                    handleChange={(value) => setMaxPreco(value ? parseFloat(value) : Infinity)}
                />
                <Select
                    id="tipoEnergia"
                    label="Tipo de Energia:"
                    options={[
                        { value: "", label: "Todos" },
                        { value: "Hidroeletrica", label: "Hidroeletrica" },
                        { value: "Solar", label: "Solar" },
                        { value: "Eólica", label: "Eólica" }
                    ]}
                    handleChange={(value) => setSelectedTipoDeEnergia(value)}
                    value={selectedTipoDeEnergia}
                />
                <Select
                    id="regiao"
                    label="Região:"
                    options={[
                        { value: "", label: "Todas" },
                        { value: "Norte", label: "Norte" },
                        { value: "Sul", label: "Sul" },
                        { value: "Leste", label: "Leste" },
                        { value: "Oeste", label: "Oeste" },
                        { value: "Sudeste", label: "Sudeste" }
                    ]}
                    handleChange={(value) => setSelectedRegiao(value)}
                    value={selectedRegiao}
                />
                <button onClick={resetFilters} className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Resetar Filtros
                </button>
            </aside>
            <section className="w-full p-4 xs:w-full sm:w-full md:w-full lg:w-3/4 xl:w-3/4">
                <SearchBar
                    onSearch={(query) => setSearchQuery(query)}
                    placeholder="Procurar pelo nome do fornecedor..."
                    formClassName="w-2/4"
                    loading={loading}
                />
                {usuario?.valorToken && usuario?.tipoConta === 'fornecedor' && <div className="w-full flex justify-end my-8">
                    <Link href="/fornecimentos/create" className="py-2 px-4 bg-backgroundlight text-foreground rounded-md hover:bg-foreground hover:text-backgroundlight transition-all ease-in-out">
                        Adicionar Novo Fornecimento
                    </Link>
                </div>}
                {loading ? (
                    <Loader
                        classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'}
                        classNameLoader={"w-14 h-14"}
                        haveLabel={true}
                        label={"Recuperando todos fornecimentos"}
                    />
                ) : (
                    <>
                        {filteredArray.length === 0 ? (
                            <div className="text-center mt-4 h-[600px] flex justify-center items-center">
                                <p className="text-lg">Parece que ainda não há nenhum fornecimento.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredArray.map((fornecimento) => (
                                    <CardFornecimento key={fornecimento.idFornecimento} fornecimento={fornecimento} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default Fornecimentos;
