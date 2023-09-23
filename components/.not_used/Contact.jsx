import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Link from 'next/link';
import React from "react";

export default function Contact({ }) {
  return (
    <section className="default-w-space">
      <h1 id="contacto" className="text-3xl font-semibold">
        Contacto
      </h1>
      <div className="section-title-separator bg-blue-800 w-8 rounded-full mt-1 mb-4 h-2"></div>
      <p className="text-md my-4">El servicio también pone a disposición de los usuarios dos formas de ponerse en contacto en caso de dudas, sugerencias o fallos en la herramienta en cualquier momento. Para ello, se pueden usar las siguientes vías:</p>
      <div className="flex flex-wrap gap-4 justify-start">
        <Link href="https://t.me/MMDaniel" className="inline as-btn primary">
          <TelegramIcon />
          <span className="ml-2">@MMDaniel</span>
        </Link>
        <Link href="https://twitter.com/StockFinderBot" className="inline as-btn primary">
          <TwitterIcon />
          <span className="ml-2">StockFinderBot</span>
        </Link>
      </div>

    </section>
  );
}
