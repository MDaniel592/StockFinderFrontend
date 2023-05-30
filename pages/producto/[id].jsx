import React from "react";
import CustomLayout from "../../components/Layout/CustomLayout";
import Page404 from "../../components/Page404";
import ProductPage from "../../components/Product/ProductPage";
import AuthService from "../../services/AuthService";

// Easy, we receive the UUID as link parameter** and we used it to retrieve the product's data
export default function Home({ data, userData }) {
  if (Object.keys(data).length === 0) {
    return <Page404 />;
  }

  const title_text = data?.name ? data.name : false

  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={title_text}>
        <ProductPage data={data} />
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

  const product_uuid = context["params"]["id"];

  const res = await fetch(process.env.BACKEND_API_URL + "/product/" + product_uuid);
  const data = await res.json()

  return {
    props: {
      data,
      userData,
    },
  };
}
