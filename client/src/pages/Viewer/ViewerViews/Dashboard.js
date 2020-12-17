import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { Grid, Box, Typography, Badge } from "@material-ui/core";
import { convertDate } from "../../../utils/tools";

import { getReservationData, getCompanyAndUserData } from "../../../utils"

import { SeatingDetail } from '../../common/components';

const DATE_PATTERN = /^(.*?)-(.*?)-(.*?)$/;

const parseDate = (date) => {
  const match = date.match(DATE_PATTERN);
  if (!match) {
    return;
  }
  return new Date(match[1], match[2] - 1, match[3]);
};

export class Dashboard extends React.Component {
  state = {
    name: '',
    userId: '',
    role: '',
    company: '',
    seat: '',
    building: '',
    floor: '',
    desk: '',
    chairId: '',
    currentOccupancy: {},
    selectedDate: new Date(),
    display: false,
    days: [],
  }

  componentDidMount() {
    const today = new Date();
    this.setState({selectedDate: today});
    const user = localStorage.getItem("user");
    getCompanyAndUserData(user).then(res => {
      this.setState({
        name: user,
        role: res.roleName,
        company: res.companyName,
        userId: res.userId,
        reservations: res.reservations[0]
      })
      this.state.reservations.forEach(reservation => {
        if (reservation.occupancyDate === convertDate(this.state.selectedDate)) {
          this.setState({currentOccupancy: reservation, chairId: reservation.chairId, display: true});
          getReservationData(reservation.chairId).then(({building, desk, floor, seat}) => {
            this.setState({building, desk, floor, seat})
          });
        }
      });
    })
  }

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
    const user = localStorage.getItem("user");
    getCompanyAndUserData(user).then(res => {
      this.setState({
        role: res.roleName,
        company: res.companyName,
        userId: res.userId,
        reservations: res.reservations[0]
      })
      for (let i = 0; i < this.state.reservations.length; i++) {
        if (this.state.reservations[i].occupancyDate === convertDate(this.state.selectedDate)) {
          this.setState({currentOccupancy: this.state.reservations[i], chairId: this.state.reservations[i].chairId, display: true});
          getReservationData(this.state.reservations[i].chairId).then(({building, desk, floor, seat}) => {
            this.setState({building, desk, floor, seat});
          });
          break;
        } else {
          this.setState({currentOccupancy: {}, display: false});
        }
      }
    })
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
                if (this.state.reservations) {
                  this.state.reservations.forEach((reservation) => {
                    const date = parseDate(reservation.occupancyDate);
                    if (date.valueOf() === day.valueOf()) {
                      badge = true;
                    }
                  });
                }
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
              initial={this.state.name[0]}
              name={this.state.name}
              role={this.state.role}
              company={this.state.company}
              floor={this.state.floor}
              desk={this.state.desk}
              seat={this.state.seat}
              building={this.state.building}
            /> : <Typography variant="h6">No reservation on this date</Typography>}
          </Box>
        </Grid>
      </Grid>
    );
  }
}
