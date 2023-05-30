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

  // Power
  const defaultPowerValue = { min: 300, max: 2000 };
  const [powerValue, setPowerValue] = React.useState([defaultPowerValue["min"], defaultPowerValue["max"]]);
  const [SliderPowerValue, setSliderPowerValue] = React.useState([defaultPowerValue["min"], defaultPowerValue["max"]]);
  const minPowerDistance = 0;

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
    Corsair: false, Seasonic: false, Thermaltake: false, EVGA: false,
    "Cooler Master": false, Thermaltake: false, 'Be Quiet!': false, SilverStone: false,
  };
  const defaultManufacturerList = {
    Corsair: true, Seasonic: true, Thermaltake: false, EVGA: true,
    "Cooler Master": false, Thermaltake: false, 'Be Quiet!': false, SilverStone: false,
  };

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Size
  const sizeDefault = { ATX: false, SFX: false };
  const defaultSizeList = { ATX: true, SFX: true };

  const [sizeSelected, setSize] = useState("");
  const [buttonSize, setButtonSize] = React.useState(false);
  const [sizePreferences, setSizePreferences] = useState(sizeDefault);
  const [sizeList, setSizeList] = useState(defaultSizeList);

  // Certification
  const certificationDefault = { Bronze: false, Silver: false, Gold: false, Platinum: false, Titanium: false };
  const defaultCertificationList = { Bronze: true, Silver: true, Gold: true, Platinum: true, Titanium: true };

  const [certificationSelected, setCertification] = useState("");
  const [buttonCertification, setButtonCertification] = React.useState(false);
  const [certificationPreferences, setCertificationPreferences] = useState(certificationDefault);
  const [certificationList, setCertificationList] = useState(defaultCertificationList);

  // Modular
  const modularDefault = { "Fuente Modular": false, "Fuente Semi-Modular": false, No: false };
  const defaultModularList = { "Fuente Modular": true, "Fuente Semi-Modular": true, No: true };

  const [modularSelected, setModular] = useState("");
  const [buttonModular, setButtonModular] = React.useState(false);
  const [modularPreferences, setModularPreferences] = useState(modularDefault);
  const [modularList, setModularList] = useState(defaultModularList);

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
    setPowerValue([defaultPowerValue["min"], defaultPowerValue["max"]]);
    setSliderPowerValue([defaultPowerValue["min"], defaultPowerValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setModularPreferences(modularDefault);
    setModular("");
    setSizePreferences(sizeDefault);
    setSize("");
    setCertificationPreferences(certificationDefault);
    setCertification("");

    setStocksPreferences(stocksDefaults);
    setStock("");

    setSearchValue("")
  }


  const handlePriceChange = (event, newValue) => { setPriceValue(newValue); };
  const handlePriceSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPriceValue([Math.min(newValue[0], SliderPriceValue[1] - minPriceDistance), SliderPriceValue[1]]) : setSliderPriceValue([SliderPriceValue[0], Math.max(newValue[1], SliderPriceValue[0] + minPriceDistance)]);
  };

  const handlePowerChange = (event, newValue) => { setPowerValue(newValue); };
  const handlePowerSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderPowerValue([Math.min(newValue[0], SliderPowerValue[1] - minPowerDistance), SliderPowerValue[1]]) : setSliderPowerValue([SliderPowerValue[0], Math.max(newValue[1], SliderPowerValue[0] + minPowerDistance)]);
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

      case 'Tamaño':
        setButtonSize(!buttonSize);
        for (let value in sizeList) { sizeList[value] = !buttonSize; if (buttonSize === true && defaultSizeList[value]) { sizeList[value] = true; } }
        setSizeList(sizeList);
        return;

      case 'Modular':
        setButtonModular(!buttonModular);
        for (let value in modularList) { modularList[value] = !buttonModular; if (buttonModular === true && defaultModularList[value]) modularList[value] = true; }
        setModularList(modularList);
        return;

      case 'Certificación':
        setButtonCertification(!buttonCertification);
        for (let value in certificationList) { certificationList[value] = !buttonCertification; if (buttonCertification === true && defaultCertificationList[value]) certificationList[value] = true; }
        setCertificationList(certificationList);
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

      case 'Tamaño':
        sizePreferences[checkbox_value] = !sizePreferences[checkbox_value];
        let newTypes = [];
        for (let value in sizePreferences) { if (sizePreferences[value]) { newTypes.push(value); } }
        setSize(newTypes);
        return;

      case 'Modular':
        modularPreferences[checkbox_value] = !modularPreferences[checkbox_value];
        let newModulars = [];
        for (let value in modularPreferences) { if (modularPreferences[value]) { newModulars.push(value); } }
        setModular(newModulars);
        return;

      case 'Certificación':
        certificationPreferences[checkbox_value] = !certificationPreferences[checkbox_value];
        let newCertifications = [];
        for (let value in certificationPreferences) { if (certificationPreferences[value]) { newCertifications.push(value); } }
        setCertification(newCertifications);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Tamaño", data: sizeList, preferences: sizePreferences, handleChange: handleChange, handleButton: handleButton, button: buttonSize, show_more: false },
    { name: "Certificación", data: certificationList, preferences: certificationPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonCertification, show_more: false },
    { name: "Modular", data: modularList, preferences: modularPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonModular, show_more: false },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€",
    },
    {
      name: "Potencia", SliderValue: SliderPowerValue, defaultSliderValue: defaultPowerValue,
      handleSlider: handlePowerSlider, handleChange: handlePowerChange, text: "W", step: "custom",
    },
  ];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: powerValue, default: defaultPowerValue, label: "Potencia" },
  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: sizeSelected, label: "Tamaño" },
    { selected: modularSelected, label: "Tipo Cableado" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: certificationSelected, label: "Certification" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Potencia", numeric: false, disablePadding: false, label: "Potencia" },
    { id: "Certificación", numeric: false, disablePadding: false, label: "Certificación" },
    { id: "Tipo Cableado", numeric: false, disablePadding: false, label: "Tipo Cableado" },
    { id: "Tamaño", numeric: true, disablePadding: false, label: "Tamaño" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Certificación", label: "Certificación" },
    { id: "Tipo Cableado", label: "Tipo Cableado" },
    { id: "Tamaño", label: "Tamaño" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    Potencia: { value: powerValue, number: true },
    'Tipo Cableado': { value: modularSelected, number: false },
    Tamaño: { value: sizeSelected, number: false },
    Certificación: { value: certificationSelected, number: false },
  };

  const filteredData = getFilteredData(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='psu' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}