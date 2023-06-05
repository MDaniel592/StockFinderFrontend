import React, { useContext, useState } from "react";
import { ServiceContext } from "../../pages/_app";
import ErrorMessageAlert from "../alerts/ErrorMessageAlert";
import RegisterSuccessAlert from "../alerts/RegisterSuccessAlert";

export default function IdTelegramStep({ handleChange, prevStep, values }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { userService } = useContext(ServiceContext);
  const [successMessage, setSuccessMessage] = useState(undefined);

  async function finishPasswordReset() {
    let rawResponse = await userService.passwordReset(values);
    let jsonResponse = await rawResponse.json();
    if (rawResponse.ok) {
      setSuccessMessage("La contraseña se ha cambiado correctamente.");
    } else {
      setErrorMessage(jsonResponse.error);
    }
  }

  function passwordValid() {
    if (values.password !== values.passwordConfirmation) {
      setErrorMessage(CustomErrors.PASS_MISMATCH);
      return false;
    } else {
      setErrorMessage(undefined);
      return true;
    }
  }

  function goToPrevStep(e) {
    e.preventDefault();
    prevStep();
  }

  function onButtonPressed(e) {
    e.preventDefault();
    if (passwordValid()) finishPasswordReset();
  }

  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <label>
          <span className="text-center">Contraseña</span>
          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            minLength={8}
            maxLength={24}
            value={values.password}
            onChange={handleChange("password")}
            required
          />
          <input
            className="-mt-2"
            type="password"
            name="passwordConf"
            placeholder="Repita la contraseña"
            value={values.passwordConfirmation}
            onChange={handleChange("passwordConfirmation")}
            required
          />
          <a className="text-xs text-center text-slate-300 -mt-2">
            La contraseña debe tener de 8-24 characteres sin contener espacios. Debería incluir letras y números.
          </a>
        </label>

        <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
        <RegisterSuccessAlert isSuccess={successMessage !== undefined} message={successMessage}></RegisterSuccessAlert>
        <div className="grid grid-cols-2 place-items-center gap-4 my-2">
          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={goToPrevStep}
          >
            Atrás
          </button>
          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={(e) => onButtonPressed(e)}
          >
            Actualizar Contraseña
          </button>
        </div>
      </div>
      <style jsx>
        {`
          form,
          label {
            display: flex;
            flex-flow: column;
          }
          label > span {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            borderRadius: 4px;
            color: black;
          }
          .error {
            color: brown;
            margin: 1rem 0 0;
          }
        `}
      </style>
    </React.Fragment>
  );
}
