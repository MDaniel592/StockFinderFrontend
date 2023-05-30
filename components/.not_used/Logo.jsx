import React from "react";

export default function Logo(props) {
  return (
    <div className="mx-auto px-4 py-3 text-center justify-center">
      <div className="grid justify-items-center">
        <div className="place-content max-w-lg">
          <img src="/images/logos/StockFinder.webp" className="inline invert"></img>
        </div>
      </div>
    </div>
  );
}
