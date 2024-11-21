import Consumidor from "../consumidor/consumidor.type";
import Email from "../email/email.type";
import Endereco from "../endereco/endereco.type";
import Fornecedor from "../fornecedor/fornecedor.type";
import Telefone from "../telefone/telefone.type";

export default interface Usuario {
    idUsuario: number;
    nomeUsuario: string;
    razaoSocial?: string;
    cnpj?: string;
    cpf?: string;
    tipoConta: string;
    numeroSenha: string;
    imagemFoto?: string;
    valorToken?: string;
    dataCadastro: Date; 
    telefones: Telefone[];
    enderecos: Endereco[];
    emails: Email[];
    consumidor?: Consumidor;
    fornecedor?: Fornecedor;
}