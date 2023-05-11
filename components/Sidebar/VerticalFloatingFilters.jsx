import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import * as React from "react";
import Sidebar from "./Sidebar.jsx";


export default function VerticalFloatingFilters({ name, data_list, data_slider }) {

  return (
    <div className="text-white h-10 z-10 py-2 items-center hover:text-blue-500 w-28 border-2 border-gray-600 hover:bg-zinc-700 rounded-lg">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="flex mx-auto rounded-md text-base font-medium focus:outline-none">
              <div className="font-bold">{name}</div>
              <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500 my-auto`} />
            </Popover.Button>

            <Popover.Panel className="absolute left-1/2 -translate-x-1/2 transform mt-3 px-4 pt-4 pb-2 bg-zinc-800 bg-opacity-100 rounded-lg ">
              <div className="flex-wrap w-56 py-2">
                <Sidebar data_list={data_list} data_slider={data_slider} />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
}