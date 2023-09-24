import React from 'react'
import InfoPage from '../../components/Info/InfoPage'
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter()

  return (
    <React.Fragment>
      <InfoPage name={router['query']['name']} />
    </React.Fragment>
  )
}
