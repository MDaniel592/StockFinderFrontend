import React from "react";
import BottomHeader from "./header/BottomHeader";
import Header from "./header/Header";

export default function CustomHeader({ userData }) {
  return (
    <React.Fragment>
      <header className="w-full px-4 lg:px-12 lg:py-2 bg-zinc-800">
        <div className="max-w-screen-2xl mx-auto">
          <Header userData={userData}></Header>
          <BottomHeader></BottomHeader>
        </div>
      </header>
    </React.Fragment>
  );
}
