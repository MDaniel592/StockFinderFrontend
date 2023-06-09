import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CustomLayout from "../../components/Layout/CustomLayout";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import UserDelete from "../../components/Profile/UserDelete/UserDelete";
import AuthService from "../../services/AuthService";
import { ServiceContext } from "../_app";

export default function ProfileChangePassword({ userData, data }) {
    const router = useRouter();
    const { userService, authService } = useContext(ServiceContext);
    const [errorMessage, setErrorMessage] = useState(undefined);




    const validateUserData = async () => {
        if (!userData) {
            authService.logout();
            router.push("/login");
        }
    };

    useEffect(() => {
        validateUserData();
    }, []);

    if (!userData) return <React.Fragment></React.Fragment>;
    if (data) data = data.data

    return (
        <React.Fragment>
            <CustomLayout userData={userData} title_text={"Perfil"}>
                <ProfileLayout>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Eliminar cuenta</Typography>
                    <UserDelete userData={userData}></UserDelete>
                </ProfileLayout>
            </CustomLayout>
        </React.Fragment>

    );
}

// Server side rendering
export async function getServerSideProps(context) {
    let authService = new AuthService();
    const result = await authService.validateCookie(context);
    let userData = null;
    if (result.error) return { props: {} };
    userData = result.userData;
    return { props: { userData } };

}
