import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import ProfileLayout from '../../components/Layouts/ProfileLayout'
import UserPassword from '../../components/Profile/UserPassword/UserPassword'
import AuthService from '../../services/AuthService'
import { ServiceContext } from '../_app'

export default function ProfileChangePassword({ userData, data }) {
  const { authService } = useContext(ServiceContext)
  const router = useRouter()

  const validateUserData = async () => {
    if (!userData) {
      authService.logout()
      router.push('/login')
    }
  }

  useEffect(() => {
    validateUserData()
  }, [])

  if (!userData) return <React.Fragment></React.Fragment>
  if (data) data = data.data

  return (
    <React.Fragment>
      <ProfileLayout>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cambio de contraseña
        </Typography>
        <UserPassword userData={userData}></UserPassword>
      </ProfileLayout>
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (result.error) return { props: {} }
  userData = result.userData
  const title = 'Perfil'
  return { props: { userData, title } }
}
