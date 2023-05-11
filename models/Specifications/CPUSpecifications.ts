import ProductSpecification from "interfaces/ProductSpecification";

export default class CPUSpecifications implements ProductSpecification{
    tipoSocket: string;
    procesador: string;

    constructor(specs: ProductSpecification){
        this.tipoSocket = specs["Tipo Socket"];
        this.procesador = specs.Procesador;
    }
}