import React, { useState } from "react";
import CategoryPage from "./CategoryPage";
import { getFilteredData } from "./FilterFunction";

export default function CategoryPageMonitor({ data_recv }) {

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

  // Size
  const defaultSizeValue = { min: data_memo["min_size"], max: data_memo["max_size"] }
  const [sizeValue, setSizeValue] = React.useState([defaultSizeValue["min"], defaultSizeValue["max"]]);
  const [SliderSizeValue, setSliderSizeValue] = React.useState([defaultSizeValue["min"], defaultSizeValue["max"]]);
  const minSizeDistance = 0;
  
  const handleSizeChange = (event, newValue) => { setSizeValue(newValue); };
  const handleSizeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;
    activeThumb === 0 ? setSliderSizeValue([Math.min(newValue[0], SliderSizeValue[1] - minSizeDistance), SliderSizeValue[1]]) : setSliderSizeValue([SliderSizeValue[0], Math.max(newValue[1], SliderSizeValue[0] + minSizeDistance)]);
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
  const manufacturerDefault = { ASUS: false, Dell: false, Gigabyte: false, MSI: false, LG: false };
  const defaultManufacturerList = { ASUS: true, Dell: true, Gigabyte: true, MSI: false, LG: false };

  const [manufacturerSelected, setManufacturers] = useState("");
  const [buttonManufacturer, setButtonManufacturer] = React.useState(false);
  const [manufacturerList, setManufacturerList] = useState(defaultManufacturerList);
  const [manufacturerPreferences, setManufacturersPreferences] = useState(manufacturerDefault);

  // Resolution
  const resolutionDefault = { "1920 x 1080": false, "2560 x 1440": false, "3840 x 2160": false,};
  const defaultResolutionList = { "1920 x 1080": true, "2560 x 1440": true, "3840 x 2160": true};

  const [resolutionSelected, setResolution] = useState("");
  const [buttonResolution, setButtonResolution] = React.useState(false);
  const [resolutionPreferences, setResolutionPreferences] = useState(resolutionDefault);
  const [resolutionList, setResolutionList] = useState(defaultResolutionList);

  // Pixel
  const pixelDefault = { "VA": false, "IPS": false, "OLED": false, "QD-OLED": false, "TN": false };
  const defaultPixelList = { "VA": true, "IPS": true, "OLED": true, "QD-OLED": false, "TN": false };

  const [pixelSelected, setPixel] = useState("");
  const [buttonPixel, setButtonPixel] = React.useState(false);
  const [pixelPreferences, setPixelPreferences] = useState(pixelDefault);
  const [pixelList, setPixelList] = useState(defaultPixelList);

  // FreeSync
  const freeSyncDefault = { "Compatible (Tested)": false, "No": false, "Yes": false };
  const defaultFreeSyncList = { "Compatible (Tested)": true, "No": true, "Yes": true };

  const [freeSyncSelected, setFreeSync] = useState("");
  const [buttonFreeSync, setButtonFreeSync] = React.useState(false);
  const [freeSyncPreferences, setFreeSyncPreferences] = useState(freeSyncDefault);
  const [freeSyncList, setFreeSyncList] = useState(defaultFreeSyncList);

  // GSync
  const gsyncDefault = { "Compatible (NVIDIA Certified)": false, "Compatible (Tested)": false, 
                         "Yes (NVIDIA Certified)": false, "Yes (Native)": false, "Yes": false,
                         "Partial": false, "Partially Compatible": false, "No": false };
  const defaultGsyncList = { "Compatible (NVIDIA Certified)": true, "Compatible (Tested)": true, 
                            "Yes (NVIDIA Certified)": false, "Yes (Native)": false, "Yes": false,
                            "Partial": false, "Partially Compatible": false, "No": false};

  const [gsyncSelected, setGsync] = useState("");
  const [buttonGsync, setButtonGsync] = React.useState(false);
  const [gsyncPreferences, setGsyncPreferences] = useState(gsyncDefault);
  const [gsyncList, setGsyncList] = useState(defaultGsyncList);

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

    setSizeValue([defaultSizeValue["min"], defaultSizeValue["max"]]);
    setSliderSizeValue([defaultSizeValue["min"], defaultSizeValue["max"]]);

    setManufacturersPreferences(manufacturerDefault);
    setManufacturers("");
    setShopsPreferences(shopsDefaults);
    setShop("");
    setGsyncPreferences(gsyncDefault);
    setGsync("");
    setFreeSyncPreferences(freeSyncDefault);
    setFreeSync("");
    setResolutionPreferences(resolutionDefault);
    setResolution("");
    setPixelPreferences(pixelDefault);
    setPixel("");

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

      case 'Resolution':
        setButtonResolution(!buttonResolution);
        for (let value in resolutionList) { resolutionList[value] = !buttonResolution; if (buttonResolution === true && defaultResolutionList[value]) { resolutionList[value] = true; } }
        setResolutionList(resolutionList);
        return;

      case 'FreeSync':
        setButtonFreeSync(!buttonFreeSync);
        for (let value in freeSyncList) { freeSyncList[value] = !buttonFreeSync; if (buttonFreeSync === true && defaultFreeSyncList[value]) freeSyncList[value] = true; }
        setFreeSyncList(freeSyncList);
        return;

      case 'Gsync':
        setButtonGsync(!buttonGsync);
        for (let value in gsyncList) { gsyncList[value] = !buttonGsync; if (buttonGsync === true && defaultGsyncList[value]) gsyncList[value] = true; }
        setGsyncList(gsyncList);
        return;

      case 'Pixel':
        setButtonPixel(!buttonPixel);
        for (let value in pixelList) { pixelList[value] = !buttonPixel; if (buttonPixel === true && defaultPixelList[value]) pixelList[value] = true; }
        setPixelList(pixelList);
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

      case 'Resolution':
        resolutionPreferences[checkbox_value] = !resolutionPreferences[checkbox_value];
        let newTypes = [];
        for (let value in resolutionPreferences) { if (resolutionPreferences[value]) { newTypes.push(value); } }
        setResolution(newTypes);
        return;

      case 'FreeSync':
        freeSyncPreferences[checkbox_value] = !freeSyncPreferences[checkbox_value];
        let newFreeSyncs = [];
        for (let value in freeSyncPreferences) { if (freeSyncPreferences[value]) { newFreeSyncs.push(value); } }
        setFreeSync(newFreeSyncs);
        return;

      case 'Gsync':
        gsyncPreferences[checkbox_value] = !gsyncPreferences[checkbox_value];
        let newGsyncs = [];
        for (let value in gsyncPreferences) { if (gsyncPreferences[value]) { newGsyncs.push(value); } }
        setGsync(newGsyncs);
        return;
  

      case 'Pixel':
        pixelPreferences[checkbox_value] = !pixelPreferences[checkbox_value];
        let newPixels = [];
        for (let value in pixelPreferences) { if (pixelPreferences[value]) { newPixels.push(value); } }
        setPixel(newPixels);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer },
    { name: "Resolution", data: resolutionList, preferences: resolutionPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonResolution, show_more: false },
    { name: "Pixel", data: pixelList, preferences: pixelPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonPixel },
    { name: "FreeSync", data: freeSyncList, preferences: freeSyncPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonFreeSync, show_more: false },
    { name: "Gsync", data: gsyncList, preferences: gsyncPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonFreeSync },
    { name: "Stock", data: stockList, preferences: stockPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonStock, show_more: false },
  ];


  const data_slider = [
    {
      name: "Precio", SliderValue: SliderPriceValue, defaultSliderValue: defaultPriceValue,
      handleSlider: handlePriceSlider, handleChange: handlePriceChange, text: "€"
    },
    {
      name: "Pulgadas", SliderValue: SliderSizeValue, defaultSliderValue: defaultSizeValue,
      handleSlider: handleSizeSlider, handleChange: handleSizeChange, text: '"'
    }

];

  const TableHeaderDataValues = [
    { value: priceValue, default: defaultPriceValue, label: "Precio" },
    { value: sizeValue, default: defaultSizeValue, label: "Tamaño" },

  ];

  const TableHeaderSelectedValues = [
    { selected: stockSelected, label: "Stock" },
    { selected: shopSelected, label: "Tiendas" },
    { selected: resolutionSelected, label: "Resolución" },
    { selected: freeSyncSelected, label: "FreeSync" },
    { selected: gsyncSelected, label: "G-Sync" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: pixelSelected, label: "Tipo de pixel" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Resolución", numeric: false, disablePadding: false, label: "Resolución" },
    { id: "Tipo de pixel", numeric: false, disablePadding: false, label: "Tipo de pixel" },
    { id: "FreeSync", numeric: true, disablePadding: false, label: "FreeSync" },
    { id: "G-Sync", numeric: true, disablePadding: false, label: "G-Sync" },
    { id: "Tamaño", numeric: true, disablePadding: false, label: "Tamaño" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Resolución", label: "Resolution" },
    { id: "Tipo de pixel", label: "Pixel" },
    { id: "FreeSync", label: "FreeSync" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    Tamaño: { value: sizeValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    'FreeSync': { value: freeSyncSelected, number: false },
    'G-Sync': { value: gsyncSelected, number: false },
    "Resolución": { value: resolutionSelected, number: false },
    "Tipo de pixel": { value: pixelSelected, number: false },
  };

  const filteredData = getFilteredData(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='monitor' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}