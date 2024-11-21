import Post from '@/types/post/post.type';
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idPost: string }> }): Promise<NextResponse> {
  const idPost = (await params).idPost;

  try {
    const response = await fetch(`${POST_API_URL}/post/${idPost}`);
    if (!response.ok) {
      throw new Error(`Erro recuperando post por id: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha recuperando post por id' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ idPost: string }> }): Promise<NextResponse> {
  const idPost = (await params).idPost;

  try {
    const postData: Post = await request.json();

    const response = await fetch(`${POST_API_URL}/post/${idPost}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Erro atualizando post: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ idPost: string }> }): Promise<NextResponse> {
  const idPost = (await params).idPost;

  try {
    const response = await fetch(`${POST_API_URL}/post/${idPost}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Falha deletando post: ${response.statusText}`);
    }

    return NextResponse.json({ message: 'Post deletado com sucesso!' }, { status: 204 }); 
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao deletar post' }, { status: 500 });
  }
}