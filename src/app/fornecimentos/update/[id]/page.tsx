'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { FormState } from '@/hooks/useform/useform.hook';
import FornecimentosForm from '../../_components/fornecimentosforms.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const UpdateFornecimentoForm = () => {
  const { usuario } = useAuth();
  const params = useParams();
  const id = params.id;

  const [fornecimento, setFornecimento] = useState<Fornecimento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFornecimento = async () => {
      try {
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
    return <div>Carregando...</div>;
  }

  if (!fornecimento) {
    return <div>Fornecimento não encontrado</div>;
  }

  if (!usuario || usuario.idUsuario !== fornecimento.fornecedor?.usuario?.idUsuario) {
    return <SemPermissao />;
  }

  const submitCallback = async (values: FormState) => {
    try {
      const updatedFornecimentoData: Fornecimento = {
        ...fornecimento,
        ...values,
      };

      const request = await fetch(`/api/fornecimentos/${fornecimento.idFornecimento}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFornecimentoData),
      });

      if (!request.ok) {
        const errorResponse = await request.json();
        throw new Error(errorResponse.message || 'Erro ao atualizar o fornecimento');
      }

      toastAlerta('Fornecimento atualizado com sucesso!', 'sucesso');
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

  return (
    <FornecimentosForm
      onSubmit={submitCallback}
      initialFornecimento={fornecimento}
      tipoDeEnergiaOptions={tipoDeEnergiaOptions}
      isUpdate={true}
    />
  );
};

export default UpdateFornecimentoForm;
