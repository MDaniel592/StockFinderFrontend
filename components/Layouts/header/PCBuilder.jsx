import Link from 'next/link'
import Image from 'next/image'
export default function PCBuilder({}) {
  return (
    <div className="static z-20 p-2 text-white h-10 items-center">
      <Link href="/builder" className="flex items-center">
        <Image
          alt=""
          width={24}
          height={24}
          src="/images/svg/tools.svg"
          className="mr-2 invert"
        />
        <span className="hidden lg:block text-sm font-medium text-url">
          Configurador PC
        </span>
      </Link>
    </div>
  )
}
