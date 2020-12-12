import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { Grid, Box } from "@material-ui/core";

import { SeatingDetail } from '../../common/components';

const d = new Date(2020, 11, 12);
const d2 = new Date(2020, 11, 18);
// const days = [d, d2];

export class Dashboard extends React.Component {
  state = {
    name: 'Sean Marten',
    role: 'Software Engineer',
    company: 'The Software Company',
    department: 'Software Engineering',
    building: 'Hightower',
    floor: 5,
    desk: 15,
    seat: 13,
    selectedDate: new Date(),
    display: false,
    days: [d, d2],
  }

  componentDidMount() {
    const today = new Date();
    this.setState({selectedDate: today});
    this.state.days.forEach(day => {
      if (today.toDateString() === day.toDateString()) {
        return this.setState({display: true});
      }
    })
  }

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
    for (let i = 0; i < this.state.days.length; i++) {
      if (date.toDateString() === this.state.days[i].toDateString()) {
        return this.setState({display: true});
      } else {
        this.setState({display: false});
      }
    }
  }

  render () {
    return (
      <Grid container>
        <Grid item>
          <Box mt={3} ml={3} mr={3}>
            <DatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                let badge = false;
                this.state.days.forEach((item) => {
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
            {this.state.display ? <SeatingDetail
              name={this.state.name}
              role={this.state.role}
              company={this.state.company}
              department={this.state.department}
              floor={this.state.floor}
              desk={this.state.desk}
              seat={this.state.seat}
              building={this.state.building}
            /> : ""}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
