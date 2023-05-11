import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

export default function ProfileLayout({ children, maxWidth = "xs", marginTop = undefined }) {
  const theme = createTheme();
  marginTop = marginTop !== undefined ? marginTop : 8
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={maxWidth}>
          <Box
            sx={{
              marginTop: marginTop,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="rounded-xl bg-zinc-800"
          >
            {children}
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
