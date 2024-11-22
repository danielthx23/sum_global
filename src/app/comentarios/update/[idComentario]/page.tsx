'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useParams} from 'next/navigation';
import useAuth from '@/hooks/useauth/useauth.hook';
import Comentario from '@/types/comentario/comentario.type';
import ComentarioForm from '@/components/comentarioform/comentarioform.component';
import SemPermissao from '@/components/sempermissao/sempermissao.component';
import { toastAlerta } from '@/utils/toastalert/toastalert.util';
import Loader from '@/components/loader/loader.component';

const UpdateComentarioForm = () => {
  const { usuario } = useAuth();
  const params = useParams();
  const id = params.idComentario;

  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentario = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/comentario/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar comentário');
        }
        const data = await response.json();
        setComentario(data);
      } catch (error) {
        toastAlerta(
          error instanceof Error ? error.message : 'Erro ao carregar comentário',
          'erro'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComentario();
  }, [id]);

  if (loading) {
    return (
      <Loader
        classNameWrapper={'h-screen w-full flex flex-col gap-4 items-center justify-center'}
        classNameLoader={'w-14 h-14'}
        haveLabel={true}
        label={'Carregando Comentário'}
      />
    );
  }

  if (!comentario) {
    return notFound();
  }

  if (!usuario || usuario.idUsuario !== comentario.usuario?.idUsuario) {
    return <SemPermissao />;
  }

  return (
    <main className='h-screen w-full flex justify-center items-center'>
        <ComentarioForm
          postId={comentario.post?.idPost || 0}
          initialComentario={comentario}
          isUpdate={true}
        />
    </main>
  );
};

export default UpdateComentarioForm;
