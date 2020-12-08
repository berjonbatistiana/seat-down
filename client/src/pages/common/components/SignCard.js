import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

// import { accentColor, secondaryColor } from "./accentColor";

export const SignCard = (props) => {
  return (
    <Grid
      container
      direction="row"
      style={{ textAlign: "center", height: "93vh", backgroundColor: '#faf9f7' }}
      justify="center"
      alignItems="stretch"
    >
      <Hidden xsDown>
        <Grid
          justify="center"
          container
          alignItems="center"
          item
          xs={12}
          sm={6}
          md={8}
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <Grid item>
            <img alt="oops" src={props.image} style={{ width: "75%" }} />
          </Grid>
        </Grid>
      </Hidden>
      <Grid justify="center" container alignItems="center" item sm={6} md={4}>
        <Box p={2}>
          <Typography variant="h4" component="h1">
            <Box fontWeight="fontWeightBold" mt={12} mb={2}>
              {props.title}
            </Box>
          </Typography>
          <Box>{props.content}</Box>
          <Typography variant="body1" component="div">
            <Box m={2}>
              {props.question}
              <Link
                to={props.link}
                component={RouterLink}
                style={{ color: "black" }}
              >
                {props.linkTitle}
              </Link>
            </Box>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
