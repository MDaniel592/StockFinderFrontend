/**
 * @param wantsToBeAlertedByEmail :boolean indica si el usuario quiere ser avisado mediante correo electrónico
 * @param wantsToBeAlertedByTelegram :boolean indica si el usuario quiere ser avisado mediante un mensaje de Telegram
 * @param productName :string nombre del producto
 */
export default class SpecDataModel {
  wantsToBeAlertedByEmail: any;
  wantsToBeAlertedByTelegram: any;
  productName: string;

  constructor({ name, mail_alert, telegram_alert }: any) {
    this.productName = name;
    this.wantsToBeAlertedByEmail = mail_alert;
    this.wantsToBeAlertedByTelegram = telegram_alert;
  }
}
