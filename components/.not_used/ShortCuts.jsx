import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
export default function ShortCuts({}) {
  var IMAGES_DATA = [
    {
      id: 0,
      name: 'Procesadores',
      image: 'images/components/AMD-Ryzen-7000.png',
      url: '/categorias/procesadores'
    },
    {
      id: 1,
      name: 'Tarjetas Gráficas',
      image: 'images/components/asus.png',
      url: '/categorias/tarjetas-graficas'
    },
    {
      id: 2,
      name: 'Placas Base',
      image: 'images/categories/motherboard.webp',
      url: '/categorias/placas-base'
    }
  ]

  var IMAGES_DATA2 = [
    {
      id: 5,
      name: 'Fuentes alimentación',
      image: 'images/categories/PSU.webp',
      url: '/categorias/fuentes-alimentacion'
    },
    {
      id: 6,
      name: 'Memorias RAM',
      image: 'images/categories/RAM.webp',
      url: '/categorias/memoria-ram'
    },
    {
      id: 7,
      name: 'Almacenamiento',
      image: 'images/categories/SSD.webp',
      url: '/categorias/almacenamiento'
    },
    {
      id: 8,
      name: 'Torres',
      image: 'images/categories/torre.webp',
      url: '/categorias/torres'
    },
    {
      id: 9,
      name: 'Disipadores CPU',
      image: 'images/categories/disipador.webp',
      url: '/categorias/disipadores-cpu'
    }
  ]

  var TOTAL_IMAGES = IMAGES_DATA.concat(IMAGES_DATA2)

  return (
    <section>
      <h3 className="text-3xl font-semibold text-center">
        ¿Qué producto estás buscando?
      </h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <div className="container mx-auto">
        <ul className="flex xl:grid flex-wrap xl:grid-cols-4 justify-center ">
          {TOTAL_IMAGES.map(result => {
            const { id, name, image, url } = result
            return (
              <motion.div
                key={id}
                className="custom-card"
                whileHover={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'bg-google-dark',
                  scale: [1, 1.2, 1.2],
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Link href={url}>
                  <div className="flex flex-col place-items-center relative p-1">
                    <img
                      loading="lazy"
                      src={image}
                      alt={`${name} Thumbnail`}
                      className="bg-google-dark h-28 lg:h-48 w-32 lg:w-48 rounded-md"
                    />
                    <p className="absolute bottom-0 text-neutral-300 font-semibold text-xs lg:text-sm text-center">
                      {name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </ul>

        <style>{`
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .custom-card {
          margin: 0.1rem;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          borderRadius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .custom-card:hover,
        .custom-card:focus,
        .custom-card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .custom-card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .custom-card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        `}</style>
      </div>
    </section>
  )
}
