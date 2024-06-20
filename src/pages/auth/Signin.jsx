import { Box } from "@mui/material";
import React from "react";
import SigninForm from "../../components/auth/signin/SigninForm";

const Signin = () => {
  return (
    <Box className="auth-background min-h-100 flex flex-all-center">
      <SigninForm />
    </Box>
  );
};

export default Signin;
