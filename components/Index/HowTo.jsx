import Link from 'next/link';
import React from "react";

export default function HowTo({ }) {
  return (
    <section>
      <h1 id="PRODUCTO" className="text-2xl sm:text-4xl font-semibold">
        ¿Cómo se hace uso de esta herramienta?
      </h1>
      <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
      <p className="my-4">
        Añade alertas de sus productos favoritos registrándose en nuestra web o mediante nuestro bot de Telegram.
        Lo único que necesitas es el enlace al producto y el precio mínimo por el que se te notificará cuando haya stock disponible.
      </p>
      <div className="gap-4 flex flex-wrap justify-start">
        <Link
          href="/sign-up"
          className="as-btn primary"
        >
          Regístrate
        </Link>

        <Link
          href="https://t.me/StockSearchTrackBot"
          className="as-btn secondary"
        >
          Habla con el bot
        </Link>
      </div>
    </section>
  );
}
