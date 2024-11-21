import Certificado from '@/types/certificado/certificado.type';
import { NextResponse } from 'next/server';

const CERTIFICADO_API_URL = process.env.JAVA_API_URL; 

export async function GET(request: Request, { params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  if (!idUsuario) {
    return NextResponse.json({ error: 'idUsuario é necessário!' }, { status: 400 });
  }

  try {
    const response = await fetch(`${CERTIFICADO_API_URL}/certificado/usuario/${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro recuperando certificados: ${response.statusText}`);
    }

    const data: Certificado = await response.json(); 

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar certificados' }, { status: 500 });
  }
}