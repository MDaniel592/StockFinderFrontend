import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { slideUp } from './animation.js'

export default function index() {
  const container = useRef(null)
  const isInView = useInView(container)
  const phrase = 'Siempre puedes renovar algún componente del PC !  ¿Empezamos?'
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  return (
    <motion.section
      style={{ scale, opacity }}
      ref={container}
      className="relative h-screen flex flex-col items-center justify-center text-white text-center"
    >
      <p className="relative text-4xl">¿Listo para jugar?</p>

      <motion.div
        variants={slideUp}
        initial="initial"
        animate={isInView ? 'open' : 'closed'}
        custom={4}
      >
        <p className="text-base font-semibold mx-2 sm:mx-auto">{phrase}</p>
      </motion.div>

      <motion.div
        className="relative mt-4"
        initial={{ y: 0 }}
        animate={{ y: 40 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2.5,
          delay: 2
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={'none'}
          viewBox="0 0 24 24"
          strokeWidth="0.6"
          stroke="currentColor"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </motion.div>
    </motion.section>
  )
}
