import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function GPUStock({ title, generations }) {
  const defaultValues = {
    'RTX 4000': false,
    'RTX 3000': false,
    'RX 6000': false
  }
  const [isShowing, setIsShowing] = useState('')
  const [showingPreferences, setShowingPreferences] = useState(defaultValues)

  function handleShowingChange(showing) {
    showingPreferences[showing] = !showingPreferences[showing]

    let newShowing = []
    for (var showing in showingPreferences) {
      if (showingPreferences[showing]) {
        newShowing.push(showing)
      }
    }

    setIsShowing(newShowing)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const img = '/images/svg/box.svg'

  return (
    <div className="static z-20 p-2 text-white h-10 items-center">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? 'text-blue-500' : '',
                'group  rounded-md inline-flex items-center focus:outline-none text-url'
              )}
            >
              <img
                loading="lazy"
                alt=""
                src={img}
                className="w-6 h-6 mr-2 invert"
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
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-10 sm:-left-0 flex bg-opacity-90 bg-zinc-800 rounded-lg z-10">
                <div className="grid text-center">
                  {/* <p className="block lg:hidden font-bold text-sm uppercase mt-2">{title}</p> */}
                  {generations.map(value => {
                    const lisLabelId = `list-label-${value.name}`
                    const labelId = `list-item-label-${value.name}`
                    return (
                      <List
                        dense
                        key={lisLabelId}
                        onMouseEnter={() => handleShowingChange(value.name)}
                        onMouseLeave={() => handleShowingChange(value.name)}
                      >
                        <ListItem
                          disablePadding
                          key={labelId}
                          className="hover:bg-zinc-600 rounded-xl"
                        >
                          <Popover className="relative">
                            <Popover.Button className="px-2 py-1 flex place-items-center">
                              <ListItemAvatar>
                                <Avatar
                                  alt={`Avatar n°${value + 1}`}
                                  src={value.img}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={value.name}
                                className="text-center w-max"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-500"
                              enterFrom="opacity-0 translate-x-1"
                              enterTo="opacity-100 translate-x-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-x-0"
                              leaveTo="opacity-0 translate-x-1"
                              show={showingPreferences[value.name]}
                              onMouseEnter={() =>
                                handleShowingChange(value.name)
                              }
                              onMouseLeave={() =>
                                handleShowingChange(value.name)
                              }
                            >
                              <Popover.Panel
                                className="fixed top-0 left-full flex bg-opacity-90 bg-zinc-800 rounded-lg z-10"
                                onMouseEnter={() =>
                                  handleShowingChange(value.name)
                                }
                                onMouseLeave={() =>
                                  handleShowingChange(value.name)
                                }
                              >
                                <div className="grid text-center">
                                  <List dense>
                                    {value.values.map(second_value => {
                                      const labelId = `list-subitem-label-${value.name}-${second_value.name}`
                                      const model = second_value.name
                                        .replaceAll('RX', '')
                                        .replaceAll('RTX', '')
                                        .replaceAll('TI', 'Ti')
                                      return (
                                        <ListItem
                                          disablePadding
                                          key={labelId}
                                          className="hover:bg-zinc-600 rounded-xl"
                                        >
                                          <Link
                                            href={second_value.href}
                                            className="flex flex-row px-2 py-1 items-center"
                                          >
                                            <ListItemAvatar>
                                              <Avatar
                                                alt={`Avatar n°${
                                                  second_value + 1
                                                }`}
                                                src={second_value.img}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText primary={model} />
                                          </Link>
                                        </ListItem>
                                      )
                                    })}
                                  </List>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </Popover>
                        </ListItem>
                      </List>
                    )
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
