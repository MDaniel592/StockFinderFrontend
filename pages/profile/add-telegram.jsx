import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import ProfileLayout from '../../components/Layouts/ProfileLayout'
import TelegramForm from '../../components/Profile/UserTelegram/TelegramForm'
import AuthService from '../../services/AuthService'
import { ServiceContext } from '../_app'

export default function New_Alert({ userData, data }) {
  const { authService, seTitle } = useContext(ServiceContext)
  const router = useRouter()

  const validateUserData = async () => {
    if (!userData) {
      authService.logout()
      router.push('/login')
    }
  }

  useEffect(() => {
    seTitle('Panel de Usuario | StockFinder.tech')
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
          Asociar Telegram
        </Typography>
        <TelegramForm userData={userData}></TelegramForm>
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
