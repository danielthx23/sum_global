import Usuario from "../usuario/usuario.type";

export default interface Endereco {
    idEndereco: number; 
    numeroCep: string;
    numeroEndereco: number; 
    nomeBairro: string; 
    nomeEstado: string; 
    nomeCidade: string,
    nomeRua: string; 
    complemento: string; 
    usuario?: Usuario;
}