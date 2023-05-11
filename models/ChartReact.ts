import { ScatterDataPoint } from "chart.js";


/**
 * @param shopName :string es el nombre de la tienda
 * @param outlet :boolean indica si se trata de un producto de outlet o no
 * @param price :number es el precio del producto
 * @param url :string es la url del producto en la tienda
 * @param stock :boolean indica si el producto está en stock o no
 */

export default class ChartReact {
  labels: string[];
  datasets: ScatterDataPoint;

  constructor({ labels, datasets }: any) {
    this.labels = labels;
    this.datasets = datasets;
  }
}
