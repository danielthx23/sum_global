import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(`${POST_API_URL}/fornecimento`);
    if (!response.ok) {
      throw new Error(`Erro recuperando fornecimentos: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar fornecimentos: ' + error }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const fornecimentoData: Fornecimento = await request.json();

    const response = await fetch(`${POST_API_URL}/fornecimento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecimentoData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar Fornecimento: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao criar fornecimento: ' + error }, { status: 500 });
  }
}