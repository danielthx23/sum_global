'use client'

import StepForm from "@/app/login/register/_components/stepform/stepform.component"
import Input from "@/components/input/input.component"
import useAuth from "@/hooks/useauth/useauth.hook"
import useForm, { FormState } from "@/hooks/useform/useform.hook"
import { toastAlerta } from "@/utils/toastalert/toastalert.util"
import { useRouter } from "next/navigation"
import { ChangeEvent, useRef, useState } from "react"

const UpdateForm = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const { usuario } = useAuth() 

  const initialState = {
    idUsuario: usuario?.idUsuario || 0,
    nomeUsuario: usuario?.nomeUsuario || '',
    razaoSocial: usuario?.razaoSocial || '',
    cnpj: usuario?.cnpj || '',
    cpf: usuario?.cpf || '',
    tipoConta: usuario?.tipoConta || 'fornecedor',
    nrSenha: '', 
    imagemFoto: usuario?.imagemFoto || '',
    valorToken: usuario?.valorToken || '',
    dataCadastro: usuario?.dataCadastro || new Date(),
    telefones: usuario?.telefones || [],
    enderecos: usuario?.enderecos || [],
    emails: usuario?.emails || [],
    consumidor: {
      idConsumidor: usuario?.consumidor?.idConsumidor || 0,
      classeConsumo: usuario?.consumidor?.classeConsumo || '',
      tipoConsumo: usuario?.consumidor?.tipoConsumo || '',
      consumoEnergetico: usuario?.consumidor?.consumoEnergetico || 0,
      numeroMedidor: usuario?.consumidor?.numeroMedidor || '',
      tarifa: usuario?.consumidor?.tarifa || 0,
      consumoMes: usuario?.consumidor?.consumoMes || 0,
      ultimaLeitura: usuario?.consumidor?.ultimaLeitura || new Date(),
    },
    fornecedor: {
      idFornecedor: usuario?.fornecedor?.idFornecedor || 0,
      energiaPrimaria: usuario?.fornecedor?.energiaPrimaria || '',
      dataOperacao: usuario?.fornecedor?.dataOperacao || new Date(),
      status: usuario?.fornecedor?.status || '',
      capacidade: usuario?.fornecedor?.capacidade || 0,
      licenciatura: usuario?.fornecedor?.licenciatura || '',
      regiao: usuario?.fornecedor?.regiao || '',
    },
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!data.nomeUsuario) {
      errors.nomeUsuario = "Nome é obrigatório.";
    }

    return errors;
  }

  const {
    data,
    loadingSubmit,
    handleChange,
    errors
  } = useForm(formRef, initialState, submitCallback, submitErrorCallback, validateForm)

  const [currentStep, setCurrentStep] = useState(1)
  const [confirmarSenha, setConfirmarSenha] = useState<string>("")
  const [confirmarSenhaError, setConfirmarSenhaError] = useState<string>("")

  const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmarSenha = e.target.value;
    setConfirmarSenha(newConfirmarSenha);

    if (!newConfirmarSenha) {
      setConfirmarSenhaError("Confirmação de senha é obrigatória.");
    } else if (data.nrSenha !== newConfirmarSenha) {
      setConfirmarSenhaError("As senhas não coincidem.");
    } else {
      setConfirmarSenhaError("");
    }
  }

  async function submitErrorCallback(error: Error) {
    toastAlerta("Erro ao atualizar usuario" + error.message, "erro")
  }

  async function submitCallback(values: FormState) {
    try {
      const response = await fetch(`/api/usuario/${values.idUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar usuário');
      }

      toastAlerta('Usuário atualizado com sucesso!', "sucesso");
      router.push('/');
    } catch (error) {
      toastAlerta("Erro ao atualizar usuario: " + error, 'erro')
    }
  }

  const steps = [
    {
      title: 'Atualizar Dados Pessoais',
      content: (
        <>
          <Input
            label="Nome"
            type="text"
            name="nomeUsuario"
            value={data.nomeUsuario}
            handleChange={(_, e) => handleChange(e)}
            customError={errors.nomeUsuario}
            required
            className="w-full flex justify-center"
            readOnly={loadingSubmit}
          />
          <Input
            label="URL da Foto de Perfil"
            type="text"
            name="imagemFoto"
            value={data.imagemFoto}
            handleChange={(_, e) => handleChange(e)}
            customError={errors.imagemFoto}
            className="w-full flex justify-center"
            readOnly={loadingSubmit}
          />
          <Input
            label="Senha"
            type="password"
            name="nrSenha"
            value={data.nrSenha}
            handleChange={(_, e) => handleChange(e)}
            customError={errors.nrSenha}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
          />
          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmaSenha"
            value={confirmarSenha}
            handleChange={(_, e) => handleConfirmarSenha(e)}
            customError={confirmarSenhaError}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
          />
        </>
      ),
      onNext: () => setCurrentStep(currentStep + 1),
      onPrev: () => setCurrentStep(currentStep - 1),
    },
  ]

  return (
    <section className='w-full h-fit relative'>
      <StepForm
        currentStep={currentStep}
        steps={steps}
        handleNextStep={() => setCurrentStep(currentStep + 1)}
        handlePrevStep={() => setCurrentStep(currentStep - 1)}
        formRef={formRef}
      />
    </section>
  )
}

export default UpdateForm