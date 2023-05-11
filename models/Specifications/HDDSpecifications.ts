import ProductSpecification from "interfaces/ProductSpecification";

export default class HDDSpecifications implements ProductSpecification {
    almacenamiento: string;
    tecnologiaDiscoDuro: string;
    conexiones: string;
    discoDuro: string;

    constructor(specs: ProductSpecification){
        this.almacenamiento = specs.Almacenamiento;
        this.tecnologiaDiscoDuro = specs["Tecnología Disco Duro"];
        this.conexiones = specs.Conexiones;
        this.discoDuro = specs["Disco Duro"];
    }
}