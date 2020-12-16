import React, { useState, useEffect } from "react";
import { Button, Grid, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import { SignCard, SelectDropdown, AdderModal } from "../../common/components";
import signUp from "../../common/images/SignUpPhoto.png";
import { postSignUp, addCompany, addRole } from "../../../utils";
import axios from "axios";

export const SignUp = () => {
  const history = useHistory();
  const [snackbar, setSnackbar] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [modalChange, setModalChange] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formValues = {
        username,
        password,
        roleId: role,
        companyId: company,
      };
      const res = await postSignUp(formValues);
      localStorage.setItem("token", res.data);
      localStorage.setItem("user", username);
      history.push("/dashboard");
    } catch (e) {
      setSnackbar(true);
    }
  };

  const getRoles = async () => {
    await axios.get("/api/roles").then((res) => {
      const rolesArr = [];
      res.data.forEach((role) => {
        rolesArr.push({ label: role.name, value: role.id });
      });
      setRoles(rolesArr);
    });
  };

  const getCompanies = async () => {
    await axios.get("/api/company").then((res) => {
      const companiesArr = [];
      res.data.forEach((company) => {
        companiesArr.push({ label: company.name, value: company.id });
      });
      setCompanies(companiesArr);
    });
  };

  useEffect(() => {
    getRoles();
    getCompanies();
  }, [modalChange]);

  const handleModalClose = () => {
    setModalChange(!modalChange);
  };

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
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={8}>
                <SelectDropdown
                  helperText="Please select your company"
                  items={companies}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <AdderModal
                  modalName="Company"
                  addFn={addCompany}
                  onModalClose={handleModalClose}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={8}>
                <SelectDropdown
                  helperText="Please select your role"
                  items={roles}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <AdderModal
                  modalName="Role"
                  addFn={addRole}
                  onModalClose={handleModalClose}
                />
              </Grid>
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
                disabled={
                  username === "" &&
                  password === "" &&
                  company === "" &&
                  role === ""
                    ? true
                    : false
                }
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
};
