'use client'

import Button from "@/components/button/button.component"
import Input from "@/components/input/input.component"
import useAuth from "@/hooks/useauth/useauth.hook"
import useForm, { FormState } from "@/hooks/useform/useform.hook"
import UsuarioLogin from "@/types/usuariologin/usuariologin.type"
import Link from "next/link"
import { useEffect, useRef, useState } from 'react'
import Loader from "@/components/loader/loader.component"
import { toastAlerta } from "@/utils/toastalert/toastalert.util"

const maskCpfCnpj = (value: string) => {
  const cleaned = value.replace(/\D/g, '') 

  if (cleaned.length <= 11) {
    return cleaned.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/, (_, p1, p2, p3, p4) => {
      let formatted = p1
      if (p2) formatted += '.' + p2
      if (p3) formatted += '.' + p3
      if (p4) formatted += '-' + p4
      return formatted
    })
  }

  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, p1, p2, p3, p4, p5) =>
    [p1, p2, p3].join('.').concat(`/${p4}`).concat(p5 ? `-${p5}` : '')
  )
}

const LoginForm = () => {
  const { handleLogin } = useAuth()  
  const formRef = useRef<HTMLFormElement>(null)

  const initialLoginForm: UsuarioLogin = {
    cpf: '',
    cnpj: '',
    numeroSenha: '',
    idUsuario: 0,
    nomeUsuario: "",
    razaoSocial: "",
    tipoConta: "",
    imagemFoto: "",
    valorToken: "",
    dataCadastro: new Date()
  }

  const {
    data,  
    loadingSubmit,
    handleChange,
    handleSubmit,
    errors,
    errorsCount
  } = useForm(
    formRef,
    initialLoginForm,
    submitCallback,
    submitErrorCallback,
    (form) => {
      const errors: { [key: string]: string } = {}

      const cpfCnpjInput = form.elements.namedItem('cpfcnpj') as HTMLInputElement
      if (cpfCnpjInput) {
        const value = cpfCnpjInput.value.replace(/\D/g, '')
        if (value.length === 11) {
          if (!/^\d{11}$/.test(value)) {
            errors.cpfcnpj = 'CPF inválido'
          }
        } else if (value.length === 14) {
          if (!/^\d{14}$/.test(value)) {
            errors.cpfcnpj = 'CNPJ inválido'
          }
        } else {
          errors.cpfcnpj = 'Informe um CPF ou CNPJ válido'
        }
      }

      const numeroSenha = form.elements.namedItem('numeroSenha') as HTMLInputElement
      if (numeroSenha) {
        const nrSenhaValor = numeroSenha.value
        if (!nrSenhaValor || nrSenhaValor.length === 0) {
          errors.numeroSenha = 'A senha é obrigatória'
        } else if (nrSenhaValor.length < 6) {
          errors.numeroSenha = 'A senha deve ter pelo menos 6 caracteres'
        }
      }

      return errors
    }
  )

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = 'Erro ao realizar login:\n'
      for (const key in error.cause) {
        const causes = error.cause as { [key: string]: string }
        message += `- ${causes[key]}\n`
      }
      toastAlerta(message, "erro")
    } else {
      toastAlerta(error.message, "erro")
    }
  }

  async function submitCallback(values: FormState) {
    try {
      const usuarioLogin = values as UsuarioLogin;  
      await handleLogin(usuarioLogin);
    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error);
      }
      return submitErrorCallback(new Error('Erro ao realizar login'));
    }
  }

  const [formattedValue, setFormattedValue] = useState<string>("");
  
  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCpfCnpj(e.target.value);
    setFormattedValue(maskedValue);
  };

  useEffect(() => {
    const cleanedValue = formattedValue.replace(/\D/g, '');

    if (cleanedValue.length <= 11 && cleanedValue.length > 0) {
      handleChange({
        target: { name: 'cpf', value: cleanedValue },
      } as React.ChangeEvent<HTMLInputElement>);
      handleChange({
        target: { name: 'cnpj', value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (cleanedValue.length > 11) {
      handleChange({
        target: { name: 'cnpj', value: cleanedValue },
      } as React.ChangeEvent<HTMLInputElement>);
      handleChange({
        target: { name: 'cpf', value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedValue.length > 0]);

  return (
    <form
      className="w-full flex flex-col items-center gap-4 p-4 px-12"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <Input
        label="CPF / CNPJ"
        type="text"
        name={data.cpf && data.cpf.length < 11 ? 'cpf' : 'cnpj'} 
        id="cpfcnpj"
        placeholder="CPF ou CNPJ"
        value={formattedValue} 
        handleChange={(_, e) => handleCpfCnpjChange(e)} 
        customError={errors.cpfcnpj}
        readOnly={loadingSubmit}
        required
        className="w-full flex justify-center"
        wrapperClassName='w-full'
      />
      <Input
        label="Senha"
        type="password"
        name="numeroSenha" 
        id="numeroSenha"
        placeholder="Senha"
        minLength={6}
        value={data.numeroSenha || ''}  
        handleChange={(_, e) => handleChange(e)}
        customError={errors.numeroSenha}
        readOnly={loadingSubmit}
        required
        className="w-full flex justify-center"
        wrapperClassName='w-full'
      />
      <Button
        type="submit"
        disabled={loadingSubmit || !!errorsCount || !formRef.current}
        backgroundColor="backgroundlight"
        textColor="foreground"
        className="flex justify-center items-center mt-8 w-full hover:bg-backgroundopacity80 hover:text-foreground border border-foregroundopacity20 hover:border-foregroundopacity20 transition-all ease-in-out"
      >
        {loadingSubmit ? <Loader classNameWrapper={"w-fit h-fit"} classNameLoader={"w-fit h-fit"} haveLabel={false} label={""} /> : 'Entrar'}
      </Button>
      <footer className="text-center text-foreground mt-4">
        Não tem uma conta?<br />
        <Link className="text-foreground underline" href="/login/register">
          Cadastre-se
        </Link>
      </footer>
    </form>
  )
}

export default LoginForm
