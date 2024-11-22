'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { FormState } from '@/hooks/useform/useform.hook';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import FornecimentosForm from '../_components/fornecimentosforms.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Usuario from '@/types/usuario/usuario.type';

const FornecimentoPostForm = () => {
  const router = useRouter();
  const { usuario } = useAuth();
  const [fornecedorData, setFornecedorData] = useState<Usuario>();

  useEffect(() => {
    const fetchFornecedorData = async () => {
        try {
          const response = await fetch(`/api/usuario/${usuario?.idUsuario}`);
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

  if (!usuario || usuario.tipoConta !== 'fornecedor') {
    return <SemPermissao />;
  }

  const submitCallback = async (values: FormState) => {
    try {
      const fornecimentoData: Fornecimento = {
        ...values,
        fornecedor: fornecedorData?.fornecedor,
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

      if (!request.ok) {
        const errorData = await request.json();
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido.');
      }

      const response = await request.json();
      toastAlerta('Fornecimento salvado com sucesso!', 'sucesso');
      router.push('/fornecimentos'); 
    } catch (error) {
      toastAlerta("Erro ao salvar o fornecimento: " + error, 'erro');
    }
  };

  const tipoDeEnergiaOptions = [
    { value: 'Solar', label: 'Energia Solar' },
    { value: 'Eólica', label: 'Energia Eólica' },
    { value: 'Hidroeletrica', label: 'Energia Hidrelétrica' },
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
      tipoDeEnergiaOptions={tipoDeEnergiaOptions} tipoDeContratoOptions={tipoDeContratoOptions}    />
  );
};

export default FornecimentoPostForm;