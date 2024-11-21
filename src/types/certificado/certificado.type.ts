import Consumidor from "../consumidor/consumidor.type";

export default interface Certificado {
    idCertificado: number;
    consumidor: Consumidor;
    nomeCertificado: string;
    descricao: string;
    metodoObter: string;
    tipoCertificado: string;
}