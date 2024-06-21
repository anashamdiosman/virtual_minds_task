import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LayoutContainer from "../../components/general/LayoutContainer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import useAuth from "../../hooks/useAuth";
import { privateInstance } from "../../utils/AxiosInstance";
import moment from "moment";

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const handleDelete = async () => {
    try {
      let confirm = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (!confirm) return;
      const data = await privateInstance.delete("/user/my-account", {});

      setAuth({});
      alert("Delete success");
    } catch (error) {
      alert("Failed delete");
    }
  };
  return (
    <LayoutContainer name={"Customer"}>
      <Formik
        initialValues={{
          first_name: auth?.user?.first_name,
          last_name: auth?.user?.last_name,
          email: auth?.user?.email,
          username: auth?.user?.username,
          password: "",
          date_of_birth: auth?.user?.date_of_birth
            ? moment(auth?.user?.date_of_birth)
            : null,
          country_name: auth?.user?.country_name,
          phone_number: auth?.user?.phone_number,
        }}
        onSubmit={async (values) => {
          // Handle form submission
          try {
            const data = await privateInstance.put("/user/my-account", values);
            alert("Update success");
          } catch (error) {
            alert("Failed update");
          }
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Box sx={{ padding: 4 }}>
              <Typography variant="h4" gutterBottom>
                Edit Profile
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="first_name"
                    label="First Name"
                    value={values.first_name}
                    onChange={handleChange}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    value={values.last_name}
                    onChange={handleChange}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Basic date picker"
                        sx={{ width: "100%" }}
                        value={values.date_of_birth}
                        onChange={(v) => setFieldValue("date_of_birth", v)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="country_name"
                    label="Country Name"
                    value={values.country_name}
                    onChange={handleChange}
                    error={touched.country_name && Boolean(errors.country_name)}
                    helperText={touched.country_name && errors.country_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    value={values.phone_number}
                    onChange={handleChange}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginRight: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      // Handle delete action
                      handleDelete();
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </LayoutContainer>
  );
};

export default Profile;
