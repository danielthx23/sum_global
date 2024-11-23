import Post from '@/types/post/post.type'; 
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const postData: Post = await request.json();

    const response = await fetch(`${POST_API_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.status === 400) {
      return NextResponse.json({ error: 'Dados inválidos para o post.' }, { status: 400 });
    }

    if (!response.ok) {
      throw new Error(`Erro salvando post: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 }); 

  } catch (error) {
    return NextResponse.json({ error: 'Falha salvando post: ' + error}, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(`${POST_API_URL}/post`);

    if (response.status === 404) {
      return NextResponse.json({ error: 'Posts não encontrados.' }, { status: 404 });
    }

    if (!response.ok) {
      throw new Error(`Erro recuperando posts: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 }); 

  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar posts: ' + error }, { status: 500 });
  }
}
