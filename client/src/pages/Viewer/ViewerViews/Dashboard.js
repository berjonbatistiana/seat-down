import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Grid, Box } from "@material-ui/core";

import { SeatingDetail } from "../../common/components";
import { convertDate } from "../../../utils/tools";

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(convertDate(new Date()));
  const d = new Date(2020, 11, 22);
  const d2 = new Date(2020, 11, 18);
  const days = [d, d2];

  const handleDateChange = (date) => {
    setSelectedDate(convertDate(date));
  };

  const getOccupancies = async () => {
    await axios.get("/api/occupy", { params: { date: day } }).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getOccupancies();
  }, [day]);

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
          <SeatingDetail />
        </Box>
      </Grid>
    </Grid>
  );
}
