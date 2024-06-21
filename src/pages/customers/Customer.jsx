import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LayoutContainer from "../../components/general/LayoutContainer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { privateInstance } from "../../utils/AxiosInstance";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/loader/Loader";

const roles = ["admin", "superadmin", "user"];

const EditCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const { uuid } = useParams();

  const fetchCustomer = async () => {
    try {
      const { data } = await privateInstance.post("/user/fetch", { uuid });

      setCustomer(data?.user);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async () => {
    try {
      let confirm = window.confirm(
        "Are you sure you want to delete this customer?"
      );
      if (!confirm) return;
      const data = await privateInstance.delete("/user/admin", {
        data: { uuid },
      });
      alert("Delete success");
    } catch (error) {
      alert("Failed delete");
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <LayoutContainer name={"Customer"}>
      {customer ? (
        <Formik
          initialValues={{
            first_name: customer?.first_name,
            last_name: customer?.last_name,
            email: customer?.email,
            username: customer?.username,
            password: "",
            date_of_birth: customer?.date_of_birth
              ? moment(customer?.date_of_birth)
              : null,
            role: customer?.role,
            country_name: customer?.country_name,
            phone_number: customer?.phone_number,
          }}
          onSubmit={async (values) => {
            try {
              const data = await privateInstance.put("/user/admin", {
                ...values,
                uuid,
              });
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
                  Edit Customer
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
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        User role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.role}
                        label="User role"
                        onChange={({ target }) =>
                          setFieldValue("role", target?.value)
                        }
                      >
                        {roles?.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <TextField
                      fullWidth
                      select
                      name="role"
                      label="Role"
                      value={values.role}
                      onChange={handleChange}
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                    >
                      {roles.map((role) => (
                        <MenuItem
                          key={role}
                          value={role}
                          on
                          onSelect={(val) => {
                            console.log(val);
                          }}
                        >
                          {role}
                        </MenuItem>
                      ))}
                    </TextField> */}
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
                      error={
                        touched.country_name && Boolean(errors.country_name)
                      }
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
                      error={
                        touched.phone_number && Boolean(errors.phone_number)
                      }
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
      ) : (
        <Loader />
      )}
    </LayoutContainer>
  );
};

export default EditCustomer;
