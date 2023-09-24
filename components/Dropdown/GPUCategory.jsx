import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { Fragment } from 'react'
import Image from 'next/image'
import { generations } from '../Layouts/header/GPUdata'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function GPUCategory({ title, data, img }) {
  function grid() {
    let link_class = 'text-left text-url text-xxs lg:text-xs'

    if (!data) return

    return (
      <div className="grid lg:flex gap-4 px-4 sm:px-6 py-4">
        <div className="my-auto">
          <p className="block lg:hidden text-left font-semibold text-blue-500 text-sm border-b border-blue-500 mb-2">
            Categorías
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            {data.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="box-content border-2 border-gray-500 rounded-lg hover:bg-zinc-600"
              >
                <div className="pt-2 sm:p-4 pb-4 sm:p-4">
                  <div className="relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-12 lg:w-24 h-12 lg:h-24 mx-auto"
                    />
                    <p className="absolute truncate text-xxs font-medium left-1/2 -translate-x-1/2 text-center w-20 sm:w-32 ">
                      {item.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* <div>
          <p className="text-left font-semibold text-blue-500 text-sm mb-2 border-b border-blue-500">
            Stock actual de tarjetas gráficas
          </p>
          <ul className="grid grid-cols-4 gap-2">
            {generations.map(value => {
              return (
                <li key={Math.random()}>
                  <span className="font-semibold text-xs lg:text-xs mb-2 border-b border-gray-500 text-neutral-300">
                    {value.name}
                  </span>
                  <ul className="pl-2 justify-start list-none">
                    {value.values.map(second_value => {
                      let model = second_value.name
                        .replaceAll('RX', '')
                        .replaceAll('RTX', '')
                        .replaceAll('TI', 'Ti')
                      return (
                        <li
                          className="-mb-1  text-neutral-200"
                          key={Math.random()}
                        >
                          <Link href={second_value.href} className={link_class}>
                            {model}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div> */}
      </div>
    )
  }

  return (
    <div
      className="static z-20 p-2 text-white h-10 items-center"
      key={Math.random()}
    >
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? 'text-blue-500' : '',
                'group rounded-md inline-flex items-center focus:outline-none text-url '
              )}
            >
              <img
                loading="lazy"
                alt=""
                src={img}
                className="h-6 w-6 mr-2 invert"
              />
              <span className="hidden lg:block text-sm font-medium">
                {title}
              </span>
              <ChevronDownIcon
                className={classNames(open ? 'text-blue-500' : '', 'h-6 w-6')}
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-500"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 z-10 bg-opacity-90 bg-zinc-800 rounded-lg mx-auto w-full lg:w-auto">
                {grid()}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
