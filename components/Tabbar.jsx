import { ClipboardListIcon, HomeIcon, RssIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Tabbar() {
  return (
    <section className="flex justify-center">
      <div className="fixed z-10 bottom-2 h-10 lg:h-14 bg-slate-200 rounded-lg grid py-2 grid-cols-4 divide-x divide-gray-400 text-xs lg:text-sm items-center w-fit">
        <div className="w-14 lg:w-20 mx-auto">
          <Link href="/" className="text-slate-700 flex flex-col items-center"><HomeIcon className="h-4 lg:h-5 w-auto" />Inicio</Link>
        </div>
        <div className="w-14 lg:w-20 mx-auto">
          <Link href="/canales-telegram" className="text-slate-700 flex flex-col items-center"><RssIcon className="h-4 lg:h-5 w-auto" />Canales</Link>
        </div>
        <div className="w-14 lg:w-20 mx-auto">
          <Link href="/politica-privacidad" className="text-slate-700 flex flex-col items-center"><ClipboardListIcon className="h-4 lg:h-5 w-auto" />Uso</Link>
        </div>
        <div className="w-14 lg:w-20 mx-auto">
          <Link href="/profile" className="text-slate-700 flex flex-col items-center"><UserIcon className="h-4 lg:h-5 w-auto" />Perfil</Link>
        </div>
      </div>
    </section>
  );
}
