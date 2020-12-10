import React, { useState } from "react";
import {Button, Grid, TextField, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import { SignCard } from "../../common/components";
import signUp from "../../common/images/SignUpPhoto.png";
import {postSignIn} from "../../../utils"

export const SignIn = () => {
  const history = useHistory();

  const [snackbar, setSnackbar] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formValues = {username, password}
      const res = await postSignIn(formValues);
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", username);
      history.push("/dashboard");
    } catch (e) {
      setSnackbar(true );
    }
  }

  return (
    <SignCard
      title="Sign In"
      image={signUp}
      question="Don't have an account? "
      linkTitle="Sign Up"
      link="signup"
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
                disabled={username === '' && password === '' ? true : false}
              >
                Sign In
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
              We couldn’t find an account matching the username and password you
              entered. Please check your username and password and try again.
            </MuiAlert>
          </Snackbar>
        </>
      }
    />
  );
}
