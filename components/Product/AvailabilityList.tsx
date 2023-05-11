import Availability from "models/Availability";
import AvailabilityCard from "./AvailabilityCard";


export default function AvailabilityList({ availabilities }: { availabilities: Availability[] }) {
  return (
    <ul className="my-2">
      <li key="list-product-header" className="block rounded-xl mb-2">
        <div className="mx-4 grid grid-cols-4 lg:grid-cols-6 gap-4 border-b border-neutral-300 text-xs lg:text-md font-semibold text-center">
          <div className="lg:col-span-2">Tienda</div>
          <div className="hidden lg:block">Reaco</div>
          <div className="">Estado</div>
          <div className="">Precio</div>
          <div className=""></div>
        </div>
      </li>
      {availabilities
        .sort((a, b) => a.price - b.price)
        .map((individualAvailability) => (
          <AvailabilityCard key={Math.random()} availability={individualAvailability} />
        ))}
    </ul>
  );
}
