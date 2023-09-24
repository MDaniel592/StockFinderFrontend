import ProductInfo from 'models/ProductInfo'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function ProductItem({ product }: { product: ProductInfo }) {
  if (!product) return <React.Fragment></React.Fragment>

  return (
    <article className="product py-4 px-2 gap-2 rounded bg-zinc-700 mt-2 md:flex">
      <div className="image-container h-24 max-h-24 flex justify-center md:h-auto md:w-[10%] md:items-center">
        <Image
          width={100}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          className="rounded object-cover md:h-full"
          src={
            product.image
              ? `https://images.stockfinder.tech/${product.image}`
              : '/images/no_photo.webp'
          }
          alt="Imagen del producto"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-1 items-center">
        <Link
          className="text-xl font-semibold"
          href={`/producto/${product.uuid}`}
        >
          {product.name}
        </Link>
      </div>
      <div className="text-center grid grid-cols-1 items-center">
        <p className="text-xl font-semibold">{product.price} €</p>
      </div>
    </article>
  )
}
