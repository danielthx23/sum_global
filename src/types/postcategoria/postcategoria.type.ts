import Usuario from "../usuario/usuario.type";

export default interface PostCategoria {
    postCategoriaId: number;
    usuario: Usuario; 
    tipo: string; 
    descricao: string; 
    dataDeCadastro: string;
}