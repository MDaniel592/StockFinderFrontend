import Link from 'next/link';
import AuthSection from "./AuthSection";

export default function Header({ userData }) {
  const imageSrc = `/images/logos/StockFinderLogo.svg`
  return (
    <div className="flex justify-between md:justify-start items-center py-2 md:space-x-10">
      <div className="flex sm:justify-start gap-2 sm:gap-4">
        <Link href="/">
          <img className="h-10 w-auto" src={imageSrc} alt="" />
        </Link>
        <span className='my-auto text-xl font-sans font-medium hover:text-blue-500 subpixel-antialiased	'>
          <Link href="/">
            StockFinder
          </Link>
        </span>
      </div>
      <AuthSection userData={userData}></AuthSection>
    </div>
  );
}
