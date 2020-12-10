import React, { useState } from "react";
import { Typography, Grid, Box, Paper } from "@material-ui/core";

import { DatePicker, EmployeeGrid } from "../../../pages/common/";

export const Directory = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    { field: "name", title: "Name" },
    { field: "department", title: "Department" },
    { field: "building", title: "Building" },
    { field: "floor", title: "Floor" },
    { field: "desk", title: "Desk" },
    { field: "seat", title: "Seat" },
  ];

  const [data, setData] = useState([
    {
      name: "Sean Marten",
      department: "Software Engineering",
      building: "Hightower",
      floor: 5,
      desk: 15,
      seat: 3,
    },
  ]);

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item>
          <Box mt={3} ml={3} mr={3}>
            <Typography variant="h5">
              Everyone at The Software Company
            </Typography>
            <Typography variant="body1">
              {`${data.length} ${data.length > 1 ? "people" : "person"}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box m={3} style={{ alignSelf: "center" }}>
            <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} fullWidth={false}/>
          </Box>
        </Grid>
      </Grid>
      <Box ml={3} mr={3}>
        <Paper variant="outlined">
          <EmployeeGrid
            title={"Everyone at The Software Company"}
            data={data}
            columns={columns}
          />
        </Paper>
      </Box>
    </div>
  );
};
