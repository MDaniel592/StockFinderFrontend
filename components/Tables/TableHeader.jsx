import TextField from "@mui/material/TextField";
import React from "react";

const key_simbol = {
  'RAM': "GB",
  'VRAM': "GB",
  'Precio': "€",
  'Potencia': "W",
  'Velocidad': "MHz",
  "Altura máxima CPU": "mm",
  'Altura máxima GPU': 'mm',
  "Altura (ventilador incluido)": "mm"
}

export default function TableHeader({ data_values, selectedValues, tableLen, searchValue, handleSearch, removeFilters }) {
  function get_list_filters_applied(item) {
    for (const [key, value] of Object.entries(item)) {
      return (<li key={key} className="ml-4 mt-1"> {key}: {value} </li>);
    }
    return;
  }

  function html_filters_version() {
    let labels = [];

    for (let item in data_values) {
      let simbol1 = "";
      let simbol2 = "";
      let value = "";
      let key = "";
      let new_low_value = "";
      let new_high_value = "";
      let low_value = data_values[item]["value"][0];
      let high_value = data_values[item]["value"][1];
      if (low_value == data_values[item]["default"]["min"] && high_value == data_values[item]["default"]["max"]) continue;

      key = data_values[item]["label"]
      if (key === 'Almacenamiento' || key === 'Cantidad Memoria') {
        low_value = Number(low_value);
        high_value = Number(high_value);

        simbol1 = low_value < 40 ? simbol1 = "GB" : simbol2 = "TB";
        simbol2 = high_value < 40 ? simbol2 = "GB" : simbol2 = "TB";

        new_low_value = 2 ** low_value / 1048576 / 1024;
        new_high_value = 2 ** high_value / 1048576 / 1024;

        new_low_value = low_value < 40 ? new_low_value : new_low_value / 1024;
        new_high_value = high_value < 40 ? new_high_value : new_high_value / 1024;

      } else {
        new_low_value = low_value
        new_high_value = high_value
        simbol1 = key_simbol[key];
        simbol2 = simbol1;
      }

      value = new_low_value + simbol1 + " - " + new_high_value + simbol2;
      labels.push({ [key]: value });
    }

    for (let item in selectedValues) {
      let value = "";
      for (let option in selectedValues[item]["selected"]) { if (selectedValues[item]["selected"][option]) value += selectedValues[item]["selected"][option] + " "; }
      if (value) { let key = selectedValues[item]["label"]; labels.push({ [key]: value }); }
    }

    let Obj;
    for (const item in labels) {
      let result = get_list_filters_applied(labels[item]);
      if (result) Obj = [Obj, result];
    }

    return Obj;
  }

  const Obj = html_filters_version();
  return (
    <div name="tableheader" className="grid lg:flex justify-evenly lg:justify-between items-center gap-4">

      <div className="mt-2">
        <span className="justify-start mt-3 font-bold text-blue-500">Productos disponibles: {tableLen}</span>
        <div>{<p className='font-medium'>{Obj ? "Filtros aplicados:" : "Ningún filtro aplicado"}</p>}</div>
        <div className="justify-start sm:flex text-xxs font-medium">{Obj}</div>
        <div className="mt-2 text-center sm:text-left">{Obj ? <button className="font-sansantialiased px-2 py-1 rounded-md text-sm font-medium text-white bg-transparent border border-4 border-error hover:bg-error-dark hover:border-error-dark" onClick={removeFilters}>Quitar Filtros</button> : ""}</div>
      </div>

      <div className="mt-4 lg:mt-0 z-0">
        <TextField sx={{ display: "flex", alignItems: "bottom", backgroundColor: "white", width: 260, borderRadius: 2 }}
          color="success" variant="filled" label="Buscador" placeholder="Buscar" value={searchValue} // inputProps={{ "aria-label": "Buscar" }}
          onChange={handleSearch} size="small" />
      </div>

    </div>
  );
}
