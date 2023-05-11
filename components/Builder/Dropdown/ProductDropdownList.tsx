import useWindowDimensions from "hooks/useWindowDimension";
import Availability from "models/Availability";
import ProductInfo from "models/ProductInfo";
import React, { useEffect, useState } from "react";
import { areEqual, FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import MemoProductDropdownListItem from "./ProductDropdownListItem";

const MemoProductDropdownList = React.memo(function ProductDropdownList({
  products,
  productCategory,
  selectedUUID,
}: {
  products: ProductInfo[];
  productCategory: string;
  selectedUUID: string;
}) {
  const LOADING = 1;
  const LOADED = 2;
  const itemStatusMap: { [key: number]: number } = {};

  const BUILD_IN_PROGRES_KEY = "buildInProgress";

  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability>();

  const totalItems = products.length;
  const fixedSizeListRef = React.useRef<FixedSizeList | null>(null);
  fixedSizeListRef.current?.scrollToItem(10);

  const isItemLoaded = (index: number) => !!itemStatusMap[index];
  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        for (let index = startIndex; index <= stopIndex; index++) {
          itemStatusMap[index] = LOADED;
        }
        resolve();
      }, 1500)
    );
  };

  useEffect(() => {
    const buildData = JSON.parse(
      localStorage.getItem(BUILD_IN_PROGRES_KEY) || "{}"
    );

    const shopFromProductFromBuild = buildData[productCategory]?.shop;
    const availabilitiesFromBuild = buildData[productCategory]?.product?.availabilities;

    if (shopFromProductFromBuild && availabilitiesFromBuild) {
      const selectedAvailability = availabilitiesFromBuild?.filter((availability: Availability) => availability?.shopName === shopFromProductFromBuild)[0];
      if (selectedAvailability) setSelectedAvailability(selectedAvailability);
    }
  }, [products]);
  class Row extends React.PureComponent<{
    index: number;
    style: React.CSSProperties;
    data: any;
  }> {
    render() {
      const { index, style, data } = this.props;
      return (
        <div style={style}>
          <MemoProductDropdownListItem
            product={data[index]}
            key={Math.random()}
            productCategory={productCategory}
            selectedUUID={selectedUUID}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
          />
        </div>
      );
    }
  }

  const { width, height } = useWindowDimensions();

  const PHONE_BREAKPOINT_PX = 800;
  const PHONE_ITEM_SIZE_PX = 120;
  const OTHERS_ITEM_SIZE_PX = 100;

  const itemSize =
    width <= PHONE_BREAKPOINT_PX ? PHONE_ITEM_SIZE_PX : OTHERS_ITEM_SIZE_PX;

  return (
    <div className="max-h-64">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={totalItems}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            initialScrollOffset={0}
            className="w-full"
            ref={(listRef) => {
              ref(listRef);
              fixedSizeListRef.current = listRef;
            }}
            height={selectedUUID ? itemSize : 300}
            width={300}
            itemData={products}
            itemSize={itemSize}
            itemCount={totalItems}
            onItemsRendered={onItemsRendered}
          >
            {Row}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
},
  areEqual);

export default MemoProductDropdownList;
