import React from "react";
import {Box, Typography} from "@material-ui/core";

export const SeatingDetail = (props) => {

  return (
    <Box mb={3}>
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
    </Box>
  );
}
