import GPUCategory from '../Dropdown/GPUCategory'
import GPUStock from '../Dropdown/GPUStock'
import { generations, solutions } from './header/GPUdata'
import Oportunities from './header/Oportunities'
import PCBuilder from './header/PCBuilder'
import Link from 'next/link'
import AuthSection from './header/AuthSection'

function Navbar({ path, userData }) {
  const logoIMG = `/images/logos/StockFinderLogo.svg`

  return (
    <header className="sticky top-0 w-full px-4 lg:px-12 lg:py-1 bg-zinc-800 z-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between md:justify-start items-center pt-2 md:space-x-10">
          <div>
            <Link href="/">
              <span className="inline-flex">
                <img
                  className="h-8 w-auto hover:-rotate-12"
                  src={logoIMG}
                  alt=""
                />
                <p className="hidden md:block my-auto ml-2 text-lg font-medium hover:text-blue-500 subpixel-antialiased text-white">
                  StockFinder
                </p>
              </span>
            </Link>
          </div>
          <AuthSection userData={userData}></AuthSection>
        </div>

        <div className="relative flex justify-center items-center lg:justify-start h-10">
          <PCBuilder />
          <GPUStock title="GPU Stock" generations={generations} />
          <GPUCategory
            title="Componentes"
            data={solutions}
            img="/images/svg/chip.svg"
          />
          <div className="p-2 text-white h-10 items-center z-20">
            <Link href="/categorias/monitores" className="flex items-center">
              <img
                alt=""
                src="/images/svg/monitor.svg"
                className="h-6 w-6 mr-2 invert"
              />
              <span className="hidden lg:block text-sm font-medium text-url">
                Monitores
              </span>
            </Link>
          </div>

          <Oportunities />
          {/* <TelegramChannelsList telegram_channels={telegram_channels} /> */}
        </div>
      </div>
    </header>
  )
}

export default Navbar
