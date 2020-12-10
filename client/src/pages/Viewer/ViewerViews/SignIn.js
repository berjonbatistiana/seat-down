import React, { useState } from "react";
// import axios from "axios";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core/";
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

import { SignCard, TextFieldInput } from "../../common/components";
import signIn from "../../common/images/SignUpPhoto.png";

export const SignIn = (props) => {
  // const form = useSelector((state) => state.form.signInForm);
  // const [snackbar, setSnackbar] = useState(false);
  // const { handleSubmit, pristine, history } = props;
  // let disable = () =>
  //   !pristine &&
  //   form.values &&
  //   form.values.username &&
  //   form.values.password &&
  //   form.values.username !== "" &&
  //   form.values.password !== ""
  //     ? false
  //     : true;

  // const handleSignIn = async (formValues, dispatch) => {
  //   try {
  //     const res = await axios.post("/auth/signin", formValues);
  //     localStorage.setItem("token", res.data);
  //     localStorage.setItem("user", formValues.username);
  //     dispatch(setViewerToken(res.data));
  //     history.push("/");
  //   } catch (e) {
  //     setSnackbar(true);
  //   }
  // };
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSnackbar(false);
  // };

  return (
    <SignCard
        title="Sign In"
        image={signIn}
        question="Already have an account? "
        linkTitle="Sign Up"
        link="signup"
        content={
          <form>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <TextFieldInput name="username" label="Username" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldInput name="password" label="Password" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldInput name="company" label="Company" />
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
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        }
      />
  );
};

