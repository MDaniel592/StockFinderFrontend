import React from 'react'
import Image from 'next/image'
export default function Logo(props) {
  return (
    <div className="mx-auto px-4 py-3 text-center justify-center">
      <div className="grid justify-items-center">
        <div className="place-content max-w-lg">
          <Image
            src="/images/logos/StockFinder.webp"
            className="inline invert"
          />
        </div>
      </div>
    </div>
  )
}
