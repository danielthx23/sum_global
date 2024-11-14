import Usuario from "../usuario/usuario.type";

export default interface Fornecedor {
    fornecedorId: number;
    usuario: Usuario;
    energiaPrimaria: string;
    dataDeOperacao: Date; 
    status: string;
    capacidadeDeEnergia: number; 
    licenciatura: string;
    regiao: string;
}