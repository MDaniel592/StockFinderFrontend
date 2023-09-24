import React from 'react'
import Explanation from '../components/Explain/Explanation'
import FAQ from '../components/Explain/FAQ'
import HowTo from '../components/Explain/HowTo'

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4 default-w-space my-2">
        <Explanation />
        <HowTo />
        <FAQ />
      </div>
    </React.Fragment>
  )
}
