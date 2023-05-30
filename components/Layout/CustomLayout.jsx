import React from "react";
import CookieConsent from "react-cookie-consent";
// import Tabbar from "../Tabbar";
import CustomFooter from "./CustomFooter";
import CustomHead from "./CustomHead";
import CustomHeader from "./CustomHeader";

export default function CustomLayout({ userData, title_text, children }) {
  return (
    <React.Fragment>
      <CustomHead title_text={title_text} />
      <section className="dark bg-google-dark min-h-screen">
        <CustomHeader userData={userData} />
        <main id="main-content" className="mx-auto min-h-[66.5vh] max-w-screen-2xl text-gray-300">
          {children}
        </main>
        <CustomFooter></CustomFooter>
        {/* <Tabbar /> */}
        <CookieConsent cookieName="StockFinder_CookieConsent" buttonText="Comprendo" expires={30} location="bottom"
          buttonStyle={{ 'border-radius': '6px' }} style={{}} buttonClasses="btn btn-primary"
          containerClasses="alert alert-warning items-center text-center sm:text-left justify-center sm:justify-left">
          <div className="grid -mb-4 sm:-mb-0">
            <span className="text-lg font-semibold -mt-2">Privacidad</span>
            <div className="grid">
              <span className="text-sm">Esta web hace uso de cookies para mejorar la experiencia de usuario.</span>
              <span className="text-xxs italic">Las cookies NO se utilizan para anuncios personalizados.</span>
            </div>
          </div>
        </CookieConsent>
      </section>
    </React.Fragment>
  );
}
