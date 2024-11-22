'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { FormState } from '@/hooks/useform/useform.hook';
import FornecimentosForm from '../../_components/fornecimentosforms.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Loader from '@/components/loader/loader.component';

const UpdateFornecimentoForm = () => {
  const { usuario } = useAuth();
  const params = useParams();
  const id = params.id;

  const [fornecimento, setFornecimento] = useState<Fornecimento | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFornecimento = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/fornecimento/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar fornecimento');
        }
        const data = await response.json();
        setFornecimento(data);
      } catch (error) {
        toastAlerta(
          error instanceof Error ? error.message : 'Erro ao carregar fornecimento',
          'erro'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFornecimento();
  }, [id]);

  if (loading) {
    return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando Fornecimento'} />;
}

  if (!fornecimento) {
    return notFound();
  }

  if (!usuario || usuario.idUsuario !== fornecimento.fornecedor?.usuario?.idUsuario) {
    return <SemPermissao />;
  }

  const submitCallback = async (values: FormState) => {
    try {

      const response = await fetch(`/api/fornecimento/${fornecimento.idFornecimento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values
        }),
      });

      const result = await response.json();
            if (response.ok) {
                toastAlerta('Fornecimento atualizado com sucesso!', 'sucesso');
                router.push('/fornecimentos')
            } else {
                throw new Error(result.message || 'Falha ao atualizar Fornecimento');
            }
    } catch (error) {
      toastAlerta(
        error instanceof Error ? error.message : 'Erro ao atualizar o fornecimento',
        'erro'
      );
    }
  };

  const tipoDeEnergiaOptions = [
    { value: 'EnergiaSolar', label: 'Energia Solar' },
    { value: 'EnergiaEolica', label: 'Energia Eólica' },
    { value: 'EnergiaHidreletrica', label: 'Energia Hidrelétrica' },
  ];

  const tipoDeContratoOptions = [
    { value: 'Anual', label: 'Anual' },
    { value: 'Mensal', label: 'Mensal' },
    { value: 'Vitalicio', label: 'Vitalicio' },
    { value: 'A Combinar', label: 'A Combinar' },
  ];

  return (
    <FornecimentosForm
      onSubmit={submitCallback}
      initialFornecimento={fornecimento}
      tipoDeEnergiaOptions={tipoDeEnergiaOptions}
      isUpdate={true} tipoDeContratoOptions={tipoDeContratoOptions}    />
  );
};

export default UpdateFornecimentoForm;
