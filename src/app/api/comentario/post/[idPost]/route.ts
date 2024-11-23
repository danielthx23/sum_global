import { NextResponse } from "next/server";

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idPost: string }> }): Promise<NextResponse> {
  const idPost = (await params).idPost;

  try {
    const response = await fetch(`${POST_API_URL}/comentario/post/${idPost}`);
    
    if (response.status === 404) {
      return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 });
    }
    
    if (!response.ok) {
      throw new Error(`Erro recuperando comentario por postId: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao recuperar post: ' + error }, { status: 500 });
  }
}
