// import cookieCutter from "cookie-cutter";
import CookieCutterOptions from "interfaces/CookieCutterOptions";
import CookiesClient from "js-cookie";

export default class CookieService {
  static setCookie(cookieName: string = "", cookieValue: string = "", options: CookieCutterOptions) {
    // cookieCutter.set(cookieName, cookieValue, options);
    CookiesClient.set(cookieName, cookieValue, options);
  }

  static removeCookie(cookieName: string = "", cookieValue: string = "") {
    // cookieCutter.set(cookieName, cookieValue, { expires: new Date(0) });
    let domainName: string = process.env.DOMAIN_NAME ? process.env.DOMAIN_NAME : 'stockfinder.tech'
    CookiesClient.remove(cookieName, { path: "/", domain: domainName });
  }

  static getCookie(cookieName: string = "") {
    return CookiesClient.get(cookieName);
    // return cookieCutter.get(cookieName);
  }

  // static getCookieSSR({ req, res }: any, cookieName: string = "") {
  //   let cookies = new CookiesServer(req, res);
  //   return cookies.get(cookieName);
  // }
}
