'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useAuth from '@/hooks/useauth/useauth.hook'
import Usuario from '@/types/usuario/usuario.type'
import Loader from '@/components/loader/loader.component'
import { toastAlerta } from '@/utils/toastalert/toastalert.util'
import Link from 'next/link'
import SemPermissao from '@/components/sempermissao/sempermissao.component'

const PerfilPage = () => {
  const { usuario } = useAuth() 
  const [userData, setUserData] = useState<Usuario>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/usuario/${usuario?.idUsuario}`)
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário.')
        }
        const data = await response.json()
        setUserData(data)
        toastAlerta('Dados carregados com sucesso!', 'sucesso') 
      } catch (error) {
        toastAlerta('Falha ao carregar dados do usuário. Tente novamente: ' + error, 'erro')
      } finally {
        setLoading(false)
      }
    }
  
    fetchUserData()
  }, [usuario])
  
  if (!usuario) {
    return <SemPermissao/>;
  }

  if (loading) {
    return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando seu perfil!'}/>
  }

  return (
    <div className="flex mx-auto w-fit flex-col gap-4 m-16 px-48 py-24 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-foreground mb-4">Perfil do Usuário</h1>
  <div className="profile-details flex items-center mb-6">
    <div className="profile-photo mr-4">
      <Image
        src={userData?.imagemFoto || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
        alt="Foto de Perfil"
        width={150}
        height={150}
        className="rounded-full border-2 border-background"
      />
    </div>
    <div className="profile-info">
      <h2 className="text-xl font-semibold text-foreground">{userData?.nomeUsuario}</h2>
        <h3 className="text-lg text-foregroundlight">Razão Social: {userData?.razaoSocial}</h3>
        <h3 className="text-lg text-foregroundlight">CPF: {userData?.cpf}</h3>
      <h3 className="text-sm text-foregroundopacity80">
        CNPJ: {userData?.cnpj}
      </h3>
      <p className="text-sm text-foregroundopacity80">Data de Cadastro: {userData?.dataCadastro.toString()}</p>
    </div>
  </div>

  <div className="contact-info mb-6">
    <h3 className="text-lg font-semibold text-foreground">Informações de Contato</h3>
    {userData?.emails && userData.emails.length > 0 && (
      <div>
        <h4 className="font-semibold text-foregroundlight">Emails:</h4>
        <ul className="list-disc list-inside">
          {userData.emails.map((email) => (
            <li key={email.idEmail} className="text-foregroundopacity80">{email.email}</li>
          ))}
        </ul>
      </div>
    )}
    {userData?.telefones && userData.telefones.length > 0 && (
      <div>
        <h4 className="font-semibold text-foregroundlight">Telefones:</h4>
        <ul className="list-disc list-inside">
          {userData.telefones.map((telefone) => (
            <li key={telefone.idTelefone} className="text-foregroundopacity80">
              {telefone.DDI} {telefone.DDD} {telefone.numeroTelefone}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  <div className="address-info mb-6">
    <h3 className="text-lg font-semibold text-foreground">Endereços</h3>
    {userData?.enderecos && userData.enderecos.length > 0 ? (
      <ul className="list-disc list-inside">
        {userData.enderecos.map((endereco) => (
          <li key={endereco.idEndereco} className="text-foregroundopacity80">
            {endereco.nomeRua}, {endereco.numeroEndereco}, {endereco.nomeBairro}, {endereco.nomeCidade}, {endereco.nomeEstado} - {endereco.numeroCep}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-foregroundopacity80">Nenhum endereço cadastrado.</p>
    )}
  </div>

  {userData?.tipoConta === 'consumidor' && userData?.consumidor && (
    <div className="consumidor-info mb-6">
      <h3 className="text-lg font-semibold text-foreground">Dados do Consumidor</h3>
      <p className="text-foregroundopacity80">Classe de Consumo: {userData.consumidor.classeConsumo}</p>
      <p className="text-foregroundopacity80">Tipo de Consumo: {userData.consumidor.tipoConsumo}</p>
      <p className="text-foregroundopacity80">Consumo Energético: {userData.consumidor.consumoEnergetico} kWh</p>
      <p className ="text-foregroundopacity80">Número do Medidor: {userData.consumidor.numeroMedidor}</p>
      <p className="text-foregroundopacity80">Tarifa: R$ {userData.consumidor.tarifa}</p>
      <p className="text-foregroundopacity80">Consumo de Energia no Mês: {userData.consumidor.consumoMes} kWh</p>
      <p className="text-foregroundopacity80">Última Data de Leitura: {userData.consumidor.ultimaLeitura.toString()}</p>
    </div>
  )}

  {userData?.tipoConta === 'fornecedor' && userData?.fornecedor && (
    <div className="fornecedor-info mb-6">
      <h3 className="text-lg font-semibold text-foreground">Dados do Fornecedor</h3>
      <p className="text-foregroundopacity80">Energia Primária: {userData.fornecedor.energiaPrimaria}</p>
      <p className="text-foregroundopacity80">Capacidade do Fornecedor: {userData.fornecedor.capacidade}</p>
      <p className="text-foregroundopacity80">Licenciatura: {userData.fornecedor.licenciatura}</p>
      <p className="text-foregroundopacity80">Status: {userData.fornecedor.status}</p>
      <p className="text-foregroundopacity80">Data de Registro: {userData.fornecedor.dataOperacao.toString()}</p>
    </div>
  )}

  <Link href="/perfil/update" className='px-4 py-2 bg-foreground text-background rounded-md m-4 hover:bg-background hover:text-foreground transition-all ease-in-out text-center'>Atualizar Usuário</Link>
</div>
  )
}

export default PerfilPage