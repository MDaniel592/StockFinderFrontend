import React, { Component } from "react";
import LoginStep from "./LoginStep";

export default class LoginForm extends Component {
  /**
   * Lo que va a ir en el formulario es:
   *
   * Correo
   * Contraseña
   *
   */

  state = {
    step: 1,
    email: "",
    password: "",
    hcaptcha: "",
  };

  handleChange = (input) => (changeEvent) => {
    this.setState({ [input]: changeEvent.target.value });
  };

  render() {
    const { step } = this.state;
    const { email, password, hcaptcha } = this.state;
    const values = { email, password, hcaptcha };
    switch (step) {
      case 1:
        return (
          <LoginStep
            handleChange={this.handleChange}
            values={values}
            onLoginSuccess={this.props.onLoginSuccess}
          ></LoginStep>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }
}
