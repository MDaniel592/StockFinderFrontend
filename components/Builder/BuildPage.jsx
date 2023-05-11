import Link from 'next/link';
import React from "react";
import List from "./List";
import Table from "./Table";

export default function BuildPage({ data, build_uuid }) {

    const headCells = [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: "Nombre",
        },
        {
            id: "original_price",
            numeric: true,
            disablePadding: false,
            label: "Precio Original",
        },
        {
            id: "actual_price",
            numeric: true,
            disablePadding: false,
            label: "Precio Actual",
        },
        {
            id: "shop",
            numeric: true,
            disablePadding: false,
            label: "Tienda",
        },
    ];


    const new_data = { ...data }
    delete new_data.build_name
    delete new_data.secondary_storage
    delete new_data.created

    const build_url = `https://stockfinder.tech/builds/${build_uuid}`
    return (
        <section>
            <h3 className="text-3xl font-semibold text-center">Configuración</h3>
            <div className="section-title-separator bg-blue-500 w-16 sm:w-32 rounded-full mt-1 mb-4 h-2 mx-auto"></div>

            <section className="container mx-auto p-2 md:p-8 bg-zinc-800 relative rounded-xl">
                <h1 className="uppercase text-md sm:text-xl font-semibold text-neutral-200">{data["build_name"]}</h1>
                <div className="section-title-separator bg-white w-8 rounded-full mt-1 mb-1 sm:mb-4 h-2"></div>
                <Link href={build_url} className="font-semibold text-blue-500 hover:underline text-xxs sm:text-sm">{build_url}</Link>
                <h3 className="text-xxs sm:text-md text-neutral-300">{data["created"]}</h3>
                <section className='hidden sm:block my-4'><Table data={new_data} headCells={headCells} /></section>
                <section className='block sm:hidden my-4'><List data={new_data} headCells={headCells} /></section>
            </section>
        </section>
    );
}
