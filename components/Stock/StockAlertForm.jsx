import React, { useState } from 'react';

export default function StockAlertForm({ updateAlert, gpuModel }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [maxPrice, setMaxPrice] = useState('');
    // const [shop, setShop] = useState('PcComponentes');
    // const shopsArray = ["PcComponentes", "Aussar", "Casemod", "Coolmod", "IzarMicro", "LDLC", "Neobyte", "Speedler", "Versus Gamers"]

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // updateAlert({ shop: shop, maxPrice: maxPrice })
        updateAlert({ maxPrice: maxPrice })
        setIsFormVisible(false);
    };

    return (
        <div className="my-2 text-center" >

            <button onClick={handleButtonClick} className='font-semibold text-white text-center h-8 z-50 py-1 items-center hover:text-blue-500 w-28 border border-blue-500 bg-zinc-700 rounded-lg'>{isFormVisible ? 'Cerrar' : 'Crear alerta'}</button>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className='font-medium text-neutral-300 text-sm flex flex-col gap-2 mt-2 border-2 border-gray-600 rounded-lg p-2'>

                    {/* <label className='flex mx-auto'>
                        <p className='text-semibold mr-2'>Tienda:</p>
                        <select
                            className='rounded-lg px-2 text-sm'
                            onChange={(e) => setShop(e.target.value)}
                        >
                            {shopsArray.map((shop) => {
                                return (<option value={shop} key={Math.random()}>{shop}</option>)
                            })}
                        </select>
                    </label> */}
                    <p>Alerta para {gpuModel}</p>
                    <label className='flex mx-auto text-semibold'>
                        <p className='mr-2'>Precio:</p>
                        <input
                            className='rounded-lg px-2 w-20 text-sm'
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </label>
                    <button type="submit" className='px-2 py-1 rounded-md border-gray-600 mx-auto bg-blue-600 hover:bg-blue-900'>Nueva Alerta</button>
                </form>
            )}
        </div>
    );
};
