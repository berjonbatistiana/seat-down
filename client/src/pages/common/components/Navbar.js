import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

export function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} color="transparent" position="static" elevation={0}>
        <Toolbar>
          <Typography className={classes.title}>
            <Button component={Link} to="/" color="inherit">
              Seat Down
            </Button>
          </Typography>
          <Button to="/signup" component={Link} color="inherit">
            Sign Up
          </Button>
          <Button to="/signin" component={Link} color="inherit">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
