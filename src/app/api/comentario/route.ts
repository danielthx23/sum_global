import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function POST(request: Request): Promise<NextResponse> {

  try {
    const dataComentario = await request.json();

    if (!dataComentario) {
      return NextResponse.json({ error: 'Conteudo do comentario é necesssário!' }, { status: 400 });
    }

    const response = await fetch(`${POST_API_URL}/comentario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataComentario),
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar comentário: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao salvar comentário: ' + error  }, { status: 500 });
  }
}