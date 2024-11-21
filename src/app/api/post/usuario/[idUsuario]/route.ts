import { NextResponse } from 'next/server';

const USER_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  try {
    const response = await fetch(`${USER_API_URL}/post/usuario/${idUsuario}`);

    if (!response.ok) {
      throw new Error(`Erro ao recuperar post por usuário: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar post usuário' }, { status: 500 });
  }
}