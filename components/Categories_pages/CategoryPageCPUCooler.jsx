import React, { useState } from "react";
import CategoryPage from "./CategoryPage";
import { filter_data } from "./FilterFunction";

export default function CategoryPageCPUCooler({ data_recv }) {

  const data_memo = React.useMemo(() => data_recv);
  const [tableLen, setTableLen] = React.useState(Object.keys(data_memo).length - 4);

  // Price
  const defaultPriceValue = { min: data_memo["min_price"], max: data_memo["max_price"] }
  const [priceValue, setPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const [SliderPriceValue, setSliderPriceValue] = React.useState([defaultPriceValue["min"], defaultPriceValue["max"]]);
  const minPriceDistance = 0;

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
    AeroCool: false, Artic: false, Asus: false, 'Cooler Master': false, MSI: false,
    NOX: false, NZXT: false, SilverStone: false, Thermaltake: false, DeepCool: false
  };
  const defaultManufacturerList = {
    AeroCool: false, Artic: true, Asus: true, 'Cooler Master': true, MSI: false,
    NOX: false, NZXT: false, SilverStone: false, Thermaltake: false, DeepCool: false
  };
  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Cooler height
  const defaultCPUValue = { min: data_memo["min_cpu"], max: data_memo["max_cpu"] };
  const [CPUValue, setCPUValue] = React.useState([defaultCPUValue["min"], defaultCPUValue["max"]]);
  const [SliderCPUValue, setSliderCPUValue] = React.useState([defaultCPUValue["min"], defaultCPUValue["max"],]);
  const minCPUDistance = 0;

  // Socket
  const socketDefault = { "Intel 1200": false, "Intel 1700": false, "AMD AM4": false, "AMD AM5": false };
  const defaultSocketList = { "Intel 1200": true, "Intel 1700": true, "AMD AM4": true, "AMD AM5": true };

  const [socketSelected, setSocket] = useState("");
  const [buttonSocket, setButtonSocket] = React.useState(false);
  const [socketPreferences, setSocketPreferences] = useState(socketDefault);
  const [socketList, setSocketList] = useState(defaultSocketList);


  // Líquida
  const chassisDefault = { "Líquida": false, "Disipador": false };
  const defaultChassisList = { "Líquida": true, "Disipador": true };


  const [chassisSelected, setChassis] = useState("");
  const [buttonChassis, setButtonChassis] = React.useState(false);
  const [chassisPreferences, setChassisPreferences] = useState(chassisDefault);
  const [chassisList, setChassisList] = useState(defaultChassisList);

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
    setCPUValue([defaultCPUValue["min"], defaultCPUValue["max"]]);
    setSliderCPUValue([defaultCPUValue["min"], defaultCPUValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShopList(shops)
    setShop("");
    setSocketPreferences(socketDefault);
    setSocket("");
    setChassisPreferences(chassisDefault);
    setChassis("");
    setStocksPreferences(stocksDefaults);
    setStock("");

    setSearchValue("")
  }

  const handlePriceChange = (event, newValue) => { setPriceValue(newValue); };
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPriceValue([Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance), SliderPriceValue[1]]) : setSliderPriceValue([SliderPriceValue[0], Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)]);
  };

  const handleCPUChange = (event, newValue) => { setCPUValue(newValue); };
  const handleCPUSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderCPUValue([Math.min(newValue[0], SliderCPUValue[1] - minCPUDistance), SliderCPUValue[1]]) : setSliderCPUValue([SliderCPUValue[0], Math.max(newValue[1], SliderCPUValue[0] + minCPUDistance)]);
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

      case 'Soporte Procesador':
        setButtonSocket(!buttonSocket);
        for (let value in socketList) { socketList[value] = !buttonSocket; if (buttonSocket === true && defaultSocketList[value]) { socketList[value] = true; } }
        setSocketList(socketList);
        return;

      case 'Refrigeración':
        setButtonChassis(!buttonChassis);
        for (var Chassis in chassisList) { chassisList[Chassis] = !buttonChassis; if (buttonChassis === true && defaultChassisList[value]) { chassisList[Chassis] = true; } }
        setChassisList(chassisList);
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

      case 'Soporte Procesador':
        socketPreferences[checkbox_value] = !socketPreferences[checkbox_value];
        let newTypes = [];
        for (let value in socketPreferences) { if (socketPreferences[value]) { newTypes.push(value); } }
        setSocket(newTypes);
        return;

      case 'Refrigeración':
        chassisPreferences[checkbox_value] = !chassisPreferences[checkbox_value];
        let newChassis = [];
        for (let value in chassisPreferences) { if (chassisPreferences[value]) { newChassis.push(value); } }
        setChassis(newChassis);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Refrigeración", data: chassisList, preferences: chassisPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonChassis, show_more: false },
    { name: "Soporte Procesador", data: socketList, preferences: socketPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonSocket, show_more: false },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€"
    },
    {
      name: "Altura máxima", SliderValue: SliderCPUValue, defaultSliderValue: defaultCPUValue,
      handleSlider: handleCPUSlider, handleChange: handleCPUChange, text: " mm"
    }
  ];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: CPUValue, default: defaultCPUValue, label: "Altura (ventilador incluido)" },
  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: socketSelected, label: "Tipo Socket" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: chassisSelected, label: "Refrigeración Líquida" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Altura (ventilador incluido)", numeric: true, disablePadding: false, label: "Altura (ventilador incluido)" },
    { id: "Refrigeración Líquida", numeric: false, disablePadding: false, label: "Refrigeración Líquida" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Altura (ventilador incluido)", label: "Altura (ventilador incluido)" },
    { id: "Soporte Procesador", label: "Soporte Procesador" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    "Soporte Procesador": { value: socketSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    "Altura (ventilador incluido)": { value: CPUValue, number: true },
    'Refrigeración Líquida': { value: chassisSelected, number: false },
  };

  const filteredData = filter_data(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='cpu cooler' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}