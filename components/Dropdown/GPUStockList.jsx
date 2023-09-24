import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { Fragment } from 'react'
import Image from 'next/image'

export default function GPUStockList({ data_nvidia, data_amd }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const img = '/images/svg/chip.svg'
  const title = 'Consultar stock'

  return (
    <div className="pl-1 text-white sm:h-10 items-center py-2">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? 'text-blue-500' : '',
                'group  rounded-md inline-flex items-center text-base font-medium hover:font-bold hover:underline focus:outline-none hover:text-blue-500'
              )}
            >
              <img
                loading="lazy"
                alt=""
                src={img}
                className="w-6 h-6 mr-2 invert"
              />
              <span className="text-sm sm:text-normal">{title}</span>
              <ChevronDownIcon
                className={classNames(
                  open ? 'text-blue-500' : '',
                  'ml-1 h-5 w-5'
                )}
                aria-hidden="true"
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
              <Popover.Panel className="absolute flex grid-cols-2 mt-2 bg-zinc-800 rounded-lg z-10">
                <div className="grid text-center">
                  <span className="font-bold underline">Nvidia</span>
                  <List
                    dense
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      '& .MuiListItemButton-root:hover': {
                        bgcolor: 'white',
                        '&, & .MuiListItemIcon-root': {
                          color: 'black'
                        }
                      }
                    }}
                  >
                    {data_nvidia.map(value => {
                      const labelId = `list-item-nvidia-label-${value.name}`
                      return (
                        <ListItem disablePadding key={labelId}>
                          <ListItemButton href={value.href}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={value.img}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={value.name}
                              className="hover:text-sky-400 hover:underline"
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
                <div className="grid text-center">
                  <span className="font-bold underline">AMD</span>
                  <List
                    dense
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      '& .MuiListItemButton-root:hover': {
                        bgcolor: 'white',
                        '&, & .MuiListItemIcon-root': {
                          color: 'black'
                        }
                      }
                    }}
                  >
                    {data_amd.map(value => {
                      const labelId = `list-item-amd-label-${value.name}`
                      return (
                        <ListItem disablePadding key={labelId}>
                          <ListItemButton href={value.href}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={value.img}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={value.name}
                              className="hover:text-sky-400 hover:underline"
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
