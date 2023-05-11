import UserAlertModel from "../../../models/UserAlertModel";
import LinkUserAlert from "./LinkUserAlert";
import ModelUserAlert from "./ModelUserAlert";
import ProductUserAlert from "./ProductUserAlert";

export default function UserAlerts({ alerts, userData, result }: { alerts: UserAlertModel[]; userData: any, result: any }) {
  // Traerme los alerts del usuario en un listado y guardarlos en una variable. Luego los recorro y los muestro.

  let url_alerts: UserAlertModel[] = [];
  let model_alerts: UserAlertModel[] = [];
  let product_alerts: UserAlertModel[] = [];

  for (let index in alerts) {
    let data = alerts[index]
    switch (data.alertType) {
      case 'Modelo':
        model_alerts.push(data)
        break
      case 'Producto':
        product_alerts.push(data)
        break
      case 'Enlace':
        url_alerts.push(data)
        break
      default:
        break
    }
  }

  if (!alerts.length) {
    // return <p>Cargando las alertas del usuario. Por favor, espere...</p>;
    return <p className="my-2 text-xl">No hay alertas registradas.</p>;

  }
  const title_text = 'text-center lg:text-left text-neutral-300 font-semibold'
  const default_class = "flex flex-wrap justify-center lg:justify-start place-content-center gap-1 md:gap-2"
  return (
    <section className="grid gap-4">
      <h2 className='text-center text-xl font-semibold underline text-neutral-300'>Alertas activas</h2>
      <div className={`${model_alerts.length == 0 ? 'hidden' : ''}`} >
        <h2 className={title_text}>Modelos</h2>
        <div className={default_class}>
          {model_alerts.map(alert => {
            if (alert.alertType === 'Modelo') return <ModelUserAlert key={alert._id} alert={alert} userData={userData} />
          })}
        </div>
      </div>
      <div className={`${product_alerts.length == 0 ? 'hidden' : 'mx-auto'}`}>
        <h2 className={title_text}>Productos</h2>
        <section className={default_class}>
          {product_alerts.map(alert => {
            if (alert.alertType === 'Producto') return <ProductUserAlert key={alert._id} alert={alert} userData={userData} />
          })}
        </section>
      </div>
      <div className={`${url_alerts.length == 0 ? 'hidden' : ''}`}>
        <h2 className={title_text}>Enlaces</h2>
        <section className={default_class}>
          {url_alerts.map(alert => {
            if (alert.alertType === 'Enlace') return <LinkUserAlert key={alert._id} alert={alert} userData={userData} />
          })}
        </section>
      </div>
    </section>
  );
}
