import React from 'react'
import FAQ from '../components/Explain/FAQ'
import AuthService from '../services/AuthService'

export default function AvisoLegal({ userData }) {
  return (
    <React.Fragment>
      <div className="default-w-space">
        <FAQ />
      </div>
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (!result.error) userData = result.userData
  return {
    props: {
      userData
    }
  }
}
