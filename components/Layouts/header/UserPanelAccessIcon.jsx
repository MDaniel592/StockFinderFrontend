import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const options = [
  {
    name: 'Iniciar Sesion',
    url: '/login'
  },
  {
    name: 'Registrarse',
    url: '/sign-up'
  }
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserPanelAccessIcon({
  img,
  userData,
  onLogoutButtonPressed
}) {
  function grid() {
    if (userData) {
      return (
        <div className="grid grid-cols-1 gap-2 text-center">
          <Link
            href="/profile"
            className="text-base font-semibold hover:text-blue-500"
          >
            Panel de usuario
          </Link>
          <button
            onClick={onLogoutButtonPressed}
            className="mt-2 inline-flex justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
          >
            Cerrar Sesión
          </button>
        </div>
      )
    }

    if (options) {
      return (
        <div className="grid grid-cols-1 gap-2">
          <Link
            href={options[0]['url']}
            className="text-base font-semibold hover:text-blue-500"
          >
            {options[0]['name']}
          </Link>
          <Link
            href={options[1]['url']}
            className="mt-2 inline-flex justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
          >
            {options[1]['name']}
          </Link>
        </div>
      )
    }
    return
  }

  const popoverclass =
    'absolute z-50 transform -translate-x-3/4 bg-zinc-800 bg-opacity-90 rounded-lg'

  return (
    <Popover className="relative">
      <div className="text-white h-10 ">
        <div className="py-2 md:space-x-10">
          <Popover.Group as="nav" className="flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-blue-500' : '',
                      'group rounded-md text-base font-medium hover:font-bold hover:underline focus:outline-none '
                    )}
                  >
                    <img
                      alt=""
                      loading="lazy"
                      src={img}
                      className="h-8 w-8 opacity-60 hover:opacity-100"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className={popoverclass}>
                      <div className="overflow-hidden">
                        <div className="relative p-4">
                          <div className="flex min-w-max justify-center">
                            {grid()}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
        </div>
      </div>
    </Popover>
  )
}
