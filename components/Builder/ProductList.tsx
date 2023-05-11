import React from "react";

export default function ProductList({ dataList }: { dataList: any[] }) {
  const productList = dataList.map((product) => {
    return (
      <option key={product.uuid} value={product.uuid}>
        {product.name}
      </option>
    );
  });
  return <React.Fragment>{productList}</React.Fragment>;
}
