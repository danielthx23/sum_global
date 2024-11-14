import Usuario from "../usuario/usuario.type";

export default interface Post {
    postId: number;
    usuario: Usuario;
    titulo: string;
    descricao: string;
    imagem: string;
    dataDeCadastro: Date;
}