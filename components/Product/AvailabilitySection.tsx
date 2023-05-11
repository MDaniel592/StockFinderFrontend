import Availability from "models/Availability";
import { useState } from "react";
import AvailabilityList from "./AvailabilityList";

export default function AvailabilitySection({ availabilities }: { availabilities: Availability[] }) {
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const filteredAvailabilities = showOnlyInStock
    ? availabilities.filter((availability) => availability.stock)
    : availabilities;

  const handleCheckChange = () => {
    setShowOnlyInStock(!showOnlyInStock);
  };

  return (
    <section className="w-auto my-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="showOnlyOnStock"
          id="showOnlyInStock"
          className="w-4 h-4 text-info bg-info-light rounded border-info.light focus:ring-info dark:focus:ring-info dark:ring-offset-gray-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
          checked={showOnlyInStock}
          onChange={handleCheckChange}
        />
        <label htmlFor="showOnlyInStock" className="text-sm text-neutral-200 font-semibold">
          Mostrar solo en stock
        </label>
      </div>
      {filteredAvailabilities.length === 0 ? (
        <div>No hay ninguna disponibilidad de ese producto actualmente disponible.</div>
      ) : (
        <AvailabilityList availabilities={filteredAvailabilities} />
      )}
    </section>
  );
}
