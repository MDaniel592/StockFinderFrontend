import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { slideUp } from './animation.js'

const slider1 = [
  {
    name: 'Procesadores',
    src: 'components/AMD-Ryzen-7000.png',
    href: '/categorias/procesadores'
  },
  {
    name: 'Tarjetas Gráficas',
    src: 'components/asus.png',
    href: '/categorias/tarjetas-graficas'
  },
  {
    name: 'Placas Base',
    src: 'categories/motherboard.webp',
    href: '/categorias/placas-base'
  },
  {
    name: 'Fuentes alimentación',
    src: 'categories/PSU.webp',
    href: '/categorias/fuentes-alimentacion'
  }
]

const slider2 = [
  {
    name: 'Memorias RAM',
    src: 'categories/RAM.webp',
    href: '/categorias/memoria-ram'
  },
  {
    name: 'Almacenamiento',
    src: 'categories/SSD.webp',
    href: '/categorias/almacenamiento'
  },
  {
    name: 'Torres',
    src: 'categories/torre.webp',
    href: '/categorias/torres'
  },
  {
    name: 'Disipadores CPU',
    src: 'categories/disipador.webp',
    href: '/categorias/disipadores-cpu'
  }
]

export default function index() {
  const container = useRef(null)
  const isInView = useInView(container)
  const phrase = '¿ Qué componentes estás buscando ?'

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.4])

  return (
    <motion.section
      ref={container}
      style={{ opacity, scale }}
      className="h-[100vh] relative flex flex-col"
    >
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

      <motion.div className="flex flex-wrap sm:flex-row justify-center gap-2">
        {slider1.map((project, index) => {
          return (
            <div
              key={Math.random()}
              className={`relative w-1/3 sm:w-1/6 h-auto text-url hover:bg-neutral-700 hover:bg-opacity-90 rounded-lg p-0 sm:p-2`}
            >
              <Link href={project.href} className="">
                <motion.img
                  className="rounded-lg"
                  fill="true"
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? 'open' : 'closed'}
                  alt={'image'}
                  src={`/images/${project.src}`}
                  custom={index}
                />
                <p className="absolute truncate text-xxs sm:text-lg inset-x-0 bottom-0 text-center font-bold text-white-500 text-url py-0 sm:py-2">
                  {project.name}
                </p>
              </Link>
            </div>
          )
        })}
      </motion.div>
      <motion.div className="flex flex-wrap sm:flex-row justify-center gap-2">
        {slider2.map((project, index) => {
          return (
            <div
              key={Math.random()}
              className={`relative w-1/3 sm:w-1/6 h-auto text-url hover:bg-neutral-700 hover:bg-opacity-90 rounded-lg p-0 sm:p-2`}
            >
              <Link href={project.href}>
                <motion.img
                  className="rounded-lg"
                  fill="true"
                  variants={slideUp}
                  initial="initial"
                  animate={isInView ? 'open' : 'closed'}
                  alt={'image'}
                  src={`/images/${project.src}`}
                  custom={index}
                />
                <p className="absolute truncate text-xxs sm:text-lg inset-x-0 bottom-0 text-center font-bold text-white-500 text-url py-0 sm:py-2">
                  {project.name}
                </p>
              </Link>
            </div>
          )
        })}
      </motion.div>
    </motion.section>
  )
}