import HCaptcha from '@hcaptcha/react-hcaptcha'
import React, { useContext, useRef, useState } from 'react'
import { ServiceContext } from '../../pages/_app'
import { CustomErrors } from '../../utils/CustomErrors'
import ErrorMessageAlert from '../Alerts/ErrorMessageAlert'
import Link from 'next/link'

export default function LoginStep({ handleChange, values, onLoginSuccess }) {
  const { authService, setUserData } = useContext(ServiceContext)

  const [errorMessage, setErrorMessage] = useState(undefined)
  const web_sitekey = 'a396fe4e-c41b-4ac2-a2a6-d981a4e28161'
  const captchaRef = useRef(null)

  function handleVerificationSuccess(token, ekey) {
    values.hcaptcha = token
  }
  async function attemptLogin() {
    let loginResponse = await authService.login(values)
    if (!loginResponse.error) {
      setUserData(loginResponse.userData)
      onLoginSuccess()
    } else setErrorMessage(loginResponse.error)
  }

  function passwordValid() {
    if (values.password.length < 8 || values.password.length > 24) {
      setErrorMessage(CustomErrors.PASS_WRONGSIZE)
      return false
    } else {
      setErrorMessage(undefined)
      return true
    }
  }

  async function onButtonPressed(e) {
    e.preventDefault()
    if (passwordValid()) await attemptLogin()
    captchaRef.current.resetCaptcha()
  }

  return (
    <React.Fragment>
      <div className="my-6 mx-12">
        <label>
          <span className="text-center">Usuario</span>
          <input
            className="text-white rounded-lg"
            type="text"
            name="username"
            placeholder="Email"
            minLength={8}
            value={values.email}
            onChange={handleChange('email')}
            required
          />
        </label>
        <label>
          <span className="text-center">Contraseña</span>
          <input
            className="text-white rounded-lg"
            type="password"
            name="password"
            placeholder="Contraseña"
            minLength={8}
            maxLength={24}
            value={values.password}
            onChange={handleChange('password')}
            required
          />
        </label>

        <div className="text-center mb-4">
          <Link
            className="text-sm hover:underline hover:text-blue-500 hover:underline-blue-500"
            href="/reset-password"
          >
            ¿Olvidaste la contraseña?
          </Link>
        </div>
        <div className="rounded-lg border-white border-4">
          <HCaptcha
            sitekey={web_sitekey}
            onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
            ref={captchaRef}
          />
        </div>

        <ErrorMessageAlert
          hasError={errorMessage !== undefined}
          errorText={errorMessage}
        ></ErrorMessageAlert>
        <div className="grid place-items-center my-2">
          <button
            className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
            onClick={e => onButtonPressed(e)}
          >
            Iniciar Sesión
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
            borderradius: 4px;
            color: black;
          }
          .error {
            color: brown;
            margin: 1rem 0 0;
          }
        `}
      </style>
    </React.Fragment>
  )
}
