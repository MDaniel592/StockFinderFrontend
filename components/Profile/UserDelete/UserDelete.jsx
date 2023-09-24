import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ServiceContext } from '../../../pages/_app'
import CookieService from '../../../services/CookieService'
import ErrorMessageAlert from '../../Alerts/ErrorMessageAlert'

export default function UserDelete({ userData }) {
  const router = useRouter()
  const [values, setValues] = useState({ token: '', password: '' })

  if (!userData) {
    return <React.Fragment></React.Fragment>
  }

  const { userService, authService } = useContext(ServiceContext)
  const [errorMessage, setErrorMessage] = useState(undefined)

  async function deleteAccountPopUp() {
    const alert = withReactContent(
      Swal.mixin({
        customClass: {
          confirmButton: 'btn-error mx-1 text-black hover:text-white',
          cancelButton: 'btn-ok mx-1 text-black hover:text-white'
        },
        buttonsStyling: false
      })
    )
    alert
      .fire({
        titleText: '¿Está seguro de eliminar su cuenta?',
        icon: 'warning',
        text: `Esta acción es irreversible`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar cuenta',
        cancelButtonText: 'Cancelar'
      })
      .then(async result => {
        if (result.isConfirmed) {
          let cookieToken = CookieService.getCookie('StockFinder')
          let rawResponse = await userService.deleteAccount({
            ...values,
            token: cookieToken
          })
          let jsonResponse = await rawResponse.json()
          if (rawResponse.ok) {
            setErrorMessage(undefined)
            const alert = withReactContent(Swal)
            alert.fire({
              title: 'Eliminación de la cuenta',
              icon: 'success',
              text: 'Se ha eliminado la cuenta correctamente',
              timer: 5000,
              toast: true,
              timerProgressBar: true,
              willClose: () => {
                authService.logout()
                router.push('/')
              }
            })
          } else setErrorMessage(jsonResponse.error)
        } else if (result.isDismissed && result.dismiss == 'cancel') {
          return
        }
      })
  }
  const handleChange = changeEvent => {
    setValues({
      ...values,
      [changeEvent.target.name]: changeEvent.target.value
    })
  }

  async function handleDeleteButtonClick(event) {
    event.preventDefault()
    let result = deleteAccountPopUp()
    if (result === false) return
  }

  return (
    <React.Fragment>
      <div className="px-4 text-sm text-center">
        <p className="text-xs my-2 font-sans font-semibold text-red-500 underline">
          Esta acción es irreversible
        </p>
        <input
          className="input my-2 mb-4 mx-auto"
          type="password"
          name="password"
          placeholder="Contraseña actual"
          minLength={8}
          maxLength={24}
          value={values.password}
          onChange={handleChange}
          required
        />
        <p className="text-xxs lg:mx-4">
          Se eliminaran todos los datos relacionados con el usuario.
        </p>

        <ErrorMessageAlert
          hasError={errorMessage !== undefined}
          errorText={errorMessage}
        ></ErrorMessageAlert>
        <button
          className="btn-error my-3 w-48 mx-auto"
          onClick={e => handleDeleteButtonClick(e)}
        >
          Eliminar cuenta
        </button>
        <button
          className="btn-blue-white mb-4 w-48 mx-auto"
          onClick={e => router.push('/profile')}
        >
          Volver
        </button>
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
  )
}
