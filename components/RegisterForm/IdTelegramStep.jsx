import React, { useContext, useState } from "react";
import { ServiceContext } from "../../pages/_app";
import ErrorMessageAlert from "../alerts/ErrorMessageAlert";

export default function IdTelegramStep({ handleChange, prevStep, nextStep, values }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authService } = useContext(ServiceContext);

  async function checktelegram() {
    let rawResponse = await authService.checkTelegramId(values);
    let jsonResponse = await rawResponse.json();
    if (rawResponse.ok) {
      nextStep();
    } else {
      setErrorMessage(jsonResponse.error);
    }
  }

  function goToPrevStep(e) {
    e.preventDefault();
    prevStep();
  }

  function onButtonPressed(e) {
    e.preventDefault();

    if (values.telegram) checktelegram();
    else nextStep();
  }

  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <label>
          <a className="text-sm text-center text-slate-300">
            Inserta tu identificador de Telegram si deseas recibir avisos por Telegram. En caso contrario, no
            introduzcas nada y salta el siguiente paso
          </a>
          <input
            type="number"
            name="telegram_id"
            className="text-white"
            placeholder="Usuario de telegram (identificador)"
            value={values.telegram}
            pattern="^[0-9]*"
            onChange={handleChange("telegram")}
          />
          <a className="text-xs text-center text-slate-300 -mt-2">Solo se permiten números positivos</a>
          <a
            className="text-xs text-center text-blue-500 hover:underline decoration-blue-600"
            href="https://stockfinder.tech/obtener-telegram"
            target="_blank"
          >
            ¿Cómo obtener su identificador de telegram?
          </a>
        </label>

        <div className="mt-2 text-center">
          <a className="text-md font-semibold mt-2">IMPORTANTE</a>
          <div>
            <p className="text-sm text-center">
              Antes de solicitar el código de Telegram, debes haber hablado el siguiente bot:
            </p>
            <a href="https://t.me/SF_ValidatorBot" className="text-blue-500 hover:underline decoration-blue-600" target="_blank">
              @SF_ValidatorBot
            </a>
          </div>

          <p className="text-sm mt-2 mb-4">
            En otras palabras, debes iniciar el chat para poder recibir el código de validación
          </p>

          <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
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
              Siguiente
            </button>
          </div>
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
