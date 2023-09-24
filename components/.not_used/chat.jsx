import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function chat({}) {
  return (
    <div id="CHAT" className="container text-center py-3">
      <p className="lead mb-4">
        También, puede unirse a un chat de grupo con cientos de usuarios que
        hacen uso de esta herramienta:
      </p>
      <Image
        src="../static/img/tg.webp"
        alt="Telegram: "
        width="30"
        height="30"
      />
      <Link
        href="https://t.me/joinchat/PlY9lXdQS5gzOTY0"
        className="btn btn-primary"
        style="text-decoration: none;"
      >
        Seguimiento de stock - StockFinder
      </Link>
    </div>
  )
}
