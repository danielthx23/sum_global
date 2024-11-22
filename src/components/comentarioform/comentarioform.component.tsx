'use client'

import Button from "@/components/button/button.component"
import Input from "@/components/input/input.component"
import useAuth from "@/hooks/useauth/useauth.hook"
import useForm, { FormState } from "@/hooks/useform/useform.hook"
import { useRouter } from "next/navigation"
import { useRef } from 'react'
import Post from "@/types/post/post.type"
import Comentario from "@/types/comentario/comentario.type"
import Usuario from "@/types/usuario/usuario.type"
import { toastAlerta } from "@/utils/toastalert/toastalert.util"
import Loader from "../loader/loader.component"

interface ComentarioFormProps {
  postId: number; 
  initialComentario?: Comentario;
  isUpdate?: boolean;
}

const ComentarioForm = ({ postId, initialComentario, isUpdate }: ComentarioFormProps) => {
  const { usuario } = useAuth()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const initialComentarioForm: Comentario = {
    idComentario: initialComentario?.idComentario || 0, 
    usuario: usuario as Usuario, 
    titulo: initialComentario?.titulo || '',
    texto: initialComentario?.texto || '',
    imagem: initialComentario?.imagem || undefined,
    post: { idPost: postId } as Post 
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
    initialComentarioForm,
    submitCallback,
    submitErrorCallback,
    (form) => {
      const errors: { [key: string]: string } = {}

      const tituloInput = form.elements.namedItem('titulo') as HTMLInputElement
      if (tituloInput && !tituloInput.value) {
        errors.titulo = 'Título é obrigatório'
      }

      const textoInput = form.elements.namedItem('texto') as HTMLTextAreaElement
      if (textoInput && !textoInput.value) {
        errors.texto = 'Texto é obrigatório'
      }

      return errors
    }
  )

  async function submitErrorCallback(error: Error) {
    toastAlerta(error.message || 'Erro ao enviar comentário', 'erro');
}

async function submitCallback(values: FormState) {
    try {
        const response = await fetch(isUpdate ? `/api/comentario/${initialComentario?.idComentario}` :'/api/comentario', {
            method: isUpdate ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(isUpdate ? 'Erro ao atualizar comentário' : 'Erro ao enviar comentário');
        }

        //const data = await response.json();

        toastAlerta(isUpdate ? 'Comentário atualizado com sucesso!' : 'Comentário enviado com sucesso!', 'sucesso');
        router.push("/posts");
    } catch (error) {
        if (error instanceof Error) {
            return submitErrorCallback(error);
        }
        return submitErrorCallback(new Error('Erro ao enviar comentário'));
    }
}

  return (
    <form
      className="flex flex-col items-center gap-2 p-4 px-12"
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
        <Input
          label="Título"
          type="text"
          name="titulo"
          placeholder="Título do comentário"
          value={data.titulo}
          handleChange={(_,e) => handleChange(e)}
          customError={errors.titulo}
          readOnly={loadingSubmit}
          required
          className="w-full flex justify-center"
          wrapperClassName='w-full'
        />
        <Input
          label="Texto"
          type="textarea"
          name="texto"
          placeholder="Escreva seu comentário"
          value={data.texto}
          handleChange={(_,e) => handleChange(e)}
          customError={errors.texto}
          readOnly={loadingSubmit}
          required
          className="w-full flex justify-center"
          wrapperClassName='w-full'
        />
        <Input
          label="Imagem (opcional)"
          type="text"
          name="imagem"
          placeholder="URL da imagem (opcional)"
          value={data.imagem || ''}
          handleChange={(_,e) => handleChange(e)}
          readOnly={loadingSubmit}
          className="w-full flex justify-center"
          wrapperClassName='w-full'
        />
      </section>
      <Button
        type="submit"
        disabled={loadingSubmit || !!errorsCount || !formRef.current}
        backgroundColor="backgroundlight"
        textColor="foreground"
        className="mt-8 w-full hover:bg-backgroundopacity80 hover:text-foreground border border-foregroundopacity20 hover:border-foregroundopacity20 transition-all ease-in-out"
      >
        {loadingSubmit ? (
          <Loader
            classNameWrapper="w-fit h-fit"
            classNameLoader="w-fit h-fit border-foreground text-foreground"
            haveLabel={false}
            label=""
          />
        ) : isUpdate ? (
          'Atualizar Comentário'
        ) : (
          'Criar Comentário'
        )}
      </Button>
    </form>
  )
}

export default ComentarioForm