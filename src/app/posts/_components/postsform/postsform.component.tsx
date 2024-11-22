'use client';

import { useRef } from 'react';
import Button from "@/components/button/button.component";
import Input from "@/components/input/input.component";
import useForm, { FormState } from "@/hooks/useform/useform.hook";
import Textarea from '@/components/textarea/textarea.component';
import Post from '@/types/post/post.type';
import Loader from '@/components/loader/loader.component';

interface PostsFormProps {
  onSubmit: (values: FormState) => Promise<void>;
  initialPost?: Post; 
  isUpdate?: boolean; 
}

const PostsForm: React.FC<PostsFormProps> = ({ onSubmit, initialPost, isUpdate = false }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const initialPostForm = {
    titulo: initialPost ? initialPost.titulo : '',
    descricao: initialPost ? initialPost.descricao : '',
    imagem: initialPost ? initialPost.imagem : '',
  };

  const {
    data: { titulo, descricao, imagem },
    loadingSubmit,
    handleChange,
    handleSubmit,
    errors,
    errorsCount,
  } = useForm(
    formRef,
    initialPostForm,
    onSubmit, 
    async (error: Error) => alert(error.message),
    () => {
      const errors: { [key: string]: string } = {};
      if (!titulo) errors.titulo = 'O título é obrigatório';
      if (!descricao) errors.descricao = 'A descrição é obrigatória';
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
        <h1 className='text-2xl w-full text-center mb-8'>{isUpdate ? 'Atualizar Post' : 'Criar novo Post'}</h1>
      <Input
        label="Título"
        name="titulo"
        value={titulo}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.titulo}
        required
        readOnly={loadingSubmit}
        placeholder="Título do post"
        className="w-full"
      />
      <Textarea
        label="Descrição"
        name="descricao"
        value={descricao}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.descricao}
        required
        readOnly={loadingSubmit}
        placeholder="Descrição do post"
        className="w-full"
      />
      <Input
        label="Imagem (URL)"
        name="imagem"
        value={imagem}
        handleChange={(_, e) => handleChange(e)}
        customError={errors.imagem}
        readOnly={loadingSubmit}
        placeholder="URL da imagem (opcional)"
        className="w-full"
      />
      <Button
        type="submit"
        disabled={loadingSubmit || errorsCount > 0}
        backgroundColor="backgroundlight"
        textColor="foreground"
        className="mt-8 w-full flex justify-center items-center"
      >
        {loadingSubmit ? <Loader classNameWrapper={'w-fit h-fit'} classNameLoader={'w-fit h-fit border-foreground text-foreground'} haveLabel={false} label={''}/> : isUpdate ? 'Atualizar Post' : 'Criar Post'}
      </Button>
    </form>
  );
};

export default PostsForm;