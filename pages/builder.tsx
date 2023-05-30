import MemoProductDropdown from "components/Builder/Dropdown/ProductDropdown";
import Search from "components/Builder/Dropdown/Search";
import { motion } from "framer-motion";
import ProductInfo from "models/ProductInfo";
import ChassisSpecifications from "models/Specifications/ChassisSpecifications";
import CoolerSpecification from "models/Specifications/CoolerSpecification";
import CPUSpecifications from "models/Specifications/CPUSpecifications";
import MDBSpecifications from "models/Specifications/MDBSpecifications";
import RAMSpecifications from "models/Specifications/RAMSpecifications";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryService from "services/CategoryService";
import ErrorMessageAlert from "../components/alerts/ErrorMessageAlert";
import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";
import BuildService from "../services/BuildService";
import { BuilderContext } from "./_app";

const DEFAULT_SOCKETS: { socketName: string; socketProp: string }[] = [
  { socketName: "AMD Socket AM4", socketProp: "Socket AM4" },
  { socketName: "AMD Socket AM5", socketProp: "Socket AM5" },
  { socketName: "Intel Socket 1700", socketProp: "Socket 1700" },
  { socketName: "Intel Socket LGA1200 gen. 10", socketProp: "Socket 1200" },
];

const CATEGORIES: MutableCategory = {
  CPU: {
    name: "CPU",
    categoryName: "procesadores",
  },
  MDB: {
    name: "MDB",
    categoryName: "placas-base",
  },
  GPU: {
    name: "GPU",
    categoryName: "tarjetas-graficas",
  },
  PSU: {
    name: "PSU",
    categoryName: "fuentes-alimentacion",
  },
  RAM: {
    name: "RAM",
    categoryName: "memoria-ram",
  },
  COOLER: {
    name: "COOLER",
    categoryName: "disipadores-cpu",
  },
  HDD: {
    name: "HDD",
    categoryName: "almacenamiento",
  },
  CHASSIS: {
    name: "CHASSIS",
    categoryName: "torres",
  },
};

const FORMATO_RAM_DIMM = "DIMM";

const SELECTED_SOCKET_KEY = "selectedSocket";
const BUILD_IN_PROGRES_KEY = "buildInProgress";
interface MutableObject extends Object {
  [index: string]: any;
}
interface MutableCategory {
  [index: string]: { name: string; categoryName: string };
}
export default function Builder(props: { userData: any; productsList: any }) {
  const productLists = React.useMemo(
    () => props.productsList,
    [props.productsList]
  );
  const userData = React.useMemo(() => props.userData, props.userData);

  const [selectedSocket, setSelectedSocket] = useState<string>("");
  const [build, setBuild] = useState<MutableObject>({});

  const [errorMessage, setErrorMessage] = useState<any>(undefined);

  const handleSelectedSocket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSocket(e.currentTarget.value);
    localStorage.setItem(SELECTED_SOCKET_KEY, e.currentTarget.value);
    setBuild({});
    localStorage.removeItem(BUILD_IN_PROGRES_KEY);
  };

  const onProductSelected = (productToBeAdded: {
    productCategory: string;
    productValue: ProductInfo;
    selectedShop: string;
    price: number;
  }, buildData = undefined) => {

    const currentBuild: {} = buildData !== undefined ? buildData : build
    const newBuild = {
      ...currentBuild,
      [productToBeAdded.productCategory]: {
        product: productToBeAdded.productValue,
        shop: productToBeAdded.selectedShop,
        price: productToBeAdded.price,
      },
    };
    setBuild({ ...newBuild });
    localStorage.setItem(BUILD_IN_PROGRES_KEY, JSON.stringify(newBuild));
  };

  const onProductRemoved = (category: string, buildData: any = undefined) => {
    const currentBuild: any = buildData ? { ...buildData } : { ...build }
    delete currentBuild[category];
    setBuild({ ...currentBuild });
    localStorage.setItem(BUILD_IN_PROGRES_KEY, JSON.stringify(currentBuild));
  };

  const isMdbValidForChassis = (
    motherboard: ProductInfo,
    chassis: ProductInfo
  ): boolean => {
    if (!!!motherboard || !!!chassis) return true;

    const supportedMdbs: string[] = JSON.parse(
      new ChassisSpecifications(chassis.specifications).formatoPlacaBase
    );

    return supportedMdbs.includes(
      new MDBSpecifications(motherboard.specifications).factorForma
    );
  };
  const isCoolerValidForChassis = (
    cooler: ProductInfo,
    chassis: ProductInfo
  ): boolean => {
    if (!!!cooler || !!!chassis) return true;

    const chassisSpecs: ChassisSpecifications = new ChassisSpecifications(
      chassis.specifications
    );
    const coolerSpecs: CoolerSpecification = new CoolerSpecification(
      cooler.specifications
    );

    const heightRegex = /\d+\.\d+|\d+/g;
    const chassisMaxHeightStringValue =
      chassisSpecs.alturaMaximaCPU.match(heightRegex);

    if (!chassisMaxHeightStringValue) return false;
    const chassisMaxHeightAsNumber = Number(chassisMaxHeightStringValue[0]);

    const coolerHeight = Number(coolerSpecs.altura.match(heightRegex));

    return chassisMaxHeightAsNumber >= coolerHeight;
  };

  const isCoolerValidForCPU = (cooler: ProductInfo, cpu: ProductInfo) => {
    if (!!!cpu || !!!cooler) return true;

    const cpuSpecs: CPUSpecifications = new CPUSpecifications(
      cpu.specifications
    );
    const coolerSpecs: CoolerSpecification = new CoolerSpecification(
      cooler.specifications
    );

    const supportedCpus: String[] = JSON.parse(coolerSpecs.soporteProcesador);

    // Fix for wrong named values of specs
    var newFixedSupportedCpus: String[] = [];
    for (var value of supportedCpus) {
      let new_spec = value.replace("Intel", "Socket").replace("AMD", "Socket");
      newFixedSupportedCpus.push(new_spec);
    }

    return newFixedSupportedCpus.includes(cpuSpecs.tipoSocket);
  };

  const router = useRouter();

  async function buildValid(new_build: MutableObject) {
    let buildService = new BuildService();

    if (Object.keys(new_build).length == 1) {
      setErrorMessage("Debes selecionar al menos 1 producto.");
      return false;
    } else {
      let buildResponse = await buildService.registerBuild(new_build);
      if (!buildResponse.error) {
        router.push(`/builds/${buildResponse.build_uuid}`);
      }
      setErrorMessage(
        "No se ha podido guardar la configuración. Inténtelo de nuevo más tarde."
      );
      return false;
    }
  }

  async function onButtonPressed(e: any) {
    e.preventDefault();

    var formatted_build: MutableObject = {};
    formatted_build.buildName = buildName;
    for (let value in build) {
      formatted_build[value] = {};
      formatted_build[value].shop = build[value].shop;
      formatted_build[value].price = build[value].price;
      formatted_build[value].uuid = build[value].product.uuid;
    }

    if (await buildValid(formatted_build)) console.log(formatted_build);
  }

  const [buildName, setBuildName] = useState("");
  const handleBuildNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildName(e.currentTarget.value);
  };

  async function onBuildRemoved(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setBuildName("");
  }

  useEffect(() => {
    setSelectedSocket(localStorage.getItem(SELECTED_SOCKET_KEY) || "");
    setBuild(JSON.parse(localStorage.getItem(BUILD_IN_PROGRES_KEY) || "{}"));
  }, []);
  //! TODO Hay que hacer que el precio se pueda modificar. Ahora mismo solo lo pilla del availability seleccionado.

  function getCPU() {
    return selectedSocket
      ? productLists[CATEGORIES.CPU.categoryName]?.filter(
        (cpu: ProductInfo) => {
          const cpuSpecs: CPUSpecifications = new CPUSpecifications(
            cpu.specifications
          );
          return cpuSpecs.tipoSocket === selectedSocket;
        }
      )
      : [];
  }
  const validCPU = React.useMemo(() => getCPU(), [selectedSocket]);

  function getMDB() {
    return selectedSocket
      ? productLists[CATEGORIES.MDB.categoryName]?.filter(
        (mdb: ProductInfo) => {
          const mdbSpecs: MDBSpecifications = new MDBSpecifications(
            mdb.specifications
          );
          return mdbSpecs.tipoSocket === selectedSocket;
        }
      )
      : [];
  }
  const validMDB = React.useMemo(() => getMDB(), [selectedSocket]);

  function getRAM() {
    return selectedSocket
      ? productLists[CATEGORIES.RAM.categoryName]?.filter(
        (ram: ProductInfo) => {
          const ramSpecs: RAMSpecifications = new RAMSpecifications(
            ram.specifications
          );
          return ramSpecs.formatoMemoria === FORMATO_RAM_DIMM;
        }
      )
      : [];
  }
  const validRAM = React.useMemo(() => getRAM(), [selectedSocket]);

  function getCoolerCPU() {
    return selectedSocket
      ? productLists[CATEGORIES.COOLER.categoryName]?.filter(
        (cooler: ProductInfo) => {
          if (
            !build[CATEGORIES.CPU.name] &&
            !build[CATEGORIES.CHASSIS.name]
          ) {
            return true;
          }

          const selectedCpu: ProductInfo =
            build[CATEGORIES.CPU.name]?.product;
          const selectedChassis: ProductInfo =
            build[CATEGORIES.CHASSIS.name]?.product;
          return (
            isCoolerValidForCPU(cooler, selectedCpu) &&
            isCoolerValidForChassis(cooler, selectedChassis)
          );
        }
      )
      : [];
  }
  const validCoolerCPU = React.useMemo(() => getCoolerCPU(), [selectedSocket]);

  function getChassis() {
    return selectedSocket
      ? productLists[CATEGORIES.CHASSIS.categoryName]?.filter(
        (chassis: ProductInfo) => {
          //Si no hay ni placa ni disipador pues muestro todo.
          if (
            (!build[CATEGORIES.MDB.name] && !build[CATEGORIES.COOLER.name]) ||
            new ChassisSpecifications(chassis.specifications)
              .formatoPlacaBase === null
          ) {
            return true;
          }
          const selectedMdb: ProductInfo =
            build[CATEGORIES.MDB.name]?.product;
          const selectedCooler: ProductInfo =
            build[CATEGORIES.COOLER.name]?.product;
          // Sacamos las placas que soporta la torre, en el caso de que no haya esa información la podemos seguir mostrando al usuario bajo su propia responsabilidad.
          return (
            isMdbValidForChassis(selectedMdb, chassis) &&
            isCoolerValidForChassis(selectedCooler, chassis)
          );
        }
      )
      : [];
  }
  const validChassis = React.useMemo(() => getChassis(), [selectedSocket]);

  const validPSU = React.useMemo(
    () => productLists[CATEGORIES.PSU.categoryName],
    [productLists]
  );
  const validGPU = React.useMemo(
    () => productLists[CATEGORIES.GPU.categoryName],
    [productLists]
  );
  const validStorage = React.useMemo(
    () => productLists[CATEGORIES.HDD.categoryName],
    [productLists]
  );

  return (
    <BuilderContext.Provider value={{ onProductSelected, onProductRemoved }}>
      <CustomLayout userData={userData} title_text={"Configurador de PCs"}>
        <section className="default-w-space mt-4 lg:mt-0">
          <h1 className="text-xl sm:text-3xl font-semibold">
            Configurador de equipos
          </h1>
          <p className="text-sm my-2 text-justify w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 text-neutral-300">
            Bienvenido al Configurador de Equipos de StockFinder. En esta
            sección podrá tener al alcance del ratón los componentes de
            StockFinder para generar configuraciones de equipos que tengas en
            mente y exportarlos o guardarlos en tu perfil para más adelante.
          </p>
          <p className="text-sm my-2 text-justify w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 text-neutral-300">
            En base a los componentes elegidos en cada paso se filtrarán los de
            los siguientes. ¡Ya no tienes que preocuparte de si tu nueva RTX
            4090 TI no cabe en la torre!
          </p>
        </section>
        <section className="builder default-w-space">
          <article className="step">
            <div className="flex items-center gap-2">
              <p className="text-md font-semibold">
                Elige el socket para el equipo:
              </p>
            </div>
            <div className="socket-list">
              {DEFAULT_SOCKETS.map((socket) => (
                <div className="flex gap-2 text-sm" key={Math.random()}>
                  <input
                    type="radio"
                    name="socket"
                    id={socket.socketProp}
                    value={socket.socketProp}
                    onChange={handleSelectedSocket}
                    checked={selectedSocket === socket.socketProp}
                  />
                  <label htmlFor={socket.socketProp}>{socket.socketName}</label>
                </div>
              ))}
            </div>
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona el procesador:
              </label>
            </div>
            <MemoProductDropdown
              products={validCPU}
              productCategory={CATEGORIES.CPU.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona la placa base:
              </label>
            </div>
            <MemoProductDropdown
              products={validMDB}
              productCategory={CATEGORIES.MDB.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona la memoria RAM:
              </label>
            </div>
            <MemoProductDropdown
              products={validRAM}
              productCategory={CATEGORIES.RAM.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona el disipador para el procesador:
              </label>
            </div>
            <MemoProductDropdown
              products={validCoolerCPU}
              productCategory={CATEGORIES.COOLER.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona la torre:
              </label>
            </div>
            <MemoProductDropdown
              products={validChassis}
              productCategory={CATEGORIES.CHASSIS.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona el almacenamiento:
              </label>
            </div>
            <MemoProductDropdown
              products={validStorage}
              productCategory={CATEGORIES.HDD.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona la fuente de alimentación:
              </label>
            </div>
            <MemoProductDropdown
              products={validPSU}
              productCategory={CATEGORIES.PSU.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Selecciona la gráfica:
              </label>
            </div>
            <MemoProductDropdown
              products={validGPU}
              productCategory={CATEGORIES.GPU.name}
            />
          </article>
          <article className="step">
            <div className="flex items-center gap-2">
              <label
                htmlFor="cpu-list-picker"
                className="text-md font-semibold"
              >
                Añade un nombre a la build si lo deseas:
              </label>
            </div>
            <div className="flex gap-4 w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2">
              <Search
                name={"Nombre"}
                handleSearch={handleBuildNameChange}
                onProductRemoved={onBuildRemoved}
              />
            </div>
          </article>
          <article className="step hide-step">
            <div className="build-price flex flex-col md:flex-row w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 justify-between align-baseline">
              <p className="text-lg">
                Precio total:{" "}
                <span className="font-bold text-blue-500">
                  {Object.keys(build)
                    .map((key) => build[key].price)
                    .reduce((prev, curr) => prev + curr, 0)
                    .toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    })}
                </span>
              </p>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={(e) => onButtonPressed(e)}
                href=""
                className="text-base sm:text-lg subpixel-antialiased inline-flex as-btn primary"
              >
                Guardar configuración
              </motion.a>
            </div>
            <p className="mt-2 text-xs w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2 text-neutral-300">
              <span className="bg-error text-white p-1 rounded-md font-bold mr-1 text-xxs">¡Por cierto!</span>
              Aunque hacemos algunas comprobaciones para que tu equipo tenga una
              configuración válida, asegúrate de que esto es así con un experto
              en caso de dudas. No nos hacemos responsables en el caso de que
              una configuración no sea válida.
            </p>
          </article>
        </section>
        <section>
          <div className="text-right grid grid-cols-2 sm:grid-cols-3 w-full lg:w-3/4 xl:w-3/5 2xl:w-1/2">
            <div className="sm:col-span-2"></div>
            <ErrorMessageAlert
              hasError={errorMessage !== undefined}
              errorText={errorMessage}
            ></ErrorMessageAlert>
          </div>
        </section>
      </CustomLayout>
    </BuilderContext.Provider>
  );
}

// Server side rendering
export async function getServerSideProps(context: GetServerSideProps) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;
  //

  const productPromises: Promise<any>[] = [];
  const categoryService = new CategoryService();
  Object.keys(CATEGORIES).forEach((category) => {
    productPromises.push(
      categoryService
        .retrieveData(CATEGORIES[category].categoryName)
        .then((response) => response.json())
    );
  });

  let productsList: MutableObject = {};
  try {
    const products: { category: string; products: ProductInfo[] }[] =
      await Promise.all(productPromises);
    products.forEach(
      (productList) =>
        (productsList[productList.category] = productList.products)
    );
  } catch (error) {
    return {};
  }

  return { props: { userData, productsList } };
}
