import React, { useState, useHistory, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BusinessIcon from '@material-ui/icons/Business';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(2),
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    boxShadow: 'none',
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  },
}));

export const AddBuilding = () => {
  const classes = useStyles();

  const onSubmit = (e) => {
    const inputs = {};
    inputs.buildingName =
    console.log(e.target.length);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Building
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="buildingName"
                label="Building Name"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="floorPrefix"
                label="Floor Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numFloors"
                label="Number of Floors"
                type="number"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tablePrefix"
                label="Table Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tablesPerFloor"
                label="Tables per Floor"
                type="number"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="chairPrefix"
                label="Chair Prefix"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="chairsPerTable"
                label="Chairs per Table"
                type="number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
