
function defaults_item_data(item_key, data) {
  let item_data = data[item_key];

  // Defaults
  if (item_key == "shop") {
    item_data = data["shops"];
  } else if (item_key == "Tipo Cableado" && item_data === undefined) {
    item_data = "No";
  } else if (item_key == "Certificación" && item_data === undefined) {
    item_data = "Ninguna";
  } else if (item_key == "Tamaño" && item_data === undefined) {
    item_data = "ATX";
  } else if (item_key == "Conexiones" && item_data === undefined) {
    item_data = ["Ninguna"];
  } else if (item_key == "Disco Duro" && item_data === undefined) {
    item_data = "NA";
  } else if (item_key == "Chipset" && item_data === undefined) {
    item_data = "NA";
  } else if (item_key == "Refrigeración Líquida" && item_data === undefined) {
    item_data = "No";
  } else if (item_key == "Conexiones" || item_key == 'Soporte Procesador') {
    item_data = JSON.parse(item_data)
  } else if (item_key == "Refrigeración Líquida" && item_data == 'true') {
    item_data = "Sí"
  } else if (item_key == "Tipo de Caja" || item_key == "Formato Placa Base") {
    item_data = data['Formato Placa Base']
    item_data = JSON.parse(item_data)

    if (item_key == "Tipo de Caja") {
      if (item_data.indexOf("ATX") != -1) {
        item_data = 'ATX';
      } else if (item_data.indexOf("Micro ATX") != -1) {
        item_data = 'Micro ATX';
      } else if (item_data.indexOf("Mini ITX") != -1) {
        item_data = 'Mini ITX';
      } else {
        item_data = 'ATX';
      }
    }
  }

  return item_data
}


function filter_item(filters, item_key, item_data) {
  let filter_list = filters[item_key]["value"];

  // Do not loop when there are no filters applied
  if (filter_list.length == 0 || !filter_list) return true

  if (filters[item_key]["number"] === true) {
    let temp_data = item_data;
    let min_filter = filter_list[0];
    let max_filter = filter_list[1];

    if (item_key == "Potencia") {
      temp_data = temp_data.replace(" W", "");
    } else if (item_key == "Tamaño Memoria") {
      temp_data = temp_data.replace(" GB", "");
    } else if (item_key == "Almacenamiento") {
      if (temp_data.indexOf("GB") != -1) {
        temp_data = temp_data.replace(" GB", "");
      } else if (temp_data.indexOf("TB") != -1) {
        temp_data = temp_data.replace(" TB", "");
        temp_data = temp_data * 1024;
      }
      min_filter = 2 ** min_filter / 1048576 / 1000;
      max_filter = 2 ** max_filter / 1048576 / 1000;
    } else if (item_key == "Frecuencia Memoria") {
      temp_data = temp_data.replace(" MHz", "");
    } else if (item_key == "Cantidad Memoria") {
      temp_data = temp_data.replace(" GB", "");

      min_filter = 2 ** min_filter / 1048576 / 1025;
      max_filter = 2 ** max_filter / 1048576 / 1000;
    } else if (item_key == 'Altura máxima CPU' || item_key == 'Longitud máxima GPU' || item_key == 'Altura (ventilador incluido)') {
      temp_data = temp_data.replace(" mm", "");
    }

    if (temp_data < min_filter || max_filter < temp_data) return false
    return true
  }

  //
  if (typeof item_data === "string") {
    let temp_data = item_data
    if (item_key == 'Certificación') temp_data = temp_data.replace("80 Plus ", "")
    if (item_key == "Kit Memoria") temp_data = temp_data.replace("Kit ", "")

    if (item_key == 'Refrigeración Líquida') {
      if (filter_list.indexOf('Líquida') != -1 && temp_data == 'Sí') return true;
      if (filter_list.indexOf('Disipador') != -1 && temp_data == 'No') return true;
      return false
    }

    if (filter_list.indexOf(temp_data) == -1) return false
    return true
  }

  // 
  if (typeof item_data === "object") {
    let passed = true;
    for (let index in filter_list) {
      let data = filter_list[index];
      if (item_key == 'Formato Placa Base' || item_key == "Conexiones" || item_key == "Soporte Procesador" || item_key == 'shop') {
        if (item_data.indexOf(data) == -1) passed = false;
      } else {
        let match = item_data[data];
        if (match === undefined) passed = false
      }
      if (passed === true) return true
    }
    return passed
  }

  if (item_key !== 'stock') return false;
  let value = item_data === 1 ? true : false
  return filter_list.includes(value) ? true : false
}

export function filter_data(data, filters, searchValue, tableLen, setTableLen) {
  let new_array = [];

  for (var index in data) {
    Object.assign(data[index], data[index]["specs"]);
    delete data[index]["specs"];

    // Filtering
    let passed = true
    let data_value = {};

    for (let item_key in filters) {
      let item_data = defaults_item_data(item_key, data[index])
      if (item_data === undefined) { passed = false; break; }

      passed = filter_item(filters, item_key, item_data)
      if (passed === false) break

      data_value[item_key] = item_data;
    }

    if (passed === false || !data_value) continue
    data_value["stock"] = data[index]["stock"] === 1 ? true : false;
    data_value["name"] = data[index]["name"];
    data_value["url"] = data[index]["url"];
    data_value["uuid"] = data[index]["uuid"];
    data_value["images"] = data[index]["image"] ? data[index]["image"] : []
    new_array.push(data_value);
  }

  // Searching
  var results = [];
  var value = searchValue.toUpperCase().split(" ");
  for (var i = 0; i < new_array.length; i++) {
    let name = new_array[i]["name"].toUpperCase();
    let check = true;
    for (let x in value) { if (name.search(value[x]) == -1) { check = false; break; } }
    if (check) results.push(new_array[i]);
  }

  // Final array
  new_array = results;

  // Setting tableLen
  if (new_array.length != tableLen) setTableLen(new_array.length);

  return new_array;
}
