'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import { FormState } from '@/hooks/useform/useform.hook';
import PostsForm from '../_components/postsform/postsform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';

const CreatePostForm = () => {
  const router = useRouter();
  const { usuario } = useAuth();

  if (!usuario) {
    return <SemPermissao/>;
  }

  const handlePostCreation = async (values: FormState) => {
    try {
      const postData = {
        ...values,
        usuario: usuario
      };

      const request = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!request.ok) {
        const errorData = await request.json();
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido.');
      }
      //const response = await request.json();
      toastAlerta('Post salvado com sucesso!', "sucesso")
      router.push('/posts');
    } catch (error) {
      toastAlerta('Erro ao salvar Post: ' + error, "sucesso")
    }
  };

  return (
    <PostsForm onSubmit={handlePostCreation} />
  );
};

export default CreatePostForm;