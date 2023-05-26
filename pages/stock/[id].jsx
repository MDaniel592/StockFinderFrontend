import React from "react";
import Custom404 from "../../components/404";
import CustomLayout from "../../components/Layout/CustomLayout";
import StockPage from "../../components/Stock/StockPage";
import AuthService from "../../services/AuthService";
// import { ALLOWED_MVIDIA, ALLOWED_AMD } from "../../utils/Database";
const ALLOWED_AMD = ['RX6400', "RX6500XT", "RX6600", "RX6600XT", "RX6650XT", "RX6700", "RX6700XT", "RX6750XT", "RX6800", "RX6800XT", "RX6900XT", "RX6950XT", "RX7900XT", "RX7900XTX"];
const ALLOWED_MVIDIA = ["RTX3050", "RTX3060", "RTX3060TI", "RTX3070", "RTX3070TI", "RTX3080", "RTX3080TI", "RTX3090", "RTX3090TI", 'RTX4060TI', 'RTX4070', 'RTX4070TI', "RTX4080", "RTX4090"];

/*
 * nameserver/categorias/[id] -> There are allowed categories to avoid unnecessaries petitions to the DB
 * If there is a valid category, the corresponding webpage will be returned
 */
export default function Home({ data, userData, category }) {
  if (data === null) return <Custom404 />;

  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={category}>
        <StockPage data_recv={data} category={category} key={Math.random()} />
      </CustomLayout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  let authService = new AuthService();
  const result = await authService.validateCookie(context);
  let userData = null;
  if (!result.error) userData = result.userData;

  const allowed_categories = [...ALLOWED_MVIDIA, ...ALLOWED_AMD];
  const category = context["params"]["id"];


  for (let allowed in allowed_categories) {
    if (category == allowed_categories[allowed]) {
      const res = await fetch(process.env.BACKEND_API_URL + "/stock/" + category);
      const data = await res.json();
      return { props: { data, userData, category } };
    }
  }

  const data = null;
  return { props: { data, userData, category } };
}
