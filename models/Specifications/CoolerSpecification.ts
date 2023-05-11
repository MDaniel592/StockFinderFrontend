import ProductSpecification from "interfaces/ProductSpecification";

export default class CoolerSpecification implements ProductSpecification{
    altura: string;
    soporteProcesador: string;
    refrigeracionLiquida: boolean;
    tamanoRadiadorAIO: string;

    constructor(specs: ProductSpecification){
        this.altura = specs["Altura (ventilador incluido)"];
        this.refrigeracionLiquida = specs["Refrigeración Líquida"];
        this.soporteProcesador = specs["Soporte Procesador"];
        this.tamanoRadiadorAIO = specs["Tamaño Radiador AIO"];
    }
}