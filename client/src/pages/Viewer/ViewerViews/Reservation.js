import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Box, Paper, Divider, Button } from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {DatePicker} from "../../common"

const useStyles = makeStyles((theme) => ({
  contained: {
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  }
}))

const buildings = ['Hightower', 'Mediumtower', 'Lowtower'];
const floors = [1,2,3 ];
const seats = [1,2,3,4,5,6,7,8,9,10];

export const Reservation = () => {
  const classes = useStyles();

  const [building, setBuilding] = React.useState('');
  const [floor, setFloor] = React.useState('');
  const [seat, setSeat] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
  };

  const handleSeatChange = (event) => {
    setSeat(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({date: selectedDate, building, floor, seat});
  }
  return (
    <form>
      <Box m={3} component={Paper} pb={3} variant="outlined">
        <Box mt={3} ml={3} mr={3}>
          <Typography variant="h5">
            <ScheduleIcon color="secondary" fontSize="large" style={{verticalAlign: 'middle'}}/> Date
          </Typography>
        </Box>
        <Grid container direction="column">
          <Grid item xs={12} sm={4}>
            <Box ml={3} mr={3} mb={3}>
              <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} fullWidth={false}/>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item>
            <Box mt={3} ml={3} mr={3}>
              <Typography variant="h5">
                <RoomIcon color="secondary" fontSize="large" style={{verticalAlign: 'middle'}}/> Location
              </Typography>
            </Box>
          </Grid>
          <Grid item container>
            <Grid item xs={12} sm={4}>
              <Box ml={3} mr={3}>
                <TextField
                  select
                  label="Building"
                  value={building}
                  onChange={handleBuildingChange}
                  fullWidth
                >
                  {buildings.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box ml={3} mr={3}>
                <TextField
                  select
                  label="Floor"
                  value={floor}
                  onChange={handleFloorChange}
                  fullWidth
                >
                  {floors.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box ml={3} mr={3}>
                <TextField
                  select
                  label="Seat"
                  value={seat}
                  onChange={handleSeatChange}
                  fullWidth
                >
                  {seats.map((option, index) => (
                    <MenuItem key={option} value={option} disabled={index===0|| index=== 3}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="flex-end">
        <Box mr={3}>
          <Button onClick={handleSubmit} className={classes.contained}>
            Reserve
          </Button>
        </Box>
      </Grid>
    </form>
  );
}
