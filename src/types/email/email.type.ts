import Usuario from "../usuario/usuario.type";

export default interface Email {
    idEmail: number;
    nome: string; 
    dominio: string; 
    usuario: Usuario; 
}