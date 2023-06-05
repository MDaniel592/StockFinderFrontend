import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import CustomLayout from "/components/Layout/CustomLayout";

import ProductsRows from "components/Oportunities/ProductsRows";

export default function OportunitiesISR({ data }) {

  const [userData, setUserData] = useState({})
  const authService = new AuthService();
  useEffect(() => {
    async function fetchUserData() {
      const result = await authService.clientValidateCookie();
      if (!result.error) setUserData(result.userData);
    }
    fetchUserData();
  }, []);

  const tenPercent = data?.[10] ? data[10] : [];
  const twentyPercent = data?.[20] ? data[20] : [];
  const thirtyPercent = data?.[30] ? data[30] : [];

  return (
    <React.Fragment>
      <CustomLayout userData={userData}>
        <div className="flex flex-col gap-4 default-w-space my-2">
          <h1 className="text-2xl sm:text-3xl font-semibold">Oportunidades</h1>
          <p className="text-xx lg:text-sm">
            En esta página encontrarás los productos que han experimentado una reducción de precio (ofertas)
            en un porcentaje determinado (10%, 20% o 30%), en comparación con el precio mínimo registrado
            en los últimos 7 días.
          </p>

          <ProductsRows data={thirtyPercent} discount={{ "start": 30 }} />
          <ProductsRows data={twentyPercent} discount={{ "start": 20, "end": 30 }} />
          <ProductsRows data={tenPercent} discount={{ "start": 10, "end": 20 }} />

        </div>
      </CustomLayout>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.BACKEND_API_URL + "/get_oportunities");
  const data = await res.json();

  return { props: { data }, revalidate: 900 };
}
