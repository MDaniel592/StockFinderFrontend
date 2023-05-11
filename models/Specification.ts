/**
 * @param name :string es el nombre de la característica del producto
 * @param value :string es el valor de la característica del producto
 */
export default class Specification {
  name: string;
  value: string;
  constructor({ name, value }: any) {
    this.name = name;
    this.value = value;
  }
}
