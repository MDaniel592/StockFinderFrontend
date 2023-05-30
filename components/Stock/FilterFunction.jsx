

function filterItem(filters, item_key, item_data) {
    let filter_list = filters[item_key]["value"];
    if (filter_list.length == 0 || !filter_list) return true

    switch (item_key) {
        case 'price':
            if (item_data.price < filter_list[0] || filter_list[1] < item_data.price) return false;
            return true

        case 'name':
            let regex_str = "";
            for (let item in filter_list) { regex_str += filter_list[item] + "|"; }
            if (!regex_str) return true

            let re_expresion = new RegExp(regex_str.slice(0, -1), "i");
            var result = String(item_data.name).match(re_expresion);

            if (!result) return false;
            return true

        case 'shop':
            if (filter_list.length == 0) break
            for (let value in filter_list) { if (filter_list[value] === item_data.shop) return true; }
            return false;

        case 'refurbished':
            let status = item_data.refurbished ? 'Reacondicionado' : 'Nueva'
            if (filter_list.indexOf(status) != -1) return true
            return false

        default:
            if (filter_list.indexOf(data[index][item_key]) == -1 && filter_list.length > 0) return false
            return true;
    }

    return true
}



export function getProductAlert(products, alert) {
    // const alertShop = alert?.shop;
    const alertMaxPrice = parseFloat(alert?.maxPrice);
    if (alertMaxPrice === NaN) return;
    // The array of products is NOT ordered, however we will take a random one which satisfy the condition
    var productAlert = products.filter(product => parseFloat(product.price) < alertMaxPrice)
    return productAlert ? productAlert[0] : undefined;
}



export function getFilteredData(data, filters, searchValue, tableLen, setTableLen) {
    let new_array = [];
    for (var index in data) {
        Object.assign(data[index], data[index]["specs"]);
        delete data[index]["specs"];

        // Filtering
        var data_value = {};
        var passed = true;
        for (let item_key in filters) {
            let item_data = data[index]
            if (item_data === undefined) { passed = false; break; }

            passed = filterItem(filters, item_key, item_data)
            if (passed === false) break

            data_value[item_key] = item_data;
        }

        if (passed === false || !data_value) continue
        data_value["name"] = data[index]['name'];
        data_value["price"] = data[index]['price'];
        data_value["url"] = "/producto/" + data[index]['uuid'];
        data_value["shop"] = data[index]['shop'];
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
