import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import CustomLayout from "../../components/Layout/CustomLayout";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import TelegramForm from "../../components/Profile/UserTelegram/TelegramForm";
import AuthService from "../../services/AuthService";
import { ServiceContext } from "../_app";

export default function New_Alert({ userData, data }) {
    const { authService } = useContext(ServiceContext);
    const router = useRouter();

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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Asociar Telegram</Typography>
                    <TelegramForm userData={userData}></TelegramForm>
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
