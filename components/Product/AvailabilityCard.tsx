import Availability from "models/Availability";
import Link from 'next/link';

export default function AvailabilityCard({ availability }: { availability: Availability }) {
  const REFER = "";
  const url = availability.url.indexOf("pccomponentes.com") !== -1 ? REFER + availability.url : availability.url;
  const imageUrl = `/images/logos/shops/${availability.shopName}.png`

  return (
    <li key={Math.random()} className="block mb-2 text-xs lg:text-md font-semibold">
      <div className="text-center mx-1 lg:mx-4 grid grid-cols-4 lg:grid-cols-6 gap-4 items-center bg-zinc-700 hover:bg-zinc-600 hover:text-emerald-500 rounded-xl px-2 py-1">
        <div className="lg:col-span-2  flex items-center justify-center">
          <img src={imageUrl} className="h-5 lg:h-7 rounded-sm" alt={availability.shopName} />
        </div>
        <div className="hidden lg:block ">{availability.outlet ? <span className="text-error">Sí</span> : <span className="text-success">No</span>} </div>
        <div className="">
          {availability.stock ? (<span className="text-md text-success">Disponible</span>)
            : (<span className="text-md text-error">Sin stock</span>)}
        </div>
        <div className="">{availability.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</div>
        <div className="lg:col-span-1 ">
          {availability.stock ? (<Link href={url} target="_blank"
            className="block p-1 lg:p-2 bg-blue-200 outline outline-2 outline-blue-600 text-blue-600 hover:outline-none hover:text-white hover:bg-blue-600 rounded-md whitespace-nowrap">
            Comprar </Link>)
            : (<Link href={url} target="_blank" className="block p-1 lg:p-2 bg-zinc-200 outline outline-2 outline-gray-600 text-gray-600 hover:text-white hover:bg-zinc-500 rounded-md whitespace-nowrap">
              Sin stock
            </Link>)
          }</div>
      </div>
    </li>
  );

}
