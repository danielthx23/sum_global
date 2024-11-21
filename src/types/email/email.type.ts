import Usuario from "../usuario/usuario.type";

export default interface Email {
    idEmail: number;
    email: string;
    usuario?: Usuario; 
}