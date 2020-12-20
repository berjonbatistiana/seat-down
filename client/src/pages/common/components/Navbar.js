import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Snackbar,Button, Paper, Box, Toolbar, Typography, Link, IconButton, Menu, MenuItem, Avatar, Modal, Backdrop, Fade} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { Link as RouteLink, useLocation, useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {changePassword} from "../../../utils";
import {PasswordFormControl} from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginTop: theme.spacing(2),
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  },
}));

export function Navbar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClose = (e) => {
    if (e.key === "Tab") {
      return;
    }
    setOpen(false);
    setAnchorEl(null);
    setOldPass('');
    setNewPass('');
    setShowNewPass(false);
    setShowOldPass(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
    handleClose();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (confirmPass !== newPass) {
      setMessage('The new password and the confirmation password do not match.');
      setSeverity('error');
      return setSnackbar(true);
    }
    const formData = {
      username: localStorage.getItem('user'),
      password: oldPass,
      newPassword: newPass,
    }
    const {data} = await changePassword(formData);
    if (data !== -1) {
      setMessage('You have successfully changed your password.');
      setSeverity('success');
      setSnackbar(true);
      handleClose();
    } else {
      setMessage('Sorry, your old password was entered incorrectly.');
      setSeverity('error');
      setSnackbar(true);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.root} color="transparent" position="static" elevation={0}>
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
            <>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar style={{ backgroundColor: "#fd8369" }}>{user[0]}</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleOpen}>Reset Password</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                <Modal
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box component={Paper} p={3} className={classes.paper}>
                      <Typography variant="h5">Reset Password</Typography>
                      <form noValidate autoComplete="off" onSubmit={handleChangePassword}>
                        <PasswordFormControl
                          type={showOldPass ? 'text' : 'password'}
                          value={oldPass}
                          onChange={(e) => setOldPass(e.target.value)}
                          id="oldPass" label="Old Password"
                          onClick={() => setShowOldPass(!showOldPass)}
                          icon={showOldPass ? <Visibility /> : <VisibilityOff />}
                        />
                        <PasswordFormControl
                          type={showNewPass ? 'text' : 'password'}
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          id="newPass" label="New Password"
                          onClick={() => setShowNewPass(!showNewPass)}
                          icon={showNewPass ? <Visibility /> : <VisibilityOff />}
                        />
                        <PasswordFormControl
                          type={showConfirmPass ? 'text' : 'password'}
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          id="confirmPass" label="Confirm New Password"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          icon={showConfirmPass ? <Visibility /> : <VisibilityOff />}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          className={classes.submit}
                          disabled={oldPass === "" || newPass === "" ? true : false}
                        >
                          Update Password
                        </Button>
                      </form>
                    </Box>
                  </Fade>
                </Modal>
              </Menu>
            </>
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
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackbar}
            autoHideDuration={3500}
            onClose={handleSnackbarClose}>
            <MuiAlert onClose={handleSnackbarClose} severity={severity}>
              {message}
            </MuiAlert>
          </Snackbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
