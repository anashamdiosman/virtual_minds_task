import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect } from "react";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import RequireAuth from "./components/general/RequireAuth";
import ErrorComponent from "./pages/404/404";
import Home from "./pages/home/Home";
import EditCustomer from "./pages/customers/Customer";
import Customers from "./pages/customers/Costumers";
import Profile from "./pages/profile/Profile";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const ROLES = {
    user: "user",
    admin: "admin",
    superadmin: "superadmin",
  };
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
      path: "/404",
      element: <ErrorComponent />,
    },
    {
      path: "/",
      element: (
        <RequireAuth allowedRoles={[ROLES.admin, ROLES.superadmin, ROLES.user]}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/customers/:uuid",
      element: (
        <RequireAuth allowedRoles={[ROLES.admin, ROLES.superadmin]}>
          <EditCustomer />
        </RequireAuth>
      ),
    },
    {
      path: "/customers",
      element: (
        <RequireAuth allowedRoles={[ROLES.admin, ROLES.superadmin]}>
          <Customers />
        </RequireAuth>
      ),
    },
    {
      path: "/profile",
      element: (
        <RequireAuth allowedRoles={[ROLES.admin, ROLES.superadmin, ROLES.user]}>
          <Profile />
        </RequireAuth>
      ),
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
