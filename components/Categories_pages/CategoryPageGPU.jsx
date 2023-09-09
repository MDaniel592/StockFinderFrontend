import React, { useState } from "react";
import CategoryPage from "./CategoryPage";
import { getFilteredData } from "./FilterFunction";

export default function CategoryPageCPUCooler({ data_recv }) {

  const data_memo = React.useMemo(() => data_recv);
  const [tableLen, setTableLen] = React.useState(Object.keys(data_memo).length - 4);

  // Price
  const defaultPriceValue = { min: data_memo["min_price"], max: data_memo["max_price"] }
  const [priceValue, setPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const [SliderPriceValue, setSliderPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const minPriceDistance = 0;

  // RAM
  const [defaultRAMValue, setdefaultRAMValue] = React.useState({ min: data_memo["min_memory"], max: data_memo["max_memory"], });
  const [ramValue, setRAMValue] = React.useState([defaultRAMValue["min"], defaultRAMValue["max"]]);
  const [SliderRAMValue, setSliderRAMValue] = React.useState([defaultRAMValue["min"], defaultRAMValue["max"]]);
  const minRAMDistance = 0;

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
  const manufacturerDefault = {
    AMD: false, ASUS: false, AsRock: false, Biostar: false, EVGA: false, GALAX: false,
    Gainward: false, Gigabyte: false, Inno3D: false, KFA2: false, MSI: false, NVIDIA: false,
    Palit: false, PNY: false, PowerColor: false, Sapphire: false, XFX: false, Zotac: false,
    Intel: false,
  };
  const defaultManufacturerList = {
    AMD: false, ASUS: true, AsRock: false, Biostar: false, EVGA: true, GALAX: false,
    Gainward: false, Gigabyte: true, Inno3D: false, KFA2: false, MSI: true, NVIDIA: false,
    Palit: false, PNY: false, PowerColor: false, Sapphire: false, XFX: false, Zotac: false,
    Intel: false,
  }

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);


  // Memory type
  const memoryDefault = { GDDR6X: false, GDDR6: false };
  const defaultMemoryList = { GDDR6X: true, GDDR6: true }
  const [memorySelected, setMemory] = useState("");
  const [buttonMemory, setButtonMemory] = React.useState(false);
  const [memoryPreferences, setMemoryPreferences] = useState(memoryDefault);
  const [memoryList, setMemoryList] = useState(defaultMemoryList);


  // Chipset
  const socketDefault = {
    // NVIDIA
    "GeForce RTX 4090": false, "GeForce RTX 4080": false, "GeForce RTX 4070 Ti": false, "GeForce RTX 4070": false, 
    "GeForce RTX 4060 Ti": false, "GeForce RTX 4060": false,
    "GeForce RTX 3060": false, "GeForce RTX 3060 Ti": false, "GeForce RTX 3060 Ti LHR": false, "GeForce RTX 3070": false,
    "GeForce RTX 3070 LHR": false, "GeForce RTX 3070 Ti": false, "GeForce RTX 3080 10GB": false, "GeForce RTX 3080 10GB LHR": false,
    "GeForce RTX 3080 12GB": false, "GeForce RTX 3080 Ti": false, "GeForce RTX 3090": false, "GeForce RTX 3090 LHR": false,
    "GeForce RTX 3090 Ti": false,
    // AMD
    "Radeon RX 7900 XTX": false, "Radeon RX 7900 XT": false, "Radeon RX 7800 XT": false, "Radeon RX 7700 XT": false,
    "Radeon RX 7600": false,
    "Radeon RX 6600": false, "Radeon RX 6600 XT": false, "Radeon RX 6700": false, "Radeon RX 6700 XT": false,
    "Radeon RX 6800": false, "Radeon RX 6800 XT": false, "Radeon RX 6900 XT": false,
  };
  const defaultSocketList = {
    // NVIDIA
    "GeForce RTX 4090": true, "GeForce RTX 4080": true, "GeForce RTX 4070 Ti": false, "GeForce RTX 4070": false, 
    "GeForce RTX 4060 Ti": false, "GeForce RTX 4060": false,
    "GeForce RTX 3060": false, "GeForce RTX 3060 Ti": false, "GeForce RTX 3060 Ti LHR": true, "GeForce RTX 3070": false,
    "GeForce RTX 3070 LHR": false, "GeForce RTX 3070 Ti": false, "GeForce RTX 3080 10GB": false, "GeForce RTX 3080 10GB LHR": false,
    "GeForce RTX 3080 12GB": false, "GeForce RTX 3080 Ti": false, "GeForce RTX 3090": false, "GeForce RTX 3090 LHR": false,
    "GeForce RTX 3090 Ti": false,
    // AMD
    "Radeon RX 7900 XTX": true, "Radeon RX 7900 XT": true, "Radeon RX 7800 XT": false, "Radeon RX 7700 XT": false,
    "Radeon RX 7600": false,
    "Radeon RX 6600": false, "Radeon RX 6600 XT": false, "Radeon RX 6700": false, "Radeon RX 6700 XT": false,
    "Radeon RX 6800": false, "Radeon RX 6800 XT": true, "Radeon RX 6900 XT": false,
  }

  const [socketSelected, setSocket] = useState("");
  const [buttonSocket, setButtonSocket] = React.useState(false);
  const [socketPreferences, setSocketPreferences] = useState(socketDefault);
  const [socketList, setSocketList] = useState(defaultSocketList);


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
    setRAMValue([defaultRAMValue["min"], defaultRAMValue["max"]]);
    setSliderRAMValue([defaultRAMValue["min"], defaultRAMValue["max"]]);

    setSocketPreferences(socketDefault);
    setSocket("");
    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setMemoryPreferences(memoryDefault);
    setMemory("");
    setStocksPreferences(stocksDefaults);
    setStock("");

    setSearchValue("")
  }

  const handlePriceChange = (event, newValue) => { setPriceValue(newValue); };
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPriceValue([Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance), SliderPriceValue[1]]) : setSliderPriceValue([SliderPriceValue[0], Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)]);
  };

  const handleRAMChange = (event, newValue) => { setRAMValue(newValue); };
  const handleRAMSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderRAMValue([Math.min(newValue[0], SliderRAMValue[1] - minRAMDistance), SliderRAMValue[1]]) : setSliderRAMValue([SliderRAMValue[0], Math.max(newValue[1], SliderRAMValue[0] + minRAMDistance)]);
  };



  const handleButton = (name) => {
    switch (name) {
      case 'Stock':
        setButtonStock(!buttonStock);
        for (let value in stockList) { stockList[value] = !buttonStock; if (buttonStock === true) stockList[value] = true; }
        setStockList(stockList);
        return;

      case 'Tiendas':
        setButtonShop(!buttonShop);
        for (let value in shopList) { shopList[value] = !buttonShop; if (buttonShop === true && defaultShopList[value]) { shopList[value] = true }; }
        setShopList(shopList);
        return;

      case 'Fabricantes':
        setButtonManufacturer(!buttonManufacturer);
        for (let value in manufacturerList) { manufacturerList[value] = !buttonManufacturer; if (buttonManufacturer === true && defaultManufacturerList[value]) { manufacturerList[value] = true; } }
        setManufacturerList(manufacturerList);
        return;

      case 'Modelo':
        setButtonSocket(!buttonSocket);
        for (let value in socketList) { socketList[value] = !buttonSocket; if (buttonSocket === true && defaultSocketList[value]) { socketList[value] = true; } }
        setSocketList(socketList);
        return;

      case 'Tipo':
        setButtonType(!buttonMemory);
        for (let value in memoryList) { typeList[value] = !buttonMemory; if (buttonMemory === true && defaultMemoryList[value]) { memoryList[value] = true; } }
        setTypeList(memoryList);
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
        for (let value in manufacturerPreferences) { if (manufacturerPreferences[value]) { newManufacturers.push(value); } }
        setManufacturers(newManufacturers);
        return;

      case 'Modelo':
        socketPreferences[checkbox_value] = !socketPreferences[checkbox_value];
        let newTypes = [];
        for (let value in socketPreferences) { if (socketPreferences[value]) { newTypes.push(value); } }
        setSocket(newTypes);
        return;

      case 'Tipo':
        memoryPreferences[checkbox_value] = !memoryPreferences[checkbox_value];
        let newMemory = [];
        for (let value in memoryPreferences) { if (memoryPreferences[value]) { newMemory.push(value); } }
        setMemory(newMemory);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Modelo", data: socketList, preferences: socketPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonSocket },
    { name: "Tipo", data: memoryList, preferences: memoryPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonMemory, show_more: false },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€"
    },
    {
      name: "Tamaño Memoria", SliderValue: SliderRAMValue, defaultSliderValue: defaultRAMValue,
      handleSlider: handleRAMSlider, handleChange: handleRAMChange, text: " GB", step: 1,
    }
  ];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: ramValue, default: defaultRAMValue, label: "VRAM" },
  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: memorySelected, label: "Tipo" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: socketSelected, label: "Modelo" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Modelo", numeric: true, disablePadding: false, label: "Modelo" },
    { id: "Tamaño Memoria", numeric: false, disablePadding: false, label: "Memoria" },
    { id: "Tipo Memoria", numeric: false, disablePadding: false, label: "Tipo" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Modelo", label: "Modelo" },
    { id: "Tamaño Memoria", label: "Memoria" },
    { id: "Tipo Memoria", label: "Tipo" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    "Tipo Memoria": { value: memorySelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    "Tamaño Memoria": { value: ramValue, number: true },
    'Modelo': { value: socketSelected, number: false },
  };

  const filteredData = getFilteredData(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='gpu' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}