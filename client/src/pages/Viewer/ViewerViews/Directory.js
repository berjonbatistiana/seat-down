import React, {useEffect, useState} from "react";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import {convertDate} from "../../../utils/tools";
import {findUserByUsername, getEmployeeDirectory} from "../../../utils"

import {DatePicker, EmployeeGrid} from "../../../pages/common/";

export const Directory = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(convertDate(new Date()));
  
  const handleDateChange = (date) => {
    setSelectedDate(convertDate(date));
  };
  
  const columns = [
    {field: "username", title: "Name"},
    {field: "role", title: "Role"},
    {field: "chairName", title: "Assigned Chair"},
    {field: "floorName", title: "Floor"},
    {field: "buildingName", title: "Building"}
  ];
  
  
  useEffect(() => {
  
    const fetchData = async () => {
    
      const {data: user} = await findUserByUsername(localStorage.getItem('user'));
    
    
      const {data: directory} = await getEmployeeDirectory({companyId: user.companyId});
      directory.map(user => {
          if (user.occupancyDate && user.occupancyDate !== selectedDate) {
            user.chairName = '';
            user.floorName = '';
            user.buildingName = '';
            return user;
          } else {
            return user;
          }
        }
      )
      setData(directory);
    
    }
    
    fetchData()
      .catch(e => {
        console.error(`Failed to fetch data ${e}`);
        throw new Error(e)
      })
    
  }, [selectedDate]);
  
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
          <Box m={3} style={{alignSelf: "center"}}>
            <DatePicker
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
            />
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
