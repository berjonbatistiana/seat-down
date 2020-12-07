import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Typography, Grid, Box , Paper} from "@material-ui/core";

export function Dashboard() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box m={3}>
        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </Box>
    </MuiPickersUtilsProvider>
  );
}
