import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Builder({ }) {
  return (
    <React.Fragment>
      <section id="builder-section" className="h-[30vh] lg:h-[50vh] rounded-lg">
        <div className="flex flex-col items-start justify-end gap-2 pb-2 md:pb-4 lg:pb-8 md:gap-4 lg:gap-8 h-full px-2 sm:px-4">
          <div className="info">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold pb-2 md:pb-4 lg:pb-8">
              Disponible nuevo configurador de PC
            </h2>
            <p className="text-sm lg:text-base">Sigue los pasos y ten tu equipo a punto.</p>
            <p className="text-sm lg:text-base">
              ¡Accede al configurador y comienza a montar el ordenador que
              siempre has querido!
            </p>
          </div>
          <div className="action">
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                href=""
                className="text-base sm:text-lg subpixel-antialiased inline-flex as-btn primary"
              >
              <Link href="/builder">Configura tu PC</Link>
              </motion.a>

          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
