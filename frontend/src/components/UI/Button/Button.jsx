import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({
  text,
  onClick,
  color = "primary",
  variant = "contained",
  ...props
}) => (
  <MuiButton color={color} variant={variant} onClick={onClick} {...props}>
    {text}
  </MuiButton>
);

export default Button;
