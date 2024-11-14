import Fornecedor from "../fornecedor/fornecedor.type";
import TipoDeFornecimento from "../tipodefornecimento/tipodefornecimento.type";

export default interface Fornecimento {
    fornecimentoId: number; 
    fornecedor: Fornecedor;
    fornecimentoImagem: string;
    tipoDeContratacao: string;
    precoPorKWH: number; 
    dataDeVencimento: Date; 
    tipoDeFornecimento: TipoDeFornecimento;
}