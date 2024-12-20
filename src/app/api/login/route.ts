import UsuarioLogin from '@/types/usuariologin/usuariologin.type';
import { NextResponse } from 'next/server';

const AUTH_API_URL = process.env.JAVA_API_URL;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const loginData: UsuarioLogin = await request.json();

    if(AUTH_API_URL === undefined) {
      return NextResponse.json({ error: 'Backend URL não conectado!'  }, { status: 500 });
    }
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Falha ao Logar' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao logar: ' + error  }, { status: 500 });
  }
}