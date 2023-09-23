import React from 'react'
import Page404 from '../../components/Page404'
import StockPage from '../../components/Stock/StockPage'
import AuthService from '../../services/AuthService'

/*
 * nameserver/categorias/[id] -> There are allowed categories to avoid unnecessaries petitions to the DB
 * If there is a valid category, the corresponding webpage will be returned
 */
export default function Home({ data, userData, category }) {
  if (data === null || Object.keys(data).length === 0) return <Page404 />

  return (
    <React.Fragment>
      <StockPage data_recv={data} category={category} key={Math.random()} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (!result.error) userData = result.userData

  const category = context['params']['id']
  const title = category

  const res = await fetch(process.env.BACKEND_API_URL + '/stock/' + category)
  const data = await res.json()
  return { props: { data, userData, title } }
}
