import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Badge } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Typography, Grid, Box, Paper } from "@material-ui/core";

export function Dashboard() {
  const [selectedDate, handleDateChange] = useState(new Date());
  var d = new Date(2020, 11, 22);
  var d2 = new Date(2020, 12, 19);
  const days = [d, d2];

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
          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
            let badge = false;
            days.forEach((item) => {
              if (item.valueOf() === day.valueOf()) {
                badge = true;
              }
            });
            return (
              <Badge badgeContent={badge ? 4 : undefined}>{dayComponent}</Badge>
            );
          }}
        />
      </Box>
    </MuiPickersUtilsProvider>
  );
}
