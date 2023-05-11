import React, { Component } from "react";
import EmailCodesStep from "./EmailCodesStep";
import PasswordStep from "./PasswordStep";
import UserInfoStep from "./UserInfoStep";

export default class PasswordResetForm extends Component {
  /**
   * Lo que va a ir en el formulario es:
   *
   * Correo
   * Contraseña
   * Confirmacion de contraseña
   *
   * id de telegram
   *
   * Código recibido por el bot de Telegram
   * Código del correo.
   */

  state = {
    step: 1,
    email: "",
    password: "",
    passwordConfirmation: "",
    telegram: "",
    telegramConfirmCode: "",
    emailConfirmCode: "",
  };

  prevStep = () => {
    let { step } = this.state;
    this.setState({ step: step - 1 });
  };
  nextStep = () => {
    let { step } = this.state;
    this.setState({ step: step + 1 });
  };
  handleChange = (input) => (changeEvent) => {
    this.setState({ [input]: changeEvent.target.value });
  };

  render() {
    const { step } = this.state;
    const { email, password, passwordConfirmation, telegram, telegramConfirmCode, emailConfirmCode } = this.state;
    const values = { email, password, passwordConfirmation, telegram, telegramConfirmCode, emailConfirmCode };
    switch (step) {
      case 1:
        return <UserInfoStep handleChange={this.handleChange} nextStep={this.nextStep} values={values}></UserInfoStep>;
      case 2:
        return (
          <EmailCodesStep
            handleChange={this.handleChange}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            onRegisterSuccess={this.onRegisterSuccess}
          ></EmailCodesStep>
        );
      case 3:
        return <PasswordStep handleChange={this.handleChange} prevStep={this.prevStep} values={values}></PasswordStep>;

      default:
        return <React.Fragment></React.Fragment>;
    }
  }
}
