import Link from 'next/link';
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ServiceContext } from "../../../pages/_app";
import UserPanelAccessIcon from "./UserPanelAccessIcon";

export default function AuthSection({ userData }) {
  const { authService } = useContext(ServiceContext);

  const router = useRouter();

  const onLogoutButtonPressed = (e) => {
    e.preventDefault();
    authService.logout();
    router.push("/");
  };

  const onProfileButtonPressed = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  if (userData) {
    if (userData.email) {
      return (
        <React.Fragment>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={onProfileButtonPressed}
              className="text-base font-semibold px-2 py-2 rounded-md shadow-sm border border-gray-500 hover:bg-zinc-700 text-white hover:text-blue-500 mr-5"
            >
              Panel de usuario
            </button>
            <button onClick={onLogoutButtonPressed} className="inline-flex justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800">
              {/* Cerrar sesión (sesión iniciada como {userData.email}) */}
              Cerrar sesión
            </button>
          </div>
          <div className="flex justify-end md:hidden text-right align-middle">
            <UserPanelAccessIcon
              userData={userData}
              onLogoutButtonPressed={onLogoutButtonPressed}
              img="/images/user-icon.png"
            ></UserPanelAccessIcon>
          </div>
        </React.Fragment>
      );
    }
  }
  return (
    <React.Fragment>
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <Link href="/login" className="text-base font-semibold text-white hover:text-blue-500">
          Iniciar sesión
        </Link>
        <Link
          href="/sign-up"
          className="ml-8 inline-flex items-center justify-center px-2 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-800"
        >
          Registrarse
        </Link>
      </div>
      <div className="flex justify-end md:hidden text-right align-middle">
        <UserPanelAccessIcon img="/images/user-icon.png"></UserPanelAccessIcon>
      </div>
    </React.Fragment>
  );
}
