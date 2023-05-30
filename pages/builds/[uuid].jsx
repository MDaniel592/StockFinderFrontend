import React from "react";
import BuildPage from "../../components/Builder/BuildPage";
import CustomLayout from "../../components/Layout/CustomLayout";
import Page404 from "../../components/Page404";
import AuthService from "../../services/AuthService";

// Easy, we receive the UUID as link parameter** and we used it to retrieve the product's data
export default function Home({ data, userData, build_uuid }) {
    if (Object.keys(data).length === 0) return <Page404 />;

    return (
        <React.Fragment>
            <CustomLayout userData={userData} title_text={"Configuración"}>
                <BuildPage data={data} build_uuid={build_uuid} />
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

    const build_uuid = context["params"]["uuid"];

    let data = {}
    const res = await fetch(process.env.BACKEND_API_URL + "/get_build/" + build_uuid);
    if (res.ok) {
        data = await res.json()
    }

    return { props: { data, userData, build_uuid } };
}
