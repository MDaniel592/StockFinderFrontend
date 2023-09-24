import React, { useEffect, useContext } from 'react'
import Page404 from '../../components/Page404'
import StockPage from '../../components/Stock/StockPage'
import { ServiceContext } from '../_app'

export default function Home({ ...pageProps }) {
  if (pageProps.data === null || Object.keys(pageProps.data).length === 0)
    return <Page404 />

  const { seTitle } = useContext(ServiceContext)
  useEffect(() => {
    seTitle(`${pageProps.title} | StockFinder.tech`)
  }, [])

  return (
    <React.Fragment>
      <StockPage
        data_recv={pageProps.data}
        category={pageProps.title}
        key={Math.random()}
      />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const title = context['params']['id']

  const res = await fetch(process.env.BACKEND_API_URL + '/stock/' + title)
  const data = await res.json()
  return { props: { data, title } }
}
