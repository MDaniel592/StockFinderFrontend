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
    authService.logout()
    setUserData(undefined)
    router.push('/')
  }

  return (
    <React.Fragment>
      <div className="z-20 hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-4">
        <Link
          href={userData ? '/profile' : '/login'}
          className="text-base font-semibold btn-transparent-white"
        >
          {userData ? 'Panel de usuario' : 'Iniciar Sesion'}
        </Link>

        {userData && (
          <button
            onClick={onLogoutButtonPressed}
            className="inline-flex justify-center btn-ok"
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
