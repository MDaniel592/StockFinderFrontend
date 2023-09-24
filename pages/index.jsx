import Landing from '../components/Index/Landing'
import SlidingImages from '../components/Index/SlidingImages'
import Builder from '../components/Index/Builder'
import Deals from '../components/Index/Deals'
import Price from '../components/Index/Price'

import React, { useContext, useEffect } from 'react'
import { ServiceContext } from './_app'

export default function Home({ deals }) {
  const { seTitle } = useContext(ServiceContext)

  useEffect(() => {
    seTitle('StockFinder.tech')
  }, [])

  return (
    <>
      <Landing />
      <SlidingImages />
      <Builder />
      <Deals data={deals} />
      <Price />
    </>
  )
}

// Server side rendering
export async function getServerSideProps() {
  const res = await fetch(process.env.BACKEND_API_URL + '/deals')
  const deals = await res.json()

  return { props: { deals } }
}
