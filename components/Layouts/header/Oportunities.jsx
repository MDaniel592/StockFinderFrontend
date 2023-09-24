import Link from 'next/link'
import Image from 'next/image'
export default function Oportunities({}) {
  return (
    <div className="static z-20 p-2 text-white h-10 items-center">
      <Link href="/oportunidades" className="flex items-center">
        <Image
          width={24}
          height={24}
          alt=""
          src="/images/svg/discount.svg"
          className="mr-2 invert"
        />
        <span className="hidden lg:block text-sm font-medium text-url">
          Oportunidades
        </span>
      </Link>
    </div>
  )
}
