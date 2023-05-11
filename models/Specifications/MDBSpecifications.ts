import ProductSpecification from "interfaces/ProductSpecification";

export default class MDBSpecifications implements ProductSpecification{
    chipset: string;
    factorForma: string;
    tipoSocket: string;

    constructor(specs: ProductSpecification){
        this.chipset = specs.Chipset;
        this.factorForma = specs["Factor de Forma"];
        this.tipoSocket = specs["Tipo Socket"];
    }
}