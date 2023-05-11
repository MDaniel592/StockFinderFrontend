import { createContext } from "react";
import AlertService from "../services/AlertService";
import AuthService from "../services/AuthService";
import BuildService from "../services/BuildService";
import UserService from "../services/UserService";
import "../styles/global.css";

export const ServiceContext = createContext();
export const BuilderContext = createContext();
export const DropdownContext = createContext();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const authService = new AuthService();
  const userService = new UserService();
  const alertService = new AlertService();
  const buildService = new BuildService();
  return (
    <ServiceContext.Provider value={{ authService, userService, alertService, buildService }}>
      <Component {...pageProps} />
    </ServiceContext.Provider>
  );
}
