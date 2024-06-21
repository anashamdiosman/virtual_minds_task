import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Loader = () => {
  return (
    <Box
      className="flex flex-all-center min-h-100"
      sx={{ width: "100%", background: "#212121" }}
    >
      <Typography variant="h4" color="white">
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
