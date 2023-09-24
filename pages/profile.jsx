import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import UserAlerts from '../components/Profile/UserAlert/UserAlerts'
import UserDataProfile from '../components/Profile/UserData/UserData'
import WarningMessage from '../components/Profile/UserData/WarningMessage'
import UserManagement from '../components/Profile/UserManagement'
import UserAlertModel from '../models/UserAlertModel'
import CookieService from '../services/CookieService'
import { ServiceContext } from './_app'

export default function index() {
  const { authService, userService, userData, seTitle } =
    useContext(ServiceContext)
  const router = useRouter()

  const [alertsList, setAlertsList] = useState([])
  const validateUserData = async () => {
    try {
      if (!userData) {
        authService.logout()
        router.push('/login')
        return
      }
    } catch (err) {
      authService.logout()
      router.push('/login')
      return
    }
  }

  const getUserWatches = async () => {
    const token = CookieService.getCookie('StockFinder')
    const response = await userService.getUserWatches(token)
    if (!response.ok) return
    const data = await response.json()
    setAlertsList(
      data.products ? data.products.map(item => new UserAlertModel(item)) : []
    )
  }

  useEffect(() => {
    seTitle('Panel de Usuario | StockFinder.tech')
    validateUserData()
    getUserWatches()
  }, [])
  const active_telegram = userData?.telegram ? true : false

  return (
    <div className="mx-2 sm:mx-10">
      <h3 className="text-3xl font-semibold text-center">Panel de usuario</h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <WarningMessage userData={userData} />

      <div className="block lg:flex gap-4 mx-auto">
        <div className="w-52 hidden lg:block">
          <UserDataProfile userData={userData} />
          <div className="mx-12 border-b"></div>

          {active_telegram && (
            <div className="my-4 mx-8">
              <button
                className="btn-blue-white"
                onClick={e => router.push('/profile/new-alert')}
              >
                Nueva alerta
              </button>
            </div>
          )}

          <div className="mx-12 border-b"></div>
          <UserManagement />
        </div>

        <div className="grid">
          <div className="sm:mx-36 lg:hidden">
            <UserDataProfile userData={userData} />
          </div>
          <div className="mx-auto w-32 border-b border-neutral-300 lg:hidden"></div>

          <div className="my-2">
            <UserAlerts alerts={alertsList} userData={userData} />
          </div>

          {active_telegram && (
            <div className="my-2 w-36 mx-auto lg:hidden">
              <button
                className="btn-blue-white"
                onClick={e => router.push('/profile/new-alert')}
              >
                Nueva alerta
              </button>
            </div>
          )}

          <div className="sm:mx-36 lg:hidden">
            <UserManagement />
          </div>
        </div>
      </div>
    </div>
  )
}
