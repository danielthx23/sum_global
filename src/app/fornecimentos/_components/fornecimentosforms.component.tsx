'use client';

import { useRef } from 'react';
import Button from "@/components/button/button.component";
import Input from "@/components/input/input.component";
import Select from '@/components/select/select.component';
import Textarea from '@/components/textarea/textarea.component';
import useForm, { FormState } from "@/hooks/useform/useform.hook";
import Fornecimento from '@/types/fornecimento/fornecimento.type';
import Loader from '@/components/loader/loader.component';

interface FornecimentosFormProps {
  onSubmit: (values: FormState) => Promise<void>;
  initialFornecimento?: Fornecimento; 
  isUpdate?: boolean;
  tipoDeEnergiaOptions: { value: string; label: string }[];
  tipoDeContratoOptions: { value: string; label: string }[];
}

const FornecimentosForm = ({ onSubmit, initialFornecimento, isUpdate = false, tipoDeEnergiaOptions, tipoDeContratoOptions }: FornecimentosFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const initialFornecimentoForm = {
    fornecedor: initialFornecimento ? initialFornecimento.fornecedor : undefined,
    fornecimentoImagem: initialFornecimento ? initialFornecimento.fornecimentoImagem : '',
    tipoContrato: initialFornecimento ? initialFornecimento.tipoContrato : '',
    precoKwh: initialFornecimento ? initialFornecimento.precoKwh : 0,
    dataVencimento: initialFornecimento ? initialFornecimento.dataVencimento : new Date(),
    tipoEnergia: initialFornecimento ? initialFornecimento.tipoEnergia : '',
    processoObtencao: initialFornecimento ? initialFornecimento.processoObtencao : '',
  };

  const {
    data: { fornecimentoImagem, tipoContrato, precoKwh, dataVencimento, tipoEnergia, processoObtencao },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errors,
    errorsCount,
  } = useForm(
    formRef,
    initialFornecimentoForm,
    onSubmit, 
    async (error: Error) => alert(error.message), 
    () => {
      const errors: { [key: string]: string } = {};
      if (!fornecimentoImagem) errors.fornecimentoImagem = 'A imagem é obrigatória';
      if (!tipoContrato) errors.tipoContrato = 'O tipo de contratação é obrigatório';
      if (precoKwh <= 0) errors.precoKwh = 'O preço por kWh deve ser maior que 0';
      if (!dataVencimento) errors.dataVencimento = 'A data de vencimento é obrigatória';
      if (!tipoEnergia) errors.tipoEnergia = 'O tipo de energia é obrigatório';
      if (!processoObtencao) errors.processoObtencao = 'O processo de obtenção é obrigatório';
      return errors;
    }
  );

  return (
    <form
      ref={formRef}
      className="max-w-[700px] mx-auto flex flex-col gap-4 my-8 rounded-md shadow-md p-12"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className='text-2xl w-full text-center mb-8'>{isUpdate ? 'Atualizar Fornecimento' : 'Criar novo Fornecimento'}</h1>
      
      <Input
        label="Imagem (URL)"
        name="fornecimentoImagem"
        value={fornecimentoImagem}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.fornecimentoImagem}
        required
        readOnly={loadingSubmit}
        placeholder="URL da imagem"
        className="w-full"
      />
      
      <Select
        label="Tipo de Contratação"
        name="tipoContrato"
        value={tipoContrato}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.tipoContrato}
        required
        disabled={loadingSubmit}
        className="w-full"
        options={tipoDeContratoOptions}
      />
      
      <Input
        label="Preço por kWh"
        name="precoKwh"
        type="number"
        value={precoKwh}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.precoKwh}
        required
        readOnly={loadingSubmit}
        placeholder="Preço por kWh"
        className="w-full"
        step={0.01}
      />
      
      <Input
        label="Data de Vencimento"
        name="dataVencimento"
        type="datetime-local"
        value={dataVencimento}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.dataVencimento}
        required
        readOnly={loadingSubmit}
        className="w-full"
      />
      
      <Select
        label="Tipo de Energia"
        name="tipoEnergia"
        value={tipoEnergia}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.tipoEnergia}
        options={tipoDeEnergiaOptions}
        disabled={loadingSubmit}
        required
        className="w-full"
      />
      
      <Textarea
        label="Processo de Obtenção"
        name="processoObtencao"
        value={processoObtencao}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.processoObtencao}
        required
        readOnly={loadingSubmit}
        placeholder="Descreva o processo de obtenção..."
        className="w-full"
      />
      
      <Button
        type="submit"
        disabled={loadingSubmit || errorsCount > 0}
        backgroundColor="backgroundlight"
        textColor="foreground"
        className="mt-8 w-full flex justify-center items-center"
      >
        {loadingSubmit ? <Loader classNameWrapper={'w-fit h-fit'} classNameLoader={'w-fit h-fit border-foreground text-foreground'} haveLabel={false} label={''}/> : isUpdate ? 'Atualizar Fornecimento' : 'Criar Fornecimento'}
      </Button>
    </form>
  );
};

export default FornecimentosForm;