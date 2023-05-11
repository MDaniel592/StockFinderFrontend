import React, { useContext, useState } from "react";
import { ServiceContext } from "../../../pages/_app";
import CookieService from "../../../services/CookieService";
import { CustomErrors } from "../../../utils/CustomErrors";
import ErrorMessageAlert from "../../alerts/ErrorMessageAlert";
import SuccessMessageAlert from "../../alerts/SuccessMessageAlert";

export default function PasswordResetForm({ userData }) {
  const [values, setValues] = useState({
    token: "",
    password: "",
    passwordConfirmation: "",
  });

  if (!userData) {
    return <React.Fragment></React.Fragment>;
  }


  const { userService } = useContext(ServiceContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const handleChange = (changeEvent) => {
    setValues({ ...values, [changeEvent.target.name]: changeEvent.target.value });
  };

  async function finishPasswordReset() {
    let cookieToken = CookieService.getCookie("StockFinder");
    let rawResponse = await userService.profilePasswordReset({ ...values, token: cookieToken });
    let jsonResponse = await rawResponse.json();
    if (rawResponse.ok) setSuccessMessage(jsonResponse.ok);
    else setErrorMessage(jsonResponse.error);
  }

  function passwordValid() {
    if (values.newPassword !== values.newPasswordConfirmation) {
      setErrorMessage(CustomErrors.PASS_MISMATCH);
      return false;
    } else {
      setErrorMessage(undefined);
      return true;
    }
  }

  function onButtonPressed(e) {
    e.preventDefault();
    if (passwordValid()) finishPasswordReset();
  }

  return (
    <React.Fragment>
      <div className="my-2 text-sm">
        <label>
          <span className="text-center hidden sm:block text-base">Cambio de contraseña</span>
          <div className="border-t mx-10 mt-4 mb-4 block sm:hidden"></div>
          <span className="text-center text-2xl block sm:hidden">Cambio de contraseña</span>
          <p className="text-xs text-center mt-2 mb-2">Se permite un cambio cada 24 horas</p>
          <input
            className="input mb-3"
            type="password"
            name="currentPassword"
            placeholder="Contraseña actual"
            minLength={8}
            maxLength={24}
            value={values.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            minLength={8}
            maxLength={24}
            value={values.newPassword}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="newPasswordConfirmation"
            placeholder="Repita la contraseña"
            minLength={8}
            maxLength={24}
            value={values.newPasswordConfirmation}
            onChange={handleChange}
            required
          />
          <a className="text-xxs text-center text-neutral-400">
            La contraseña debe tener de 8-24 characteres sin contener espacios, y debería incluir letras y números.
          </a>
        </label>

        <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
        <SuccessMessageAlert isSuccess={successMessage !== undefined} message={successMessage}></SuccessMessageAlert>
        <button className="btn-blue-white my-3 w-48 mx-auto" onClick={(e) => onButtonPressed(e)}>Actualizar Contraseña </button>
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


        `}
      </style>
    </React.Fragment>
  );
}
