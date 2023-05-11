import Head from "next/head";
import React from "react";

export default function CustomHead({ title_text }) {
  var title = "StockFinder.tech"
  if (title_text) { title = title_text + " | " + title }

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=yes, viewport-fit=cover"
        />
        <meta name="color-scheme" content="dark" />
        <meta name="application-name" content="StockFinder.tech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StockFinder.tech" />
        <meta name="description" content="Tracker for PC parts and consoles" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="theme-color" content="#FFFFFF" /> */}

        <title>{title}</title>
        <link rel="shortcut icon" href="/images/logos/StockFinderLogo.svg" />

        <meta name="og:title" content="StockFinder" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </React.Fragment>
  );
}
