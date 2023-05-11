import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ServiceContext } from "../../pages/_app";
import ErrorMessageAlert from "../alerts/ErrorMessageAlert";

export default function UserInfoStep({ handleChange, nextStep, values }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authService, userService } = useContext(ServiceContext);
  const router = useRouter();

  async function checkData() {
    let rawResponse = await userService.checkUserExist(values);
    let jsonResponse = await rawResponse.json();
    if (rawResponse.ok) nextStep();
    else setErrorMessage(jsonResponse.error);
  }

  function onButtonPressed(e) {
    e.preventDefault();
    checkData();
  }

  function returnLogin(e) {
    e.preventDefault();
    router.push("/login");
  }

  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <label>
          <span className="text-center">Usuario</span>
          <input
            type="text"
            name="username"
            placeholder="Email"
            minLength={8}
            value={values.email}
            onChange={handleChange("email")}
            required
          />
        </label>

        <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
        <div className="grid place-items-center my-2 gap-4">
          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={(e) => onButtonPressed(e)}
          >
            Siguiente
          </button>

          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={(e) => returnLogin(e)}
          >
            Volver al login
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
