import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import React from "react";


export default function Offers({ data }) {

  function default_template() {
    return (
      <section>
        <div className="p-2 sm:p-4 text-center">
          <p className="text-mono text-md sm:text-xl mt-4 sm:mt-0 mb-4">
            Sin ofertas
          </p>
        </div>
      </section>
    );
  }
  if (!data) return default_template();
  if (Object.keys(data).length === 0) return default_template();

  const data_memo = React.useMemo(() => data);

  const amd_data = data_memo["AMD"].sort(function (a, b) { return a.price - b.price; });
  const nvidia_data = data_memo["NVIDIA"].sort(function (a, b) { return a.price - b.price; });

  function getItems(data) {
    const randomKeyID = `list-product-header-label-${Math.random()}`
    return (
      <>
        <ListItem disablePadding key={randomKeyID} className="block">
          <div className="grid grid-cols-5 border-b px-2 text-sm">
            <div className="col-span-4"><p className="font-semibold">Nombre</p></div>
            <div className="text-right font-semibold">Precio</div>
          </div>
        </ListItem>

        {data.map((value) => {

          const url = "/producto/" + value["uuid"];
          const labelId = `list-item-product-label-${Math.random()}`;
          const imageUrl = value["image"] ? `https://images.stockfinder.tech${value["image"]}` : `/images/placeholder/gpu.webp`;

          var name = value["name"].replace(/(\r\n|\n|\r)/gm, "");
          name = url.toUpperCase().indexOf("RASTRILLO") === -1 ? name : name + " - Reacondicionado";

          return (
            <ListItem disablePadding key={labelId} className="block hover:bg-zinc-700 rounded-xl px-2 text-xxs lg:text-xs">
              <div className="grid grid-cols-5 border-b items-center py-1">
                <div className="col-span-4">
                  <Link href={url} className="hover:text-blue-500 hover:underline hover:decoration-blue-500" >
                    <div className="flex items-center gap-2 font-medium">
                      <img src={imageUrl} className="h-8 w-8 rounded-md" />
                      {name.replace(/(\r\n|\n|\r)/gm, "")}
                    </div>
                  </Link>
                </div>
                <div className="text-right font-semibold">
                  {value.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </div>
              </div>
            </ListItem>
          );
        })}
      </>
    );
  }
  function getListPC() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-1 mt-4">
        <div className="bg-zinc-800 rounded-xl">
          <p className="text-lg text-center font-semibold text-error -mb-4 mt-2">AMD</p>
          <div className="flex justify-center p-4">
            <List sx={{ width: "100%" }}>{getItems(amd_data)}</List>
          </div>
        </div>
        <div className="bg-zinc-800 rounded-xl">
          <p className="text-lg text-center font-semibold text-success -mb-4 mt-2">NVIDIA</p>
          <div className="flex justify-center p-4">
            <List sx={{ width: "100%" }}>{getItems(nvidia_data)}</List>
          </div>
        </div>
      </div>
    );
  }

  function getListPhone() {
    return (
      <div className="block md:hidden">
        <p className="text-lg text-center font-semibold text-success mt-4 -mb-2">NVIDIA</p>
        <List sx={{ width: "100%" }}>{getItems(nvidia_data)}</List>
        <p className="text-lg text-center font-semibold text-error mt-4 -mb-2">AMD</p>
        <List sx={{ width: "100%" }}>{getItems(amd_data)}</List>
      </div>
    );
  }
  return (
    <section>
      <h3 className="text-3xl font-semibold text-center">Ofertas destacadas</h3>
      <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <div className="mx-auto">
        {getListPC()}
        {/* {getListPhone()} */}
      </div>
    </section>
  );
}

