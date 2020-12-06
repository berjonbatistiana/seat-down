import React, {useState} from 'react';
import { Typography, Grid, Box , Paper} from "@material-ui/core";

import {DatePicker, EmployeeGrid} from "../../../pages/common/";

export const Directory = () => {
  const columns = [
    { field: 'name', title: 'Name' },
    { field: 'department', title: 'Department' },
    { field: 'building', title: 'Building' },
    { field: 'floor', title: 'Floor' },
    { field: 'desk', title: 'Desk' },
    { field: 'seat',title: 'Seat' },
  ];

  const [data, setData] = useState([
    {
      name: 'Sean Marten', department: 'Software Engineering', building: 'Hightower', floor: 5, desk: 15, seat: 3,
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
              {`${data.length} ${data.length > 1 ? 'people' : 'person'}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box m={3} style={{alignSelf: 'center'}}>
            <DatePicker/>
          </Box>
        </Grid>
      </Grid>
      <Box ml={3} mr={3}>
        <Paper variant="outlined" style={{display: "block"}}>
          <EmployeeGrid
            title={"Everyone at The Software Company"}
            data={data}
            columns={columns}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);

                    resolve();
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    resolve()
                  }, 1000)
                }),
            }}
          />
        </Paper>
      </Box>
    </div>
  )
}
