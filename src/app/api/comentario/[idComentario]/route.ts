import Comentario from '@/types/comentario/comentario.type';
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL; 

export async function GET(request: Request, { params }: { params: Promise<{ idComentario: string }> }): Promise<NextResponse> {
  const idComentario = (await params).idComentario;

  try {
    const response = await fetch(`${POST_API_URL}/comentario/${idComentario}`);
    if (!response.ok) {
      throw new Error(`Erro recuperando comentario por idComentario: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar comentario: ' + error }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: { params: Promise<{ idComentario: string }> }): Promise<NextResponse> {
  const idComentario = (await params).idComentario;

  if (!idComentario) {
    return NextResponse.json({ error: 'IdComentario é necessário!' }, { status: 400 });
  }

  try {
    const commentData: Comentario = await request.json();

    const response = await fetch(`${POST_API_URL}/comentario/${idComentario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`Erro atualizando comentário: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar comentário: ' + error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ idComentario: string }> }): Promise<NextResponse> {
  const idComentario = (await params).idComentario;

  if (!idComentario) {
    return NextResponse.json({ error: 'IdComentário é necessário!' }, { status: 400 });
  }

  try {
    const response = await fetch(`${POST_API_URL}/comentario/${idComentario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar comentário: ${response.statusText}`);
    }

    return NextResponse.json({ message: 'Comentário deletado com sucesso!' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao deletar comentário: ' + error }, { status: 500 });
  }
}