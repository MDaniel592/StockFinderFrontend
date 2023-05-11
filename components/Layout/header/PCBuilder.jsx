import Link from 'next/link';

export default function PCBuilder({ }) {


    return (
        <div className="p-2 text-white h-10 items-center">
            <Link href='/builder' className='flex items-center'>
                <img alt="" src="/images/svg/tools.svg" className="h-6 w-6 mr-2 invert" />
                <span className="hidden lg:block text-sm font-medium hover:text-blue-500">Configurador PC</span>
            </Link>
        </div>
    );
}
