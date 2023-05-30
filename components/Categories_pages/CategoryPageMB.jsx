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
  const manufacturerDefault = { ASUS: false, AsRock: false, Gigabyte: false, MSI: false, NZXT: false };
  const defaultManufacturerList = { ASUS: true, AsRock: true, Gigabyte: true, MSI: false, NZXT: false };

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

  // Chipset
  const chipsetDefault = {
    "AMD X570": false, "AMD B550": false, "AMD A520": false, "AMD X470": false, "AMD B450": false,
    "AMD X370": false, "AMD B350": false, "AMD A320": false, "AMD A300": false, "Intel Z690": false,
    "Intel B660": false, "Intel H670": false, "Intel H610": false, "Intel Z590": false, "Intel B560": false,
    "Intel Z490": false, "Intel B460": false, "Intel H510": false, "Intel H410": false, "Intel H570": false,
    "Intel H470": false, "Intel W480": false
  };
  const defaultChipsetList = {
    "AMD X570": true, "AMD B550": true, "AMD A520": false, "AMD X470": false, "AMD B450": false,
    "AMD X370": false, "AMD B350": false, "AMD A320": false, "AMD A300": false, "Intel Z690": true,
    "Intel B660": true, "Intel H670": false, "Intel H610": false, "Intel Z590": false, "Intel B560": false,
    "Intel Z490": false, "Intel B460": false, "Intel H510": false, "Intel H410": false, "Intel H570": false,
    "Intel H470": false, "Intel W480": false
  };

  const [chipsetSelected, setChipset] = useState("");
  const [buttonChipset, setButtonChipset] = React.useState(false);
  const [chipsetPreferences, setChipsetPreferences] = useState(chipsetDefault);
  const [chipsetList, setChipsetList] = useState(defaultChipsetList);

  // FormFactor
  const formFactorDefault = { ATX: false, "Micro ATX": false, "Mini ITX": false };
  const defaultFormFactorList = { ATX: true, "Micro ATX": true, "Mini ITX": true };

  const [formFactorSelected, setFormFactor] = useState("");
  const [buttonFormFactor, setButtonFormFactor] = React.useState(false);
  const [formFactorPreferences, setFormFactorPreferences] = useState(formFactorDefault);
  const [formFactorList, setFormFactorList] = useState(defaultFormFactorList);

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
    setFormFactorPreferences(formFactorDefault);
    setFormFactor("");
    setSocketPreferences(socketDefault);
    setSocket("");
    setChipsetPreferences(chipsetDefault);
    setChipset("");

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

      case 'Factor de Forma':
        setButtonFormFactor(!buttonFormFactor);
        for (let value in formFactorList) { formFactorList[value] = !buttonFormFactor; if (buttonFormFactor === true && defaultFormFactorList[value]) formFactorList[value] = true; }
        setFormFactorList(formFactorList);
        return;

      case 'Chipset':
        setButtonChipset(!buttonChipset);
        for (let value in chipsetList) { chipsetList[value] = !buttonChipset; if (buttonChipset === true && defaultChipsetList[value]) chipsetList[value] = true; }
        setChipsetList(chipsetList);
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

      case 'Socket':
        socketPreferences[checkbox_value] = !socketPreferences[checkbox_value];
        let newTypes = [];
        for (let value in socketPreferences) { if (socketPreferences[value]) { newTypes.push(value); } }
        setSocket(newTypes);
        return;

      case 'Factor de Forma':
        formFactorPreferences[checkbox_value] = !formFactorPreferences[checkbox_value];
        let newFormFactors = [];
        for (let value in formFactorPreferences) { if (formFactorPreferences[value]) { newFormFactors.push(value); } }
        setFormFactor(newFormFactors);
        return;

      case 'Chipset':
        chipsetPreferences[checkbox_value] = !chipsetPreferences[checkbox_value];
        let newChipsets = [];
        for (let value in chipsetPreferences) { if (chipsetPreferences[value]) { newChipsets.push(value); } }
        setChipset(newChipsets);
        return;

      default:
        console.log(`handleChange ${name} unknown - ${value}`)
        return;
    }
  }


  const data_list = [
    { name: "Tiendas", data: shopList, preferences: shopPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonShop },
    { name: "Fabricantes", data: manufacturerList, preferences: manufacturerPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonManufacturer, show_more: false },
    { name: "Socket", data: socketList, preferences: socketPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonSocket, show_more: false },
    { name: "Chipset", data: chipsetList, preferences: chipsetPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonChipset, show_more: false },
    { name: "Factor de Forma", data: formFactorList, preferences: formFactorPreferences, handleChange: handleChange, handleButton: handleButton, button: buttonFormFactor, show_more: false },
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
    { selected: formFactorSelected, label: "Factor de Forma" },
    { selected: manufacturerSelected, label: "Fabricantes" },
    { selected: chipsetSelected, label: "Chipset" },
  ];

  const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "Tipo Socket", numeric: false, disablePadding: false, label: "Socket" },
    { id: "Chipset", numeric: false, disablePadding: false, label: "Chipset" },
    { id: "Factor de Forma", numeric: true, disablePadding: false, label: "Factor de Forma" },
    { id: "price", numeric: true, disablePadding: false, label: "Precio" },
  ];

  const specsKeys = [
    { id: "Tipo Socket", label: "Socket" },
    { id: "Chipset", label: "Chipset" },
    { id: "Factor de Forma", label: "Factor de Forma" },
  ];

  const filters = {
    price: { value: priceValue, number: true },
    shop: { value: shopSelected, number: false },
    stock: { value: stockSelected, number: false },
    manufacturer: { value: manufacturerSelected, number: false },
    'Factor de Forma': { value: formFactorSelected, number: false },
    "Tipo Socket": { value: socketSelected, number: false },
    "Chipset": { value: chipsetSelected, number: false },
  };

  const filteredData = getFilteredData(data_memo["products"], filters, searchValue, tableLen, setTableLen);
  return (
    <>
      <CategoryPage data_list={data_list} data_slider={data_slider} tableLen={tableLen} handleSearch={handleSearch}
        removeFilters={removeFilters} filteredData={filteredData} headCells={headCells} failOverImage='motherboard' specsKeys={specsKeys}
        TableHeaderDataValues={TableHeaderDataValues} TableHeaderSelectedValues={TableHeaderSelectedValues} searchValue={searchValue} />
    </>
  );
}