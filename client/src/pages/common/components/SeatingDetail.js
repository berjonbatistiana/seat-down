import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Box, Grid} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

export const SeatingDetail = (props) => {

  return (
    <Box mb={3}>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6}>
          <Box>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar  style={{backgroundColor: "#fd8369"}}>{props.initial}</Avatar>
              </Grid>
              <Grid item>
                <Typography>
                  {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {props.role}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} style={{textAlign: 'right'}}>
          <Typography variant="body2" color="textSecondary" component="p">
            Company: {props.company}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Building: {props.building}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Floor: {props.floor}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Desk: {props.desk}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Seat: {props.seat}
          </Typography>
        </Grid>
      </Grid>

    {/*<CardHeader*/}
    {/*  avatar={*/}
    {/*    <Avatar aria-label="recipe" style={{backgroundColor: "#fd8369"}}>*/}
    {/*      {props.initial}*/}
    {/*    </Avatar>*/}
    {/*  }*/}
    {/*  title={props.name}*/}
    {/*  subheader={props.role}*/}
    {/*  action={(*/}
    {/*    <>*/}
    {/*      <Typography variant="body2" color="textSecondary" component="p">*/}
    {/*        Company: {props.company}*/}
    {/*      </Typography>*/}
    {/*      <Typography variant="body2" color="textSecondary" component="p">*/}
    {/*        Building: {props.building}*/}
    {/*      </Typography>*/}
    {/*      <Typography variant="body2" color="textSecondary" component="p">*/}
    {/*        Floor: {props.floor}*/}
    {/*      </Typography>*/}
    {/*      <Typography variant="body2" color="textSecondary" component="p">*/}
    {/*        Desk: {props.desk}*/}
    {/*      </Typography>*/}
    {/*      <Typography variant="body2" color="textSecondary" component="p">*/}
    {/*        Seat: {props.seat}*/}
    {/*      </Typography>*/}
    {/*    </>*/}
    {/*  )}*/}
    {/*/>*/}
    </Box>
  );
}
