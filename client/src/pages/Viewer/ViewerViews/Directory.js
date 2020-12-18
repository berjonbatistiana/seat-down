import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {compareDate, getLocalDate} from "../../../utils/tools";
import {findCompanyById, findUserByUsername, getEmployeeDirectory} from "../../../utils"

import {DatePicker, EmployeeGrid} from "../../../pages/common/";

export const Directory = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState('');
  const [selectedDate, setSelectedDate] = useState(getLocalDate());
  const [areSeatsLoading, setSeatsLoading] = useState(false);
  
  
  const handleDateChange = (date) => {
    setSelectedDate((date));
  };
  
  const columns = [
    {field: "username", title: "Name"},
    {field: "role", title: "Role"},
    {field: "chairName", title: "Assigned Chair", defaultSort: "desc"},
    {field: "floorName", title: "Floor"},
    {field: "buildingName", title: "Building"}
  ];
  
  useEffect(() => {
    
    const fetchData = async () => {
      setSeatsLoading(true);
      setData([]);
      const {data: user} = await findUserByUsername(localStorage.getItem('user'));
      const {data: directory} = await getEmployeeDirectory({companyId: user.companyId});
      const filteredDirectory = [];
      const notYetFiltered = {};
      
      findCompanyById(user.companyId).then(({data}) => {
        setCompany(data.name);
      });
      for (let i = 0; i < directory.length; i++) {
        
        // check if this entry haven't had a chair before
        if (!directory[i].occupancyDate) {
          filteredDirectory.push(directory[i]); // add it to the filtered directory
          continue;                             // proceed to next item
        }
        
        // check if this entry had a chair before as this is of this date
        if (compareDate(directory[i].occupancyDate, selectedDate)) {
          // if it was previously checked, remove it from there
          notYetFiltered[directory[i].username] = false;
          filteredDirectory.push(directory[i]); // add it to the filtered directory
        }
        // check if this entry had a  chair before and is NOT of this date
        else
          if (notYetFiltered[directory[i].username] === undefined) {// check if it is not yet in the previously checked table
            notYetFiltered[directory[i].username] = directory[i]; // add it
          }
      }
      
      // deal with remaining company members who are not yet filtered
      for (const item in notYetFiltered){
        if (notYetFiltered[item]){
          filteredDirectory.push(
            {
              username: notYetFiltered[item].username,
              role: notYetFiltered[item].role,
            }
          )
        }
      }
      setData(filteredDirectory);
      setSeatsLoading(false);
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
              Everyone at {company}
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
            localization={{
              body: {
                emptyDataSourceMessage: areSeatsLoading ? (
                  <Typography variant="h6">
                    Loading directory, please wait.
                  </Typography>
                ) : (
                  <Typography variant="h6">
                    There is no one in this company.
                  </Typography>
                ),
              },
            }}
          />
        </Paper>
      </Box>
    </div>
  );
};
