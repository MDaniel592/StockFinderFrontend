import Link from 'next/link'
import React from 'react'
import { useRef } from 'react'
import { slideUp } from './animation.js'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Price({}) {
  const container = useRef(null)
  const isInView = useInView(container)
  const phrase =
    '¿ Prefieres seleccionar tus componentes y configurar un nuevo PC ?'
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 1])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1])

  const crossmark = (
    <svg
      className="h-6 w-6 text-red-500"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.0011,6.2635l5.7749,6.0785"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.581,6.2399l-5.775,6.0781"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5.001,18.196l5.775-6.078"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.581,18.219l-5.776-6.078"
      />
    </svg>
  )

  const tickmark = (
    <svg
      className="h-6 w-6 text-blue-500"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  )

  const users_type = {
    Visitante: {
      status: [true, true, false, false],
      buttonName: 'Sin Registro',
      buttonEnable: false,
      alertas: 0
    },
    Registrado: {
      status: [true, true, true, false],
      buttonName: 'Registro',
      buttonEnable: true,
      alertas: 10
    }
    // Premium: {
    //   status: [true, true, true, true],
    //   buttonName: 'Próximamente',
    //   buttonEnable: false,
    //   alertas: 30
    // }
  }

  function getUsersType() {
    var usersCode
    for (let user in users_type) {
      let singleType = (
        <li
          className="px-2 py-3 rounded-xl shadow-lg bg-zinc-500 dark:bg-zinc-800"
          key={Math.random()}
        >
          <div className="bg-zinc-500 dark:bg-zinc-800 rounded-xl">
            <div className="flex justify-center">
              <span className="inline-flex text-white rounded-full text-base lg:text-lg leading-5 font-semibold tracking-wide ">
                {user}
              </span>
            </div>
            <div className="section-title-separator bg-blue-500 w-16 rounded-full mt-1 h-2 mx-auto"></div>
          </div>

          <div className="px-1 lg:px-2 bg-zinc-700 dark:bg-zinc-800 rounded-xl text-xs lg:text-sm">
            <ul>
              <li className="m-1 lg:m-2 flex items-start" key={Math.random()}>
                <div className="flex-shrink-0">
                  {users_type[user].status[0] ? tickmark : crossmark}
                </div>
                <Link
                  href="/canales-telegram"
                  target="_blank"
                  className="ml-3 leading-6 text-gray-200 hover:text-blue-500 hover:underline"
                >
                  Acceso a todos los canales
                </Link>
              </li>
              <li className="m-1 lg:m-2 flex items-start" key={Math.random()}>
                <div className="flex-shrink-0">
                  {users_type[user].status[1] ? tickmark : crossmark}
                </div>
                <Link
                  href="/categorias"
                  target="_blank"
                  className="ml-3 leading-6 text-gray-200 hover:text-blue-500 hover:underline"
                >
                  Stock en tiempo real
                </Link>
              </li>
              <li className="m-1 lg:m-2 flex items-start" key={Math.random()}>
                <div className="flex-shrink-0">
                  {users_type[user].status[2] ? tickmark : crossmark}
                </div>
                <p className="ml-3 leading-6 text-gray-200">
                  {users_type[user].status[2]
                    ? 'Máximo ' + users_type[user].alertas + ' alertas'
                    : 'Ninguna alerta'}
                </p>
              </li>
              <li className="m-1 lg:m-2 flex items-start" key={Math.random()}>
                <div className="flex-shrink-0">
                  {users_type[user].status[3] ? tickmark : crossmark}
                </div>
                <p className="ml-3 leading-6 text-gray-200">
                  Avisos prioritarios
                </p>
              </li>
            </ul>
            <div className="mt-2 rounded-md shadow">
              {users_type[user].buttonEnable && (
                <Link href="/sign-up" className="btn-price">
                  {users_type[user].buttonName}
                </Link>
              )}
              {!users_type[user].buttonEnable && (
                <p
                  className="flex items-center justify-center lg:px-3 lg:py-2 border border-transparent text-sm leading-6 font-medium rounded-md 
              text-white bg-zinc-800 dark:bg-zinc-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled"
                >
                  {users_type[user].buttonName}
                </p>
              )}
            </div>
          </div>
        </li>
      )
      usersCode = [usersCode, singleType]
    }
    return usersCode
  }
  return (
    <motion.section
      style={{ scale, opacity }}
      ref={container}
      className="min-h-[50vh]"
    >
      <motion.div
        className="relative title_text"
        variants={slideUp}
        initial="initial"
        animate={isInView ? 'open' : 'closed'}
        custom={0.5}
      >
        <p>¡ Sin ningún tipo de coste !</p>
      </motion.div>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full -mt-2 mb-4 h-2 mx-auto"></div>

      <div className="text-center mx-auto max-w-xl">
        <p className="text-base my-2 mx-auto font-bold">
          Repito, ¡el uso de la web es gratuito!
        </p>
        <p className="text-sm mx-auto ">
          ¿Quieres sacarle el máximo partido a la web? Obten beneficios siendo
          un usuario registrado. ¿A qué esperas? ¡Regístrate!
        </p>
      </div>

      <ul className="flex flex-wrap justify-center gap-1 lg:gap-2 py-2 lg:py-4">
        {getUsersType()}
      </ul>
    </motion.section>
  )
}
