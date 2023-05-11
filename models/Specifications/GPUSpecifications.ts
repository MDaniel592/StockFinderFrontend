import ProductSpecification from "interfaces/ProductSpecification";

export default class GPUSpecification implements ProductSpecification {
    modelo: string;
    tamanoMemoria: string;
    tipoMemoria: string;
    tipoGrafica: string;
    Longitud: string;
    Anchura:string;
    Altura: string;

    constructor(specs: ProductSpecification){ 
        this.modelo = specs.Modelo;
        this.tamanoMemoria = specs["Tamaño Memoria"];
        this.tipoMemoria = specs["Tipo Memoria"]
        this.tipoGrafica = specs["Tipo Gráfica"];
        this.Longitud = specs.Longitud;
        this.Anchura = specs.Anchura;
        this.Altura = specs.Altura;
    }

}