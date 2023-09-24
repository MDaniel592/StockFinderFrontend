import React from 'react'
import Canales from '../Canales'

export default function Home({ ...pageProps }) {
  return (
    <React.Fragment>
      <Canales data={pageProps.data}> </Canales>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const title = 'Canales de Telegram'
  const res = await fetch(process.env.BACKEND_API_URL + '/telegram_channels')
  const data = await res.json()

  return { props: { data, title } }
}
