import Link from 'next/link';
import React from "react";

export default function HowWorks({ }) {
  return (
    <section className="xl:hidden">
      <h1 id="INFORMACION" className="text-2xl sm:text-4xl font-semibold">
        ¿Cómo funciona?
      </h1>
      <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
      <p className="my-4">
        StockTracker se encargará de notificarle cuando un producto tiene stock. La herramienta es capaz de monitorizar
        las principales tiendas de España*. Solo tiene que unirse a un canal existente o introducir sus propios
        productos.
      </p>
      <div className="flex gap-4 justify-center md:justify-start">
        <Link
          href="#PRODUCTO"
          className="as-btn primary"
        >
          Quiero añadir un producto
        </Link>

        <Link
          href="/canales-telegram"
          className="as-btn secondary"
        >
          Listado de canales
        </Link>

      </div>

      <section className="my-4">
        <p className="text-gray-400 text-xs">* Tiendas soportadas</p>
        <div id="tiendas-disponibles" className="flex flex-wrap gap-2 py-2 text-xs">
          <span>Aussar</span><span>Coolmod</span><span>Izarmicro</span><span>LDLC</span>
          <span>Nvidia</span><span>PcComponentes</span><span>Versus Gamers</span>
        </div>
      </section>
    </section>
  );
}
