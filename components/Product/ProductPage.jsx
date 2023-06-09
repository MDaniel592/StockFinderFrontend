import React, { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Availability from "../../models/Availability";
import ProductInfo from "../../models/ProductInfo";
import Specification from "../../models/Specification";
import CustomPill from "../Pills/CustomPill";
import AvailabilitySection from "./AvailabilitySection";
import GraphSection from "./GraphSection";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductPage({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  let specifications = [];
  Object.entries(data["specifications"]).forEach(([key, value], _) => {
    specifications.push(new Specification({ name: key, value }));
  });

  let availabilities = [];
  Object.entries(data["availabilities"]).forEach(([key, value], _) => {
    availabilities.push(new Availability({ shopName: key, ...value }));
  });

  let productInfo = new ProductInfo({
    name: data["name"],
    images: data["images"] ? data["images"] : null,
    manufacturer: data["manufacturer"],
    specifications,
    availabilities,
    category: data["category"],
    historical: data["historical_prices"] ? data["historical_prices"] : [],
  });

  const createCarouselItemImage = (data) => (
    <SwiperSlide key={(Math.random() + 1).toString(36).substring(2)}>
      <img src={`https://images.stockfinder.tech${data}`} className="rounded-xl" />
    </SwiperSlide>
  );

  function getCarousel() {
    let images = productInfo.images ? productInfo.images : null

    if (images === '' || images === null) {
      images = `/images/placeholder/${productInfo.category.toLowerCase()}.webp`
      return (
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          <SwiperSlide>
            <img src={images} key="98yy349y5934r" className="rounded-lg" />
          </SwiperSlide>
        </Swiper>
      );
    }
    images = JSON.parse(images)
    return (
      <>
        <Swiper
          style={{
            "--swiper-navigation-color": "#00FF00",
            "--swiper-pagination-color": "#00FF00",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map(createCarouselItemImage)}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={2}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="hidden lg:block mt-2"
        >
          {images.map(createCarouselItemImage)}
        </Swiper>
      </>
    );
  }

  function getProductText() {
    let chipset = data["specifications"]["Modelo"];
    if (chipset) {
      switch (true) {
        case chipset.indexOf("RTX 3060") != -1:
          return "Jugar en Ray Tracing y 1080p a más de 60 FPS es posible con las tarjetas gráficas NVIDIA GeForce RTX 3060 y RTX 3060 Ti";
        case chipset.indexOf("RTX 3070") != -1:
          return "Gracias a las NVIDIA GeForce RTX 3070 series, optaremos a una gama que cuida la relación calidad-precio para disfrutar de los máximos FPS a un precio más accesible";
        case chipset.indexOf("RTX 3080") != -1:
          return "La intención de NVIDIA es que volemos en los videojuegos con sus GeForce RTX 3080 y RTX 3080 Ti, equipadas con 10 y 12 GB GDDR6X respectivamente, y una potencia que te dispara al Ray Tracing en 4K a más de 60 FPS";
        case chipset.indexOf("RTX 3090") != -1:
          return "La NVIDIA RTX 3090 lidera toda la plantilla de RTX 3000 y Ampere, siendo la opción entusiastas para gamers con más de 10.000 CUDA Cores y 24 GB GDDR6X";
        default:
          return "";
      }
    }
    return "";
  }

  function getSpecsData() {
    if (Object.keys(data["specifications"]).length !== 0) {
      let specList = [];

      if (data["refurbished"] === true) {
        let specElement = <CustomPill key="specs-list-reacondicionado" textToShow="Reacondicionado" />;
        specList.push(specElement);
      }


      for (let item in data["specifications"]) {
        let key = "specs-list-" + item;
        if (data["specifications"][item].toUpperCase() == "NO" || data["specifications"][item] == undefined) {
          continue;
        } else if (item === 'Refrigeración Líquida' && data["specifications"][item] === 'true') {
          let specElement = <CustomPill key={key} textToShow="Refrigeración Líquida" type="INFO" />;
          specList.push(specElement);
          continue
        } else if (item === 'Soporte Procesador' || item === 'Formato Placa Base' || item === 'Conexiones') {
          let value = data["specifications"][item].replace("[", "").replace("]", "").replaceAll('"', "").replaceAll(',', " | ")
          let specElement = <CustomPill key={key} textToShow={item + ': ' + value} type="INFO" />;
          specList.push(specElement);
          continue
        }

        if (productInfo.category == 'Chassis' || productInfo.category == 'CPU Cooler' || productInfo.category == 'GPU') {
          let specElement;
          if (item === 'Altura' || item === 'Anchura' || item === 'Longitud') {
            specElement = <CustomPill key={key} textToShow={item + ': ' + data["specifications"][item]} type="INFO" property='hidden sm:block' />;
          } else {
            specElement = <CustomPill key={key} textToShow={item + ': ' + data["specifications"][item]} type="INFO" />;
          }

          specList.push(specElement);
          continue
        }

        let specElement = <CustomPill key={key} textToShow={data["specifications"][item]} type="INFO" />;
        specList.push(specElement);
      }
      return specList;
    }

    return;
  }

  function getText() {
    return (
      <div className="lg:font-semibold text-xxs text-neutral-300">
        <ul className="list-disc list-inside">
          <li>Los precios y la disponibilidad de los productos están sujetos a cambios.</li>
          <li>Las tiendas participantes enlazadas mostrarán siempre el precio final que el usuario deberá pagar.</li>
          <li>Las compensaciones que puedan recibirse no afectan al precio final de los productos que se muestran.</li>
        </ul>
      </div>
    );
  }

  return (
    <section className="mx-auto p-2 lg:p-8 bg-zinc-800 relative rounded-xl">

      <section className="flex flex-wrap lg:flex-nowrap justify-center gap-4 xl:gap-10">
        <div>
          <h1 className="uppercase text-xl lg:text-3xl font-semibold text-white">{data["name"]}</h1>
          <div className="section-title-separator bg-white w-8 rounded-full mt-1 mb-4 h-2"></div>
          <div className="block lg:hidden w-2/3 mx-auto my-4 max-w-xs">{getCarousel()}</div>
          {getProductText() !== "" && <p className="text-sm sm:text-base text-white sm:mr-28 my-4">{getProductText()}</p>}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1 lg:gap-2">{getSpecsData()}</div>
          <AvailabilitySection availabilities={productInfo.availabilities} />
          <div className="">{getText()}</div>
        </div>
        <div className="hidden lg:block w-2/5 lg:max-w-xs xl:max-w-sm my-auto">{getCarousel()}</div>
      </section>
      {/* <section className="block lg:hidden justify-between">
        
        <AvailabilitySection availabilities={productInfo.availabilities} />
      </section> */}


      <GraphSection historicalData={productInfo.historical} />
    </section>
  );
}
