import { ClipboardListIcon, HomeIcon, RssIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function VerticalTabbar() {
  return (
    <section className="flex justify-center">
      <div className="fixed z-10 bottom-4 mx-auto my-0 w-fit px-4 gap-2 bg-slate-200 rounded-lg p-2 grid grid-cols-1 place-content-center place-items-center">
        <div>
          <Link href="/" className="text-slate-700 flex flex-col items-center">
            <HomeIcon className="h-5 w-auto" />
            Inicio
          </Link>
        </div>
        <div>
          <Link href="/canales-telegram" className="text-slate-700 flex flex-col items-center">
            <RssIcon className="h-5 w-auto" />
            Canales
          </Link>
        </div>
        <div>
          <Link href="/politica-privacidad" className="text-slate-700 flex flex-col items-center">
            <ClipboardListIcon className="h-5 w-auto" />
            Uso
          </Link>
        </div>
        <div>
          <Link href="/profile" className="text-slate-700 flex flex-col items-center">
            <UserIcon className="h-5 w-auto" />
            Perfil
          </Link>
        </div>
      </div>
    </section>
  );
}
