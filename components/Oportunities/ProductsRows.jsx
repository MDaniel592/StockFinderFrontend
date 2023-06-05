import Link from 'next/link';
import React from "react";




export default function ProductsRows({ data, discount }) {
    if (data === undefined || data.length === 0) return <></>;

    const onImageNotLoadedError = (event) => {
        const image = event.target;
        image.src = `/images/no_photo.webp`;
        image.classList.add("bg-zinc-200", "p-2");
    };

    const title = discount.end ? `Productos con un descuento entre el ${discount.start}% y ${discount.end}%` : `Productos con un descuento superior al ${discount.start}%`
    return (
        <section className=''>
            <h1 className='text-xl'>{title}</h1>
            <div className="flex flex-wrap gap-2">
                {data.map((row, index) => {
                    return (
                        <Link href={"/producto/" + row["uuid"]} target="_blank" key={Math.random()}>
                            <div className="w-80 h-24 flex flex-row text-center rounded-md border-2 border-blue-500 p-2">
                                <img
                                    src={`https://images.stockfinder.tech/${row["image"]}`}
                                    className="h-16 w-16 rounded-md m-auto object-cover"
                                    onError={onImageNotLoadedError}
                                    loading="lazy"
                                />
                                <div className='w-64 grid place-content-evenly'>
                                    <div>
                                        <p className='font-sans antialiased text-xs text-blue-500 font-semibold hover:underline'>{row["name"]}</p>
                                    </div>
                                    <div>
                                        <p className='font-sans antialiased text-xs font-semibold'>{row["shop"].replace(" Reacondicionados", "")} - {row["price"]} €</p>
                                    </div>
                                    <div>
                                        <button className='mx-auto rounded-md bg-blue-500 p-1 text-xxs hover:bg-white hover:text-black font-semibold'>Ir al producto</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

            </div >
        </section>
    );
}
