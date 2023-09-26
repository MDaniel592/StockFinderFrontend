import React, { useEffect, useContext } from 'react'
import BuildPage from '../../components/Builder/BuildPage'
import Page404 from '../../components/Page404'
import { ServiceContext } from '../_app'

// Easy, we receive the UUID as link parameter** and we used it to retrieve the product's data
export default function Home({ ...pageProps }) {
  if (Object.keys(pageProps.data).length === 0) return <Page404 />

  const { seTitle } = useContext(ServiceContext)
  useEffect(() => {
    seTitle('Configuración | StockFinder.tech')
  }, [])

  return (
    <React.Fragment>
      <BuildPage data={pageProps.data} build_uuid={pageProps.build_uuid} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const build_uuid = context['params']['uuid']

  let data = {}
  const res = await fetch(
    process.env.BACKEND_API_URL + '/get_build/' + build_uuid
  )
  if (res.ok) data = await res.json()
  return { props: { data, build_uuid } }
}
