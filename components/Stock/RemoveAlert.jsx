import React from 'react';

export default function StockAlertForm({ alert, removeAlert }) {

    const handleButtonClick = (event) => {
        event.preventDefault();
        removeAlert()
    };

    return (
        <div className="text-center items-center" >
            <div className='flex text-center items-center gap-1'>
                <p className='font-semibold text-sm text-neutral-300'>Hay una alerta configurada a un precio máximo de</p>
                <p className='font-semibold text-sm text-neutral-300'>{alert.maxPrice} €</p>
            </div>
            <p className='font-semibold text-xs text-neutral-300'>La página se refrescara automáticamente cada 1 minuto</p>
            <div className='my-2'>
                <button onClick={handleButtonClick} className='font-semibold text-sm text-white text-center h-8 z-50 py-1 items-center border border-red-500 hover:text-red-500 w-28 bg-zinc-700 rounded-lg'>Borrar alerta</button>
            </div>
        </div>
    );
};
