import ProductSpecification from "interfaces/ProductSpecification";

export default class PSUSpecifications implements ProductSpecification{
    potencia: string;
    certificacion: string;
    tipoCableado: string;
    tamano: string;

    constructor(specs: ProductSpecification){
        this.potencia = specs.Potencia;
        this.certificacion = specs.Certificación;
        this.tipoCableado = specs["Tipo Cableado"];
        this.tamano = specs.Tamaño;
    }
}