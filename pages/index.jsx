import { motion } from "framer-motion";
import React from "react";
import Builder from "../components/Index/Builder";
import Offers from "../components/Index/Offers";
import Price from "../components/Index/Price";
import Shops from "../components/Index/Shops";
import ShortCuts from "../components/Index/ShortCuts";
import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

/*
 * Return the MAIN webpage
 */
export default function Home({ data, userData }) {
  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={false}>
        <Builder />
        <ShortCuts />
        <Shops />
        <Offers data={data} />
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} href="/explainme"
          className="text-xl lg:text-2xl text-center subpixel-antialiased inline-flex py-2 px-4 my-4 rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-900">
          ¿Quieres saber cómo funciona?
        </motion.a>
        <Price />
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

  const res = await fetch(process.env.BACKEND_API_URL + "/deals");
  const data = await res.json();

  return { props: { data, userData } };
}