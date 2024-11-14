import Usuario from "../usuario/usuario.type";

export default interface Telefone {
    idTelefone: number; 
    telefone: number; 
    DDD: number;
    DDI: number;
    nmLembrete: string;
    usuario: Usuario;
}