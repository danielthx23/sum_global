import Fornecedor from "../fornecedor/fornecedor.type";

export default interface Fornecimento {
    idFornecimento: number; 
    fornecedor?: Fornecedor;
    fornecimentoImagem?: string;
    tipoContrato: string;
    precoKwh: number; 
    dataVencimento: Date; 
    tipoEnergia: string;
    processoObtencao: string;
}