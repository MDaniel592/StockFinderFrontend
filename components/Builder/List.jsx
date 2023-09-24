import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function List({ data }) {
  function getCompleteList() {
    let counter = 0
    let list
    let total_original_price = 0
    let total_actual_price = 0

    let separator = `border-b my-1 border-neutral-400 mx-4`
    for (const [key, value] of Object.entries(data)) {
      let idLabel = 'item-list-id-' + counter
      let text_color = ''

      total_original_price += value['original_price']
      total_actual_price += value['actual_price']

      if (value['actual_price'] > value['original_price']) {
        text_color = 'text-red-500'
      } else if (value['actual_price'] < value['original_price']) {
        text_color = 'text-blue-500'
      } else {
        text_color = 'text-neutral-300'
      }

      const imageUrl = value['image']
        ? `https://images.stockfinder.tech${value['image']}`
        : `/images/placeholder/${value['category']}.webp`
      let row = (
        <>
          <div className={separator}></div>
          <li key={idLabel} className="hover:bg-zinc-700 rounded-lg px-2">
            <Link
              href={'/producto/' + value['uuid']}
              className="table-text-xxs font-semibold hover:text-blue-500 hover:underline hover:decoration-blue-500"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center gap-2">
                <img
                  alt={value['name']}
                  loading="lazy"
                  src={imageUrl}
                  className="h-10 w-10 rounded-md"
                />
                {value['name'].replace(/(\r\n|\n|\r)/gm, '')}
              </div>
            </Link>
            <div className="grid grid-cols-3 justify-between table-text-xxs">
              <div className="flex-wrap text-left">
                <div>Original</div>
                <div>{value['original_price'].toFixed(2)} €</div>
              </div>

              <div className="flex-wrap text-center items-center">
                <div>Actual</div>
                <div className={`${text_color}`}>
                  {value['actual_price'].toFixed(2)} €
                </div>
              </div>

              <div className="flex-wrap text-right">
                <div>Tienda</div>
                <div>{value['shop']}</div>
              </div>
            </div>
          </li>
        </>
      )
      counter += 1
      list = [list, row]
    }

    let row = (
      <>
        <div className={separator}></div>
        <li key="final-prices" className="hover:bg-zinc-700 rounded-lg px-2">
          <div className="grid grid-cols-3 justify-between table-text-xxs ">
            <div className="flex-wrap text-left text-xs">
              <div>Total original</div>
              <div>{total_original_price.toFixed(2)} €</div>
            </div>

            <div className="flex-wrap text-center text-xs items-center">
              <div>Total actual</div>
              <div
                className={`${
                  total_actual_price > total_original_price
                    ? 'text-red-500'
                    : 'text-blue-500'
                }`}
              >
                {total_actual_price.toFixed(2)} €
              </div>
            </div>

            <div className="flex-wrap text-right text-xs items-end">
              <div>Diferencia</div>
              <div
                className={`${
                  total_actual_price > total_original_price
                    ? 'text-red-500'
                    : 'text-blue-500'
                }`}
              >
                {total_actual_price > total_original_price ? '+' : ''}
                {(total_actual_price - total_original_price).toFixed(2)} €
              </div>
            </div>
          </div>
        </li>
      </>
    )
    list = [list, row]

    return list
  }

  return (
    <div key="table-div-component-sdfsdfsf">
      <ul key="table-component-jidsnfids">{getCompleteList()}</ul>
    </div>
  )
}
