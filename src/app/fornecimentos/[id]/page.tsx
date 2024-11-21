'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import Input from "@/components/input/input.component"; // Componente de entrada
import Textarea from "@/components/textarea/textarea.component"; // Componente de textarea
import useForm, { FormState } from "@/hooks/useform/useform.hook"; // Hook de formulário
import Button from '@/components/button/button.component';
import Loader from '@/components/loader/loader.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const FornecimentoDetails = () => {
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [fornecimento, setFornecimento] = useState<Fornecimento | null>(null);
  const [totalCost, setTotalCost] = useState(0);

  const {
    data: { email, kWh, message },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errors,
    errorsCount,
  } = useForm(
    formRef,
    { email: '', kWh: 0, message: '' }, 
    async () => {
      toastAlerta(`Email enviado com sucesso!`, 'sucesso');
    },
    async (error: Error) => alert(error.message),
    (form) => {
      const errors: { [key: string]: string } = {};
      if (!form.email) errors.email = 'O e-mail é obrigatório';
      if (form.kWh <= 0) errors.kWh = 'A quantidade de kWh deve ser maior que 0';
      if (!form.message) errors.message = 'A mensagem é obrigatória';
      return errors;
    }
  );

  useEffect(() => {
    const fetchFornecimento = async () => {
      const fornecimentoId = Number(params.id);
      try {
        const response = await fetch(`/api/fornecimento/${fornecimentoId}`);
        if (!response.ok) {
          throw new Error('Fornecimento não encontrado');
        }
        const data: Fornecimento = await response.json();
        setFornecimento(data);
      } catch (error) {
        console.error('Error fetching fornecimento:', error);
        setFornecimento(null);
      }
    };

    fetchFornecimento();
  }, [params.id]);

  useEffect(() => {
    if (fornecimento && kWh > 0) {
      setTotalCost(kWh * fornecimento.precoKwh);
    }
  }, [kWh, fornecimento]);

  if (!fornecimento) {
    return <div>Fornecimento não encontrado</div>;
  }

  return (
    <div className="w-[700px] mx-auto flex flex-col gap-4 my-8 rounded-md shadow-md p-12">
      <h1 className="text-2xl mb-4">Entre em contato com o fornecedor!</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Seu E-mail"
          name="email"
          value={email}
          handleChange={(_, e) => handleChange(e)}
          required
          placeholder="seuemail@exemplo.com"
          className="border p-2 w-full"
          customError={errors.email}
        />
        <Input
          label="Quantidade de kWh"
          name="kWh"
          type="number"
          value={kWh}
          handleChange={(_, e) => handleChange(e)}
          min="0"
          required
          placeholder="Quantidade de kWh"
          className="border p-2 w-full"
          customError={errors.kWh}
        />
        <div className="text-lg">
          Custo Total: R$ {totalCost.toFixed(2)}
        </div>
        <Textarea
          label="Mensagem"
          name="message"
          value={message}
          handleChange={(_, e) => handleChange(e)}
          required
          placeholder="Digite sua mensagem aqui"
          className="border p-2 w-full"
          customError={errors.message}
        />
        <Button
        type="submit"
        disabled={loadingSubmit || errorsCount > 0}
        backgroundColor="backgroundlight"
        textColor="foreground"
        className="mt-8 w-full"
      >
        {loadingSubmit ? <Loader classNameWrapper={'w-fit h-fit'} classNameLoader={'w-fit h-fit border-foregroundopacity20'} haveLabel={false} label={''}/> : 'Enviar e-mail'}
      </Button>
      </form>
    </div>
  );
};

export default FornecimentoDetails;