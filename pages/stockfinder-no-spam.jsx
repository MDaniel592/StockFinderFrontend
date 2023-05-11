import React from "react";
import CustomLayout from "../components/Layout/CustomLayout";
import ProfileLayout from "../components/Layout/ProfileLayout";

export default function Home() {
  return (
    <React.Fragment>
      <CustomLayout>
        <ProfileLayout maxWidth={"lg"}>
          <span className="font-bold text-3xl mt-4">Recibir correos de StockFinder</span>

          <span className="text-lg mt-4 mb-1">Debe añadir stockfinder.web@gmail.com como DESEADO</span>

          <div className="m-4">
            <img src="/gif/spam_example.gif" className="rounded-xl" alt="IMG" loading="lazy" />
          </div>
        </ProfileLayout>
      </CustomLayout>
    </React.Fragment>
  );
}
