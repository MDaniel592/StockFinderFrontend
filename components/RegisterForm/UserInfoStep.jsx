import React, { useContext, useState } from "react";
import { ServiceContext } from "../../pages/_app";
import { CustomErrors } from "../../utils/CustomErrors";
import ErrorMessageAlert from "../alerts/ErrorMessageAlert";

export default function UserInfoStep({ handleChange, nextStep, values }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authService } = useContext(ServiceContext);

  async function checkData() {
    let rawResponse = await authService.checkUserInfo(values);
    let jsonResponse = await rawResponse.json();
    if (rawResponse.ok) nextStep();
    else setErrorMessage(jsonResponse.error);
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

  function onButtonPressed(e) {
    e.preventDefault();
    if (passwordValid()) checkData();
  }
  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <label>
          <span className="text-center">Usuario</span>
          <input
            className="text-white"
            type="text"
            name="username"
            placeholder="Email"
            minLength={8}
            value={values.email}
            onChange={handleChange("email")}
            required
          />
          <a className="text-xs text-center text-slate-300 -mt-2">
            Proveedores de correo soportados: Google (gmail), Microsoft (outlook y hotmail) y Mozilla (mozmail).
          </a>
        </label>
        <label>
          <span className="text-center">Contraseña</span>
          <input
            className="text-white"
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
            className="-mt-2 text-white"
            type="password"
            name="passwordConf"
            placeholder="Repita la contraseña"
            value={values.passwordConfirmation}
            onChange={handleChange("passwordConfirmation")}
            required
          />
          <a className="text-xs text-center text-slate-300 -mt-2">
            La contraseña debe tener de 8-32 characteres sin contener espacios. Debería incluir letras y números.
          </a>
        </label>
        <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
        <div className="grid place-items-center my-2">
          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={(e) => onButtonPressed(e)}
          >
            Siguiente
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
            border-radius: 4px;
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
