import React, { useState } from "react";
import CategoryPage from "./CategoryPage";
import { getFilteredData } from "./FilterFunction";

export default function CategoryPageCPU({ data_recv }) {

  const data_memo = React.useMemo(() => data_recv);
  const [tableLen, setTableLen] = React.useState(Object.keys(data_memo).length - 4);

  // Price
  const defaultPriceValue = { min: data_memo["min_price"], max: data_memo["max_price"] }
  const [priceValue, setPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const [SliderPriceValue, setSliderPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const minPriceDistance = 0;

  // RAM
  const defaultRAMValue = { min: 32, max: 38 };
  const [ramValue, setRAMValue] = React.useState([defaultRAMValue["min"], defaultRAMValue["max"]]);
  const [SliderRAMValue, setSliderRAMValue] = React.useState([defaultRAMValue["min"], defaultRAMValue["max"]]);
  const minRAMDistance = 0;

  // Speed
  const defaultSpeedValue = { min: data_memo["min_freq"], max: data_memo["max_freq"] };
  const [speedValue, setSpeedValue] = React.useState([defaultSpeedValue["min"], defaultSpeedValue["max"]]);
  const [SliderSpeedValue, setSliderSpeedValue] = React.useState([defaultSpeedValue["min"], defaultSpeedValue["max"]]);
  const minSpeedDistance = 0;

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
  const manufacturerDefault = { Corsair: false, "G.Skill": false, Crucial: false, Kingston: false, PNY: false, 'Team Group': false, ADATA: false };
  const defaultManufacturerList = { Corsair: true, "G.Skill": true, Crucial: true, Kingston: true, PNY: false, 'Team Group': false, ADATA: false };

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Memory Type
  const memoryTypeDefault = { DIMM: false, "SO-DIMM": false };
  const defaultMemoryTypeList = { DIMM: true, "SO-DIMM": true };

  const [memoryTypeSelected, setMemoryType] = useState("");
  const [buttonMemoryType, setButtonMemoryType] = React.useState(false);
  const [memoryTypePreferences, setMemoryTypePreferences] = useState(memoryTypeDefault);
  const [memoryTypeList, setMemoryTypeList] = useState(defaultMemoryTypeList);

  // MemorySlots
  const memorySlotsDefault = {
    "1x4GB": false, "1x8GB": false, "1x16GB": false, "1x32GB": false, "1x64GB": false,
    "2x2GB": false, "2x4GB": false, "2x8GB": false, "2x16GB": false, "2x32GB": false, "2x64GB": false,
    "4x2GB": false, "4x4GB": false, "4x8GB": false, "4x32GB": false
  };
  const defaultMemorySlotsList = {
    "1x4GB": false, "1x8GB": false, "1x16GB": false, "1x32GB": false, "1x64GB": false,
    "2x2GB": false, "2x4GB": false, "2x8GB": true, "2x16GB": true, "2x32GB": false, "2x64GB": false,
    "4x2GB": false, "4x4GB": true, "4x8GB": true, "4x32GB": false
  };

  const [memorySlotsSelected, setMemorySlots] = useState("");
  const [buttonMemorySlots, setButtonMemorySlots] = React.useState(false);
  const [memorySlotsPreferences, setMemorySlotsPreferences] = useState(memorySlotsDefault);
  const [memorySlotsList, setMemorySlotsList] = useState(defaultMemorySlotsList);

  // Latency
  const latencyDefault = {
    CL12: false, CL13: false, CL14: false, CL15: false, CL16: false,
    CL17: false, CL18: false, CL19: false, CL20: false, CL21: false, CL22: false,
    CL36: false, CL38: false, CL40: false,
  };
  const defaultLatencyList = {
    CL12: false, CL13: false, CL14: true, CL15: false, CL16: true,
    CL17: false, CL18: true, CL19: false, CL20: true, CL21: false, CL22: false,
    CL36: false, CL38: false, CL40: false,
  };

  const [latencySelected, setLatency] = useState("");
  const [buttonLatency, setButtonLatency] = React.useState(false);
  const [latencyPreferences, setLatencyPreferences] = useState(latencyDefault);
  const [latencyList, setLatencyList] = useState(defaultLatencyList);

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
    setSpeedValue([defaultSpeedValue["min"], defaultSpeedValue["max"]]);
    setSliderSpeedValue([defaultSpeedValue["min"], defaultSpeedValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setLatencyPreferences(latencyDefault);
    setLatency("");
    setMemoryTypePreferences(memoryTypeDefault);
    setMemoryType("");
    setMemorySlotsPreferences(memorySlotsDefault);
    setMemorySlots("");

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

  const handleSpeedChange = (event, newValue) => { setSpeedValue(newValue); };
  const handleSpeedSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderSpeedValue([Math.min(newValue[0], SliderSpeedValue[1] - minSpeedDistance), SliderSpeedValue[1]]) : setSliderSpeedValue([SliderSpeedValue[0], Math.max(newValue[1], SliderSpeedValue[0] + minSpeedDistance)]);
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
        for (let value in shopList) { shopList[value] = !buttonShop; if (buttonShop === true && defaultShopList[value]) shopList[value] = true; }
        setShopList(shopList);
        return;

      case 'Fabricantes':
        setButtonManufacturer(!buttonManufacturer);
        for (let value in manufacturerList) { manufacturerList[value] = !buttonManufacturer; if (buttonManufacturer === true && defaultManufacturerList[value]) { manufacturerList[value] = true; } }
        setManufacturerList(manufacturerList);
        return;

      case 'Tipo':
        setButtonMemoryType(!buttonMemoryType);
        for (let value in memoryTypeList) { memoryTypeList[value] = !buttonMemoryType; if (buttonMemoryType === true && defaultMemoryTypeList[value]) { memoryTypeList[value] = true; } }
        setMemoryTypeList(memoryTypeList);
        return;

      case 'Latencia':
        setButtonLatency(!buttonLatency);
        for (let value in latencyList) { latencyList[value] = !buttonLatency; if (buttonLatency === true && defaultLatencyList[value]) latencyList[value] = true; }
        setLatencyList(latencyList);
        return;

      case 'Modulos':
        setButtonMemorySlots(!buttonMemorySlots);
        for (let value in memorySlotsList) { memorySlotsList[value] = !buttonMemorySlots; if (buttonMemorySlots === true && defaultMemorySlotsList[value]) memorySlotsList[value] = true; }
        setMemorySlotsList(memorySlotsList);
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

      case 'Tipo':
        memoryTypePreferences[checkbox_value] = !memoryTypePreferences[checkbox_value];
        let newTypes = [];
        for (let value in memoryTypePreferences) { if (memoryTypePreferences[value]) { newTypes.push(value); } }
        setMemoryType(newTypes);
        return;

      case 'Latencia':
        latencyPreferences[checkbox_value] = !latencyPreferences[checkbox_value];
        let newLatencys = [];
        for (let value in latencyPreferences) { if (latencyPreferences[value]) { newLatencys.push(value); } }
        setLatency(newLatencys);
        return;

      case 'Modulos':
        memorySlotsPreferences[checkbox_value] = !memorySlotsPreferences[checkbox_value];
        let newMemorySlotss = [];
        for (let value in memorySlotsPreferences) { if (memorySlotsPreferences[value]) { newMemorySlotss.push(value); } }
        setMemorySlots(newMemorySlotss);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Tipo", data: memoryTypeList, preferences: memoryTypePreferences, handleChange: handleChange, handleButton: handleButton, button: buttonMemoryType, show_more: false },
    { name: "Modulos", data: memorySlotsList, preferences: memorySlotsPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonMemorySlots },
    { name: "Latencia", data: latencyList, preferences: latencyPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonLatency },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€",
    },
    {
      name: "Velocidad", SliderValue: SliderSpeedValue, defaultSliderValue: defaultSpeedValue,
      handleSlider: handleSpeedSlider, handleChange: handleSpeedChange, text: "MHz", step: "custom",
    },
    {
      name: "Memoria", value: ramValue, SliderValue: SliderRAMValue, defaultSliderValue: defaultRAMValue,
      handleSlider: handleRAMSlider, handleChange: handleRAMChange, text: "GB", type: "scaled"
    },
  ];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: speedValue, default: defaultSpeedValue, label: "Velocidad" },
    { value: ramValue, default: defaultRAMValue, label: "Cantidad Memoria" },
  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: memoryTypeSelected, label: "Tipo" },
    { selected: latencySelected, label: "Latencia" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: memorySlotsSelected, label: "Modulos" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Formato Memoria", numeric: false, disablePadding: false, label: "Tipo" },
    { id: "Frecuencia Memoria", numeric: false, disablePadding: false, label: "Velocidad" },
    { id: "Cantidad Memoria", numeric: false, disablePadding: false, label: "Tamaño" },
    { id: "Kit Memoria", numeric: false, disablePadding: false, label: "Slots" },
    { id: "Latencia", numeric: true, disablePadding: false, label: "Latencia" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Formato Memoria", label: "Tipo" },
    { id: "Frecuencia Memoria", label: "Velocidad" },
    { id: "Cantidad Memoria", label: "Tamaño" },
    { id: "Kit Memoria", label: "Slots" },
    { id: "Latencia", label: "Latencia" },

  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    "Frecuencia Memoria": { value: speedValue, number: true },
    "Cantidad Memoria": { value: ramValue, number: true },
    Latencia: { value: latencySelected, number: false },
    "Formato Memoria": { value: memoryTypeSelected, number: false },
    "Kit Memoria": { value: memorySlotsSelected, number: false },
  };

  const filteredData = getFilteredData(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='ram' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}