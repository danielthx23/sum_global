'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import useAuth from '@/hooks/useauth/useauth.hook'
import { useRouter } from 'next/navigation'
import Usuario from '@/types/usuario/usuario.type'
import Loader from '@/components/loader/loader.component'
import { toastAlerta } from '@/utils/toastalert/toastalert.util'

const ProfilePage = () => {
  const router = useRouter()
  const { usuario } = useAuth() 
  const [userData, setUserData] = useState<Usuario>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!usuario) {
        setLoading(false)
        return
      }
  
      try {
        const response = await fetch(`/api/usuario/${usuario.idUsuario}`)
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário.')
        }
        const data = await response.json()
        setUserData(data)
        toastAlerta('Dados carregados com sucesso!', 'sucesso') 
      } catch (error) {
        toastAlerta('Falha ao carregar dados do usuário. Tente novamente.', 'erro')
      } finally {
        setLoading(false)
      }
    }
  
    fetchUserData()
  }, [usuario, router])
  

  if (loading) {
    return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando seu perfil!'}/>
  }

  return (
    <div className="profile-container">
      <h1>Perfil do Usuário</h1>
      <div className="profile-details">
        <div className="profile-photo">
          <Image
            src={userData?.imagemFoto || 'https://shopify.dev/assets/templated-apis-screenshots/pos-ui-extensions/2024-10/image-default.png'}
            alt="Foto de Perfil"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div className="profile-info">
          <h2>{userData?.nomeUsuario}</h2>
          {userData?.tipoConta === 'fornecedor' && (
            <h3>Razão Social: {userData?.razaoSocial}</h3>
          )}
          {userData?.tipoConta === 'consumidor' && (
            <h3>CPF: {userData?.cpf}</h3>
          )}
          {userData?.tipoConta === 'fornecedor' ? (
            <p>CNPJ: {userData?.cnpj}</p>
          ) : (
            <p>CPF: {userData?.cpf}</p>
          )}
          <p>Data de Cadastro: {userData?.dataCadastro.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="contact-info">
        <h3>Informações de Contato</h3>
        {userData?.emails && userData.emails.length > 0 && (
          <div>
            <h4>Emails:</h4>
            <ul>
              {userData.emails.map((email) => (
                <li key={email.idEmail}>{email.email}</li>
              ))}
            </ul>
          </div>
        )}
        {userData?.telefones && userData.telefones.length > 0 && (
          <div>
            <h4>Telefones:</h4>
            <ul>
              {userData.telefones.map((telefone) => (
                <li key={telefone.idTelefone}>{telefone.DDI} {telefone.DDD} {telefone.numeroTelefone}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="address-info">
        <h3>Endereços</h3>
        {userData?.enderecos && userData.enderecos.length > 0 ? (
          <ul>
            {userData.enderecos.map((endereco) => (
              <li key={endereco.idEndereco}>
                {endereco.nomeRua}, {endereco.numeroEndereco}, {endereco.nomeBairro}, {endereco.nomeCidade}, {endereco.nomeEstado} - {endereco.numeroCep}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum endereço cadastrado.</p>
        )}
      </div>

      {userData?.tipoConta === 'consumidor' && userData?.consumidor && (
        <div className="consumidor-info">
          <h3>Dados do Consumidor</h3>
          <p>Classe de Consumo: {userData.consumidor.classeConsumo}</p>
          <p>Tipo de Consumo: {userData.consumidor.tipoConsumo}</p>
          <p>Consumo Energético: {userData.consumidor.consumoEnergetico} kWh</p>
          <p>Número do Medidor: {userData.consumidor.numeroMedidor}</p>
          <p>Tarifa: R$ {userData.consumidor.tarifa}</p>
          <p>Consumo de Energia no Mês: {userData.consumidor.consumoMes} kWh</p>
          <p>Última Data de Leitura: {new Date(userData.consumidor.ultimaLeitura).toLocaleDateString()}</p>
        </div>
      )}

      {userData?.tipoConta === 'fornecedor' && userData?.fornecedor && (
        <div className="fornecedor-info">
          <h3>Dados do Fornecedor</h3>
          <p>Energia Primária: {userData.fornecedor.energiaPrimaria}</p>
          <p>Capacidade do Fornecedor: {userData.fornecedor.capacidade}</p>
          <p>Licenciatura: {userData.fornecedor.licenciatura}</p>
          <p>Status: {userData.fornecedor.status}</p>
          <p>Data de Registro: {new Date(userData.fornecedor.dataOperacao).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage