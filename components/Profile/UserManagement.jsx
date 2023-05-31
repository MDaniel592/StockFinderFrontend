
import { useRouter } from "next/router";
import React from "react";

export default function UserManagement({ }) {
    const router = useRouter();

    const handleDeleteButtonClick = (event) => {
        event.preventDefault();
        router.push("/profile/delete-account");
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        router.push("/profile/change-password");
    };

    return (
        <section className="text-center">
            <h1 className="my-2 font-medium font-sans text-lg underline">Panel de opciones</h1>
            <div className="grid grid-cols gap-1 lg:gap-2">
                {/* <div className="mx-auto">
                    <button onClick={handleButtonClick} className='btn-blue-white'>Cambiar correo</button>
                </div>
                <div className="mx-auto">
                    <button onClick={handleButtonClick} className='btn-blue-white'>Cambiar telegram</button>
                </div> */}
                <div className="mx-auto">
                    <button onClick={handleButtonClick} className='btn-blue-white'>Cambiar contraseña</button>
                </div>
                <div className="mx-auto">
                    <button onClick={handleDeleteButtonClick} className='btn-blue-white'>Eliminar cuenta</button>
                </div>
            </div>
        </section>
    );
}
