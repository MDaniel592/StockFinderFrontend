import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import ProfileLayout from '../components/Layouts/ProfileLayout'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import AuthService from '../services/AuthService'
import { ServiceContext } from './_app'

export default function main({ userData }) {
  const { authService } = useContext(ServiceContext)
  const router = useRouter()

  const onLogoutButtonPressed = e => {
    e.preventDefault()
    authService.logout()
    router.push('/sign-up')
  }

  const onProfileButtonPressed = e => {
    e.preventDefault()
    router.push('/profile')
  }

  if (!userData) {
    return (
      <React.Fragment>
        <ProfileLayout>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <hr />
          <form>
            <RegisterForm></RegisterForm>
          </form>
        </ProfileLayout>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Layout userData={userData} title_text={false}>
        <ProfileLayout>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <div className="my-6 mx-12">
            <Typography component="h1" variant="h6">
              Debes cerrar sesión para crear una nueva cuenta
            </Typography>

            <button
              className="mt-4 w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
              onClick={onLogoutButtonPressed}
            >
              Cerrar sesión
            </button>
            <button
              className="mt-4 w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
              onClick={onProfileButtonPressed}
            >
              Ir al perfil
            </button>
          </div>
        </ProfileLayout>
      </Layout>
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (!result.error) userData = result.userData
  const title = 'Registro'
  return { props: { userData, title } }
}
