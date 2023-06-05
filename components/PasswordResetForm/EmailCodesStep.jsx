import React, { useContext, useState } from "react";
import { ServiceContext } from "../../pages/_app";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

export default function EmailCodesStep({ handleChange, prevStep, nextStep, values }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authService } = useContext(ServiceContext);

  function getCode(codeType) {
    let param = {};
    if (codeType === "mail") {
      param.paramName = "email";
      param.paramValue = values.email;
      authService
        .generateCode(param)
        .then((response) => response.json())
        .then((responseAsJson) => {
          if (!responseAsJson.ok) setErrorMessage(responseAsJson.error);
        });
    }
  }

  async function checkData() {
    let rawResponse = await authService.verifyPasswordResetCode(values);
    let jsonResponse = await rawResponse.json();
    if (!rawResponse.ok) {
      setErrorMessage(jsonResponse.error);
    } else {
      nextStep();
    }
  }

  function goToPrevStep(e) {
    e.preventDefault();
    prevStep();
  }

  function onButtonPressed(e) {
    e.preventDefault();
    checkData();
  }

  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <div className="flex flex-col gap-4 mb-4">
          <div className="relative">
            <label className="sr-only" htmlFor="emailCode">
              Verificación de correo electrónico
            </label>

            <input
              className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
              id="emailCode"
              type="text"
              placeholder="Código del email"
              value={values.emailCode}
              onChange={handleChange("emailConfirmCode")}
            />

            <button
              className="absolute p-2 text-white bg-blue-600 rounded right-4 absolute-center"
              type="button"
              onClick={() => getCode("mail")}
            >
              Recibir
            </button>
          </div>
        </div>
        <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>

        <div className="grid grid-cols-2 gap-4 place-items-center">
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
            border: 1px solid #ccc;
            borderRadius: 4px;
            color: black;
          }
          .error {
            color: brown;
            margin: 1rem 0 0;
          }
          .absolute-center {
            top: 50%;
            transform: translateY(-50%);
          }
        `}
      </style>
    </React.Fragment>
  );
}
