import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SignGlass from "../SignGlass";
import { instance as axios } from "../../../utils/AxiosInstance";
import useAuth from "../../../hooks/useAuth";

const SigninForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [viewPass, setViewPass] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/user/signin",
        { username, password },
        {
          withCredentials: true,
        }
      );

      const accessToken = data?.user?.token;

      setAuth({ user: data?.user, accessToken });
      navigate(from, { replace: true });
    } catch (error) {
      alert("Wrong username or password");
      console.log(error);
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
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

  const toggleViewPass = () => {
    setViewPass(!viewPass);
  };

  return (
    <SignGlass>
      <Box component={"form"} onSubmit={handleSignIn}>
        <Typography variant="h3" component="h1" textAlign={"center"} mb={4}>
          Welcome back!
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          size="medium"
          name="username"
          fullWidth
          required
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />

        <FormControl variant="outlined" fullWidth sx={{ mt: 2 }} required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={viewPass ? "text" : "password"}
            placeholder="Enter Password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={viewPass ? "Hide Password" : "Show Password"}
                  onClick={toggleViewPass}
                  edge="end"
                >
                  {viewPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box className="flex flex-all-center" mt={4}>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              paddingY: 1,
              paddingX: 4,
            }}
          >
            Login
          </Button>
        </Box>

        <Box mt={4} px={0.5}>
          <Typography>
            Don't have an account yet?{" "}
            <Link className="anchor-tag" to={"/auth/signup"}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </SignGlass>
  );
};

export default SigninForm;
