import React from "react";
import CustomLayout from "../Layout/CustomLayout";
import AuthService from "../../services/AuthService";

export default function Home({ data, userData }) {

  return (
    <React.Fragment>
      <CustomLayout userData={userData}>

      </CustomLayout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;

  const res = await fetch(process.env.BACKEND_API_URL + "/get_oportunities");
  const data = await res.json();

  return { props: { data, userData } };
}