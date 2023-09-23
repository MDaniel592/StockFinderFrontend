import AuthService from '../services/AuthService'
import Landing from '../components/Index/Landing'
import SlidingImages from '../components/Index/SlidingImages'
import Builder from '../components/Index/Builder'
import Deals from '../components/Index/Deals'
import Price from '../components/Index/Price'

export default function Home({ deals }) {
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
export async function getServerSideProps(context) {
  let authService = new AuthService()
  const result = await authService.validateCookie(context)
  let userData = null
  if (!result.error) userData = result.userData

  const res = await fetch(process.env.BACKEND_API_URL + '/deals')
  const deals = await res.json()

  return { props: { deals, userData } }
}
