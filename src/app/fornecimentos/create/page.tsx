'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { FormState } from '@/hooks/useform/useform.hook';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import FornecimentosForm from '../_components/fornecimentosforms.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const FornecimentoPostForm = () => {
  const router = useRouter();
  const { usuario } = useAuth();
  const [fornecedorData, setFornecedorData] = useState();

  if (!usuario || usuario.tipoConta !== 'fornecedor') {
    return <SemPermissao />;
  }

  useEffect(() => {
    const fetchFornecedorData = async () => {
        try {
          const response = await fetch(`/api/usuario/${usuario.idUsuario}`);
          if (!response.ok) {
            throw new Error('Falha ao carregar dados do usuario');
          }
          const data = await response.json();
          setFornecedorData(data);
        } catch (error) {
          toastAlerta('Erro ao carregar dados do usuario! ' + error, 'erro');
        }
      };

    fetchFornecedorData();
  }, [usuario]); 

  const submitCallback = async (values: FormState) => {
    try {
      const fornecimentoData: Fornecimento = {
        ...values,
        fornecedor: fornecedorData,
        idFornecimento: 0,
        fornecimentoImagem: values.fornecimentoImagem || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png',
        tipoContrato: values.tipoContrato || '',
        precoKwh: values.precoKwh || 0,
        dataVencimento: new Date(values.dataVencimento),
        tipoEnergia: values.tipoEnergia || '',
        processoObtencao: values.processoObtencao || ''
      };

      const request = await fetch('/api/fornecimento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecimentoData),
      });

      const response = await request.json();
      if (!response.success) {
        throw new Error(response.message);
      }

      toastAlerta('Fornecimento salvado com sucesso!', 'sucesso');
      router.push('/'); 
    } catch (error) {
      toastAlerta('Erro ao salvar fornecimento! ' + error, 'erro');
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
      tipoDeEnergiaOptions={tipoDeEnergiaOptions}
    />
  );
};

export default FornecimentoPostForm;