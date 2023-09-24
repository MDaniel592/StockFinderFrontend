import React, { useEffect, useContext } from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import VerticalFloatingFilters from '../Sidebar/VerticalFloatingFilters.jsx'
import List from '../Tables/List'
import Table from '../Tables/Table'
import TableHeader from '../Tables/TableHeader'
import { slideUp } from './animation.js'
import { motion } from 'framer-motion'
import { ServiceContext } from '../../pages/_app'

export default function CategoryPage({
  data_list,
  data_slider,
  TableHeaderDataValues,
  TableHeaderSelectedValues,
  tableLen,
  searchValue,
  handleSearch,
  removeFilters,
  filteredData,
  headCells,
  failOverImage,
  specsKeys
}) {
  let categoryTitle
  let categoryBuild
  switch (failOverImage) {
    case 'monitor':
      categoryTitle = 'Monitores'
      categoryBuild = null
      break
    case 'gpu':
      categoryTitle = 'Tarjetas Gráficas'
      categoryBuild = 'GPU'
      break
    case 'cpu':
      categoryTitle = 'Procesadores'
      categoryBuild = 'CPU'
      break
    case 'motherboard':
      categoryTitle = 'Placas Base'
      categoryBuild = 'MDB'
      break
    case 'psu':
      categoryTitle = 'Fuentes de alimentación'
      categoryBuild = 'PSU'
      break
    case 'ram':
      categoryTitle = 'Memoria RAM'
      categoryBuild = 'RAM'
      break
    case 'storage':
      categoryTitle = 'Almacenamiento'
      categoryBuild = 'HDD'
      break
    case 'chassis':
      categoryTitle = 'Torres de PC'
      categoryBuild = 'CHASSIS'
      break
    case 'cpu cooler':
      categoryTitle = 'Disipadores de CPU'
      categoryBuild = 'COOLER'
      break
    default:
      categoryTitle = failOverImage
      break
  }

  const { seTitle } = useContext(ServiceContext)
  useEffect(() => {
    seTitle(`${categoryTitle} | StockFinder.tech`)
  }, [])

  return (
    <motion.div variants={slideUp} initial="initial" animate={'open'}>
      <h3 className="text-3xl font-semibold text-center">{categoryTitle}</h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <div className="px-2 mx-auto">
        <div
          name="filters"
          className="flex xl:hidden mt-2 flex justify-center xl:justify-start"
        >
          <VerticalFloatingFilters
            name="Filtros"
            data_list={data_list}
            data_slider={data_slider}
          />
        </div>
      </div>

      <div className="px-2 mx-auto">
        <TableHeader
          data_values={TableHeaderDataValues}
          selectedValues={TableHeaderSelectedValues}
          tableLen={tableLen}
          handleSearch={handleSearch}
          removeFilters={removeFilters}
          searchValue={searchValue}
        />
      </div>

      <div className="px-2 text-white py-4">
        <div className="flex gap-2">
          <div
            name="filters"
            className="hidden xl:flex bg-zinc-800 bg-opacity-100 rounded-lg"
          >
            <div className="flex-wrap w-56 py-2">
              <Sidebar data_list={data_list} data_slider={data_slider} />
            </div>
          </div>

          <div
            name="data-full"
            className="hidden lg:flex dark:bg-zinc-800 w-screen rounded-lg"
          >
            <Table
              data={filteredData}
              headCells={headCells}
              failOverImage={failOverImage}
              categoryBuild={categoryBuild}
            />
          </div>
          <div
            name="data-mobile"
            className="block lg:hidden rounded-lg w-screen"
          >
            <List
              data={filteredData}
              specsKeys={specsKeys}
              failOverImage={failOverImage}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
