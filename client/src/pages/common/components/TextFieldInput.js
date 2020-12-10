import React from "react";
import TextField from "@material-ui/core/TextField";

export const TextFieldInput = ({ input, label }) => {
  return (
      <TextField
        {...input}
        label={label}
        fullWidth
        type={label === "Password" ? "password" : "text"}
      />
  );
};
