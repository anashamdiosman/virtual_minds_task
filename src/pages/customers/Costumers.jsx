import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LayoutContainer from "../../components/general/LayoutContainer";
import { useNavigate } from "react-router-dom";
import { privateInstance } from "../../utils/AxiosInstance";

const Customers = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const handleEdit = (id) => {
    navigate(`/customers/${id}`);
    console.log(`Edit customer with id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete customer with id ${id}`);
  };

  const fetchCustomers = async () => {
    try {
      const { data } = await privateInstance.post("/user/fetch-all", {});

      setCustomers(data?.user);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <LayoutContainer name={"Customers"}>
      <TableContainer component={Paper}>
        <Table aria-label="customers table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Country Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.rows?.length > 0 &&
              customers?.rows?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.first_name}</TableCell>
                  <TableCell>{customer.last_name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.username}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                  <TableCell>{customer.country_name}</TableCell>
                  <TableCell>{customer.phone_number}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(customer.uuid)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutContainer>
  );
};

export default Customers;
