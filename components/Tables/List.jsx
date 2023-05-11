import Link from 'next/link';
import React from "react";
import PaginatedItems from "./Pagination.jsx";

export default function List({ data, specsKeys, failOverImage = "" }) {
  var html_code;

  const [tableLen, setTableLen] = React.useState(Object.keys(data).length - 4);
  const [maxTableList, setMaxTableList] = React.useState([0, 29]);

  function getItemHtml(value, dataObj, counter) {

    var idLabel = "item-list-id-" + counter;
    let margin = "mx-3"
    //
    let nameClass = `grid grid-cols-5 items-center gap-2 ${margin}`
    let priceClass = `col-span-4`
    let secondaryHeaderData = `flex align-center justify-start gap-4 ${margin}`;

    const imageUrl = value["images"].length > 0 ? `https://images.stockfinder.tech${value["images"]}` : `/images/placeholder/${failOverImage}.webp`;
    return (
      <li key={idLabel} className="bg-zinc-800 hover:bg-zinc-700 my-2 py-2 rounded-lg">
        <div className={nameClass}>
          <div className={priceClass}>
            <Link
              href={"/producto/" + value["uuid"]}
              className="text-xxs font-semibold hover:text-blue-300 hover:underline hover:decoration-blue-300"
              target="_blank"
            >
              <div className="flex items-center gap-2">
                <img
                  src={imageUrl}
                  className=" h-10 w-10 rounded-md"
                />
                {value["name"].replace(/(\r\n|\n|\r)/gm, "")}
              </div>
            </Link>
          </div>
          <div className="justify-end font-bold text-xs items-center flex gap-1">
            {value["price"].toFixed(2)}€
            <div className={`h-2 w-2 rounded-lg ${value['stock'] === true ? 'bg-green-500' : 'bg-red-500'} my-auto`}></div>
          </div>
        </div>

        <div className={secondaryHeaderData}>{dataObj}</div>

      </li>
    );
  }

  const new_data = [...data]
  new_data.sort(function (a, b) { return a.price - b.price });
  const display_data = new_data.slice(maxTableList[0], maxTableList[1]);
  var counter = 0;
  for (const [key, value] of Object.entries(display_data)) {
    var dataObj = "";

    for (let item in specsKeys) {
      let header_data = specsKeys[item]["label"];
      let body_key = specsKeys[item]["id"];
      let body_data = value[body_key];

      let dataKey = "item-list-data--id-" + counter;

      let itemData = (
        <div className="grid grid-flow-row" key={dataKey}>
          <p className="text-gray-300 text-xxs text-center">{header_data}</p>
          <p className="text-xxs text-center">{body_data}</p>
        </div>);


      dataObj = [dataObj, itemData]
    }

    let item_code = getItemHtml(value, dataObj, counter);
    counter += 1;
    html_code = [html_code, item_code];
  }

  return (
    <div >
      <ul key={Math.random().toString()} className="mt-2">{html_code}</ul>
      <PaginatedItems setMaxTableList={setMaxTableList} maxTableList={maxTableList} tableLen={tableLen} />
    </div>
  );
}
