import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import NewAlert from '../../components/Profile/NewAlert'
import AlertService from '../../services/AlertService'
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
      <NewAlert
        userData={userData}
        telegram={userData.telegram}
        gpuModels={data}
      />
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

  let alertService = new AlertService()
  const res = await alertService.getModelsGPU(userData, context)
  let data = await res.json()
  return { props: { userData, data } }
}
