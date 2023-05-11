import React from "react";
import Explanation from "../components/Index/Explanation";
import FAQ from "../components/Index/FAQ";
import HowTo from "../components/Index/HowTo";
import HowWorks from "../components/Index/HowWorks";

import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

/*
 * Return the MAIN webpage
 */
export default function Home({ userData }) {
    return (
        <React.Fragment>
            <CustomLayout userData={userData} title_text={false}>
                <Explanation />
                <HowWorks />
                <HowTo />
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
