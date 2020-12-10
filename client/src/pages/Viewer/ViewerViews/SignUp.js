import React, { useState } from "react";
import {Button, Grid, TextField, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import { SignCard, SelectDropdown } from "../../common/components";
import signUp from "../../common/images/SignUpPhoto.png";
import {postSignUp} from "../../../utils"

export const SignUp = () => {
  const history = useHistory();

  const [snackbar, setSnackbar] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formValues = {username, password, company, role}
      const res = await postSignUp(formValues);
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", username);
      history.push("/dashboard");
    } catch (e) {
      setSnackbar(true );
    }
  }

  return (
    <SignCard
      title="Sign Up"
      image={signUp}
      question="Already have an account? "
      linkTitle="Sign In"
      link="signin"
      content={
        <>
          <Grid item container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Company" value={company} onChange={(e) => setCompany(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <SelectDropdown value={role} onChange={(e) => setRole(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#fd8369",
                  borderRadius: 25,
                  "&:hover": {
                    backgroundColor: "#fd8369",
                  },
                }}
                onClick={handleSubmit}
                disabled={username === '' && password === '' && company === '' && role === '' ? true : false}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={snackbar}
            onClose={handleClose}
          >
            <MuiAlert onClose={handleClose} severity="error">
              The username you have entered is not available.
            </MuiAlert>
          </Snackbar>
        </>
      }
    />
  );
}
