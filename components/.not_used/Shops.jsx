import React from 'react'
import Image from 'next/image'
const shop_list_1 = ['Aussar', 'Coolmod', 'Casemod', 'IzarMicro']
const shop_list_2 = [
  'LDLC',
  'Neobyte',
  'PcComponentes',
  'Speedler',
  'Versus Gamers'
]

export default function Shops({}) {
  return (
    <section className="bg-zinc-800 rounded-lg my-2 py-2 px-2">
      {/* <p id="shops" className="text-2xl sm:text-3xl font-semibold text-center">
        Tiendas soportadas
      </p> */}
      <ul className="flex justify-center py-1">
        {shop_list_1.map(value => {
          return (
            <li className="mx-auto" key={Math.random()}>
              <Image
                src={`/images/logos/shops/${value}.png`}
                className="h-6 lg:h-10 w-auto rounded-md"
              />
            </li>
          )
        })}
      </ul>
      <ul className="flex justify-center py-1">
        {shop_list_2.map(value => {
          return (
            <li className="mx-auto" key={Math.random()}>
              <Image
                src={`/images/logos/shops/${value}.png`}
                className="h-6 lg:h-10 w-auto rounded-md"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
