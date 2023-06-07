import Cookies from "cookies";
import LoginResponse from "interfaces/LoginResponse";
import RegisterUser from "interfaces/RegisterUser";
import ResetPassword from "interfaces/ResetPassword";
import jwt from "jsonwebtoken";
import { CustomErrors } from "utils/CustomErrors";
import CookieService from "./CookieService";

export default class AuthService {
  static async getUserDataFromToken(
    { req, res }: any,
    token: string
  ): Promise<{ email: string; telegram: string } | null> {
    if (!token) return Promise.resolve(null);

    const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

    let validationResponse = await fetch(`${process.env.BACK_API}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userIp }),
    });

    if (!validationResponse.ok) return Promise.resolve(null);

    let userData: any = jwt.decode(token);

    return Promise.resolve({ email: userData.email, telegram: userData.telegram });
  }

  async clientValidateCookie(): Promise<LoginResponse> {
    try {
      let token = CookieService.getCookie("StockFinder")
      if (!token) return Promise.resolve({ error: CustomErrors.TOKEN_NOT_VALID });

      let response = await fetch(`${process.env.NEXT_API}/auth/validate-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response) return Promise.resolve({ error: CustomErrors.TOKEN_NOT_VALID });

      let jsonResponse = await response.json();
      if (!response.ok) return Promise.resolve({ error: jsonResponse.error });

      let tokenData: any = jwt.decode(token);
      return Promise.resolve({ userData: { email: tokenData.email, telegram: tokenData.telegram, role: tokenData.role } });
    } catch (error) {
      return Promise.reject();
    }
  }

  async validateCookie({ req, res }: any): Promise<LoginResponse> {
    const cookies = new Cookies(req, res);

    const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

    let token = cookies.get("StockFinder");
    if (!token) return Promise.resolve({ error: CustomErrors.TOKEN_NOT_VALID });

    let validationResponse = await fetch(`${process.env.BACK_API}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userIp }),
    });

    if (!validationResponse.ok) return Promise.resolve({ error: CustomErrors.TOKEN_NOT_VALID });

    let tokenData: any = jwt.decode(token);

    return Promise.resolve({ userData: { email: tokenData.email, telegram: tokenData.telegram, role: tokenData.role } });
  }

  async login(userToLogin: RegisterUser): Promise<LoginResponse> {
    try {
      let response = await fetch(`${process.env.NEXT_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToLogin),
      });
      if (!response) return Promise.resolve({ error: CustomErrors.LOGIN_NOT_SUCCESS });

      let jsonResponse = await response.json();

      if (!response.ok) return Promise.resolve({ error: jsonResponse.error });

      let cookie_data;
      if (process.env.IS_PRODUCTION) {
        cookie_data = {
          Path: "/",
          SameSite: "Strict",
          domain: process.env.DOMAIN_NAME,
          secure: true,
          HostOnly: true,
          expires: 7,
        };
      } else {
        cookie_data = { Path: "/", expires: 7 };
      }

      CookieService.setCookie("StockFinder", jsonResponse.token, cookie_data);
      // Cookies created via JavaScript cannot include the HttpOnly flag

      let decodedToken: any = jwt.decode(jsonResponse.token);

      return Promise.resolve({ userData: { email: decodedToken.email, telegram: decodedToken.telegram, role: decodedToken.role } });
    } catch (error) {
      return Promise.reject();
    }
  }

  logout() {
    CookieService.removeCookie("StockFinder", "");
  }

  /**
   * Método usado para poder pasar la primera fase del registro: comprueba el correo y las contraseñas.
   *
   * @param userInfo objeto con los valores del usuario en el momento de hacer el primer paso de registro. En el servidor se comprobará el email, password y passwordConfirmation.
   * @returns La promesa con un 200 OK o un json del estilo {error: descripción del error}
   */
  checkUserInfo(userInfo: RegisterUser): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/auth/user-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para validar la segunda fase del registro: el código de Telegram
   *
   * @param userInfo es el objeto con los valores del usuario a la hora de hacer el segundo paso del registro. Se comprobará en este caso el ID de Telegram que se haya introducido.
   * @returns Una promesa con un 200 OK o un error en formato JSON del palo {error: descripcion}
   */
  checkTelegramId(userInfo: RegisterUser): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/auth/telegram-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método usado para generar los códigos de verificacion de Telegram y del correo.
   *
   * @param typeOfCode tipo de código a generar. Será bien de correo o de telegram.
   * @param param1 es un objeto con los parámetros necesarios a inyectar en la URL y mandarla al servidor para generar el código.
   * @returns una promesa con un 200 OK o bien un error con formato JSON del palo {error: descripcion}
   */
  generateCode({ paramName, paramValue }: { paramName: String; paramValue: String }): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/auth/generate-codes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramName, paramValue }),
    });
  }


    /**
   * Método que comprueba contra el servidor que el código introducido por el usuario es correcto.
   * @param userInfo información con todos los campos del usuario a la hora de hacer el registro
   * @returns 200 OK si todo ha ido bien, error si pasa lo contrario.
   */
    verifyTelegramCode(userInfo: RegisterUser): Promise<Response> {
      return fetch(`${process.env.NEXT_API}/auth/verify-telegram-code`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(userInfo),
      });
    }
  

  /**
   * Método que comprueba contra el servidor que los códigos introducidos por el usuario son correctos.
   * @param userInfo información con todos los campos del usuario a la hora de hacer el registro
   * @returns 200 OK si todo ha ido bien, error si pasa lo contrario.
   */
  verifyRegisterCodes(userInfo: RegisterUser): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/auth/verify-register-codes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  /**
   * Método que comprueba contra el servidor que el código introducido por el usuario son correctos.
   * @param userInfo información con todos los campos del usuario a la hora de hacer el registro
   * @returns 200 OK si todo ha ido bien, error si pasa lo contrario.
   */
  verifyPasswordResetCode(userInfo: ResetPassword): Promise<Response> {
    return fetch(`${process.env.NEXT_API}/auth/verify-password-reset-code`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }
}
