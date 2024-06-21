import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignGlass from "../SignGlass";
import { useFormik } from "formik";
import { signupSchema } from "../../../validation/signupSchema";
import useAuth from "../../../hooks/useAuth";
import { instance } from "../../../utils/AxiosInstance";

const SignupForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await instance.post("/user/signup", values, {
          withCredentials: true,
        });

        const accessToken = data?.user?.token;

        setAuth({ user: data?.user, accessToken });
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: signupSchema,
  });
  return (
    <SignGlass>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h3" component="h1" textAlign={"center"} mb={4}>
          Welcome!
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="first_name"
              fullWidth
              required
              type="text"
              placeholder="Enter First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              label="First Name"
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="last_name"
              fullWidth
              required
              type="text"
              placeholder="Enter Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              label="Last Name"
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="username"
              fullWidth
              required
              type="text"
              placeholder="Enter Username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="email"
              fullWidth
              required
              type="email"
              placeholder="Enter E-mail"
              label="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="password"
              fullWidth
              required
              type="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              size="medium"
              name="confirm_password"
              fullWidth
              required
              type="password"
              placeholder="Confirm Password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              label="Confirm Password"
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              helperText={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
            />
          </Grid>
        </Grid>

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
            Sign up
          </Button>
        </Box>
        <Box mt={4} px={0.5}>
          <Typography>
            Already have an account?{" "}
            <Link className="anchor-tag" to={"/auth/signin"}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </SignGlass>
  );
};

export default SignupForm;
