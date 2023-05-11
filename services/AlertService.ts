import DeleteAlert from "interfaces/DeleteAlert";
import RegisterData from "interfaces/RegisterData";

export default class AlertService {

    /**
   * Método usado para poder extraer los modelos de GPU y mostrarlos para crear nuevas alertas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
    getModelsGPU(userInfo: RegisterData, { req, res }: any): Promise<Response> {
      const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

      return fetch(`${process.env.BACK_API}/select_models_gpu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userInfo, userIp }),
      });
    }

  /**
   * Método usado para poder extraer la información del usuario y mostrar las alertas registradas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  registerAlert(userInfo: RegisterData): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/alerts/register_alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para poder extraer la información del usuario y mostrar las alertas registradas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  updateAlert(userInfo: RegisterData): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/alerts/update_alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para poder extraer la información del usuario y mostrar las alertas registradas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  deleteAlert(userInfo: DeleteAlert): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/alerts/delete_alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }
}
