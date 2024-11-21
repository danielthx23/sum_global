import Usuario from "../usuario/usuario.type";

export default interface Fornecedor {
    idFornecedor: number;
    usuario: Usuario;
    energiaPrimaria: string;
    dataOperacao: Date; 
    status: string;
    capacidade: number; 
    licenciatura: string;
    regiao: string;
}