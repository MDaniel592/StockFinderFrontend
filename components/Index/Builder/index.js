import Link from 'next/link'
import React from 'react'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { slideUp } from './animation.js'

export default function Builder() {
  const container = useRef(null)
  const isInView = useInView(container)
  const phrase =
    '¿ Prefieres seleccionar tus componentes y configurar un nuevo PC ?'
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.4])

  const divStyle = {
    background: `url(/images/builder.webp)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '50vh', // Adjust the height as needed
    borderRadius: '1rem' // Rounded corners
  }

  return (
    <motion.section style={{ scale, opacity }} ref={container}>
      <div className="relative h-screen w-full">
        <motion.div
          className="relative title_text"
          variants={slideUp}
          initial="initial"
          animate={isInView ? 'open' : 'closed'}
          custom={0.5}
        >
          <p>{phrase}</p>
        </motion.div>
        <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full -mt-2 mb-4 h-2 mx-auto"></div>

        <div>
          <div
            style={divStyle}
            className="relative mx-auto justify-center max-w-xs sm:max-w-4xl max-h-[30vh] sm:max-h-[60vh]"
          >
            <div className="absolute bottom-0 left-0">
              <div className="flex flex-col items-start justify-end gap-2 pb-2 md:pb-4 lg:pb-8 md:gap-4 lg:gap-8 h-full px-2 sm:px-4">
                <div className="info bg-gray-700 bg-opacity-50 rounded-lg px-2 py-1">
                  <p className="text-xs lg:text-base">
                    Sigue los pasos y ten tu equipo a punto.
                  </p>
                  <p className="text-xs lg:text-base">
                    ¡Accede al configurador y comienza a montar el ordenador que
                    siempre has querido!
                  </p>
                </div>

                <div>
                  <Link
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    href="/builder"
                    className="text-xs sm:text-lg subpixel-antialiased inline-flex as-btn primary"
                  >
                    <span>Configura tu PC</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
