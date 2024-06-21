import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utils/AxiosInstance";

const LayoutContainer = ({ name, children }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    {
      id: "1",
      name: "Home",
      href: "/",
      requireAdmin: false,
    },
    {
      id: "2",
      name: "Profile",
      href: "/profile",
      requireAdmin: false,
    },
    {
      id: "3",
      name: "Customers",
      href: "/customers",
      requireAdmin: true,
    },
  ];

  const handleNavigate = ({ href }) => {
    handleClose();
    navigate(href);
  };

  const handleSignOut = async () => {
    try {
      const { data } = await instance.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // const accessToken = data?.user?.token;

      setAuth({});
      // navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        style={{
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
          <IconButton
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {pages?.map((page) => {
              if (page?.requireAdmin && auth?.user?.role === "user") {
                return null;
              }
              return (
                <MenuItem
                  key={page?.id}
                  onClick={() => handleNavigate({ href: page?.href })}
                >
                  {page?.name}
                </MenuItem>
              );
            })}
            <MenuItem key={"logout"} onClick={() => handleSignOut()}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box pt={12} px={4} pb={4}>
        {children}
      </Box>
    </Box>
  );
};

export default LayoutContainer;
