
import RemoveAlert from "./RemoveAlert";
import StockAlertForm from "./StockAlertForm";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getProductAlert } from "./FilterFunction";

const PRODUCT_ALERT = "productAlert";

export default function AlertManagement({ products, category }) {

    if (products === undefined) return <></>;

    const router = useRouter();
    const [alert, setAlert] = useState({});
    const [isRefreshEnabled, setIsRefreshEnabled] = useState(false);


    function popUpAlert() {
        if (productAlert === undefined) return
        // if (isRefreshEnabled) setIsRefreshEnabled(false);

        const audio = new Audio('/message_received_whatsapp.mp3');
        audio.volume = 1.0
        audio.play();
        const alert = withReactContent(Swal.mixin({
            customClass: {
                confirmButton: 'btn primary mx-1',
                cancelButton: 'btn primary mx-1'
            },
            buttonsStyling: false
        }));
        alert.fire({
            titleText: "Producto disponible",
            icon: "info",
            text: `${productAlert.name} \n${productAlert.shop} - ${productAlert.price} €`,
            showCancelButton: true,
            confirmButtonText: 'Ir al producto',
            cancelButtonText: 'Borrar alerta',
        }).then((result) => {
            if (result.isConfirmed) {
                if (result) router.push(`/producto/${productAlert.uuid}`);

            } else if (result.isDismissed && result.dismiss == 'cancel') {
                removeAlert();
            }

        });
    }

    function updateAlert(alertData) {
        const newAlert = {
            ...alert,
            [category]: { "shop": alertData.shop, "maxPrice": alertData.maxPrice },
        };
        setAlert({ ...newAlert });
        localStorage.setItem(PRODUCT_ALERT, JSON.stringify(newAlert));
        setIsRefreshEnabled(true);
    };


    function removeAlert() {
        const currentAlert = alert
        delete currentAlert[category];
        setAlert({ ...currentAlert });
        setIsRefreshEnabled(false);
        localStorage.setItem(PRODUCT_ALERT, JSON.stringify(currentAlert));
    };


    useEffect(() => {
        const currentAlert = JSON.parse(localStorage.getItem(PRODUCT_ALERT) || "{}");
        setAlert(currentAlert);
        if (currentAlert === "{}") return;
        if (currentAlert[category] === undefined) return;
        setIsRefreshEnabled(true);
    }, []);

    useEffect(() => {
        if (isRefreshEnabled) {
            console.log("Refresh is enabled")
            const intervalId = setInterval(() => {
                window.location.reload();
            }, 60000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isRefreshEnabled]);



    const productAlert = getProductAlert(products, alert[category])
    popUpAlert();
    return (
        <>
            {!isRefreshEnabled && <StockAlertForm updateAlert={updateAlert} gpuModel={category} />}
            {isRefreshEnabled && <RemoveAlert alert={alert[category]} removeAlert={removeAlert} />}
        </>
    )
}