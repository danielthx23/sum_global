import Usuario from "../usuario/usuario.type";

export default interface Telefone {
    idTelefone: number; 
    numeroTelefone: string; 
    DDD: string;
    DDI: string;
    lembrete: string;
    usuario?: Usuario;
}