import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import * as React from "react";
import Sidebar from "./Sidebar.jsx";


export default function VerticalFloatingFilters({ name, data_list, data_slider }) {

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="btn-ok flex flex-no-wrap place-content-center mx-auto gap-1">
            <div className="font-bold">{name}</div>
            <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white my-auto`} />
          </Popover.Button>

          <Popover.Panel className="absolute left-1/2 -translate-x-1/2 transform mt-3 px-4 pt-4 pb-2 bg-zinc-800 bg-opacity-100 rounded-lg ">
            <div className="flex-wrap w-56 py-2">
              <Sidebar data_list={data_list} data_slider={data_slider} />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}