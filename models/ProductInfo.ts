import ProductSpecification from "interfaces/ProductSpecification";
import Availability from "./Availability";

/**
 * @param image :string[] son las url de la imagen
 * @param name :string es el nombre del producto
 * @param manufacturer :string es el fabricante del producto
 * @param availability :Availability[] es la disponibilidad del producto
 * @param specifications :ProductSpecification son las diferentes características del producto
 */

export default class ProductInfo {
  image: string;
  images: string[];
  manufacturer: string;
  name: string;
  availabilities: Availability[];
  specifications: ProductSpecification;
  uuid: string;
  category: string;
  price: Number;
  historical:string[];
  constructor({ image, images, manufacturer, name, availabilities, specifications, uuid, category, price, historical }: any) {
    this.image = image;
    this.images = images;
    this.manufacturer = manufacturer;
    this.name = name;
    this.availabilities = availabilities;
    this.specifications = specifications;
    this.uuid = uuid;
    this.category = category;
    this.price = price;
    this.historical = historical;
  }
}
