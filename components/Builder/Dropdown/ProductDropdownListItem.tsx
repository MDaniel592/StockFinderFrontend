import Availability from 'models/Availability'
import ProductInfo from 'models/ProductInfo'
import Link from 'next/link'
import { BuilderContext, DropdownContext } from 'pages/_app'
import React, { useContext } from 'react'
import { areEqual } from 'react-window'
import Image from 'next/image'

const MemoProductDropdownListItem = React.memo(
  function ProductDropdownListItem({
    product,
    productCategory,
    selectedUUID,
    selectedAvailability,
    setSelectedAvailability
  }: {
    product: ProductInfo
    productCategory: string
    selectedUUID: string
    selectedAvailability: any
    setSelectedAvailability: any
  }) {
    if (!product) return <React.Fragment></React.Fragment>

    const builderContext = useContext(BuilderContext)
    const dropdownContext = useContext(DropdownContext)

    const handleSelectedAvailability = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const selectedShopName: string = e.target.value
      if (
        !product.availabilities.some(
          availability => availability.shopName === selectedShopName
        )
      )
        return
      setSelectedAvailability(
        product.availabilities.filter(
          availability => availability.shopName === selectedShopName
        )[0]
      )
    }

    const handleProductSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedAvailabilityToSet: Availability =
        selectedAvailability ?? product.availabilities[0]
      dropdownContext.onProductSelected({
        name: product.name,
        uuid: product.uuid
      })
      builderContext.onProductSelected({
        productCategory: productCategory,
        productValue: product,
        selectedShop: selectedAvailabilityToSet.shopName,
        price: selectedAvailabilityToSet.price
      })
    }
    const productAvailabilities = (
      <select
        className="px-1 rounded-lg text-xs bg-white text-neutral-600 font-sans font-bold w-36 md:w-fit"
        name="product-availabilities"
        id={product.uuid}
        onChange={handleSelectedAvailability}
        value={
          selectedAvailability?.shopName ?? product.availabilities[0].shopName
        }
      >
        {product.availabilities.map(availability => (
          <option value={availability.shopName} key={Math.random()}>
            {availability.shopName} -{' '}
            {availability.price.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR'
            })}
          </option>
        ))}
      </select>
    )
    return (
      <article
        className={`product my-auto md:my-0 grid grid-cols-1  md:flex mx-2 p-2 gap-1 md:gap-2 rounded bg-zinc-700 place-content-between ${
          selectedUUID === product.uuid ? 'selected' : ''
        }`}
      >
        <div className="grid grid-cols-4 md:flex gap-1 md:gap-2 md:w-[86%] overflow-hidden">
          <div className="image-container my-auto justify-left flex-none">
            <Image
              width={100}
              height={100}
              style={{ width: 'auto', height: 'auto' }}
              className="rounded-lg object-cover h-12 md:h-14 w-12 md:w-14"
              src={
                product.image
                  ? `https://images.stockfinder.tech/${product.image}`
                  : '/images/no_photo.webp'
              }
              alt="Imagen del producto"
              loading="lazy"
            />
          </div>
          <div className="col-span-3 md:my-auto">
            <div className="product-info mr-auto">
              <Link
                href={`producto/${product.uuid}`}
                className="text-xxs md:text-sm font-semibold hover:underline hover:text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                <p className="whitespace-nowrap truncate">{product.name}</p>
              </Link>
              <p className="text-xxs md:text-xs text-slate-400">
                {product.manufacturer}
              </p>
              <div className="hidden md:block availabilities w-1/3">
                {productAvailabilities}
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:hidden justify-center">
          <div className="block md:hidden availabilities text-center my-auto">
            {productAvailabilities}
          </div>

          {/* Buttons */}
          <div className="select-product mx-auto md:my-auto md:w-[14%] text-sm">
            <button
              className={`btn ${
                selectedUUID === product.uuid
                  ? 'secondary-extrasmall'
                  : 'primary-extrasmall'
              }`}
              onClick={handleProductSelection}
              data-uuid={product.uuid}
            >
              {`${selectedUUID === product.uuid ? 'Actualizar' : 'Selecionar'}`}
            </button>
          </div>
        </div>

        <div className="hidden md:block select-product mx-auto md:my-auto md:w-[14%] text-sm">
          <button
            className={`btn ${
              selectedUUID === product.uuid
                ? 'secondary-small'
                : 'primary-small'
            }`}
            onClick={handleProductSelection}
            data-uuid={product.uuid}
          >
            {`${selectedUUID === product.uuid ? 'Actualizar' : 'Selecionar'}`}
          </button>
        </div>
        {/* Buttons */}
      </article>
    )
  },
  areEqual
)

export default MemoProductDropdownListItem
