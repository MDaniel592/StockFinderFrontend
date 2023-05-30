import Link from "next/link";
import Banner from "./Banner";
export default function CustomFooter() {
  let link_class = 'hover:underline text-left text-blue-500 text-xs sm:text-base';
  return (
    <>
      <Banner></Banner>
      {/* <footer className="bottom-0 w-full bg-zinc-800 pb-16 lg:pb-23 rounded-sm pt-2 sm:pt-4"> Tabbar*/}
      <footer className="bottom-0 w-full pb-4 lg:pb-6 bg-zinc-800 rounded-sm pt-2 sm:pt-4">
        <section className="flex px-4 gap-6 sm:gap-10 justify-center">
          <div className="grid">
            <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">CATEGORIAS</span>
            <div className="pl-1 gap-1 grid justify-start">
              <Link href="/builder" className={link_class}>Configurador</Link>
              <Link href="/categorias" className={link_class}>Componentes</Link>
              <br />
            </div>
          </div>

          <div className="grid">
            <span className="font-semibold text-base lg:text-lg mb-2 border-b border-gray-500">INFORMACION</span>
            <div className="pl-1 gap-1 grid justify-start">
              <Link href="/politica-privacidad" className={link_class}>Política de Privacidad</Link>
              <Link href="/aviso-legal" className={link_class}>Aviso Legal</Link>
              <Link href="/faq" className={link_class}>FAQ</Link>
            </div>
          </div>

        </section>
      </footer>
    </>
  );
}
