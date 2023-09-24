import React from 'react'
import Image from 'next/image'
export default function CardElement({ name, src, href, alt }) {
  return (
    <div className="shadow-lg rounded-2xl p-2 bg-zinc-800 grid grid-cols-1 place-items-center">
      <p className="text-gray-200 text-sm sm:text-lg font-extrabold mb-2 text-center">
        {name}
      </p>
      <Image
        width={40}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
        alt={alt}
        src={src}
        className="rounded-lg mb-4 h-24 sm:h-32"
      />
      <a
        href={href}
        alt={alt}
        className="py-2 px-4 border border-transparent text-xs sm:text-lg rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition"
      >
        Unirse
      </a>
    </div>
  )
}
