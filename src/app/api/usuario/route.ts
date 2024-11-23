import Usuario from '@/types/usuario/usuario.type';
import { NextResponse } from 'next/server';

const USER_API_URL = process.env.JAVA_API_URL;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const userData: Usuario = await request.json();

    const response = await fetch(`${USER_API_URL}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 400) {
      return NextResponse.json({ error: 'Dados inválidos para criar usuário.' }, { status: 400 });
    }

    if (!response.ok) {
      throw new Error(`Erro criando usuário: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 }); 
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao criar usuário: ' + error }, { status: 500 });
  }
}
