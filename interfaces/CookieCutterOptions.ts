export default interface CookieCutterOptions {
  expires?: number;
  Path?: string;
  domain?: string;
  secure?: Boolean;
  HostOnly?: Boolean;
  HttpOnly?: Boolean;
  SameSite?: string;
}
