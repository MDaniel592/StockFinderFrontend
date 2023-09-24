import React from 'react'
import CategoriasList from '../Index/CategoriasList'

export default function Categorias() {
  return (
    <React.Fragment>
      <CategoriasList />
    </React.Fragment>
  )
}

// Server side rendering
export async function getServerSideProps(context) {
  const title = 'Categorías'
  return { props: { title } }
}
