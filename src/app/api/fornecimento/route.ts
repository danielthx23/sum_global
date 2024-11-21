import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(`${POST_API_URL}/fornecimento`);
    if (!response.ok) {
      throw new Error(`Error fetching fornecimentos: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching fornecimentos:', error);
    return NextResponse.json({ error: 'Failed to fetch fornecimentos' }, { status: 500 });
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
      throw new Error(`Error creating fornecimento: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating fornecimento:', error);
    return NextResponse.json({ error: 'Failed to create fornecimento' }, { status: 500 });
  }
}