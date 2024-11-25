import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Job Search Insights
      </Typography>
      <Button color="inherit" href="/login">
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
