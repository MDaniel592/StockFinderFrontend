import React from "react";
import Canales from "../Canales";
import AuthService from "../../services/AuthService";

export default function Home({ data, userData }) {
  /*
   * Return the webpage of telegram channels
   */

  return (
    <React.Fragment>
      <Canales data={data}> </Canales>
    </React.Fragment>
  );
}


// Server side rendering
export async function getServerSideProps(context) {
  const title = "Canales de Telegram"

  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;

  const res = await fetch(process.env.BACKEND_API_URL + "/telegram_channels");
  const data = await res.json()

  return { props: { data, userData, title } };
}
