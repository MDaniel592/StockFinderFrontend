import React, { useEffect, useState } from 'react'
import AuthService from '../services/AuthService'

import ProductsRows from 'components/Oportunities/ProductsRows'

export default function OportunitiesISR({ data }) {
  const [userData, setUserData] = useState({})
  const authService = new AuthService()
  useEffect(() => {
    async function fetchUserData() {
      const result = await authService.clientValidateCookie()
      if (!result.error) setUserData(result.userData)
    }
    fetchUserData()
  }, [])

  const twentyPercent = data?.[20] ? data[20] : []
  const thirtyPercent = data?.[30] ? data[30] : []
  const fortyPercent = data?.[40] ? data[40] : []
  const fiftyPercent = data?.[50] ? data[50] : []

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 default-w-space py-2">
        <h1 className="text-2xl sm:text-3xl font-semibold">Oportunidades</h1>
        <p className="text-xs lg:text-sm">
          En esta página encontrarás los productos que han experimentado una
          reducción de precio (ofertas) en un porcentaje determinado (20%, 30%,
          40% y 50% o superior), en comparación con el precio mínimo registrado
          en los últimos 7 días.
        </p>

        <ProductsRows data={fiftyPercent} discount={{ start: 50 }} />
        <ProductsRows data={fortyPercent} discount={{ start: 40, end: 50 }} />
        <ProductsRows data={thirtyPercent} discount={{ start: 30, end: 40 }} />
        <ProductsRows data={twentyPercent} discount={{ start: 20, end: 30 }} />
      </div>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  let options = { method: 'GET' }
  const controller = new AbortController()
  options.signal = controller.signal

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 30000)

  const data = await fetch(
    process.env.BACKEND_API_URL + '/get_oportunities',
    options
  )
    .then(async response => {
      clearTimeout(timeoutId)

      if (!response.ok) {
        console.log(`Request failed with status ${response.status}`)
        return {}
      }
      const jsonResponse = await response.json()
      return jsonResponse
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Request timed out')
      }
      return {}
    })

  return { props: { data }, revalidate: 900 }
}
