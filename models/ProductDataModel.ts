/**
 * @param isInStock :boolean indica si hay producto del stock o no
 * @param wantsToBeAlertedByEmail :boolean indica si el usuario quiere ser avisado mediante correo electrónico
 * @param wantsToBeAlertedByTelegram :boolean indica si el usuario quiere ser avisado mediante un mensaje de Telegram
 * @param productName :string nombre del producto
 * @param productPrice :number precio del producto actualmente
 * @param productUrl :string enlace para la compra del producto
 * @param productUniqueIdentifier :string es el identificador unico del producto (UPC).
 */
export default class ProductDataModel {
  isInStock: boolean;
  wantsToBeAlertedByEmail: boolean;
  wantsToBeAlertedByTelegram: boolean;
  productName: string;
  productPrice: number;
  productUUID: string;
  productUrl: string;
  productUniqueIdentifier: string;
  image: string;
  shop: String;

  constructor({ stock, mail_alert, name, price, telegram_alert, url, url_code, uuid, image, shop }: any) {
    this.image = image;
    this.shop = shop;
    this.isInStock = stock;
    this.wantsToBeAlertedByEmail = mail_alert;
    this.productName = name;
    this.productPrice = price;
    this.wantsToBeAlertedByTelegram = telegram_alert;
    this.productUUID = uuid;
    this.productUrl = url;
    this.productUniqueIdentifier = url_code; //Es el UPC del producto. Un código único que lo identifica, no tiene que ver con el id de la base de datos sino con el código de barras, por así decirlo.
  }
}
