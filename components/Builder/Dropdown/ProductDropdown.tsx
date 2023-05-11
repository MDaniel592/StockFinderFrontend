import Availability from "models/Availability";
import ProductInfo from "models/ProductInfo";
import { BuilderContext, DropdownContext } from "pages/_app";
import React, { useEffect, useState } from "react";
import AdvancedSearch from "./AdvancedSearch";
import MemoProductDropdownList from "./ProductDropdownList";

const MemoProductDropdown = React.memo(
  function ProductDropdown({
    products = [],
    productCategory,
  }: {
    products: ProductInfo[];
    productCategory: string;
  }) {
    const BUILD_IN_PROGRES_KEY = "buildInProgress";
    const builderContext = React.useContext(BuilderContext);

    const handleProductNameChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setProductName(e.currentTarget.value);
      setProductUUID("");
    };

    const toggleListContainer = () => {
      setIsOpen(!isOpen);
    };

    const openListContainer = () => {
      if (isOpen === false) {
        setIsOpen(true);
      }
    };

    const onProductSelected = (product: { name: string; uuid: string }) => {
      setProductName(product.name);
      setProductUUID(product.uuid);
    };

    async function onProductRemoved(e: React.MouseEvent<HTMLElement>) {
      e.preventDefault();
      setProductName("");
      setProductUUID("");
      setIsOpen(false);
      builderContext.onProductRemoved(productCategory);
    }

    const [productName, setProductName] = useState("");
    const [productUUID, setProductUUID] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    function searchProducts(product: ProductInfo) {
      let array_search = productName.toUpperCase().split(" ");
      if (array_search[0] === "") {
        return true;
      }

      for (let x in array_search) {
        if (product.name.toUpperCase().includes(array_search[x]) == false) {
          return false;
        }
      }
      return true;
    }



    const NEW_PRODUCTS_KEY = "addProductToBuild";
    const SELECTED_SOCKET_KEY = "selectedSocket";

    function setNewProduct(newProduct: { 'uuid': String, 'price': Number }, buildData: {}) {

      let productSelectedList = products?.filter((product: ProductInfo) => {
        if (newProduct.uuid === product.uuid) return product
      })
      let productSelected = productSelectedList ? productSelectedList[0] : undefined
      if (productSelected === undefined) return

      let availabilitySelectedList = productSelected.availabilities?.filter((availability: Availability) => {
        if (availability.price === newProduct.price) return availability
      })

      let availabilitySelected = availabilitySelectedList ? availabilitySelectedList[0] : undefined
      if (availabilitySelected === undefined) return

      builderContext.onProductSelected({
        productCategory: productCategory,
        productValue: productSelected,
        selectedShop: availabilitySelected.shopName,
        price: newProduct.price,
      }, buildData);
      localStorage.removeItem(NEW_PRODUCTS_KEY)
    }

    useEffect(() => {
      let buildData = JSON.parse(localStorage.getItem(BUILD_IN_PROGRES_KEY) || "{}");
      const newProductsData = JSON.parse(localStorage.getItem(NEW_PRODUCTS_KEY) || "{}");
      const newProduct = newProductsData[productCategory];
      if (newProduct) setNewProduct(newProduct, buildData);

      buildData = JSON.parse(localStorage.getItem(BUILD_IN_PROGRES_KEY) || "{}");
      let productFromBuild = buildData[productCategory]?.product ? buildData[productCategory]?.product : undefined;
      if (productFromBuild) {
        const SocketData = localStorage.getItem(SELECTED_SOCKET_KEY) ? localStorage.getItem(SELECTED_SOCKET_KEY) : undefined
        const socket = productFromBuild?.specifications['Tipo Socket'] ? productFromBuild?.specifications['Tipo Socket'] : undefined
        if (SocketData !== socket && socket !== undefined) {
          builderContext.onProductRemoved(productCategory, buildData)
          productFromBuild = undefined
        }
        setIsOpen(true);
      }
      setProductName(productFromBuild?.name ?? "");
      setProductUUID(productFromBuild?.uuid ?? "");
    }, [products]);

    function getProductsToShow() {
      return products.filter(
        (product) =>
          searchProducts(product) &&
          (product.uuid.toUpperCase().includes(productUUID.toUpperCase()) ||
            productUUID === "")
      );
    }

    const memoProductUUID = React.useMemo(() => productUUID, [productUUID]);
    const memoProductCategory = React.useMemo(() => productCategory, [productCategory]);
    const memoDesiredProps = React.useMemo(() => ({ onProductSelected }), [onProductSelected]);
    const memoProductsToShow = React.useMemo(() => getProductsToShow(), [products, productUUID, productName]);

    return (
      <div className="dropdown-container lg:w-3/4 xl:w-3/5 2xl:w-1/2">
        <div className="dropdown-header py-1">
          <div className="flex flex-row gap-1 md:gap-4 w-fullmd:px-2">
            <AdvancedSearch
              name={productName}
              handleSearch={handleProductNameChange}
              onProductRemoved={onProductRemoved}
              toggleListContainer={toggleListContainer}
              openListContainer={openListContainer}
              isOpen={isOpen}
              productUUID={productUUID}
            />
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-list-container">
            <DropdownContext.Provider value={memoDesiredProps}>
              <MemoProductDropdownList
                products={memoProductsToShow}
                productCategory={memoProductCategory}
                selectedUUID={memoProductUUID}
              />
            </DropdownContext.Provider>
          </div>
        )}
      </div>
    );
  },
  (
    prevProps: Readonly<
      React.PropsWithChildren<{
        products: ProductInfo[];
        productCategory: string;
      }>
    >,
    nextProps: Readonly<
      React.PropsWithChildren<{
        products: ProductInfo[];
        productCategory: string;
      }>
    >
  ): boolean => {
    const prevProductUuids = prevProps.products.map((product) => product.uuid);
    const nextProductUuids = nextProps.products.map((product) => product.uuid);
    const areEqual =
      new Set(prevProductUuids).size === new Set(nextProductUuids).size &&
      [...prevProductUuids].every((uuid) => nextProductUuids.includes(uuid));
    return areEqual;
  }
);

export default MemoProductDropdown;
