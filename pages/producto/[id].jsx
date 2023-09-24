import React, { useEffect, useContext } from 'react'
import Page404 from '../../components/Page404'
import ProductPage from '../../components/Product/ProductPage'
import { ServiceContext } from '../_app'

// Easy, we receive the UUID as link parameter** and we used it to retrieve the product's data
export default function Home({ ...pageProps }) {
  if (Object.keys(pageProps.data).length === 0) {
    return <Page404 />
  }

  const { seTitle } = useContext(ServiceContext)
  useEffect(() => {
    seTitle(`${pageProps.title} | StockFinder.tech`)
  }, [])

  return (
    <React.Fragment>
      <ProductPage data={pageProps.data} />
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  const product_uuid = context['params']['id']

  const res = await fetch(
    process.env.BACKEND_API_URL + '/product/' + product_uuid
  )
  const data = await res.json()

  const title = data?.name ? data.name : false
  return { props: { data, title } }
}
