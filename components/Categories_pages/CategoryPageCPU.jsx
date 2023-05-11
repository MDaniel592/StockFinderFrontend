import React, { useState } from "react";
import CategoryPage from "./CategoryPage";
import { filter_data } from "./FilterFunction";

export default function CategoryPageCPU({ data_recv }) {

  const data_memo = React.useMemo(() => data_recv);
  const [tableLen, setTableLen] = React.useState(Object.keys(data_memo).length - 4);

  // Price
  const defaultPriceValue = { min: data_memo["min_price"], max: data_memo["max_price"] }
  const [priceValue, setPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const [SliderPriceValue, setSliderPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const minPriceDistance = 0;

  const handlePriceChange = (event, newValue) => { setPriceValue(newValue); };
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPriceValue([Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance), SliderPriceValue[1]]) : setSliderPriceValue([SliderPriceValue[0], Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)]);
  };

  // Shop
  const shopsDefaults = {
    PcComponentes: false, Aussar: false, Casemod: false, Coolmod: false,
    IzarMicro: false, LDLC: false, Neobyte: false, Speedler: false, "Versus Gamers": false,
  };
  const defaultShopList = {
    PcComponentes: true, Aussar: false, Casemod: false, Coolmod: false,
    IzarMicro: false, LDLC: false, Neobyte: false, Speedler: false, "Versus Gamers": false,
  };

  const [shopSelected, setShop] = useState("");
  const [buttonShop, setButtonShop] = React.useState(false);
  const [shopList, setShopList] = useState(defaultShopList);
  const [shopPreferences, setShopsPreferences] = useState(shopsDefaults);

  // Manufacturer
  const manufacturerDefault = { AMD: false, Intel: false };
  const defaultManufacturerList = { AMD: true, Intel: true };

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Socket
  const socketDefault = { "Socket 1200": false, "Socket 1700": false, "Socket AM4": false, "Socket AM5": false };
  const defaultSocketList = { "Socket 1200": true, "Socket 1700": true, "Socket AM4": true, "Socket AM5": true };

  const [socketSelected, setSocket] = useState("");
  const [buttonSocket, setButtonSocket] = React.useState(false);
  const [socketPreferences, setSocketPreferences] = useState(socketDefault);
  const [socketList, setSocketList] = useState(defaultSocketList);

  // Processor
  const processorDefault = {
    "Intel Pentium": false, "Intel Celeron": false, "Intel Core i3": false, "Intel Core i5": false,
    "Intel Core i7": false, "Intel Core i9": false, "AMD Ryzen 3": false, "AMD Ryzen 5": false,
    "AMD Ryzen 7": false, "AMD Ryzen 9": false
  };
  const defaultProcessorList = {
    "Intel Pentium": false, "Intel Celeron": false, "Intel Core i3": false, "Intel Core i5": true,
    "Intel Core i7": true, "Intel Core i9": false, "AMD Ryzen 3": false, "AMD Ryzen 5": true,
    "AMD Ryzen 7": true, "AMD Ryzen 9": false,
  }

  const [processorSelected, setProcessor] = useState("");
  const [buttonProcessor, setButtonProcessor] = React.useState(false);
  const [processorPreferences, setProcessorPreferences] = useState(processorDefault);
  const [processorList, setProcessorList] = useState(defaultProcessorList);

  // Stock
  const stocksDefaults = { Disponible: false, 'No Disponible': false };
  const defaultStockList = { Disponible: true, 'No Disponible': false };

  const [stockSelected, setStock] = useState("");
  const [buttonStock, setButtonStock] = React.useState(false);
  const [stockPreferences, setStocksPreferences] = useState(stocksDefaults);
  const [stockList, setStockList] = useState(defaultStockList);

  // Search
  const [searchValue, setSearchValue] = React.useState("");
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  // Filters
  function removeFilters() {
    setPriceValue([defaultPriceValue["min"], defaultPriceValue["max"]]);
    setSliderPriceValue([defaultPriceValue["min"], defaultPriceValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setProcessorPreferences(processorDefault);
    setProcessor("");
    setSocketPreferences(socketDefault);
    setSocket("");
    setStocksPreferences(stocksDefaults);
    setStock("");

    setSearchValue("")
  }



  const handleButton = (name) => {
    switch (name) {
      case 'Stock':
        setButtonStock(!buttonStock);
        for (let value in stockList) { stockList[value] = !buttonStock; if (buttonStock === true) stockList[value] = true; }
        setStockList(stockList);
        return;

      case 'Tiendas':
        setButtonShop(!buttonShop);
        for (let value in shopList) { shopList[value] = !buttonShop; if (buttonShop === true && defaultShopList[value]) shopList[value] = true; }
        setShopList(shopList);
        return;

      case 'Fabricantes':
        setButtonManufacturer(!buttonManufacturer);
        for (let value in manufacturerList) { manufacturerList[value] = !buttonManufacturer; if (buttonManufacturer === true && defaultManufacturerList[value]) { manufacturerList[value] = true; } }
        setManufacturerList(manufacturerList);
        return;

      case 'Socket':
        setButtonSocket(!buttonSocket);
        for (let value in socketList) { socketList[value] = !buttonSocket; if (buttonSocket === true && defaultSocketList[value]) { socketList[value] = true; } }
        setSocketList(socketList);
        return;

      case 'Procesador':
        setButtonProcessor(!buttonProcessor);
        for (let value in processorList) { processorList[value] = !buttonProcessor; if (buttonProcessor === true && defaultProcessorList[value]) processorList[value] = true; }
        setProcessorList(processorList);
        return;

      default:
        console.log(`handleButton ${name} unknown`)
        return;
    }
  };


  function handleChange(name, value) {
    let checkbox_value = value.target.value;
    switch (name) {
      case 'Stock':
        stockPreferences[checkbox_value] = !stockPreferences[checkbox_value];
        let newStocks = [];
        for (let value in stockPreferences) { if (stockPreferences[value]) newStocks.push(value === 'Disponible' ? true : false); }
        setStock(newStocks);
        return;

      case 'Tiendas':
        shopPreferences[checkbox_value] = !shopPreferences[checkbox_value];
        let newShops = [];
        for (let value in shopPreferences) { if (shopPreferences[value]) newShops.push(value); }
        setShop(newShops);
        return;

      case 'Fabricantes':
        manufacturerPreferences[checkbox_value] = !manufacturerPreferences[checkbox_value];
        let newManufacturers = [];
        for (let value in manufacturerPreferences) { if (manufacturerPreferences[value]) newManufacturers.push(value); }
        setManufacturers(newManufacturers);
        return;

      case 'Socket':
        socketPreferences[checkbox_value] = !socketPreferences[checkbox_value];
        let newTypes = [];
        for (let value in socketPreferences) { if (socketPreferences[value]) newTypes.push(value); }
        setSocket(newTypes);
        return;

      case 'Procesador':
        processorPreferences[checkbox_value] = !processorPreferences[checkbox_value];
        let newProcessors = [];
        for (let value in processorPreferences) { if (processorPreferences[value]) newProcessors.push(value); }
        setProcessor(newProcessors);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer, show_more: false },
    { name: "Procesador", data: processorList, preferences: processorPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonProcessor },
    { name: "Socket", data: socketList, preferences: socketPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonSocket, show_more: false },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },

  ];


  const data_slider = [{
    name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
    handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€"
  }];

  const TableHeaderDataValues = [{ value: priceValue, default: defaultPriceValue, label: "Precio" }];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: socketSelected, label: "Tipo Socket" },
    { selected: processorSelected, label: "Procesador" },
    { selected: manufacturerSelected, label: "Fabricantes" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Tipo Socket", numeric: false, disablePadding: false, label: "Socket" },
    { id: "Procesador", numeric: true, disablePadding: false, label: "Procesador" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Tipo Socket", label: "Socket" },
    { id: "Procesador", label: "Procesador" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    Procesador: { value: processorSelected, number: false },
    "Tipo Socket": { value: socketSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
  };

  const filteredData = filter_data(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='cpu' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}