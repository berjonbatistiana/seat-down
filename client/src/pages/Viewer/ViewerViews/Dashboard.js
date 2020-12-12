import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Grid, Box } from "@material-ui/core";

import { SeatingDetail } from '../../common/components';

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [display, setDisplay] = useState(false);
  const d = new Date(2020, 11, 12);
  const d2 = new Date(2020, 11, 18);
  const days = [d, d2];

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    days.forEach(day => {
      if (today.toDateString() === day.toDateString()) {
        return setDisplay(true);
      }
    })
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date);
    for (let i = 0; i < days.length; i++) {
      if (date.toDateString() === days[i].toDateString()) {
        return setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }

  return (
      <Grid container>
        <Grid item>
          <Box mt={3} ml={3} mr={3}>
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
                  <Badge
                    variant={badge ? "dot" : undefined}
                    color={badge ? "secondary" : undefined}
                    badgeContent={badge ? "" : undefined}
                    overlap="circle"
                  >
                    {dayComponent}
                  </Badge>
                );
              }}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3} ml={3} mr={3}>
            {display ? <SeatingDetail /> : ""}
          </Box>
        </Grid>
      </Grid>
  );
}
