import React from "react";
import FAQ from "../components/Index/FAQ";
import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

export default function AvisoLegal({ userData }) {
    return (
        <React.Fragment>
            <CustomLayout userData={userData} title_text={false}>
                <FAQ />
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
    return {
        props: {
            userData,
        },
    };
}
