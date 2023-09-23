import { createContext } from 'react'
import AlertService from '../services/AlertService'
import AuthService from '../services/AuthService'
import BuildService from '../services/BuildService'
import UserService from '../services/UserService'
import Layout from '../components/Layouts/Layout'
import { AnimatePresence } from 'framer-motion'

import '../styles/global.css'
import '../styles/custom.css'

export const ServiceContext = createContext()
export const BuilderContext = createContext()
export const DropdownContext = createContext()

function Website({ Component, pageProps: { session, ...pageProps }, router }) {
  const authService = new AuthService()
  const userService = new UserService()
  const alertService = new AlertService()
  const buildService = new BuildService()
  return (
    <ServiceContext.Provider
      value={{ authService, userService, alertService, buildService }}
    >
      <Layout
        router={router}
        userData={pageProps.userData}
        titlePage={pageProps.title}
      >
        <AnimatePresence
          exitBeforeEnter
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ServiceContext.Provider>
  )
}

export default Website
