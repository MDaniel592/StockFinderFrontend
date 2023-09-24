import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserPanelAccessIcon({
  img,
  userData,
  onLogoutButtonPressed
}) {
  const secondButtomClass =
    'mt-2 inline-flex justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800'
  return (
    <Popover className="relative text-white">
      <Popover.Group as="nav" className="flex">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-blue-500' : '',
                  'group rounded-md text-base font-medium hover:font-bold hover:underline focus:outline-none '
                )}
              >
                <Image width={40} height={40} alt="" loading="lazy" src={img} />
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
                <Popover.Panel className="absolute z-50 transform -translate-x-3/4 bg-zinc-800 bg-opacity-90 rounded-lg">
                  <div className="relative p-4 min-w-max grid grid-cols-1 gap-2 text-center justify-center">
                    <Link
                      href={userData ? '/profile' : '/login'}
                      className="text-base font-semibold hover:text-blue-500"
                    >
                      {userData ? 'Panel de usuario' : 'Iniciar Sesion'}
                    </Link>
                    {userData && (
                      <button
                        onClick={onLogoutButtonPressed}
                        className={secondButtomClass}
                      >
                        Cerrar Sesión
                      </button>
                    )}
                    {!userData && (
                      <Link href="/sign-up" className={secondButtomClass}>
                        Registrarse
                      </Link>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </Popover.Group>
    </Popover>
  )
}
