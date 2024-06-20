import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#8D24DE",
      },
      mode: "dark",
      background: {
        paper: "#181818",
        default: "#222323",
      },
      secondary: {
        main: "#212121",
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/auth/signin",
      element: <Signin />,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
