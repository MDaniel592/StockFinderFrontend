import React, { Component } from "react";
import IdTelegramStep from "./IdTelegramStep";
import TelegramCodeStep from "./TelegramCodeStep";

export default class TelegramForm extends Component {
  /**
   * Lo que va a ir en el formulario es:
   *
   * Correo
   *
   * id de telegram
   *
   * Código recibido por el bot de Telegram
   */



  state = {
    step: 1,
    email: "",
    telegram: "",
    telegramConfirmCode: "",
  };

  constructor(props) {
    super(props)
    this.state.email = props.userData.email
  }

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
    const { email, telegram, telegramConfirmCode } = this.state;
    const values = { email, telegram, telegramConfirmCode };
    switch (step) {
      case 1:
        return (
          <IdTelegramStep
            handleChange={this.handleChange}
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
          ></IdTelegramStep>
        );
      case 2:
        return (
          <TelegramCodeStep
            handleChange={this.handleChange}
            prevStep={this.prevStep}
            values={values}
            onRegisterSuccess={this.onRegisterSuccess}
          ></TelegramCodeStep>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }
}