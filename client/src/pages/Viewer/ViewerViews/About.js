import React from "react";
import { Typography, Grid, Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import {} from "../../../pages/common";
import { Link } from "react-router-dom";
import entrywayColour from "../../../pages/common/images/entryway-colour.svg";
import Button from "@material-ui/core/Button";
import { Footer } from "../../common/components";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import BarChartIcon from "@material-ui/icons/BarChart";
import SaveMoney from "../../common/images/PaymentProcessed.png"
import WorkplaceAnalytics from "../../common/images/hockeystickgrowth.jpg"
import StaySafe from "../../common/images/Self Quarantine.jpg"


const useStyles = makeStyles((theme) => ({
  contained: {
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  },
}));

export const About = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        style={{ minHeight: "50vh", backgroundColor: "#f5f5f5"}}
        justify="center"
        alignItems="center"
        
      >
        <Grid item xs={12} sm={6} lg={5}>
          <Box m={3} mt={6}>
            <Typography variant="overline" style={{ color: "gray" }}>
              THE MOST MODERN WORKSPACE MANAGEMENT SOFTWARE
            </Typography>
            <Typography variant="h3">
              Navigate a hybrid working envoronment with ease
            </Typography>
            <Box my={3} mb={3}>
              <Typography variant="body1">
                Over 80% of executives are developing strategies that enable
                part-time remote work because of the cost savings, broader
                access to talent, and improved employee performance. Workspace
                Software has everything you need to manage a safe and productive
                hybrid working environment.
              </Typography>
            </Box>
            <Button to="/signup" component={Link} className={classes.contained}>
              Start Today
            </Button>
          </Box>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={6} md={5} lg={4}>
            <Box m={3}>
              <img
                alt="landing page"
                src={entrywayColour}
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
        </Hidden>
      </Grid>

      <Grid
        container
        direction="row"
        style={{ minHeight: "50vh", backgroundColor: "white" }}
        justify="center"
        alignItems="center"
      >
        <Grid item container xs={10} md={9}>
          <Grid item xs={12}>
            <Box mt={3} style={{ textAlign: "center" }}>
              <Typography component="h3" variant="overline">
                <u>What we do</u>
              </Typography>
              <Typography component="h3" variant="h4">
                Manage a hybrid workspace with ease
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box m={3} style={{ textAlign: "center" }}>
              {/* <MoneyOffIcon style={{ fontSize: 100, marginBottom: 10 }} /> */}
              <img src={SaveMoney} alt="save money" style={{height:100}}></img>
              <Typography component="p" variant="body1">
                <b>Save Money</b>
                <br />
                Take the guess work out of attendance planning and capacity
                controls with Workspace's occupancy management system.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box m={3} style={{ textAlign: "center" }}>
              {/* <EmojiPeopleIcon style={{ fontSize: 100, marginBottom: 10 }} /> */}
              <img src={StaySafe} alt="stay safe" style={{height:100}}></img>
              <Typography component="p" variant="body1">
                <b>Be Safe</b> <br />
                Keep your office safe and virus free with Workspace's contact
                tracing tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box m={3} style={{ textAlign: "center" }}>
              {/* <BarChartIcon style={{ fontSize: 100, marginBottom: 10 }} /> */}
              <img src={WorkplaceAnalytics} alt="stay safe" style={{height:100}}></img>
              <Typography component="p" variant="body1">
                <b>Workspace Analytics</b> <br />
                Understand how your team works best and how to get the most out
                of your desks and meeting rooms.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        style={{ minHeight: "50vh", backgroundColor: "#f5f5f5" }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
          <Box m={3}>
            <Typography variant="h5">
              Built for modern working environments, Workspace is for a new
              approach to managing your workspaces.
            </Typography>
            <Button
              to="/signup"
              component={Link}
              className={classes.contained}
              style={{ marginTop: 20 }}
            >
              Start Today
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* <hr></hr> */}
      <Footer />
    </>
  );
};
