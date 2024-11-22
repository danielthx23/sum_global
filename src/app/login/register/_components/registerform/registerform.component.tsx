'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useForm, { FormState } from "@/hooks/useform/useform.hook"
import Input from "@/components/input/input.component"
import { useRouter } from 'next/navigation'
import Usuario from '@/types/usuario/usuario.type'
import StepForm from '../stepform/stepform.component'
import Image from "next/image";
import Select from '@/components/select/select.component'
import Consumidor from '@/types/consumidor/consumidor.type'
import Fornecedor from '@/types/fornecedor/fornecedor.type'
import Telefone from '@/types/telefone/telefone.type'
import Email from '@/types/email/email.type'
import { BiMinusCircle } from 'react-icons/bi'
import Endereco from '@/types/endereco/endereco.type'
import { toastAlerta } from '@/utils/toastalert/toastalert.util'

interface RegisterFormProps {
  initialUsuario?: Usuario;
  isUpdate?: boolean;
}

const RegisterForm = ({ initialUsuario, isUpdate }: RegisterFormProps) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const initialState: Usuario = {
    idUsuario: initialUsuario?.idUsuario || 0,
    nomeUsuario: initialUsuario?.nomeUsuario || '',
    razaoSocial: initialUsuario?.razaoSocial || '',
    cnpj: initialUsuario?.cnpj || '',
    cpf: initialUsuario?.cpf || '',
    tipoConta: initialUsuario?.tipoConta || 'fornecedor',
    numeroSenha: initialUsuario?.numeroSenha || '',
    imagemFoto: initialUsuario?.imagemFoto || '',
    valorToken: initialUsuario?.valorToken || '',
    dataCadastro: initialUsuario?.dataCadastro || new Date(),
    telefones: initialUsuario?.telefones || [],
    enderecos: initialUsuario?.enderecos || [],
    emails: initialUsuario?.emails || [],
    consumidor: {
      idConsumidor: initialUsuario?.consumidor?.idConsumidor || 0,
      classeConsumo: initialUsuario?.consumidor?.classeConsumo || '',
      tipoConsumo: initialUsuario?.consumidor?.tipoConsumo || '',
      consumoEnergetico: initialUsuario?.consumidor?.consumoEnergetico || 0,
      numeroMedidor: initialUsuario?.consumidor?.numeroMedidor || '',
      tarifa: initialUsuario?.consumidor?.tarifa || 0,
      consumoMes: initialUsuario?.consumidor?.consumoMes || 0,
      ultimaLeitura: initialUsuario?.consumidor?.ultimaLeitura || new Date(),
    } as Consumidor,
    fornecedor: {
      idFornecedor: initialUsuario?.fornecedor?.idFornecedor || 0,
      energiaPrimaria: initialUsuario?.fornecedor?.energiaPrimaria || '',
      dataOperacao: initialUsuario?.fornecedor?.dataOperacao || new Date(),
      status: initialUsuario?.fornecedor?.status || '',
      capacidade: initialUsuario?.fornecedor?.capacidade || 0,
      licenciatura: initialUsuario?.fornecedor?.licenciatura || '',
      regiao: initialUsuario?.fornecedor?.regiao || '',
    } as Fornecedor,
  }

  const {
    data,
    setData,
    loadingSubmit,
    handleChange,
    handleSubmit,
    handleErrors,
    errors,
    errorsCount
  } = useForm(formRef, initialState, submitCallback, submitErrorCallback,
    (form) => {
      const errors: { [key: string]: string } = {}

      if (!data.nomeUsuario) {
        errors.nomeUsuario = "Nome é obrigatório.";
      }

      if (data.imagemFoto && !isValidUrl(data.imagemFoto)) {
        errors.imagemFoto = "URL da foto de perfil é inválida.";
      }

      if(currentStep === 1) {
      const cpfInput = form.elements.namedItem('cpf') as HTMLInputElement
      const cleanedCpfInput = cpfInput.value.replace(/\D/g, '');
      if (!cleanedCpfInput) {
        errors.cpf = "CPF é obrigatório.";
      } else if (cleanedCpfInput.length !== 11 || /^(\d)\1{11}$/.test(cleanedCpfInput)) {
        errors.cpf = "CPF inválido.";
      }

      const cnpjInput = form.elements.namedItem('cnpj') as HTMLInputElement
      const cleanedCnpjInput = cnpjInput.value.replace(/\D/g, '');
      if (!cleanedCnpjInput) {
        errors.cnpj = "CNPJ é obrigatório.";
      } else if (cleanedCnpjInput.length !== 14 || /^(\d)\1{14}$/.test(cleanedCnpjInput)) {
        errors.cnpj ="CNPJ inválido.";
      }
    }

      if (data.cnpj && !data.razaoSocial) {
        errors.razaoSocial = "Nome CNPJ / Razão Social é obrigatório.";
      }

      if (!data.tipoConta) {
        errors.tipoConta = "Tipo de conta é obrigatório.";
      }


      if (!data.numeroSenha) {
        errors.numeroSenha = "Senha é obrigatória.";
        setConfirmarSenhaError("Preencha o campo de confirmação de senha.");
      } else if (data.numeroSenha.length < 5) {
        errors.numeroSenha = "A senha deve ter pelo menos 6 caracteres.";
        setConfirmarSenhaError("Preencha o campo de confirmação de senha.");
      }

      data.enderecos.forEach((endereco: Endereco, index: number) => {
        if (!endereco.numeroCep) {
          errors[`enderecos.${index}.numeroCep`] = "CEP é obrigatório.";
        }
        if (!endereco.nomeRua) {
          errors[`enderecos.${index}.nomeRua`] = "Rua é obrigatória.";
        }
        if (!endereco.numeroEndereco) {
          errors[`enderecos.${index}.numeroEndereco`] = "Número é obrigatório.";
        }
        if (!endereco.nomeBairro) {
          errors[`enderecos.${index}.nomeBairro`] = "Bairro é obrigatório.";
        }
        if (!endereco.nomeEstado) {
          errors[`enderecos.${index}.nomeEstado`] = "Estado é obrigatório.";
        }
        if (!endereco.nomeCidade) {
          errors[`enderecos.${index}.nomeCidade`] = "Cidade é obrigatória.";
        }
      });

      data.emails.forEach((email: Email, index: number) => {
        if (!email.email) {
          errors[`emails.${index}.email`] = "Email é obrigatório.";
        } else if (!isValidEmail(email.email)) {
          errors[`emails.${index}.email`] = "Email inválido.";
        }
      });

      data.telefones.forEach((telefone: Telefone, index: number) => {
        if (!telefone.numeroTelefone) {
          errors[`telefones.${index}.numeroTelefone`] = "Telefone é obrigatório.";
        }
        if (!telefone.DDD) {
          errors[`telefones.${index}.DDD`] = "DDD é obrigatório.";
        }
        if (!telefone.DDI) {
          errors[`telefones.${index}.DDI`] = "DDI é obrigatório.";
        }
      });

      if (data.tipoConta === 'fornecedor') {
        if (!data.fornecedor.energiaPrimaria) {
          errors.energiaPrimaria = "Energia Primária é obrigatória.";
        }
        if (!data.fornecedor.dataOperacao) {
          errors.dataOperacao = "Data de Operação é obrigatória.";
        }
        if (!data.fornecedor.status) {
          errors.status = "Status é obrigatório.";
        }
        if (!data.fornecedor.capacidade) {
          errors.capacidade = "Capacidade de energia em KwH é obrigatória.";
        }
        if (!data.fornecedor.licenciatura) {
          errors.licenciatura = "Licenciatura é obrigatória.";
        }
        if (!data.fornecedor.regiao) {
          errors.regiao = "Região é obrigatória.";
        }
      } else if (data.tipoConta === 'consumidor') {
        if (!data.consumidor.classeConsumo) {
          errors.classeConsumo = "Classe de Consumo é obrigatória.";
        }
        if (!data.consumidor.tipoConsumo) {
          errors.tipoConsumo = "Tipo de Consumo é obrigatório.";
        }
        if (data.consumidor.consumoEnergetico === undefined || data.consumidor.consumoEnergetico < 0) {
          errors.consumoEnergetico = "Consumo Energético é obrigatório e deve ser um número positivo.";
        }
        if (!data.consumidor.numeroMedidor) {
          errors.numeroMedidor = "Número do Medidor é obrigatório.";
        }
        if (data.consumidor.tarifa === undefined || data.consumidor.tarifa < 0) {
          errors.tarifa = "Tarifa é obrigatória e deve ser um número positivo.";
        }
        if (data.consumidor.consumoMes === undefined || data.consumidor.consumoMes < 0) {
          errors.consumoMes = "Consumo de Energia no Mês é obrigatório e deve ser um número positivo.";
        }
        if (!data.consumidor.ultimaLeitura) {
          errors.ultimaLeitura = "Última Data de Leitura é obrigatória.";
        }
      }

      return errors;
    })

  const [currentStep, setCurrentStep] = useState(1)
  const [confirmarSenha, setConfirmarSenha] = useState<string>(initialUsuario?.numeroSenha ? initialUsuario?.numeroSenha : "")
  const [confirmarSenhaError, setConfirmarSenhaError] = useState<string>("")

  const handleConfirmarSenha = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmarSenha = e.target.value; 
    setConfirmarSenha(newConfirmarSenha); 

    if (!newConfirmarSenha) {
      setConfirmarSenhaError("Confirmação de senha é obrigatória.");
    } else if (data.numeroSenha !== newConfirmarSenha) { 
      setConfirmarSenhaError("As senhas não coincidem.");
    } else {
      setConfirmarSenhaError(""); 
    }
  }

  const isValidUrl = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z0-9][a-z0-9-]*[a-z0-9])\\.)+[a-z]{2,}|' + 
      'localhost|' +
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + 
      '\\[?[a-f0-9]*:[a-f0-9:%.]*\\]?)' + 
      '(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|\\?\\.:]*)*' + 
      '$', 'i'); 
    return !!pattern.test(url);
  };

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  async function submitErrorCallback(error: Error) {
    if (error.cause && Object.keys(error.cause).length) {
      let message = 'Erro ao realizar registro:\n\n'
      for (const key in error.cause) {
        const causes = error.cause as { [key: string]: string }
        message += `- ${causes[key]}\n`
      }
      toastAlerta(message, "erro")
    }
    toastAlerta(error.message, "erro")
  }

  async function submitCallback(values: FormState) {
    try {
      const response = await fetch(isUpdate ? `/api/usuario/${data.idUsuario}`: '/api/usuario', {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || isUpdate ? 'Erro ao atualizar usuário' : 'Erro ao realizar registro');
      }

      // const result = await response.json();
      toastAlerta(isUpdate ? "Usuário atualizado com sucesso!" : "Usuário registrado com sucesso!", "sucesso")
      if(isUpdate) {
        localStorage.setItem('authToken', data.token || `${values.cnpj || values.cpf}.${values.numeroSenha}`);
        router.push('/perfil');
      } else {
      router.push('/login'); 
      }
    } catch (error) {
      if (error instanceof Error) {
        return submitErrorCallback(error);
      }
      return submitErrorCallback(new Error(isUpdate ? 'Erro ao atualizar usuário' : 'Erro ao realizar registro'));
    }
  }
  
  const maskCpf = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})/, (_, p1, p2, p3, p4) => {
      let formatted = p1;
      if (p2) formatted += '.' + p2;
      if (p3) formatted += '.' + p3;
      if (p4) formatted += '-' + p4;
      return formatted;
    });
  };

  const maskCnpj = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, p1, p2, p3, p4, p5) =>
      [p1, p2, p3].join('.').concat(`/${p4}`).concat(p5 ? `-${p5}` : '')
    );
  };

  const [formattedCnpjValue, setFormattedCnpjValue] = useState<string>(maskCnpj(initialUsuario?.cnpj ? initialUsuario?.cnpj : ""));
  const [formattedCpfValue, setFormattedCpfValue] = useState<string>(maskCpf(initialUsuario?.cpf ? initialUsuario?.cpf : ""));


  const handleCpfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCpf(e.target.value);
    setFormattedCpfValue(maskedValue);

    const cleanedCpfValue = maskedValue.replace(/\D/g, '');
    handleChange({
      target: { name: 'cpf', value: cleanedCpfValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCnpj(e.target.value);
    setFormattedCnpjValue(maskedValue);

    const cleanedCnpjValue = maskedValue.replace(/\D/g, '');
    handleChange({
      target: { name: 'cnpj', value: cleanedCnpjValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const addEmail = () => {
    const newEmail: Email = {
      idEmail: 0,
      email: '',
    }
    setData((prevData) => ({
      ...prevData,
      emails: [...prevData.emails, newEmail],
    }));
  }

  const addTelefone = () => {
    const newTelefone: Telefone = {
      idTelefone: 0, 
      numeroTelefone: '',
      DDD: '',
      DDI: '',
      lembrete: '',
    }
    setData((prevData) => ({
      ...prevData,
      telefones: [...prevData.telefones, newTelefone],
    }));
  }

  const deleteEmail = (index: number) => {
    const updatedEmails = data.emails.filter((_: null, i: number) => i !== index);
    setData((prevData) => ({
      ...prevData,
      emails: updatedEmails,
    }));
  };

  const deleteTelefone = (index: number) => {
    const updatedTelefones = data.telefones.filter((_: null, i: number) => i !== index);
    setData((prevData) => ({
      ...prevData,
      telefones: updatedTelefones,
    }));
  };

  const addEndereco = () => {
    const newEndereco: Endereco = {
      idEndereco: Date.now(),
      numeroCep: '',
      numeroEndereco: 0,
      nomeBairro: '',
      nomeEstado: '',
      nomeCidade: '',
      nomeRua: '',
      complemento: '',
      usuario: data.usuario, 
    };
    setData((prevData) => ({
      ...prevData,
      enderecos: [...prevData.enderecos, newEndereco],
    }));
  };

  const deleteEndereco = (index: number) => {
    const updatedEnderecos = data.enderecos.filter((_: null, i: number) => i !== index);
    setData((prevData) => ({
      ...prevData,
      enderecos: updatedEnderecos,
    }));
  };

  const validateStep1 = () => {
    return !(
        errors.nomeUsuario ||
        errors.imagemFoto ||
        errors.cpf ||
        errors.cnpj ||
        errors.razaoSocial ||
        errors.tipoConta ||
        errors.numeroSenha
    );
};

const validateStep2 = () => {
    return !Object.keys(errors).some((key) => key.startsWith('enderecos.'));
};

const validateStep3 = () => {
    return !(
        Object.keys(errors).some((key) => key.startsWith('emails.')) ||
        Object.keys(errors).some((key) => key.startsWith('telefones.'))
    );
};

const validateStep4 = () => {
    if (data.tipoConta === 'fornecedor') {
        return !(
            errors.energiaPrimaria ||
            errors.dataOperacao ||
            errors.status ||
            errors.capacidade ||
            errors.licenciatura ||
            errors.regiao
        );
    } else if (data.tipoConta === 'consumidor') {
        return !(
            errors.classeConsumo ||
            errors.tipoConsumo ||
            errors.consumoEnergetico ||
            errors.numeroMedidor ||
            errors.tarifa ||
            errors.consumoMes ||
            errors.ultimaLeitura
        );
    }
    return true; 
};

  const handleNextStep = () => {
    let isValid = true;

    handleErrors();

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    } else if (currentStep === 4) {
      isValid = validateStep4();
    }

    if (!isValid) {
      return; 
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const [imgSrc, setImgSrc] = useState(data.imagemFoto || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png');

  useEffect(() => {
    setImgSrc(data.imagemFoto || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png');
  }, [data.imagemFoto]);

  const handleError = () => {
    setImgSrc('https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png');
  };

  const steps = [
    {
      title: 'Dados Pessoais',
      content: (
        <>
          <div className='w-full flex items-center'>
            <div className='w-full flex flex-col justify-center gap-4'>
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
                handleChange={(_, e) => { handleChange(e) }}
                customError={errors.imagemFoto}
                className="w-full flex justify-center"
                readOnly={loadingSubmit}
              />
              <Input
                label="CPF"
                type="text"
                name="cpf"
                value={formattedCpfValue}
                handleChange={(_, e) => handleCpfChange(e)}
                customError={errors.cpf}
                readOnly={loadingSubmit}
                required
                className="w-full flex justify-center"
              />
            </div>
            <figure className="p-4 w-1/2 h-full flex flex-col gap-2 items-center justify-center rounded-md">
              <Image
                className="w-[150px] h-[150px] object-cover rounded-md"
                width={200}
                height={200}
                src={imgSrc}
                alt={"Foto de Perfil Preview"}
                onError={handleError}
              />
              <figcaption className='text-sm text-foregroundopacity20'>
                Preview Foto de Perfil
              </figcaption>
            </figure>
          </div>
          <Input
            label="CNPJ"
            type="text"
            name="cnpj"
            value={formattedCnpjValue}
            handleChange={(_, e) => handleCnpjChange(e)}
            customError={errors.cnpj}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
            wrapperClassName='w-full'
          />
          <Input
            label="Nome CNPJ / Razão Social"
            type="text"
            name="razaoSocial"
            value={data.razaoSocial}
            handleChange={(_, e) => handleChange(e)}
            customError={errors.razaoSocial}
            disabled={!(data.cnpj.length > 11) || !errors.cnpj === undefined}
            placeholder={!(data.cnpj.length > 11) || errors.cnpj === undefined ? 'Preencha o campo de CNPJ corretamente' : 'Digite o nome da sua Razão Social...'}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
            wrapperClassName='w-full'
          />
          <Select
            name="tipoConta"
            value={data.tipoConta}
            handleChange={(_, e) => handleChange(e)}
            className={`w-full flex justify-center ${errors.tipoConta ? 'border-red-500' : ''}`}
            disabled={loadingSubmit}
            required
            label="Tipo de Conta"
            customError={errors.tipoConta}
            options={[
              { value: 'consumidor', label: 'Consumidor' },
              { value: 'fornecedor', label: 'Fornecedor' },
            ]}
          />
          <Input
            label="Senha"
            type="password"
            name="numeroSenha"
            value={data.numeroSenha}
            handleChange={(_, e) => handleChange(e)}
            customError={errors.numeroSenha}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
            wrapperClassName='w-full'
          />
          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmaSenha"
            value={confirmarSenha}
            handleChange={(_, e) => { handleConfirmarSenha(e); }}
            customError={confirmarSenhaError}
            readOnly={loadingSubmit}
            required
            className="w-full flex justify-center"
            wrapperClassName='w-full'
          />
        </>
      ),
      onNext: handleNextStep,
      onPrev: handlePrevStep,
    },
    {
      title: 'Dados de Localidade',
      content: (
        <>
          <div className='w-full flex flex-col gap-4'>
            <h3>Endereços</h3>
            {data.enderecos.map((endereco: Endereco, index: number) => (
              <div key={endereco.idEndereco} className="flex flex-col h-fit w-full items-end gap-2">
                <h4 className="text-start w-full text-sm text-foregroundopacity20">Endereço {index + 1}</h4>
                <Input
                  label="CEP"
                  type="text"
                  name={`enderecos.${index}.numeroCep`}
                  value={endereco.numeroCep}
                  handleChange={(_, e) => handleChange(e)}
                  customError={errors.numeroCep}
                  className="w-full flex-grow"
                  readOnly={loadingSubmit}
                  wrapperClassName='w-full'
                />
                <section className="flex w-full gap-2">
                  <Input
                    label="Rua"
                    type="text"
                    name={`enderecos.${index}.nomeRua`}
                    value={endereco.nomeRua}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.nomeRua}
                    className="w-full flex-grow"
                    readOnly={loadingSubmit}
                    wrapperClassName='w-3/6'
                  />
                  <Input
                    label="Número"
                    type="number"
                    name={`enderecos.${index}.numeroEndereco`}
                    value={endereco.numeroEndereco}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.numeroEndereco}
                    className="w-full flex-grow"
                    readOnly={loadingSubmit}
                    wrapperClassName='w-1/6'
                  />
                  <Input
                    label="Bairro"
                    type="text"
                    name={`enderecos.${index}.nomeBairro`}
                    value={endereco.nomeBairro}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.nomeBairro}
                    readOnly={loadingSubmit}
                    className="w-full flex-grow"
                    wrapperClassName='w-3/6'
                  />
                </section>
                <section className="flex w-full gap-2">
                  <Input
                    label="Estado"
                    type="text"
                    name={`enderecos.${index}.nomeEstado`}
                    value={endereco.nomeEstado}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.nomeEstado}
                    readOnly={loadingSubmit}
                    className="w-full flex-grow"
                    wrapperClassName='w-full'
                  />
                  <Input
                    label="Cidade"
                    type="text"
                    name={`enderecos.${index}.nomeCidade`}
                    value={endereco.nomeCidade}
                    handleChange={(_, e) => handleChange(e)}
                    customError={errors.nomeCidade}
                    readOnly={loadingSubmit}
                    className="w-full flex-grow"
                    wrapperClassName='w-full'
                  />
                </section>
                <Input
                  label="Complemento"
                  type="text"
                  name={`enderecos.${index}.complemento`}
                  value={endereco.complemento}
                  handleChange={(_, e) => handleChange(e)}
                  customError={errors.complemento}
                  readOnly={loadingSubmit}
                  className="w-full flex-grow"
                  wrapperClassName='w-full'
                />
                <button type="button" onClick={() => deleteEndereco(index)} className="py-3 ml-2 text-red-500"><BiMinusCircle /></button>
              </div>
            ))}
            <button type="button" onClick={addEndereco} className={`mt-2 text-md py-1 ${data.enderecos.length > 0 ? 'w-fit px-2 rounded-md text-sm' : 'bg-foregroundlight text-backgroundlight rounded-md px-4'}`}>Adicionar Endereço</button>
          </div>
        </>
      ),
      onNext: handleNextStep,
      onPrev: handlePrevStep,
    },
    {
      title: 'Dados de Contato',
      content: (
        <>
          <div className='w-full flex flex-col gap-4'>
            <h3>Emails</h3>
            {data.emails.map((email: Email, index: number) => (
              <div key={index} className="flex h-fit w-full items-end gap-2">
                <Input
                  label={`Email ${index + 1}`}
                  type="email"
                  name={`emails.${index}.email`}
                  value={data.emails[index].email}
                  handleChange={(_, e) => handleChange(e)}
                  readOnly={loadingSubmit}
                  className="w-full flex-grow"
                  wrapperClassName='w-full'
                />
                <button type="button" onClick={() => deleteEmail(index)} className="py-3 ml-2 text-red-500"><BiMinusCircle /></button>
              </div>
            ))}
            <button type="button" onClick={addEmail} className={`mt-2 text-md py-1 ${data.emails.length > 0 ? 'w-fit px-2 rounded-md text-sm' : 'bg-foregroundlight text-backgroundlight rounded-md px-4'}`}>Adicionar Email</button>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <h3>Telefones</h3>
            {data.telefones.map((telefone: Telefone, index: number) => (
              <div key={index} className="flex w-full items-end gap-2">
                <Input
                  label="DDD"
                  name={`telefones.${index}.DDD`}
                  type="text"
                  value={data.telefones[index].DDD}
                  handleChange={(_, e) => handleChange(e)}
                  readOnly={loadingSubmit}
                  className="w-full"
                  wrapperClassName='w-1/6'
                />
                <Input
                  label="DDI"
                  name={`telefones.${index}.DDI`}
                  type="text"
                  value={data.telefones[index].DDI}
                  handleChange={(_, e) => handleChange(e)}
                  readOnly={loadingSubmit}
                  className="w-full"
                  wrapperClassName='w-1/6'
                />
                <Input
                  label={`Telefone ${index + 1}`}
                  name={`telefones.${index}.numeroTelefone`}
                  type="text"
                  value={data.telefones[index].telefone || telefone.numeroTelefone}
                  handleChange={(_, e) => handleChange(e)}
                  readOnly={loadingSubmit}
                  className="w-full"
                  wrapperClassName='w-2/6'
                />
                <Input
                  label="Lembrete"
                  name={`telefones.${index}.lembrete`}
                  type="text"
                  value={data.telefones[index].lembrete}
                  handleChange={(_, e) => handleChange(e)}
                  readOnly={loadingSubmit}
                  className="w-full"
                  wrapperClassName='w-2/6'
                />
                <button type="button" onClick={() => deleteTelefone(index)} className="py-3 ml-2 text-red-500"><BiMinusCircle /></button>
              </div>
            ))}
            <button type="button" onClick={addTelefone} className={`mt-2 text-md py-1 ${data.telefones.length > 0 ? 'w-fit px-2 rounded-md text-sm' : 'bg-foregroundlight text-backgroundlight rounded-md px-4'}`}>Adicionar Telefone</button>
          </div>
        </>
      ),
      onNext: handleNextStep,
      onPrev: handlePrevStep,
    },
    {
      title: `Dados de ${data.tipoConta === 'fornecedor' ? 'Fornecedor' : 'Consumidor'}`,
      content: (
        <>
          {data.tipoConta === 'fornecedor' ? (
            <>
              <Input
                label="Energia Primária"
                type="text"
                name="fornecedor.energiaPrimaria"
                value={data.fornecedor.energiaPrimaria || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.energiaPrimaria}
                readOnly={loadingSubmit}
                required
                className="w-full flex-grow"
                wrapperClassName='w-full'
              />
              <Input
                label="Data de Operação"
                type="datetime-local"
                name="fornecedor.dataOperacao"
                value={data.fornecedor.dataOperacao || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.dataOperacao}
                readOnly={loadingSubmit}
                required
                className="w-full flex-grow"
                wrapperClassName='w-full'
              />
              <Select
                name="fornecedor.status"
                value={data.fornecedor.status}
                handleChange={(_, e) => handleChange(e)}
                className={`w-full flex justify-center`}
                disabled={loadingSubmit}
                required
                label="Status"
                customError={errors.tipoConta}
                options={[
                  { value: 'operante', label: 'Operante' },
                  { value: 'desligada', label: 'Desligada' },
                ]}
              />
              <Input
                label="Capacidade de energia em KwH"
                type="number"
                name="fornecedor.capacidade"
                value={data.fornecedor.capacidade || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.capacidade}
                readOnly={loadingSubmit}
                required
                className="w-full flex-grow"
                wrapperClassName='w-full'
              />
              <Input
                label="Licenciatura"
                type="text"
                name="fornecedor.licenciatura"
                value={data.fornecedor.licenciatura || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.licenciatura}
                readOnly={loadingSubmit}
                required
                className="w-full flex-grow"
                wrapperClassName='w-full'
              />
              <Select
                name="fornecedor.regiao"
                value={data.fornecedor.regiao}
                handleChange={(_, e) => handleChange(e)}
                className={`w-full flex justify-center`}
                disabled={loadingSubmit}
                required
                label="Região"
                customError={errors.regiao}
                options={[
                  { value: 'Norte', label: 'Norte' },
                  { value: 'Nordeste', label: 'Nordeste' },
                  { value: 'Centro-Oeste', label: 'Centro-Oeste' },
                  { value: 'Sudeste', label: 'Sudeste' },
                  { value: 'Sul', label: 'Sul' },
                  { value: 'Leste', label: 'Leste' },
                  { value: 'Oeste', label: 'Oeste' },
                ]}
              />
            </>
          ) : (
            <>
              <Input
                label="Classe de Consumo"
                type="text"
                name="consumidor.classeConsumo"
                value={data.consumidor.classeConsumo}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.classeConsumo}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
              <Input
                label="Tipo de Consumo"
                type="text"
                name="consumidor.tipoConsumo"
                value={data.consumidor.tipoConsumo || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.tipoConsumo}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
              <Input
                label="Consumo Energético"
                type="number"
                name="consumidor.consumoEnergetico"
                value={data.consumidor.consumoEnergetico || 0}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.consumoEnergetico}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
              <Input
                label="Número do Medidor"
                type="text"
                name="consumidor.numeroMedidor"
                value={data.consumidor.numeroMedidor || ''}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.numeroMedidor}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
              <Input
                label="Tarifa"
                type="number"
                name="consumidor.tarifa"
                value={data.consumidor.tarifa || 0}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.tarifa}
                className="w-full flex-grow"
                readOnly={loadingSubmit}
                wrapperClassName='w-full'
              />
              <Input
                label="Consumo de Energia no Mês"
                type="number"
                name="consumidor.consumoMes"
                value={data.consumidor.consumoMes || 0}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.consumoMes}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
              <Input
                label="Última Data de Leitura"
                type="date"
                name="consumidor.ultimaLeitura"
                value={data.consumidor.ultimaLeitura}
                handleChange={(_, e) => handleChange(e)}
                customError={errors.ultimaLeitura}
                className="w-full flex-grow"
                wrapperClassName='w-full'
                readOnly={loadingSubmit}
              />
            </>
          )}
        </>
      ),
      onSubmit: handleSubmit,
      onPrev: handlePrevStep,
    },
  ]

  return (
    <section className='w-full h-fit relative'>
      <StepForm
        currentStep={currentStep}
        steps={steps}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        formRef={formRef}
        errorsCount={errorsCount}
        loadingSubmit={loadingSubmit}
        isUpdate={isUpdate}
      />
    </section>
  )
}

export default RegisterForm
