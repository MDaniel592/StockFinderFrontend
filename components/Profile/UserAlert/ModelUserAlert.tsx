import { XIcon } from "@heroicons/react/solid";
import { NotificationType } from "models/NotificationType";
import UserAlertModel from "models/UserAlertModel";
import React, { useContext } from "react";
import CookieService from "services/CookieService";
import UserService from "services/UserService";
import Swal from "sweetalert2";
import withReactContent, { SweetAlert2 } from "sweetalert2-react-content";
import { ServiceContext } from "../../../pages/_app";
import UserAlertNotification from "./UserAlertNotification";

export default function UserAlert({
  alert,
  userData,
}: {
  alert: UserAlertModel;
  userData: { email: string; telegram: string };
}) {

  if (alert.specData.productName === undefined) return <></>;

  let { userService }: { userService: UserService } = useContext(ServiceContext);
  let notificationTypes: NotificationType[] = [];
  // notificationTypes.push(new NotificationType("Email", alert.specData.wantsToBeAlertedByEmail));
  if (userData.telegram) notificationTypes.push(new NotificationType("Telegram", alert.specData.wantsToBeAlertedByTelegram))

  const [newPrice, setNewPrice] = React.useState(alert.userMaxPrice);
  const [changeEnabled, setChangeEnabled] = React.useState(false);
  const [updateEnabled, setUpdateEnabled] = React.useState(false);
  const [productNotificationTypes, setProductNotificationTypes] = React.useState([...notificationTypes]);

  async function deleteAlert() {
    const confirmDialog: SweetAlert2 = withReactContent(Swal);
    confirmDialog
      .fire({
        title: "Eliminar alerta",
        text: "¿Seguro que quiere eliminar la alerta?",
        icon: "warning",
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const token = CookieService.getCookie("StockFinder");
          const alertId = alert._id;
          let response: Response = await userService.deleteAlert({
            alertId,
            productUrl: '',
            token,
          });
          if (!response.ok) {
            let jsonResponse = await response.json();
            withReactContent(Swal).fire({
              title: "Alerta eliminada",
              icon: "error",
              text: jsonResponse.error,
              timer: 3000,
              toast: true,
              timerProgressBar: true,
            });
          } else {
            withReactContent(Swal)
              .fire({
                title: "Alerta eliminada",
                icon: "success",
                text: "Alerta eliminada correctamente",
                timer: 3000,
                toast: true,
                timerProgressBar: true,
              })
              .then(() => {
                window.location.reload();
              });
          }
        }
      });
  }

  async function updateAlert() {
    const token = CookieService.getCookie("StockFinder");
    const alertId = alert._id;
    let response: Response = await userService.updateAlert(
      {
        email: userData.email,
        telegram: userData.telegram,
        url: '',
        uuid: '',
        price: String(newPrice),
        emailAlert:
          productNotificationTypes.find((notificationType) => notificationType.notificationName === "Email")
            ?.wantsToBeNotifiedByThis ?? true,
        telegramAlert:
          productNotificationTypes.find((notificationType) => notificationType.notificationName === "Telegram")
            ?.wantsToBeNotifiedByThis ?? true,
      },
      token,
      alertId
    );
    if (!response.ok) {
      let jsonResponse = await response.json();
      withReactContent(Swal).fire({
        title: "Alerta actualizada",
        icon: "error",
        text: jsonResponse.error,
        timer: 3000,
        toast: true,
        timerProgressBar: true,
      });
    } else {
      withReactContent(Swal).fire({
        title: "Alerta actualizada",
        icon: "success",
        text: "Alerta actualizada correctamente",
        timer: 3000,
        toast: true,
        timerProgressBar: true,
      });
    }
  }

  function enableChange(e: React.MouseEvent<HTMLInputElement>) {
    if (e.detail < 2) return;
    setChangeEnabled(true);
  }

  function handleTouchEvent(e: React.TouchEvent<HTMLInputElement>) {
    e.preventDefault();
    setChangeEnabled(true);
  };

  function onPriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) === alert.userMaxPrice) setUpdateEnabled(false);
    else setUpdateEnabled(true);
    setNewPrice(parseInt(e.target.value));
  }

  function onProductNotificationChange(notificationTypeChanged: NotificationType) {
    console.log("Se ha hecho llamado al cambio en el tipo de notificación");
    const index = productNotificationTypes.findIndex(
      (notification) => notification.notificationName === notificationTypeChanged.notificationName
    );
    if (index === -1) {
      console.error("algo ha ido mal seteando los nuevos tipos de notificaciones");
      return;
    }
    setProductNotificationTypes([
      ...productNotificationTypes.slice(0, index),
      notificationTypeChanged,
      ...productNotificationTypes.slice(index + 1),
    ]);
    setUpdateEnabled(true);
  }

  const url = 'stock/' + alert.specData.productName.replace("Radeon", "").replace("GeForce", "").replaceAll(" ", "")
  const active_url = true ? alert.specData.productName.indexOf('Radeon') != -1 || alert.specData.productName.indexOf('GeForce') != -1 : false
  console.log()
  return (
    <React.Fragment>
      <div className="relative grid items-center bg-zinc-800 rounded-xl pt-8 pb-2 px-2 text-neutral-300">

        <div className="absolute text-xxs italic top-2 left-2 text-white px-1 bg-blue-500 rounded-xl" >{alert.alertType}</div>
        <button className="absolute w-6 top-2 right-2 hover:text-rose-600 text-white" onClick={deleteAlert}><XIcon /></button>

        <div className="my-1">
          <a href={url} className={`${active_url ? '' : 'hidden'} text-xs sm:text-sm font-bold hover:underline hover:underline-blue-500 hover:text-blue-500`}>{alert.specData.productName}</a>
          <p className={`${active_url ? 'hidden' : ''} text-xs sm:text-sm font-bold`}>{alert.specData.productName}</p>
        </div>

        <div className="w-full">

          <div className="text-left">
            <div className="flex flex-wrap justify-start font-semibold">
              <h3 className="text-xs font-bold text-center">Precio máximo:</h3>
              <div className="whitespace-nowrap text-xxs sm:text-xs">
                <input
                  type="number"
                  placeholder="Nuevo precio"
                  pattern="[0-9]*"
                  value={newPrice}
                  onTouchStart={handleTouchEvent}
                  onClick={enableChange}
                  onChange={onPriceChange}
                  readOnly={changeEnabled === false}
                  className="rounded ml-1 px-1 text-xxs sm:text-xs font-semibold bg-transparent w-12 text-right border-2 border-dashed border-emerald-500"
                />
                <span className="whitespace-pre"> €</span>
              </div>
            </div>
          </div>
        </div>

        <div key='alerts' className="w-full my-1 text-left flex gap-3 lg:gap-4 items-center text-xs font-semibold">
          <h3 className="text-xs font-bold text-center">Avisos</h3>
          <UserAlertNotification
            notificationTypes={notificationTypes}
            onProductNotificationChange={onProductNotificationChange} />
        </div>

        <div key='button' className="text-sm mx-auto">
          <button
            className="block px-2 border-2 mx-auto border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl disabled:bg-transparent disabled:border-slate-500 disabled:text-white"
            disabled={updateEnabled === false}
            onClick={updateAlert}
          >
            Actualizar
          </button>
        </div>
      </div>
      <style jsx>
        {`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type=number] {
              -moz-appearance: textfield;
            }
          `}
      </style>
    </React.Fragment >
  );
}
