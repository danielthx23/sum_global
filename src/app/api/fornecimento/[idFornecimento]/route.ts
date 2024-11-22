import Fornecimento from '@/types/fornecimento/fornecimento.type';
import { NextResponse } from 'next/server';

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idFornecimento: string }> }): Promise<NextResponse> {
  const idFornecimento = (await params).idFornecimento;

  if (!idFornecimento) {
    return NextResponse.json({ error: 'idFornecimento é necessário!' }, { status: 400 });
  }

  try {
    const response = await fetch(`${POST_API_URL}/fornecimento/${idFornecimento}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar fornecimento: ${response.statusText}`);
    }

    const data: Fornecimento = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar fornecimento: ' + error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ idFornecimento: string }> }): Promise<NextResponse> {
  const idFornecimento = (await params).idFornecimento;

  if (!idFornecimento) {
    return NextResponse.json({ error: 'idFornecimento é necessário!' }, { status: 400 });
  }

  try {
    const fornecimentoData: Fornecimento = await request.json();

    const response = await fetch(`${POST_API_URL}/fornecimento/${idFornecimento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fornecimentoData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar fornecimento: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao atualizar fornecimento: ' + error  }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ idFornecimento: string }> }): Promise<NextResponse> {
  const idFornecimento = (await params).idFornecimento;

  if (!idFornecimento) {
    return NextResponse.json({ error: 'idFornecimento é necessário!' }, { status: 400 });
  }

  try {
    const response = await fetch(`${POST_API_URL}/fornecimento/${idFornecimento}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro deletando fornecimento: ${response.statusText}`);
    }

    return NextResponse.json({ message: 'Fornecimento deletado com sucesso!' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao deletar fornecimento: ' + error  }, { status: 500 });
  }
}