import Consumidor from "../consumidor/consumidor.type";
import TipoDeCertificado from "../tipodecertificado/tipodecertificado.type";

export default interface Certificado {
    certificadoId: number;
    consumidor: Consumidor;
    tipoDeCertificado: TipoDeCertificado;
    nomeDoCertificado: string;
    descricao: string;
    metodoDeObter: string;
}