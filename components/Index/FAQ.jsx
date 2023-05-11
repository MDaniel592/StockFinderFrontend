import React from "react";

export default function FAQ({ }) {
  return (
    <section>
      <h3 className="text-2xl sm:text-4xl font-semibold">Preguntas frecuentes</h3>
      <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
      <div className="preguntas">
        <div className="pregunta">
          <h2 className="text-xl mb-2 underline">Funcionamiento</h2>
          <p>Hay 3 formas de usar StockFinder:</p>
          <ol className="list-decimal list-inside my-2">
            <li>
              Registrarse en la web o interactuar con el bot de Telegram para indicarle los productos a los que hacer seguimiento
            </li>
            <li>
              Unirse a uno de los canales de Telegram disponibles.
            </li>
            <li>
              Seguir a StockTrackerBot en Twitter.
            </li>
          </ol>
        </div>
        <div className="pregunta">
          <h2 className="text-xl mb-2 underline">Coste</h2>
          <p>Ninguno, el uso del servicio es 100% gratuito para todos los usuarios. No obstante, se ha restringido el número de alertas que se pueden crear a 10 por cada usuario registrado.</p>
        </div>
        <div className="pregunta">
          <h2 className="text-xl mb-2 underline">¿Cómo se mantiene el servicio?</h2>
          <p>Debido a que no hay un coste para el usuario y para poder mantener un servicio gratuito, algunos de los enlaces pueden contener un referido en ellos que permiten obtener beneficios para el desarrollo y mejora de la herramienta.</p>
        </div>
      </div>
    </section>
  );
}
