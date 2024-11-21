import Post from "../post/post.type";
import Usuario from "../usuario/usuario.type";

export default interface Comentario {
    idComentario: number; 
    usuario: Usuario; 
    titulo: string; 
    texto: string; 
    imagem?: string;
    post: Post;
}