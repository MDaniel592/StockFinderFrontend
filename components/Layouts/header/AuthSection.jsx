import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ServiceContext } from '../../../pages/_app'
import UserPanelAccessIcon from './UserPanelAccessIcon'

export default function AuthSection({ userData }) {
  const { authService, setUserData } = useContext(ServiceContext)

  const router = useRouter()

  const onLogoutButtonPressed = e => {
    e.preventDefault()
    setUserData(undefined)
    authService.logout()
    router.push('/')
  }

  return (
    <React.Fragment>
      <div className="z-20 hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-4">
        <Link
          href={userData ? '/profile' : '/login'}
          className="text-base font-semibold text-white hover:text-blue-500"
        >
          {userData ? 'Panel de usuario' : 'Iniciar Sesion'}
        </Link>

        {userData && (
          <button
            onClick={onLogoutButtonPressed}
            className="mt-2 inline-flex justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
          >
            Cerrar Sesión
          </button>
        )}
        {!userData && (
          <Link href="/sign-up" className="inline-flex justify-center btn-ok">
            Registrarse
          </Link>
        )}
      </div>
      <div className="z-50 flex justify-end md:hidden text-right align-middle">
        <UserPanelAccessIcon
          userData={userData}
          onLogoutButtonPressed={onLogoutButtonPressed}
          img="/images/svg/user-icon.svg"
        ></UserPanelAccessIcon>
      </div>
    </React.Fragment>
  )
}
