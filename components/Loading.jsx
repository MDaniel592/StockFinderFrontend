import Image from 'next/image'

export default function index() {
  return (
    <div className="relative h-screen flex flex-col gap-2 items-center justify-center">
      <Image
        width={80}
        height={80}
        src="/images/svg/ring-loading.svg"
        alt="ring-loading"
      />
      <p className="relative text-4xl font-semibold text-center">Cargando...</p>
    </div>
  )
}
