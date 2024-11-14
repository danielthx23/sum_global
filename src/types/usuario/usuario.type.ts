export default interface Usuario {
    idUsuario: number;
    nmUsuario: string;
    razaoSocial: string;
    cnpj?: string;
    cpf?: string;
    flConta: string;
    nmSenha: string;
    imgFoto: string;
    dsTokem: string;
    dtCadastro: Date; 
}