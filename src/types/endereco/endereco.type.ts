import Usuario from "../usuario/usuario.type";

export default interface Endereco {
    idEndereco: number; 
    nrCep: string;
    nrEndereco: number; 
    nmBairro: string; 
    nmEstado: string; 
    nmCidade: string,
    nmRua: string; 
    dsComplemento: string; 
    usuario: Usuario;
}