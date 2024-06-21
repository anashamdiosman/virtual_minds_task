import React, { useEffect } from "react";
import { privateInstance } from "../../utils/AxiosInstance";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import LayoutContainer from "../../components/general/LayoutContainer";
import RequireAuth from "../../components/general/RequireAuth";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const drawerWidth = 240;

  const data = [
    { id: 1, name: "Item 1", description: "Description of Item 1" },
    { id: 2, name: "Item 2", description: "Description of Item 2" },
    { id: 3, name: "Item 3", description: "Description of Item 3" },
  ];

  return (
    <LayoutContainer name={"Home"}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to the Home Page
        </Typography>
        {auth?.user?.role != "user" && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </LayoutContainer>
  );

  // return (
  //   <div style={{ display: "flex" }}>
  //     {/* <Drawer
  //       variant="permanent"
  //       style={{ width: drawerWidth }}
  //       anchor="left"
  //       open
  //     >
  //       <Toolbar />
  //       <div style={{ overflow: "auto" }}>
  //         <List>
  //           {["Home", "Profile", "Settings", "Logout"].map((text, index) => (
  //             <ListItem button key={text}>
  //               <ListItemText primary={text} />
  //             </ListItem>
  //           ))}
  //         </List>
  //       </div>
  //     </Drawer> */}
  //     <main style={{ flexGrow: 1, padding: "80px 24px 24px 24px" }}>
  //       <Box>
  //         <Typography variant="h4" gutterBottom>
  //           Welcome to the Home Page
  //         </Typography>
  //         <TableContainer component={Paper}>
  //           <Table aria-label="simple table">
  //             <TableHead>
  //               <TableRow>
  //                 <TableCell>ID</TableCell>
  //                 <TableCell>Name</TableCell>
  //                 <TableCell>Description</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {data.map((row) => (
  //                 <TableRow key={row.id}>
  //                   <TableCell component="th" scope="row">
  //                     {row.id}
  //                   </TableCell>
  //                   <TableCell>{row.name}</TableCell>
  //                   <TableCell>{row.description}</TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //       </Box>
  //     </main>
  //   </div>
  // );
};

export default Home;
