import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";

export const Footer = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        style={{
          minHeight: "20vh",
          backgroundColor: "white",
          color: "gray",
          marginTop: 10,
          marginBot: 10,
          // textAlign: "center",
        }}
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={3} lg={2}>
          <Box mb={3}>
            <Link
              href="https://github.com/berjonbatistiana/seat-down"
              color="inherit"
              target="_blank"
            >
              <GitHubIcon />
            </Link>
            <Typography variant="caption"> Public Github Repository</Typography>
          </Box>
          <Divider style={{ backgroundColor: "white" }} />
          <Box mt={3}>
            <Typography variant="caption">© Workspace - 2020</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} lg={2}>
          <Box mb={3}>
            <Typography variant="caption" display="block">
              {/* Location : San Francisco, CA */}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sm={2} lg={1} style={{ marginLeft: 0 }}>
          <Typography variant="caption" display="block">
            LOCATION
          </Typography>
          <Typography
            variant="caption"
            display="block"
            style={{ marginBottom: 20 }}
          >
            San Francisco, CA
          </Typography>
          <Typography variant="caption" display="block">
            DEVELOPED BY
          </Typography>
          <Typography variant="caption" display="block">
            <Link
              href="https://github.com/berjonbatistiana"
              color="inherit"
              target="_blank"
            >
              Bermond Batistiana
            </Link>
          </Typography>
          <Typography variant="caption" display="block">
            <Link
              href="https://github.com/sean-marten"
              color="inherit"
              target="_blank"
            >
              Sean Marten
            </Link>
          </Typography>
          <Typography variant="caption" display="block">
            <Link
              href="https://github.com/a-li-sa"
              color="inherit"
              target="_blank"
            >
              Alisa Poon
            </Link>
          </Typography>
          <Typography variant="caption" display="block">
            <Link
              href="https://github.com/Bscott95"
              color="inherit"
              target="_blank"
            >
              Brandon Scott
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
