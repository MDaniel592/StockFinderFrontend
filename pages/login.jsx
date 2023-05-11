import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import CustomLayout from "../components/Layout/CustomLayout";
import ProfileLayout from "../components/Layout/ProfileLayout";
import LoginForm from "../components/LoginForm/LoginForm";
import AuthService from "../services/AuthService";
import { ServiceContext } from "./_app";

export default function main({ userData }) {
  const { authService } = useContext(ServiceContext);

  const theme = createTheme();
  const router = useRouter();
  const onLoginSuccess = () => {
    router.push("/profile");
  };

  const validateUserData = async () => {
    try {
      if (userData === null) {
        authService.logout();
        router.push("/login");
        return;
      }
      router.push("/profile");
    } catch (err) {
      authService.logout();
      router.push("/login");
      return;
    }
  };

  useEffect(() => {
    validateUserData();
  }, []);

  return (
    <React.Fragment>
      <CustomLayout userData={""} title_text={"Inicio de sesión"}>
        <ProfileLayout>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <hr />
          <form>
            <LoginForm onLoginSuccess={onLoginSuccess}></LoginForm>
          </form>
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
  if (!result.error) userData = result.userData;
  return {
    props: {
      userData,
    },
  };
}
