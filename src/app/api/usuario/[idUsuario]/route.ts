import Usuario from '@/types/usuario/usuario.type';
import { NextResponse } from 'next/server';

const USER_API_URL = process.env.JAVA_API_URL;

export async function GET({ params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  try {
    const response = await fetch(`${USER_API_URL}/usuario/${idUsuario}`);
    if (!response.ok) {
      throw new Error(`Erro recuperando usuário: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha recuperando usuário' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  try {
    const userData: Usuario = await request.json();

    const response = await fetch(`${USER_API_URL}/usuario/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro atualizando usuário: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar usuário' }, { status: 500 });
  }
}