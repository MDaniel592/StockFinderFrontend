import React, { useState } from 'react'
import VerticalFloatingFilters from '../Sidebar/VerticalFloatingFilters'
import PaginatedItems from '../Tables/Pagination'
import TableHeader from '../Tables/TableHeader'
import AlertManagement from './AlertManagement'
import { getFilteredData } from './FilterFunction'
import ProductList from './ProductList'

export default function StockPage({ data_recv, category }) {
  const no_data = (
    <section>
      <p className="text-center font-semibold text-base lg:text-xl font-medium text-red-500 lg:my-38">
        {' '}
        En estos momentos NO hay {category} disponible
      </p>
    </section>
  )
  if (!data_recv) return no_data
  if (Object.keys(data_recv).length == 0) return no_data
  if (Object.keys(data_recv.products).length == 0) return no_data

  const [tableLen, setTableLen] = React.useState(
    Object.keys(data_recv).length - 4
  )
  const [maxTableList, setMaxTableList] = React.useState([0, 29])

  // Price
  const defaultPriceValue = {
    min: data_recv['min_price'],
    max: data_recv['max_price']
  }
  const [priceValue, setPriceValue] = React.useState([
    defaultPriceValue['min'],
    defaultPriceValue['max']
  ])
  const [SliderPriceValue, setSliderPriceValue] = React.useState([
    defaultPriceValue['min'],
    defaultPriceValue['max']
  ])
  const minPriceDistance = 0

  const handlePriceChange = (event, newValue) => {
    setPriceValue(newValue)
  }
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return
    activeThumb === 0
      ? setSliderPriceValue([
          Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance),
          SliderPriceValue[1]
        ])
      : setSliderPriceValue([
          SliderPriceValue[0],
          Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)
        ])
  }

  // Shop
  const shopsDefaults = {
    PcComponentes: false,
    Aussar: false,
    Casemod: false,
    Coolmod: false,
    IzarMicro: false,
    LDLC: false,
    Neobyte: false,
    Speedler: false,
    'Versus Gamers': false
  }
  const defaultShopList = {
    PcComponentes: true,
    Aussar: false,
    Casemod: false,
    Coolmod: false,
    IzarMicro: false,
    LDLC: false,
    Neobyte: false,
    Speedler: false,
    'Versus Gamers': false
  }

  const [shopSelected, setShop] = useState('')
  const [buttonShop, setButtonShop] = React.useState(false)
  const [shopList, setShopList] = useState(defaultShopList)
  const [shopPreferences, setShopsPreferences] = useState(shopsDefaults)

  // Status
  const statusDefault = { Nueva: false, Reacondicionado: false }
  const defaultStatusList = { Nueva: true, Reacondicionado: true }

  const [statusSelected, setStatuss] = useState('')
  const [buttonStatus, setButtonStatus] = React.useState(false)
  const [statusList, setStatusList] = useState(defaultStatusList)
  const [statusPreferences, setStatussPreferences] = useState(statusDefault)

  // Search
  const [searchValue, setSearchValue] = React.useState('')
  const handleSearch = event => {
    setSearchValue(event.target.value)
  }

  // Filters
  function removeFilters() {
    setPriceValue([defaultPriceValue['min'], defaultPriceValue['max']])
    setSliderPriceValue([defaultPriceValue['min'], defaultPriceValue['max']])

    setStatussPreferences(statusDefault)
    setStatuss('')
    setShopsPreferences(shopsDefaults)
    setShop('')

    setSearchValue('')
  }

  const handleButton = name => {
    switch (name) {
      case 'Tiendas':
        setButtonShop(!buttonShop)
        for (let value in shopList) {
          shopList[value] = !buttonShop
          if (buttonShop === true && defaultShopList[value])
            shopList[value] = true
        }
        setShopList(shopList)
        return

      case 'Estado':
        setButtonStatus(!buttonStatus)
        for (let value in statusList) {
          statusList[value] = !buttonStatus
          if (buttonStatus === true && defaultStatusList[value]) {
            statusList[value] = true
          }
        }
        setStatusList(statusList)
        return

      default:
        console.log(`handleButton ${name} unknown`)
        return
    }
  }

  function handleChange(name, value) {
    let checkbox_value = value.target.value
    switch (name) {
      case 'Tiendas':
        shopPreferences[checkbox_value] = !shopPreferences[checkbox_value]
        let newShops = []
        for (let value in shopPreferences) {
          if (shopPreferences[value]) newShops.push(value)
        }
        setShop(newShops)
        return

      case 'Estado':
        statusPreferences[checkbox_value] = !statusPreferences[checkbox_value]
        let newStatuss = []
        for (let value in statusPreferences) {
          if (statusPreferences[value]) {
            newStatuss.push(value)
          }
        }
        setStatuss(newStatuss)
        return

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return
    }
  }

  const data_list = [
    {
      name: 'Tiendas',
      data: shopList,
      preferences: shopPreferences,
      handleChange: handleChange,
      handleButton: handleButton,
      button: buttonShop
    },
    {
      name: 'Estado',
      data: statusList,
      preferences: statusPreferences,
      handleChange: handleChange,
      handleButton: handleButton,
      button: buttonStatus,
      show_more: false
    }
  ]

  const data_slider = [
    {
      name: 'Precio',
      SliderValue: SliderPriceValue,
      defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider,
      handleChange: handlePriceChange,
      text: '€'
    }
  ]

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: 'Precio' }
  ]
  const TableHeaderSelectedValues = [
    { selected: shopSelected, label: 'Tiendas' },
    { selected: statusSelected, label: 'Estado' }
  ]

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    refurbished: { value: statusSelected, number: false }
  }

  const filteredData = getFilteredData(
    data_recv['products'],
    filters,
    searchValue,
    tableLen,
    setTableLen
  )
  return (
    <section className="w-fit mx-auto py-2">
      <h3 className="pt-4 text-xl lg:text-3xl font-semibold text-center">
        Modelos de {category} en stock
      </h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-48 rounded-full mt-1 h-2 mx-auto"></div>

      <p className="mx-auto max-w-2xl text-center text-xs font-sans antialiased my-4">
        Las alertas creadas en este apartado únicamente le avisarán manteniendo
        esta pestaña abierta (saltará una notificación y un sonido de alerta).
        Puede recibir las alertas por telegram registrandose cómo usuario, y
        creándolas desde su perfil.
      </p>
      <div name="stockForm" className="flex justify-center">
        <AlertManagement products={data_recv['products']} category={category} />
      </div>

      <div name="filters" className="flex justify-center">
        <VerticalFloatingFilters
          name="Filtros"
          data_list={data_list}
          data_slider={data_slider}
        />
      </div>

      <div className="px-4 sm:px-6 text-white">
        <TableHeader
          data_values={TableHeaderDataValues}
          selectedValues={TableHeaderSelectedValues}
          tableLen={tableLen}
          handleSearch={handleSearch}
          removeFilters={removeFilters}
        />
      </div>

      <div className="flex-wrap bg-zinc-800 rounded-lg w-fit z-0 text-neutral-300 my-2 p-2 mx-auto">
        <ProductList
          data={filteredData}
          maxTableList={maxTableList}
          failOverImage="gpu"
        />
        <PaginatedItems
          setMaxTableList={setMaxTableList}
          maxTableList={maxTableList}
          tableLen={tableLen}
        />
      </div>
    </section>
  )
}
