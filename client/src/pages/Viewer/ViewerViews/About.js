import React from 'react';
import { Typography, Grid, Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import {} from "../../../pages/common/components";
import { Link } from "react-router-dom";
import entrywayColour from "../../../pages/common/images/entryway-colour.svg";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  outlined: {
    color: "#fd8369",
    borderRadius: 25,
  },
  contained: {
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  }
}))

export const About = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      item
      direction="row"
      style={{ minHeight: "50vh" }}
      justify="center"
      alignItems="center"
      xs={12}
    >
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Box m={3}>
          <Typography variant="h3">
            Everything you need for the office return
          </Typography>
          <Box mt={1} mb={3}>
            <Typography variant="body1">
              Make your office an option for those that want to return. Safely reopen, launch pilot groups, and create a long-term flexibility strategy that's right for your team.
            </Typography>
          </Box>
          <Button to="/signup" component={Link} color="inherit" variant="outlined" className={classes.contained}>
            Start Today
          </Button>
        </Box>
      </Grid>
      <Hidden xsDown>
        <Grid sm={6} md={5} lg={4}>
          <Box m={3}>
            <img alt="landing page image" src={entrywayColour} style={{ width: "100%" }} />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  )
}
