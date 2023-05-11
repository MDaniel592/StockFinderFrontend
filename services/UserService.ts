import RegisterData from "interfaces/RegisterData";
import ResetPassword from "interfaces/ResetPassword";

export default class UserService {
  static async getUserRegisteredInfo({ req, res }: any, token: string): Promise<any> {
    if (!token) return Promise.resolve(null);

    const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

    const rawResponse = await fetch(`${process.env.NEXT_API}/get-user-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userIp }),
    });

    if (!rawResponse.ok) return Promise.resolve(null);
    const jsonResponse = await rawResponse.json();
    return Promise.resolve(jsonResponse);
  }

  /**
   * Método usado para poder pasar comprobar si el usuario existe para permitir el cambio de contraseña.
   *
   * @param userInfo objeto con los valores del usuario en el momento de hacer el cambio de contraseña. En el servidor se comprobará el email.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  checkUserExist(userInfo: ResetPassword): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/check_user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para poder pasar cambiar la contraseña.
   *
   * @param userInfo objeto con los valores del usuario en el momento de solicitar el cambio de contraseña. En el servidor se comprobará el email y email code.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  passwordReset(userInfo: ResetPassword): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/email_password_reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para poder pasar cambiar la contraseña.
   *
   * @param userInfo objeto con los valores del usuario en el momento de solicitar el cambio de contraseña. En el servidor se comprobará el email y email code.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  profilePasswordReset(userInfo: ResetPassword): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/profile_password_reset`, {
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
  getUserWatches(token: string): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/user-watches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }

  /**
   * Método usado para poder extraer la información del usuario y mostrar las alertas registradas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  registerAlert(userInfo: RegisterData): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/register_alert`, {
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
  updateAlert(alertInfo: RegisterData, token: string, alertId: string): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/update_alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...alertInfo, token, alertId }),
    });
  }

  /**
   * Método usado para poder extraer la información del usuario y mostrar las alertas registradas.
   *
   * @param userInfo objeto con los valores del usuario.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  deleteAlert(alertInfo: { alertId: string; productUrl: string; token: string }): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/users/delete_alert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alertInfo),
    });
  }
}
