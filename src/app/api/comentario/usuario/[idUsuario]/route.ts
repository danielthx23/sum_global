import { NextResponse } from "next/server";

const USER_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idUsuario: string }> }): Promise<NextResponse> {
  const idUsuario = (await params).idUsuario;

  try {
    const response = await fetch(`${USER_API_URL}comentario/usuario/${idUsuario}`);
    if (!response.ok) {
      throw new Error(`Erro ao recuperar comentarios por idUsuario: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar comentarios por idUsuario: ' + error  }, { status: 500 });
  }
}