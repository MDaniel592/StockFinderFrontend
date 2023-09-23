import React from 'react'
import CookieConsent from './CookieConsent'
// import Tabbar from "../Tabbar";
import Footer from './Footer'
import Head from 'next/head'
import NavBar from './Navbar'

export default function Layout({ userData, titlePage, children, router }) {
  const websiteURL = 'StockFinder.tech'
  const title = titlePage + ' | ' + websiteURL ? titlePage : websiteURL

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta name="application-name" content="StockFinder.tech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StockFinder.tech" />
        <meta name="description" content="Tracker for PC parts and consoles" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="theme-color" content="#FFFFFF" /> */}
        <meta name="og:title" content="StockFinder" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="shortcut icon" href="/images/logos/StockFinderLogo.svg" />
        <title>{title}</title>
      </Head>

      <NavBar path={router.asPath} userData={userData} />

      <div
        id="main-content"
        className="dark bg-google-dark w-full min-h-[80vh] text-gray-300"
      >
        {children}

        {/* <Tabbar /> */}
      </div>

      <CookieConsent />
      <Footer />
    </React.Fragment>
  )
}
