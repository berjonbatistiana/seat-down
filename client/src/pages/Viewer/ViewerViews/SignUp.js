import React, { Component } from "react";
// import axios from "axios";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core/";
import { SignCard, TextFieldInput, SelectDropdown } from "../../common/components";
import signUp from "../../common/images/SignUpPhoto.png";

export class SignUp extends Component {
  // state = {
  //   snackbar: false,
  // };

  // handleSignUp = async (formValues, dispatch) => {
  //   try {
  //     const res = await axios.post("/auth/signup", formValues);
  //     localStorage.setItem("token", res.data);
  //     localStorage.setItem("user", formValues.username);
  //     this.props.setViewerToken(res.data);
  //     this.props.history.push("/challenge");
  //   } catch (e) {
  //     this.setState({ snackbar: true });
  //   }
  // };

  // handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   this.setState({ snackbar: false });
  // };

  render() {
    // const { handleSubmit, pristine, form } = this.props;
    // let disable = () =>
    //   !pristine &&
    //   form.values &&
    //   form.values.username &&
    //   form.values.password &&
    //   form.values.username !== "" &&
    //   form.values.password !== ""
    //     ? false
    //     : true;
    return (
      <SignCard
        title="Sign Up"
        image={signUp}
        question="Already have an account? "
        linkTitle="Sign In"
        link="signin"
        content={
          <form>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <TextFieldInput name="username" label="Username" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldInput name="password" label="Password" />
              </Grid>
              {/* <Grid item xs={12}>
                <TextFieldInput
                  name="confirmPassword"
                  label="Confirm Password"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextFieldInput name="company" label="Company" />
              </Grid>
              <Grid item xs={12}>
                <SelectDropdown>

                </SelectDropdown>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#eb7a34",
                    borderRadius: 25,
                    "&:hover": {
                      backgroundColor: "#0276aa",
                    },
                  }}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </form>
        }
      />
    );
  }
}

// import React from 'react';
// import { Typography, Grid } from "@material-ui/core";
// import Box from "@material-ui/core/Box";
// import Hidden from "@material-ui/core/Hidden";
// import SignUpPhoto from "../../../pages/common/images/SignUpPhoto.png";

// // import { Link as RouterLink } from "react-router-dom";
// // import Link from "@material-ui/core/Link";

// // import { accentColor, secondaryColor } from "./accentColor";

// export const SignUp = () => {
//   return (
//     <div>
//       <Grid
//       container
//       direction="row"
//       style={{ textAlign: "center", height: "93vh" }}
//       justify="center"
//       alignItems="stretch"
//     >
//       <Hidden xsDown>
//         <Grid
//           justify="center"
//           container
//           alignItems="center"
//           item
//           xs={12}
//           sm={6}
//           md={8}
//           style={{ backgroundColor: "White", width: "100%" }}
//         >
//           <Grid item>
//             <img alt="oops" src={SignUpPhoto} style={{ width: "75%" }} />
//           </Grid>
//         </Grid>
//       </Hidden>
//       <Grid justify="center" container alignItems="center" item sm={6} md={4}>
//         <Box p={2}>
//           <Typography variant="h4" component="h1">
//             <Box fontWeight="fontWeightBold" mt={12} mb={2}>
//               {"Sign Up"}
//             </Box>
//           </Typography>
//           <Box>{"props.content"}</Box>
//           <Typography variant="body1" component="div">
//             <Box m={2}>
//               {"props.question"}
//               {/* <Link
//                 to={"props.link"}
//                 component={RouterLink}
//                 style={{ color: "blue" }}
//               >
//                 {"props.linkTitle"}
//               </Link> */}
//             </Box>
//           </Typography>
//         </Box>
//       </Grid>
//     </Grid>
//     </div>
//   )
// }
