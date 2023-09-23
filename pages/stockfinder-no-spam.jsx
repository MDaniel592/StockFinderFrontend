import React from 'react'
import ProfileLayout from '../components/Layouts/ProfileLayout'

export default function Home() {
  return (
    <React.Fragment>
      <ProfileLayout maxWidth={'lg'}>
        <span className="font-bold text-3xl mt-4">
          Recibir correos de StockFinder
        </span>

        <span className="text-lg mt-4 mb-1">
          Debe añadir stockfinder.web@gmail.com como DESEADO
        </span>

        <div className="m-4">
          <img
            src="/gif/spam_example.gif"
            className="rounded-xl"
            alt="IMG"
            loading="lazy"
          />
        </div>
      </ProfileLayout>
    </React.Fragment>
  )
}
