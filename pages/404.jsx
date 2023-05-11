import Link from 'next/link';

export default function Custom404() {
  /*
   * Return the webpage for 404 error
   */
  return (
    <div className="flex  bg-cover bg-center h-screen bg-astronaut items-center justify-center">
      <div className="rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-white md:text-3xl">
            <span className="text-red-500">Oops!</span> Página no encontrada
          </h6>

          <p className="mb-8 text-center text-white text-md sm:text-lg font-semibold">
            La página que estás buscando no existe
          </p>

          <Link href="/" className="px-6 py-2 text-sm font-semibold rounded-2xl text-black bg-blue-100 hover:bg-blue-400">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
