import React from "react";

export default function WarningMessage({ userData }) {
    const active_telegram = userData?.telegram ? true : null

    if (active_telegram) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <React.Fragment>
            <div className="mx-auto max-w-sm p-2 border rounded-lg text-center">
                <p className="text-red-500 font-semibold">No puedes registrar alertas.</p>
                <p className="text-sm font-semibold">Crea y recibe alertas asociando tu Telegram: </p>
                <a className="text-sm  text-blue-500 text-bold underline font-semibold" href="/profile/add-telegram">Añadir mi Telegram</a>
            </div>
        </React.Fragment>
    );
}
