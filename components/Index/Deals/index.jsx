import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Link from 'next/link'
import React from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { slideRight, slideLeft, slideUp } from './animation.js'
import Image from 'next/image.js'

export default function index({ data }) {
  const container = useRef(null)
  const isInView = useInView(container)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end start']
  })
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.4])

  function default_template() {
    return (
      <section>
        <div className="p-2 sm:p-4 text-center">
          <p className="text-mono text-md sm:text-xl mt-4 sm:mt-0 mb-4">
            Sin ofertas
          </p>
        </div>
      </section>
    )
  }
  if (!data) return default_template()
  if (Object.keys(data).length === 0) return default_template()

  const data_memo = React.useMemo(() => data)

  const amd_data = data_memo['AMD'].sort(function (a, b) {
    return a.price - b.price
  })
  const nvidia_data = data_memo['NVIDIA'].sort(function (a, b) {
    return a.price - b.price
  })

  function getItems(data) {
    const randomKeyID = `list-product-header-label-${Math.random()}`
    return (
      <>
        <ListItem disablePadding key={randomKeyID} className="block">
          <div className="grid grid-cols-5 border-b px-2 text-sm">
            <div className="col-span-4">
              <p className="font-semibold">Nombre</p>
            </div>
            <div className="text-right font-semibold">Precio</div>
          </div>
        </ListItem>

        {data.map(value => {
          const url = '/producto/' + value['uuid']
          const labelId = `list-item-product-label-${Math.random()}`
          const imageUrl = value['image']
            ? `https://images.stockfinder.tech${value['image']}`
            : `/images/placeholder/gpu.webp`

          var name = value['name'].replace(/(\r\n|\n|\r)/gm, '')
          name =
            url.toUpperCase().indexOf('RASTRILLO') === -1
              ? name
              : name + ' - Reacondicionado'

          return (
            <ListItem
              disablePadding
              key={labelId}
              className="block hover:bg-zinc-700 rounded-xl px-2 text-xxs lg:text-xs"
            >
              <div className="grid grid-cols-5 border-b items-center py-1">
                <div className="col-span-4">
                  <Link
                    href={url}
                    className="hover:text-blue-500 hover:underline hover:decoration-blue-500"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <Image
                        alt={name}
                        src={imageUrl}
                        width={40}
                        height={40}
                        style={{ width: 'auto', height: 'auto' }}
                        className="w-8 h-8 rounded-md"
                      />
                      {name.replace(/(\r\n|\n|\r)/gm, '')}
                    </div>
                  </Link>
                </div>
                <div className="text-right font-semibold">
                  {value.price.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </div>
              </div>
            </ListItem>
          )
        })}
      </>
    )
  }
  function getList() {
    return (
      <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-2 text-center gap-1 mt-4">
        <motion.div
          className="relative title_text bg-zinc-800 bg-opacity-90 rounded-xl"
          variants={slideRight}
          initial="initial"
          animate={isInView ? 'open' : 'closed'}
          custom={4}
        >
          <p className="text-lg text-center font-semibold text-error -mb-4 mt-2">
            AMD
          </p>
          <div className="flex justify-center p-4">
            <List sx={{ width: '100%' }}>{getItems(amd_data)}</List>
          </div>
        </motion.div>

        <motion.div
          className="relative title_text bg-zinc-800 bg-opacity-90 rounded-xl	"
          variants={slideLeft}
          initial="initial"
          animate={isInView ? 'open' : 'closed'}
          custom={4}
        >
          <p className="text-lg text-center font-semibold text-success -mb-4 mt-2">
            NVIDIA
          </p>
          <div className="flex justify-center p-4">
            <List sx={{ width: '100%' }}>{getItems(nvidia_data)}</List>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.section
      style={{ scale, opacity }}
      ref={container}
      className="h-[175vh] sm:h-screen"
    >
      <motion.div
        className="relative title_text"
        variants={slideUp}
        initial="initial"
        animate={isInView ? 'open' : 'closed'}
        custom={0.5}
      >
        <p>Si aún no te has decidido:</p>
      </motion.div>

      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full -mt-2 mb-4 h-2 mx-auto"></div>

      <div className="mx-auto px-2 sm:px-4">{getList()}</div>
    </motion.section>
  )
}
