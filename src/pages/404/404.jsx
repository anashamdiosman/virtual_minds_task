import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <Box
      className="flex flex-all-center min-h-100"
      sx={{ width: "100%", flexDirection: "column", gap: "10px" }}
    >
      <Typography>404 Page not found</Typography>
      <Box>
        <Link to={"/"}>Go Back Home</Link>
      </Box>
    </Box>
  );
};

export default ErrorComponent;
