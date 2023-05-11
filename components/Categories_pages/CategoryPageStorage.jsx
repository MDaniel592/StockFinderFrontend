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

  // Storage
  const defaultStorageValue = { min: 37, max: 45 }; // Math.pow(2, 37) = 128GB - Math.pow(2, 45) = 32TB
  const [storageValue, setStorageValue] = React.useState([defaultStorageValue["min"], defaultStorageValue["max"]]);
  const [SliderStorageValue, setSliderStorageValue] = React.useState([defaultStorageValue["min"], defaultStorageValue["max"]]);
  const minStorageDistance = 0;

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
  const manufacturerDefault = { Samsung: false, 'Western Digital': false, Seagate: false, Kingston: false, Toshiba: false, Crucial: false, ADATA: false };
  const defaultManufacturerList = { Samsung: true, 'Western Digital': true, Seagate: true, Kingston: false, Toshiba: false, Crucial: false, ADATA: false };

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Drive type
  const typeDefault = { SSD: false, HDD: false };
  const defaultTypeList = { SSD: true, HDD: true };

  const [typeSelected, setType] = useState("");
  const [buttonType, setButtonType] = React.useState(false);
  const [typePreferences, setTypePreferences] = useState(typeDefault);
  const [typeList, setTypeList] = useState(defaultTypeList);

  // storageConection
  const storageProtocolDefault = { "SATA 3": false, "USB 3.0": false, "USB 3.1": false, "USB 3.2": false, "M.2": false, "PCI-E": false };
  const defaultStorageProtocolList = { "SATA 3": true, "USB 3.0": true, "USB 3.1": true, "USB 3.2": true, "M.2": true, "PCI-E": true };

  const [storageProtocolSelected, setStorageProtocol] = useState("");
  const [buttonStorageProtocol, setButtonStorageProtocol] = React.useState(false);
  const [storageProtocolPreferences, setStorageProtocolPreferences] = useState(storageProtocolDefault);
  const [storageProtocolList, setStorageProtocolList] = useState(defaultStorageProtocolList);

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
    setStorageValue([defaultStorageValue["min"], defaultStorageValue["max"]]);
    setSliderStorageValue([defaultStorageValue["min"], defaultStorageValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setTypePreferences(typeDefault);
    setType("");
    setStorageProtocolPreferences(storageProtocolDefault);
    setStorageProtocol("");

    setStocksPreferences(stocksDefaults);
    setStock("");

    setSearchValue("")
  }


  const handlePriceChange = (event, newValue) => { setPriceValue(newValue); };
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPriceValue([Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance), SliderPriceValue[1]]) : setSliderPriceValue([SliderPriceValue[0], Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)]);
  };

  const handleStorageChange = (event, newValue) => { setStorageValue(newValue); };
  const handleStorageSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderStorageValue([Math.min(newValue[0], SliderStorageValue[1] - minStorageDistance), SliderStorageValue[1]]) : setSliderStorageValue([SliderStorageValue[0], Math.max(newValue[1], SliderStorageValue[0] + minStorageDistance)]);
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
        setButtonType(!buttonType);
        for (let value in typeList) { typeList[value] = !buttonType; if (buttonType === true && defaultTypeList[value]) { typeList[value] = true; } }
        setTypeList(typeList);
        return;

      case 'Conexiones':
        setButtonStorageProtocol(!buttonStorageProtocol);
        for (let value in storageProtocolList) { storageProtocolList[value] = !buttonStorageProtocol; if (buttonStorageProtocol === true && defaultStorageProtocolList[value]) storageProtocolList[value] = true; }
        setStorageProtocolList(storageProtocolList);
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
        typePreferences[checkbox_value] = !typePreferences[checkbox_value];
        let newTypes = [];
        for (let value in typePreferences) { if (typePreferences[value]) { newTypes.push(value); } }
        setType(newTypes);
        return;

      case 'Conexiones':
        storageProtocolPreferences[checkbox_value] = !storageProtocolPreferences[checkbox_value];
        let newStorageProtocols = [];
        for (let value in storageProtocolPreferences) { if (storageProtocolPreferences[value]) { newStorageProtocols.push(value); } }
        setStorageProtocol(newStorageProtocols);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Tipo", data: typeList, preferences: typePreferences, handleChange: handleChange, handleButton: handleButton, button: buttonType, show_more: false },
    { name: "Conexiones", data: storageProtocolList, preferences: storageProtocolPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStorageProtocol, show_more: false },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€",
    },
    {
      name: "Capacidad", SliderValue: SliderStorageValue, defaultSliderValue: defaultStorageValue,
      handleSlider: handleStorageSlider, handleChange: handleStorageChange, text: "GB", type: "scaled"
    },
  ];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: storageValue, default: defaultStorageValue, label: "Almacenamiento" },
  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: typeSelected, label: "Tecnología Disco Duro" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Almacenamiento", numeric: false, disablePadding: false, label: "Capacidad" },
    { id: "Tecnología Disco Duro", numeric: false, disablePadding: false, label: "Tipo" },
    { id: "Conexiones", numeric: false, disablePadding: false, label: "Conexiones" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Almacenamiento", label: "Capacidad" },
    { id: "Tecnología Disco Duro", label: "Tipo" },
    { id: "Conexiones", label: "Conexiones" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    Almacenamiento: { value: storageValue, number: true },
    "Tecnología Disco Duro": { value: typeSelected, number: false },
    Conexiones: { value: storageProtocolSelected, number: false },
  };

  const filteredData = filter_data(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='storage' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}