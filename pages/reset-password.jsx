import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import CustomLayout from "../components/Layout/CustomLayout";
import PasswordResetForm from "../components/PasswordResetForm/PasswordResetForm";
import AuthService from "../services/AuthService";

export default function main({ userData }) {
  const theme = createTheme();

  return (
    <React.Fragment>
      <CustomLayout userData={userData} title_text={false}>
        <section className="min-h-screen dark:text-white">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className="rounded-xl bg-zinc-800"
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Cambio de contraseña
                </Typography>
                <hr />
                <form>
                  <PasswordResetForm />
                </form>
              </Box>
            </Container>
          </ThemeProvider>
        </section>
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
