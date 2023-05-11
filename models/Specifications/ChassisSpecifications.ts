import ProductSpecification from "interfaces/ProductSpecification";

export default class ChassisSpecifications implements ProductSpecification {
    formatoPlacaBase: string;
    alturaMaximaCPU: string;
    longitudMaximaGPU: string;

    constructor(specs: ProductSpecification){
        this.alturaMaximaCPU = "";
        this.longitudMaximaGPU = "";

        // Para las propiedades que tienen acentos, miramos la palabra clave.
        for(let spec in specs){
            let data = specs[spec];
            if(spec.toUpperCase().includes("ALTURA"))
                this.alturaMaximaCPU = data;
            else if(spec.toUpperCase().includes("LONGITUD"))
                this.longitudMaximaGPU = data;
        }
        
        this.formatoPlacaBase = specs["Formato Placa Base"];
    }
}