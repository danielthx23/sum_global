import { NextResponse } from "next/server";

const POST_API_URL = process.env.JAVA_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ idPost: string }> }): Promise<NextResponse> {
  const idPost = (await params).idPost;

  try {
    const response = await fetch(`${POST_API_URL}/comentario/post/${idPost}`);
    if (!response.ok) {
      throw new Error(`Erro recuperando comentario por postId: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}