import React from 'react'
import CategoriasList from '../components/Index/CategoriasList'
import AuthService from '../services/AuthService'

export default function Categorias({}) {
  return (
    <React.Fragment>
      <CategoriasList />
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (!result.error) userData = result.userData
  const title = 'Categorías'
  return { props: { userData, title } }
}
