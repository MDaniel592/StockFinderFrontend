import Page404 from '../Page404'
import AvisoLegal from './AvisoLegal'
import FAQ from './FAQ'
import PoliticaPrivacidad from './PoliticaPrivacidad'
import ObtenerTelegram from './ObtenerTelegram'
import StockFinderNoSpam from './StockFinderNoSpam'
import Categorias from './Categorias'

import { ServiceContext } from '../../pages/_app'
import React, { useEffect, useContext } from 'react'

export default function CategorySection({ name }) {
  if (!name) return <Page404 />

  const { seTitle } = useContext(ServiceContext)
  useEffect(() => {
    seTitle(`Ayuda | StockFinder.tech`)
  }, [])

  switch (name) {
    case 'avisolegal':
      return <AvisoLegal />

    case 'faq':
      return <FAQ />

    case 'politicaprivacidad':
      return <PoliticaPrivacidad />

    case 'obtener-telegram':
      return <ObtenerTelegram />

    case 'stockfinder-no-spam':
      return <StockFinderNoSpam />

    case 'categorias':
      return <Categorias />

    default:
      return <Page404 />
  }
}
