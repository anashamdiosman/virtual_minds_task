import { Box } from "@mui/material";
import React from "react";

function SignGlass({ children }) {
  return (
    <Box className="sign-glass" p={6}>
      {children}
    </Box>
  );
}

export default SignGlass;
