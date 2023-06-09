import React from "react";
import Explanation from "../components/Explain/Explanation";
import FAQ from "../components/Explain/FAQ";
import HowTo from "../components/Explain/HowTo";

import CustomLayout from "../components/Layout/CustomLayout";
import AuthService from "../services/AuthService";

/*
 * Return the MAIN webpage
 */
export default function Home({ userData }) {
    return (
        <React.Fragment>
            <CustomLayout userData={userData} title_text={false}>
                <div className="flex flex-col gap-4 default-w-space my-2">
                    <Explanation />
                    <HowTo />
                    <FAQ />
                </div>
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
