import Comentario from "../comentario/comentario.type";
import Usuario from "../usuario/usuario.type";

export default interface Post {
    idPost: number;
    usuario: Usuario;
    titulo: string;
    descricao: string;
    imagem?: string;
    dataCadastro: Date;
    comentarios?: Comentario[];
}