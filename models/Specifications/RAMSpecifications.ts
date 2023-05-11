import ProductSpecification from "interfaces/ProductSpecification";

export default class RAMSpecifications implements ProductSpecification{
    frecuenciaMemoria: string;
    latencia: string;
    kitMemoria: string;
    cantidadMemoria: string;
    voltaje: string;
    formatoMemoria: string;

    constructor(specs: ProductSpecification){
        this.frecuenciaMemoria = specs["Frecuencia Memoria"];
        this.latencia = specs.Latencia;
        this.kitMemoria = specs["Kit Memoria"];
        this.cantidadMemoria = specs["Cantidad Memoria"];
        this.voltaje = specs.Voltaje;
        this.formatoMemoria = specs["Formato Memoria"];
    }
}