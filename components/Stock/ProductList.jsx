import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
export default function ProductList({
  data,
  maxTableList,
  failOverImage = ''
}) {
  if (!data || data.length === 0) {
    return (
      <div className="p-2 sm:p-4 text-center">
        <p className="text-base lg:text-xl font-medium text-red-500">
          No hay productos que cumplan los filtros aplicados
        </p>
      </div>
    )
  }

  const REFER = ''

  const new_data = data.sort(function (a, b) {
    return a.price - b.price
  })
  const display_data = new_data.slice(maxTableList[0], maxTableList[1])

  return (
    <div name="Products">
      <ul>
        <li className="hidden lg:block lg:my-2 stock-header-text rounded-xl">
          <div className="mx-5 grid grid-cols-7 border-b border-zinc-600 px-2">
            <div className="col-span-4">Nombre</div>
            <div className="text-right">Precio</div>
            <div className="col-span-2 text-right">Tienda</div>
          </div>
        </li>

        {display_data.map(value => {
          const url =
            value['url'].indexOf('pccomponentes.com') !== -1
              ? REFER + value['url']
              : value['url']
          var name = value['name'].replace(/(\r\n|\n|\r)/gm, '')
          name =
            url.toUpperCase().indexOf('RASTRILLO') === -1
              ? name
              : name + ' - Reacondicionado'
          const imageUrl =
            value['images'].length > 0
              ? `https://images.stockfinder.tech${value['images']}`
              : `/images/placeholder/${failOverImage}.webp`
          const price = parseFloat(value.price).toFixed(2)

          return (
            <div key={Math.random().toString()}>
              <li className="hidden lg:block my-2 stock-text">
                <div className="mx-4 px-4 grid md:grid-cols-7 items-center font-medium bg-zinc-700 hover:bg-zinc-600 hover:text-blue-500 rounded-xl">
                  <div className="md:col-span-4">
                    <Link
                      href={url}
                      className="hover:text-blue-500 hover:underline hover:decoration-blue-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          width={40}
                          height={40}
                          src={imageUrl}
                          alt={value['images']}
                          style={{ width: 'auto', height: 'auto' }}
                          className="h-10 w-10 rounded-md"
                        />
                        {name.replace(/(\r\n|\n|\r)/gm, '')}
                      </div>
                    </Link>
                  </div>
                  <div className="text-right">{price}€</div>
                  <div className="md:col-span-2 text-right whitespace-nowrap">
                    {value.shop}
                  </div>
                </div>
              </li>

              <li className="block lg:hidden p-1 stock-text">
                <div className="bg-zinc-700 hover:bg-zinc-600 hover:text-blue-500 rounded-xl px-2 py-1">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={40}
                      height={40}
                      style={{ width: 'auto', height: 'auto' }}
                      className="h-10 w-10 rounded-md"
                    />

                    <div className="grid grid-rows-2 w-full items-center text-xs">
                      <Link
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-500 hover:underline hover:decoration-blue-500"
                      >
                        <p className="leading-none">
                          {' '}
                          {name.replace(/(\r\n|\n|\r)/gm, '')}
                        </p>
                      </Link>
                      <div className="flex justify-between">
                        <div className="col-span-2">{price}€</div>
                        <div className="col-span-2">{value.shop}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
