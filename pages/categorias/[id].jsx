import React from 'react'
import CategorySection from '../../components/Categories_pages/CategorySection'
import Page404 from '../../components/Page404'

const allowedCategories = [
  'tarjetas-graficas',
  'procesadores',
  'placas-base',
  'memoria-ram',
  'fuentes-alimentacion',
  'almacenamiento',
  'torres',
  'disipadores-cpu',
  'monitores'
]

/*
 * nameserver/categorias/[id] -> There are allowed categories to avoid unnecessaries petitions to the DB
 * If there is a valid category, the corresponding webpage will be returned
 */
export default function Home({ ...pageProps }) {
  if (!pageProps.data) return <Page404 />

  return (
    <React.Fragment>
      <CategorySection category={pageProps.category} data={pageProps.data} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const category = context['params']['id']

  for (let allowed in allowedCategories) {
    if (category != allowedCategories[allowed]) continue
    const res = await fetch(
      process.env.BACKEND_API_URL + '/category/' + category
    )
    const data = await res.json()
    return { props: { data, category } }
  }

  const data = false
  return { props: { data, category } }
}
