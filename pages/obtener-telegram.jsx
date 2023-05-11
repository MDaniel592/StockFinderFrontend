import React from "react";
import CustomLayout from "../components/Layout/CustomLayout";
import ProfileLayout from "../components/Layout/ProfileLayout";
import AuthService from "../services/AuthService";

export default function Home({ userData }) {
  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={false}>
        <ProfileLayout maxWidth={"sm"}>
          <span className="font-bold text-xl mt-4">Cómo obtener su identificador de Telegram</span>

          <span className="text-lg mt-4 mb-1">Abrir el siguiente enlace con la aplicación de telegram:</span>
          <a href="https://t.me/SF_ValidatorBot" className="text-white hover:underline text-blue-200">
            @SF_ValidatorBot
          </a>

          <div className="m-4">
            <img src="/gif/telegram_example.gif" className="rounded-xl" alt="IMG" loading="lazy" />
          </div>

          <span className="text-lg text-center">En este caso, nuestro ID de telegram sería:</span>
          <span className="text-xl text-center mb-4 text-blue-200 font-bold">12345678</span>
        </ProfileLayout>
      </CustomLayout>
    </React.Fragment>
  );
}

// Server side rendering
export async function getServerSideProps(context) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;
  return {
    props: {
      userData,
    },
  };
}
