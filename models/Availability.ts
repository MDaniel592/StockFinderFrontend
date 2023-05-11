/**
 * @param shopName :string es el nombre de la tienda
 * @param outlet :boolean indica si se trata de un producto de outlet o no
 * @param price :number es el precio del producto
 * @param url :string es la url del producto en la tienda
 * @param stock :boolean indica si el producto está en stock o no
 */

export default class Availability {
  shopName: string;
  outlet: boolean;
  price: number;
  url: string;
  stock: boolean;

  constructor({ shopName, outlet, price, url, stock }: any) {
    this.shopName = shopName;
    this.outlet = outlet;
    this.price = price;
    this.url = url;
    this.stock = stock;
  }
}
