import * as locales from "@mui/material/locale";
import { createTheme, useTheme } from "@mui/material/styles";
import React from "react";


export default function Canales({ data }) {

  if (!data) return;

  const INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR";

  function CustomPill({ textToShow, type, property }) {
    const tempValue = property ? property : ''
    const baseClassName = 'inline-block px-1 rounded-full text-xxs lg:text-xs outline outline-1' + tempValue
    switch (type) {
      case SUCCESS:
        return <span className={baseClassName + " bg-success-light text-success outline-success"}>{textToShow}</span>
      case ERROR:
        return <span className={baseClassName + " bg-error-light text-error outline-error"}>{textToShow}</span>
      default:
        return <span></span>
    }
  }


  function UserAlertInStock(isDeleted) {
    if (!isDeleted) {
      return <CustomPill textToShow="Activo" type="SUCCESS" />;
    }
    return <CustomPill textToShow="Deshabilitado" type="ERROR" />;
  }


  function EnhancedHead() {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 border-b-2">

        <div className="font-semibold text-neutral-200 text-xxs lg:text-xs" key={Math.random()} align='left'>
          <span className="">Modelo</span>
        </div>
        <div className="font-semibold text-neutral-200 text-xxs lg:text-xs" key={Math.random()} align='center' >
          <span className="">Precio máximo</span>
        </div>
        <div className="hidden lg:block font-semibold text-neutral-200 text-xxs lg:text-xs" key={Math.random()} align='center' >
          <span className="">Estado</span>
        </div>
      </div>
    );
  }




  function getTable(data) {
    return Object.keys(data).map((key2, index2) => {

      let details = data[index2]
      let modelo = details.modelo.replaceAll('GeForce ', "").replaceAll('Radeon ', "")
      let textColor = details.status ? "text-red-500" : "text-neutral-200"
      return (
        <div className={`bg-zinc-700 grid grid-cols-2 lg:grid-cols-3 rounded-md px-2 py-1 relativetext-neutral-200 lg:${textColor}`} key={Math.random()}>

          <div className="text-xxs lg:text-xs text-left">
            {modelo}
          </div>
          <div className="text-xxs lg:text-xs text-center" >
            {details.max_price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
          </div>
          <div className="hidden lg:block text-xxs lg:text-xs text-center" >
            {UserAlertInStock(details.status)}
          </div>

        </div>
      )

    })
  }


  function getCards(data, themeWithLocale) {

    return Object.keys(data).map(function (key, index) {

      let value = data[key]
      let name = value.channel_name.replaceAll(' - StockFinder', '')

      return (
        <div className="bg-zinc-800 rounded-lg px-2 py-4 flex flex-col  gap-3 ">

          <div id="builder-section" className="h-[6vh] rounded-lg">
            <div className="flex items-center h-full">
              <h2 className="text-xl lg:text-2xl lg:text-4xl font-bold m-auto">{name}</h2>
            </div>
          </div>

          <div className="min-w-max flex flex-col gap-1 grow">
            <EnhancedHead />
            {getTable(value.data)}
          </div>


          <div className="mx-auto">
            <a href={value.url} alt={Math.random()}
              className="py-1 px-3 border border-transparent text-xs lg:text-lg rounded-md text-neutral-200 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition grow-0">
              Unirse
            </a>
          </div>
        </div>
      )
    })

  }

  const [locale, setLocale] = React.useState("esES");
  const theme = useTheme();
  const themeWithLocale = React.useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);

  return (
    <section className="">
      <h3 className="text-3xl font-semibold text-center">Listado de canales</h3>
      <div className="section-title-separator bg-blue-500 w-16 lg:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

      <div className="place-content-center">
        <div className="grid grid-cols-2 lg:grid lg:grid-cols-3 justify-center gap-1 mx-auto px-1">
          {getCards(data, themeWithLocale)}
        </div>
      </div>

      <div id="CHAT" className="text-center py-3">
        <p className="text-xl mb-4">También, puede unirse a un chat grupal con cientos de usuarios:</p>
        <div className="flex gap-4 rounded-2xl py-4 px-6 bg-zinc-800 text-center w-fit mx-auto">
          <div className="m-auto shrink"> <img alt='Seguimiento de stock' src="/images/chat.webp" className="rounded-lg h-10 lg:h-14" /> </div>
          <div className="m-auto"> <p className="text-gray-200 text-xs lg:text-lg font-extrabold">Seguimiento de stock</p> </div>
          <div className="m-auto shrink">
            <a href="https://t.me/Grupo_StockFinder" alt='Seguimiento de stock'
              className="py-2 px-4 border border-transparent text-xs lg:text-lg rounded-md text-neutral-200 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition"
            > Unirse </a>
          </div>
        </div>
      </div>
    </section>
  );
}
