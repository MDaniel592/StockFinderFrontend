import Link from 'next/link'
import { generations, solutions } from '/components/Layouts/header/GPUdata'

export default function CategoriasList({}) {
  const linkClass =
    'hover:underline text-left text-blue-500 text-xxs lg:text-base'

  return (
    <section className="flex flex-wrap gap-4 sm:justify-left default-w-space">
      <div className="info mb-4 w-full md:w-fit md:mb-auto">
        <h1 id="INFORMACION" className="text-xl sm:text-3xl font-semibold mt-4">
          Listado de categorías
        </h1>
        <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
        <div className="grid">
          <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">
            CATEGORIAS
          </span>
          <ul
            className="pl-10 grid justify-start list-disc"
            key={Math.random()}
          >
            {solutions.map(value => {
              return (
                <li key={Math.random()}>
                  <Link href={value.href} className={linkClass}>
                    {value.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="grid mt-4">
          <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">
            STOCK DE PRODUCTOS
          </span>
          {generations.map(value => {
            return (
              <div className="ml-4" key={Math.random()}>
                <span className="font-semibold text-xs lg:text-base mb-2 border-b border-gray-500">
                  {value.name}
                </span>
                <ul className="pl-10 grid justify-start list-disc">
                  {value.values.map(second_value => {
                    return (
                      <li key={Math.random()}>
                        <Link href={second_value.href} className={linkClass}>
                          {second_value.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
