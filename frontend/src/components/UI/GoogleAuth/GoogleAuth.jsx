import React from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleAuth = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GoogleIcon />}
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        fontSize: "16px",
        padding: "10px 20px",
        backgroundColor: "#4285F4",
        "&:hover": { backgroundColor: "#357ae8" },
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleButton;
