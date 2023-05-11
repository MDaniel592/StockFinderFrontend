export default interface RegisterUser {
  email: String;
  emailConfirmCode: String;
  password: String;
  confPassword: String;
  telegram: String;
  telegramConfirmCode: String;
  hcaptcha?: String;
}
