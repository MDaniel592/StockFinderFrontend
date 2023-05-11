import React from "react";
import Canales from "../components/Canales";
import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

export default function Home({ data, userData }) {
  /*
   * Return the webpage of telegram channels
   */

  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={"Canales de Telegram"}>
        <Canales data={data}> </Canales>
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

  const res = await fetch(process.env.BACKEND_API_URL + "/telegram_channels");
  const data = await res.json()

  return { props: { data, userData } };
}
