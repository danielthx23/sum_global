import Usuario from "../usuario/usuario.type";

export default interface Consumidor {
    consumidorId: number; 
    classeDeConsumo: string;
    tipoDeConsumo: string;
    consumoEnergetico: number; 
    numeroDoMedidor: string;
    tarifa: number; 
    consumoDeEnergiaMes: number; 
    ultimaDataDeLeitura: Date;
    usuario: Usuario;
}