import React from 'react'
import slideUp from './animation'
import { motion } from 'framer-motion'

export default function index() {
  return (
    <motion.div variants={slideUp} initial="initial" animate={'open'}>
      <div className="default-w-space">
        <h3 className="text-2xl sm:text-3xl font-semibold">
          Preguntas frecuentes
        </h3>
        <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
        <div className="preguntas text-sm text-neutral-300">
          <div className="pregunta">
            <h2 className="text-xl mb-2 underline">Funcionamiento</h2>
            <p>Hay varias formas de usar StockFinder:</p>
            <ol className="list-decimal list-inside my-2">
              <li>
                Registrarse en la web y crear alertas para recibir avisos por
                Telegram.
              </li>
              <li>
                Consultar el stock en tiempo real y/o comparar los diferentes
                componentes disponibles.
              </li>
              <li>
                Crear configuraciones de PC que servirán para mantener un
                control del precio de los componentes.
              </li>
            </ol>
          </div>
          <div className="pregunta">
            <h2 className="text-xl mb-2 underline">Coste</h2>
            <p>
              Ninguno, el uso del servicio es 100% gratuito para todos los
              usuarios. No obstante, se ha restringido el número de alertas que
              se pueden crear a 10 por cada usuario registrado.
            </p>
          </div>
          <div className="pregunta">
            <h2 className="text-xl mb-2 underline">
              ¿Cómo se mantiene el servicio?
            </h2>
            <p>
              Debido a que no hay un coste para el usuario y para poder mantener
              un servicio gratuito, algunos de los enlaces pueden contener un
              referido en ellos que permiten obtener beneficios para el
              desarrollo y mejora de la herramienta.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
