import Usuario from "../usuario/usuario.type";

export default interface Consumidor {
    idConsumidor: number; 
    classeConsumo: string;
    tipoConsumo: string;
    consumoEnergetico: number; 
    numeroMedidor: string;
    tarifa: number; 
    consumoMes: number; 
    ultimaLeitura: Date;
    usuario: Usuario;
}