'use client'

import RegisterForm from "@/app/login/register/_components/registerform/registerform.component"
import Loader from "@/components/loader/loader.component"
import SemPermissao from "@/components/sempermissao/sempermissao.component"
import useAuth from "@/hooks/useauth/useauth.hook"
import Usuario from "@/types/usuario/usuario.type"
import { toastAlerta } from "@/utils/toastalert/toastalert.util"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const UpdateUsuarioForm = () => {
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
        toastAlerta('Falha ao carregar dados do usuário. Tente novamente: ' + error, 'erro')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [usuario])

  if (!usuario) {
    return <SemPermissao />;
  }

  if (loading) {
    return <Loader classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'} classNameLoader={'w-14 h-14'} haveLabel={true} label={'Carregando seu perfil!'} />
  }

  return (<div className="p-3 rounded-lg shadow mx-auto w-full h-fit flex flex-col gap-8 justify-center" style={{ maxWidth: '800px' }}>
    <h2 className="text-center w-full mb-2 font-black text-3xl pt-8">
      Atualizar Usuário
    </h2>
    <RegisterForm initialUsuario={userData} isUpdate={true} />
  </div>
  )
}

export default UpdateUsuarioForm