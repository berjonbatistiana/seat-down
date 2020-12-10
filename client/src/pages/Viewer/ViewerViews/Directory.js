import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Paper } from "@material-ui/core";
import axios from "axios";
import { convertDate } from "../../../utils/tools";

import { DatePicker, EmployeeGrid } from "../../../pages/common/";

export const Directory = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const columns = [
    { field: "id", title: "ID" },
    { field: "chairId", title: "Chair ID" },
    { field: "occupancyDate", title: "Occupancy Date" },
    { field: "userId", title: "User ID" },
  ];

  const [data, setData] = useState([]);
  const [day, changeDay] = useState(convertDate(new Date()));

  const getOccupancies = async () => {
    await axios.get("/api/occupy", { params: { date: day } }).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getOccupancies();
  }, [day]);

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
            <div onChange={(e) => changeDay(e.target.value)}>
              <DatePicker />
            </div>
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
