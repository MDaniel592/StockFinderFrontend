import { createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ServiceContext } from "../../pages/_app";
import CookieService from "../../services/CookieService";
import ErrorMessageAlert from "../alerts/ErrorMessageAlert";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function NewAlertForm({ telegram, alertType, gpu_models }) {

    const [values, setValues] = useState({
        token: "",
        url: "",
        uuid: '',
        price: "",
        model: "",
        emailAlert: false,
        telegramAlert: false,
        alertType: 'Enlace',
    });

    const theme = createTheme();
    const router = useRouter();

    const { alertService } = useContext(ServiceContext);


    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleChange = (changeEvent) => {
        setValues({ ...values, [changeEvent.target.name]: changeEvent.target.value });
    };

    const handleToggle = (toggleEvent) => {
        setValues({ ...values, [toggleEvent.target.name]: !values[toggleEvent.target.name] });
    };


    async function onButtonPressed(e, alertType) {
        e.preventDefault();
        if (alertType !== 'Enlace' && alertType !== 'Producto' && alertType !== 'Modelo') return
        values.alertType = alertType

        let cookieToken = CookieService.getCookie("StockFinder");
        let rawResponse = await alertService.registerAlert({ ...values, token: cookieToken });
        let jsonResponse = await rawResponse.json();

        if (rawResponse.ok) {
            setErrorMessage(undefined);
            const alert = withReactContent(Swal);
            alert.fire({
                title: "Registro de alerta",
                icon: "success",
                text: "Se ha agregado la alerta correctamente",
                timer: 3000,
                toast: true,
                timerProgressBar: true,
                willClose: () => {
                    router.push("/profile");
                },
            });
        } else setErrorMessage(jsonResponse.error);
    }

    const returnAlertOptions = () => {
        if (telegram) {
            return (
                <div className="text-sm text-center">
                    <div className="grid grid-cols-1 place-items-center my-2">
                        <span>Telegram</span>
                        {/* <span>Email</span> */}
                    </div>
                    <div className="grid grid-cols-1 place-items-center my-2">
                        <input type="checkbox" name="telegramAlert" checked={values.telegramAlert} onChange={handleToggle} />
                        {/* <input type="checkbox" name="emailAlert" checked={values.emailAlert} onChange={handleToggle} /> */}
                    </div>
                </div>
            );
        } else {
            return (
                <label className="grid place-content-center mt-2 mb-2">
                    <span className="text-center">Email</span>
                    <input type="checkbox" name="emailAlert" checked={values.emailAlert} onChange={handleToggle} />
                </label>
            );
        }
    };


    const newModelAlertForm = () => {
        return (
            <label className="flex flex-col">
                <span className="text-center font-semibold">Selecciona el modelo deseado</span>
                <div className="my-2">
                    <FormControl fullWidth className="rounded-lg">
                        <InputLabel id="InputLabel" className="text-white">Modelo</InputLabel>
                        <Select
                            name='model'
                            className="text-white shadow"
                            id="Select"
                            value={values.model}
                            label="Modelo"
                            onChange={handleChange}
                            required
                        >
                            {gpu_models.map((value) => { return <MenuItem value={value}>{value}</MenuItem> })}
                        </Select>
                    </FormControl>
                </div>
            </label>
        );
    };

    const defaultForm = () => {
        return (<label className="flex flex-col">
            <span className="text-center font-semibold">{alertTitleName}</span>
            <input
                className="p-2 my-1 rounded-lg"
                type="text"
                name={alertName}
                placeholder={alertInput}
                minLength={8}
                value={alertValue}
                onChange={handleChange}
                required
            />
        </label>)
    }

    let alertTitleName;
    let alertName;
    let alertInput;
    let alertValue;

    let selectedForm = 'defaultForm'

    switch (alertType) {
        case 'Enlace':
            alertName = 'url'
            alertInput = 'Enlace'
            alertValue = values.url
            alertTitleName = 'Enlace'
            break;
        case 'Producto':
            alertName = 'uuid'
            alertInput = 'UUID'
            alertValue = values.uuid
            alertTitleName = 'Producto'
            break;
        case 'Modelo':
            selectedForm = 'newModel'
            break
        default:
            return <></>
    }
    return (
        <>
            <div className="my-6 mx-12 text-neutral-300">
                {selectedForm === 'defaultForm' ? defaultForm() : newModelAlertForm()}
                <label className="flex flex-col">
                    <span className="text-center font-semibold text-neutral-300">Precio</span>
                    <input
                        className="p-2 my-1 rounded-lg"
                        type="number"
                        name="price"
                        placeholder="Precio"
                        minLength={1}
                        maxLength={20}
                        value={values.price}
                        onChange={handleChange}
                        required
                    />
                    <a className="text-xs text-center text-slate-300">
                        Todos los precios se consideran en Euros (€). No es necesario introducir el símbolo
                    </a>
                </label>

                <div className="mt-4 text-center text-xs sm:text-sm">
                    <span>¿Donde deseas recibir las alertas?</span>
                </div>

                {returnAlertOptions()}

                <div className="text-center">
                    <p className="text-xs font-bold">IMPORTANTE: </p>
                    <a className="text-xxs sm:text-xs text-blue-400 underline text-center" href="https://t.me/StockFinder_SF_Bot">
                        Inicie el chat de Telegram para recibir los avisos
                    </a>
                </div>

                <ErrorMessageAlert hasError={errorMessage !== undefined} errorText={errorMessage}></ErrorMessageAlert>
                <div className="grid place-items-center my-2 mt-4">
                    <button
                        className="w-full block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
                        onClick={(e) => onButtonPressed(e, alertType)}
                    >
                        Crear alerta
                    </button>
                    <button
                        className="w-full mt-5 block px-8 py-1 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded active:text-blue-500 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring"
                        onClick={(e) => router.push("/profile")}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </>
    )
}
