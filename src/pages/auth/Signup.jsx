import { Box } from "@mui/material";
import React from "react";
import SignupForm from "../../components/auth/singup/SignupForm";

const Signup = () => {
  return (
    <Box className="auth-background min-h-100 flex flex-all-center">
      <SignupForm />
    </Box>
  );
};

export default Signup;
