import ProductDataModel from "./ProductDataModel";
import SpecDataModel from "./SpecDataModel";

/**
 * @param _id :string es el id de la alerta
 * @param productData :productDataModel es la información del produto asociado a la alerta
 * @param userMaxPrice :number es el precio máximo que el usuario quiere pagar
 * @param userSize :string (SOLO SE LE HACE CASO CUANDO EL PRODUCTO ES ROPA) la talla que se busca
 */
export default class UserAlertModel {
  _id: string;
  specData: SpecDataModel;
  productData: ProductDataModel;
  userMaxPrice: number;
  alertType: String;

  constructor({ id, spec_data, product_data, user_max_price, alert_type }: any) {
    this._id = id;
    this.specData = new SpecDataModel(spec_data);
    this.productData = new ProductDataModel(product_data);
    this.userMaxPrice = user_max_price;
    this.alertType = alert_type;
  }
}
