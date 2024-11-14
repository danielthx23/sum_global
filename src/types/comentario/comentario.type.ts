import Usuario from "../usuario/usuario.type";

export default interface Comentario {
    comentarioId: number; 
    usuario: Usuario; 
    titulo: string; 
    texto: string; 
    imagem: string;
}