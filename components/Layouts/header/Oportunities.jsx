import Link from 'next/link';

export default function Oportunities({ }) {


    return (
        <div className="p-2 text-white h-10 items-center z-20">
            <Link href='/oportunidades' className='flex items-center'>
                <img alt="" src="/images/svg/discount.svg" className="h-6 w-6 mr-2 invert" />
                <span className="hidden lg:block text-sm font-medium text-url">Oportunidades</span>
            </Link>
        </div>
    );
}
