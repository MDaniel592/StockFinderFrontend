import Link from 'next/link'

// import Banner from './Banner'

export default function index() {
  const linkClass =
    'hover:underline text-left text-blue-500 text-xs sm:text-base hover:cursor-pointer'
  return (
    <>
      {/* <Banner></Banner> */}
      {/* <footer className="bottom-0 w-full bg-zinc-800 pb-16 lg:pb-23 rounded-sm pt-2 sm:pt-4"> Tabbar*/}

      <footer className="bottom-0 w-full pb-4 lg:pb-6 bg-zinc-800 rounded-sm pt-2 sm:pt-4">
        <section className="flex px-4 gap-6 sm:gap-10 justify-center">
          <div className="grid">
            <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">
              CATEGORIAS
            </span>
            <div className="pl-1 gap-1 grid justify-start">
              <Link href="/builder" className={linkClass}>
                Configurador
              </Link>
              <Link href="/info/categorias" className={linkClass}>
                Componentes
              </Link>
              <br />
            </div>
          </div>

          <div className="grid">
            <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">
              INFORMACION
            </span>
            <div className="pl-1 gap-1 grid justify-start">
              <Link href="/info/politicaprivacidad" className={linkClass}>
                Política de Privacidad
              </Link>
              <Link href="/info/avisolegal" className={linkClass}>
                Aviso Legal
              </Link>
              <Link href="/info/faq" className={linkClass}>
                FAQ
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
