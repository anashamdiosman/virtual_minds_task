import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <Box className="flex flex-all-center min-h-100" sx={{ width: "100%" }}>
      <Typography>404 Page not found</Typography>
      <Link to={"/"}>Go Back Home</Link>
    </Box>
  );
};

export default ErrorComponent;
