import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  if (!idUsuario) {
    return NextResponse.json({ error: 'idUsuario é necessário!' }, { status: 400 });
  }

  try {
    const response = await fetch(`${POST_API_URL}/fornecimento/usuario/${idUsuario}`);
    if (!response.ok) {
      throw new Error(`Erro ao recuperar fornecimento pelo usuario ${idUsuario}: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar fornecimento por usuario: ' + error }, { status: 500 });
  }
}
