import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import ProfileLayout from '../components/Layouts/ProfileLayout'
import LoginForm from '../components/LoginForm/LoginForm'
import { ServiceContext } from './_app'

export default function index() {
  const { authService, userData, seTitle } = useContext(ServiceContext)

  const router = useRouter()
  const onLoginSuccess = () => {
    router.push('/profile')
  }

  const validateUserData = async () => {
    try {
      if (!userData) return
      router.push('/profile')
    } catch (err) {
      authService.logout()
      router.push('/login')
    }
  }

  useEffect(() => {
    seTitle('Inicio de sesión | StockFinder.tech')
    validateUserData()
  }, [])

  return (
    <React.Fragment>
      <ProfileLayout>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography>
        <hr />
        <form>
          <LoginForm onLoginSuccess={onLoginSuccess}></LoginForm>
        </form>
      </ProfileLayout>
    </React.Fragment>
  )
}
