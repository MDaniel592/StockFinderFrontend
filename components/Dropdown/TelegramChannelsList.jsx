import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from 'next/link';
import * as React from "react";
import { Fragment } from "react";


export default function TelegramChannelsList({ telegram_channels }) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const img = "/images/logos/social/tg.webp";
  const title = "Canales Telegram";
  return (
    <div className="p-2 text-white h-10 items-center">
      <Link href='/canales-telegram' className='flex items-center'>
        <img alt="" src={img} className="h-6 w-6 mr-2" />
        <span className="hidden lg:block text-sm font-medium hover:text-blue-500">Canales Telegram</span>
      </Link>
    </div>
  )

  return (
    <div className="p-2 text-white h-10 items-center">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? "text-sky-400" : "",
                "group  rounded-md inline-flex items-center hover:font-bold focus:outline-none hover:text-sky-400"
              )}
            >
              <img alt="" src={img} className="h-6 w-6 mr-2" />
              <span className="hidden lg:block text-sm font-medium">{title}</span>
              <ChevronDownIcon className={classNames(open ? "text-sky-400" : "", "h-6 w-6")} aria-hidden="true" />
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
              <Popover.Panel className="absolute flex grid-cols-1 -left-14 sm:left-0 bg-zinc-800 rounded-lg z-10">
                <div className="grid text-center">
                  <Link className="font-bold hover:text-sky-400 hover:underline" href="/canales-telegram">Listado</Link>
                  <List dense >
                    {telegram_channels.map((value) => {
                      const labelId = `list-item-telegram-label-${value.name}`;
                      return (
                        <ListItem disablePadding key={labelId} className='hover:bg-zinc-400 rounded-xl'>
                          <ListItemButton href={value.href}>
                            <ListItemAvatar>
                              <Avatar alt={`Avatar n°${value + 1}`} src={value.img} />
                            </ListItemAvatar>
                            <ListItemText primary={value.name} className="hover:text-sky-400" />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
