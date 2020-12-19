import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Link } from "@material-ui/core";
import { Link as RouteLink, useLocation, useHistory } from "react-router-dom";
import {changePassword} from "../../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

export function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };
  
  const handleChangePassword = async () => {
    const formData = {
      username: localStorage.getItem('user'),
      password: '',
      newPassword: '',
    }
    const {data} = await changePassword(formData);
  }

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.root}
        color="transparent"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Typography className={classes.title}>
            <Link
              component={RouteLink}
              to={token ? "/dashboard" : "/"}
              color="secondary"
              style={{
                fontWeight: "bold",
              }}
            >
              Workspace
            </Link>
          </Typography>
          {token ? (
            <Typography className={classes.menuButton}>
              <Link
                color="inherit"
                onClick={handleSignOut}
                style={{
                  cursor: "pointer",
                }}
              >
                Sign Out
              </Link>
            </Typography>
          ) : (
            <>
              <Typography className={classes.menuButton}>
                <Link
                  to="/signup"
                  component={RouteLink}
                  color="inherit"
                  style={{
                    fontWeight: location.pathname === "/signup" ? "bold" : "",
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
              <Typography className={classes.menuButton}>
                <Link
                  to="/signin"
                  component={RouteLink}
                  color="inherit"
                  style={{
                    fontWeight: location.pathname === "/signin" ? "bold" : "",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
