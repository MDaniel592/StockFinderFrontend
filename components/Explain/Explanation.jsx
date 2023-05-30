import Link from 'next/link';

export default function Explanation({ }) {
  return (
    <div className="flex flex-wrap gap-4 sm:justify-left">
      <div className="info mb-4 w-full md:w-8/12 md:mb-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold">Recibe alertas de tus productos favoritos</h1>
        <p className="my-4 text-sm">StockFinder te notificará cuando el producto esté disponible y su precio sea igual o inferior al deseado.</p>
        <div className="buttons flex gap-4 flex-wrap justify-start">
          <Link
            href="https://t.me/StockSearchTrackBot"
            className="as-btn primary"
          >
            @StockFinder
          </Link>

          <Link
            href="#INFORMACION"
            className="as-btn secondary"
          >
            Más información
          </Link>
        </div>

        <h1 id="INFORMACION" className="text-2xl sm:text-3xl font-semibold mt-4">
          ¿Cómo funciona?
        </h1>
        <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
        <p className="my-4 text-sm">
          StockFinder se encargará de notificarle cuando un producto tiene stock. La herramienta es capaz de monitorizar
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

      </div>

      <div className="image-container w-4/5 md:w-3/12 hidden sm:block">
        <img src="/images/screenshots/alert_screenshot.webp" className="rounded-lg max-w-xs" alt="IMG" loading="lazy" />
      </div>
    </div>

  );
}
