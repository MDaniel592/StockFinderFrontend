import React from "react";
import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

export default function AvisoLegal({ userData }) {
  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={false}>
        <section className="default-w-space text-xs">
          <div className="mx-auto text-justify">
            <h1 className="text-3xl">Aviso Legal</h1>
            <section className="mt-4">
              <h2 className="text-xl">Uso de la plataforma</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                Este sitio proporciona el aviso de stock de multitud de tiendas de internet. El objetivo de la plataforma
                es la intermediación en el proceso de búsqueda de artículos en stock por canales online para personas
                físicas de carácter individual y privado. El USUARIO asume la responsabilidad del uso de la plataforma.
                Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o
                contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita. Como
                consecuencia de este registro, al USUARIO se le puede proporcionar una contraseña de la que será
                responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma. El USUARIO se
                compromete a hacer un uso adecuado de los contenidos y servicios que StockFinder ofrece a través de su
                plataforma y con carácter enunciativo, pero no limitativo, a no emplearlos para:
              </p>
              <ol className="mt-2 ml-8 list-decimal">
                <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
                <li>
                  Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico ilegal, de apología del
                  terrorismo o atentatorio contra los derechos humanos.
                </li>
                <li>
                  Provocar daños en los sistemas físicos y lógicos de StockFinder, de sus proveedores o de terceras
                  personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o
                  lógicos que sean susceptibles de provocar los daños anteriormente mencionados.
                </li>
                <li>
                  Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar
                  o manipular sus mensajes.
                </li>
              </ol>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Coste del servicio de StockFinder</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                El servicio de StockFinder es totalmente gratuito para nuestros clientes y/o usuarios, ya que obtenemos
                nuestros beneficios de las comisiones de algunas de las compañías cuyos productos y/o servicios se compran
                a través de nuestros enlaces o de la publicidad empleada en nuestra página web.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Propiedad Intelectual e Industrial</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <ol className="ml-8 list-decimal">
                <li>
                  Todos los signos distintivos, marcas, nombres comerciales, contenidos, estructura, diseño y forma de
                  presentación de los elementos y cualquier otra información que aparezca en este sitio Web son propiedad
                  de StockFinder.
                </li>
                <li>
                  El usuario tiene prohibida la reproducción, transformación, distribución, comunicación pública y, en
                  general cualquier otra forma de explotación de los elementos referidos en el apartado anterior sin
                  autorización expresa de StockFinder.
                </li>
                <li>
                  El usuario se abstendrá de emplear medios que puedan suprimir, alterar, eludir o manipular cualesquiera
                  dispositivos de protección o sistemas de seguridad que puedan estar instalados y que comporten un riesgo
                  o daño o inutilización del sitio Web y/o sus contenidos.
                </li>
                <li>
                  StockFinder no se responsabiliza del posible uso inapropiado que terceros realicen de esta página Web,
                  ni de la información que a través de ella transmitan a terceros. El uso de los contenidos que pueda
                  hacer el usuario y las eventuales consecuencias, daños o perjuicios que pudiesen derivarse, son de la
                  exclusiva responsabilidad del usuario. StockFinder se excluye por los daños y perjuicios de toda
                  naturaleza causados a los usuarios por el uso de enlaces (links), directorios y herramientas de
                  búsqueda, que permiten a los usuarios acceder a sitios Web pertenecientes y/o gestionados por terceros
                  así como de la presencia de virus u otros códigos maliciosos en los contenidos que puedan producir
                  cualquier tipo de daños en el sistema informático, documentos electrónicos o ficheros de los usuarios.
                  StockFinder se reserva el derecho de ejercitar las acciones legales que considere oportunas derivadas de
                  cualesquiera usos ilícitos por parte de terceros de los contenidos de su página web.
                </li>
              </ol>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Exclusión de garantías y responsabilidad</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                StockFinder no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que
                pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad
                del plataforma o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de
                haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Modificaciones</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                StockFinder se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas
                en su plataforma, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a
                través de la misma como la forma en la que éstos aparezcan presentados o localizados en su plataforma.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Enlaces</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                En el caso de que en nombre del dominio se dispusiesen enlaces o hipervínculos hacía otros sitios de
                Internet, StockFinder no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso
                StockFinder asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web
                ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad,
                validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos
                hipervínculos u otros sitios de Internet. Igualmente, la inclusión de estas conexiones externas no
                implicará ningún tipo de asociación, fusión o participación con las entidades conectadas. En este sentido,
                si tuvieras conocimiento de la ilicitud de actividades desarrolladas a través de páginas web de terceros
                con link en nuestra Web, deberás comunicarlo inmediatamente a StockFinder a través de un email a
                StockFinder@protonmail.com a los efectos de que se proceda a deshabilitar el link de acceso a la misma.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Derecho de exclusión</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>

              <p>
                StockFinder se reserva el derecho a denegar o retirar el acceso a plataforma y/o los servicios ofrecidos
                sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las
                Condiciones Generales de Uso.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Incumplimiento</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>

              <p>
                StockFinder perseguirá el incumplimiento de las condiciones, así como cualquier utilización indebida de su
                plataforma ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Modificación de las presentes condiciones y duración</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>

              <p>
                StockFinder podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente
                publicadas como aquí aparecen.
              </p>
            </section>
            <section className="mt-4">
              <h2 className="text-xl">Legislación aplicable y jurisdicción</h2>
              <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
              <p>
                La relación entre StockFinder y el USUARIO se regirá por la normativa española vigente y cualquier
                controversia se someterá a los Juzgados y Tribunales españoles.
              </p>
            </section>
          </div>
        </section>
      </CustomLayout>
    </React.Fragment>
  );
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;
  return {
    props: {
      userData,
    },
  };
}
