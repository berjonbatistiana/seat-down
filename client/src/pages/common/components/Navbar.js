import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar, Typography, Link} from "@material-ui/core";
import { Link as RouteLink, useLocation } from "react-router-dom";


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

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} color="transparent" position="static" elevation={0}>
        <Toolbar>
          <Typography className={classes.title}>
            <Link
              component={RouteLink} to="/" color="secondary"
              style={{
                fontWeight: "bold",
              }}
            >
              Seat Down
            </Link>
          </Typography>
          <Typography className={classes.menuButton}>
            <Link
              to="/signup" component={RouteLink} color="inherit"
              style={{
                fontWeight: location.pathname === "/signup" ? "bold" : "",
              }}
            >
              Sign Up
            </Link>
          </Typography>
          <Typography className={classes.menuButton}>
            <Link to="/signin" component={RouteLink} color="inherit"
              style={{
                fontWeight: location.pathname === "/signin" ? "bold" : "",
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
