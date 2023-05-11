import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import * as React from "react";

export default function SidebarList({ name, data, preferences, handleChange, handleButton, button, show_more = true }) {
  function parse_html(item) {
    return (
      <li key={item.toString()} className="text-sm mt-1">
        <input type="checkbox" checked={preferences[item]} value={item} manufacturer={item} onChange={(newValue) => handleChange(name, newValue)}></input>
        <label className="text-xs antialiased italic font-normal ml-1 hover:text-blue-300 hover:underline hover:decoration-blue-300">
          {item}
        </label>
      </li>
    );
  }

  function check_list(object) {
    let Obj;
    for (const [key, value] of Object.entries(object)) {
      if (value === true) Obj = [Obj, parse_html(key)];
    }
    return Obj;
  }

  function get_text(button) {
    if (button === false) return "Mostrar más";
    return "Mostrar menos";
  }

  function get_button() {
    if (show_more === false) return;
    return (
      <label className="ml-1 text-blue-400">
        <a
          className="text-xs hover:text-blue-300 hover:underline hover:decoration-blue-300"
          defaultChecked={button}
          value="Mostrar más"
          onClick={() => handleButton(name)}
        >
          {get_text(button)}
        </a>
      </label>
    );
  }

  return (
    <>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-zinc-700 rounded-lg hover:bg-zinc-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="">{name}</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-blue-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-2 pb-3 ml-4 text-sm" open>
              <ul className="list-none">{check_list(data)}</ul>
              {get_button()}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
