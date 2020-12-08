import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { lightBlue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

export const TextFieldInput = ({ input, label }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...input}
        label={label}
        fullWidth
        type={label === "Password" ? "password" : "text"}
      />
    </ThemeProvider>
  );
};
