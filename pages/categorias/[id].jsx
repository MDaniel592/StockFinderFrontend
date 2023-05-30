import React from "react";
import CategorySection from "../../components/Categories_pages/CategorySection";
import CustomLayout from "../../components/Layout/CustomLayout";
import Page404 from "../../components/Page404";
import AuthService from "../../services/AuthService";

const allowedCategories = [
  "tarjetas-graficas", "procesadores", "placas-base", "memoria-ram",
  "fuentes-alimentacion", "almacenamiento", "torres", "disipadores-cpu"
];


/*
 * nameserver/categorias/[id] -> There are allowed categories to avoid unnecessaries petitions to the DB
 * If there is a valid category, the corresponding webpage will be returned
 */
export default function Home({ data, category, userData }) {
  if (!data) return <Page404 />;

  const title_text = category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={title_text}>
        <CategorySection category={category} data={data} />
      </CustomLayout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;

  const category = context["params"]["id"];

  for (let allowed in allowedCategories) {
    if (category != allowedCategories[allowed]) continue
    const res = await fetch(process.env.BACKEND_API_URL + "/category/" + category);
    const data = await res.json();
    return { props: { data, category, userData } };
  }

  const data = false;
  return { props: { data, userData } };
}
