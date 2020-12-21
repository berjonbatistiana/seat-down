import React from "react";
import { Calendar } from "@material-ui/pickers";
import {
  Grid,
  Box,
  Badge,
  Paper,
  Tab,
  Typography,
  Avatar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import parse from "date-fns/parse";

import { convertDate } from "../../../utils/tools";
import { getReservationData, getCompanyAndUserData } from "../../../utils";
import { SeatingDetail, UpcomingMenu } from "../../common/components";

const DATE_PATTERN = /^(.*?)-(.*?)-(.*?)$/;

const parseDate = (date) => {
  const match = date.match(DATE_PATTERN);
  if (!match) {
    return;
  }
  return new Date(match[1], match[2] - 1, match[3]);
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 70,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))((props) => <Tab disableRipple {...props} />);

export class Dashboard extends React.Component {
  state = {
    name: "",
    userId: "",
    role: "",
    company: "",
    seat: "",
    building: "",
    floor: "",
    desk: "",
    chairId: "",
    currentOccupancy: {},
    upcoming: [],
    selectedDate: new Date(),
    display: false,
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  componentDidMount() {
    const today = new Date();
    this.setState({ selectedDate: today });
    const user = localStorage.getItem("user");
    getCompanyAndUserData(user).then((res) => {
      this.setState({
        name: user,
        role: res.roleName,
        company: res.companyName,
        userId: res.userId,
        reservations: res.reservations[0],
      });
      let today = convertDate(new Date());
      let upcomingArr = [];
      this.state.reservations.forEach((reservation) => {
        if (reservation.occupancyDate > today) {
          upcomingArr.push(reservation.occupancyDate);
        }
        if (
          reservation.occupancyDate === convertDate(this.state.selectedDate)
        ) {
          this.setState({
            currentOccupancy: reservation,
            chairId: reservation.chairId,
            display: true,
          });
          getReservationData(reservation.chairId).then(
            ({ building, desk, floor, seat }) => {
              this.setState({ building, desk, floor, seat });
            }
          );
        }
      });
      this.setState({ upcoming: upcomingArr.sort() });
    });
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
    const user = localStorage.getItem("user");
    getCompanyAndUserData(user).then((res) => {
      this.setState({
        role: res.roleName,
        company: res.companyName,
        userId: res.userId,
        reservations: res.reservations[0],
      });
      for (let i = 0; i < this.state.reservations.length; i++) {
        if (
          this.state.reservations[i].occupancyDate ===
          convertDate(this.state.selectedDate)
        ) {
          this.setState({
            currentOccupancy: this.state.reservations[i],
            chairId: this.state.reservations[i].chairId,
            display: true,
          });
          getReservationData(this.state.reservations[i].chairId).then(
            ({ building, desk, floor, seat }) => {
              this.setState({ building, desk, floor, seat });
            }
          );
          break;
        } else {
          this.setState({ currentOccupancy: {}, display: false });
        }
      }
    });
  };

  render() {
    return (
      <Box m={3} variant="outlined" component={Paper}>
        <UpcomingMenu
          dates={this.state.upcoming.map((date) => {
            const parsedDate = parse(date, "yyyy-MM-dd", new Date());
            return (
              <AntTab
                key={date}
                label={date}
                {...a11yProps(0)}
                onClick={() => this.handleDateChange(parsedDate)}
              />
            );
          })}
          content={
            <Grid container justify="center">
              <Grid item xs={12}>
                <Box p={2} style={{ backgroundColor: "#6bd5e1" }}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Box>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>
                            <Avatar style={{ backgroundColor: "#fd8369" }}>
                              {this.state.name[0]}
                            </Avatar>
                          </Grid>
                          <Grid item>
                            <Typography>{this.state.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {this.state.role}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item style={{ textAlign: "right" }}>
                      <Typography color="textSecondary">
                        {`${this.state.selectedDate.getFullYear()}`}
                      </Typography>
                      <Typography variant="h4">
                        {`${
                          this.state.days[this.state.selectedDate.getDay()]
                        }, ${
                          this.state.months[this.state.selectedDate.getMonth()]
                        } ${this.state.selectedDate.getDate()}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Grid container justify="center">
                    <Grid item>
                      <Box m={3} style={{ overflow: "hidden" }}>
                        <Calendar
                          autoOk
                          orientation="portrait"
                          variant="static"
                          openTo="date"
                          date={this.state.selectedDate}
                          onChange={this.handleDateChange}
                          renderDay={(
                            day,
                            selectedDate,
                            isInCurrentMonth,
                            dayComponent
                          ) => {
                            let badge = false;
                            if (this.state.reservations) {
                              this.state.reservations.forEach((reservation) => {
                                const date = parseDate(
                                  reservation.occupancyDate
                                );
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
                      <Box m={3}>
                        {this.state.display ? (
                          <SeatingDetail
                            initial={this.state.name[0]}
                            name={this.state.name}
                            role={this.state.role}
                            company={this.state.company}
                            floor={this.state.floor}
                            desk={this.state.desk}
                            seat={this.state.seat}
                            building={this.state.building}
                          />
                        ) : (
                          <SeatingDetail
                            initial={this.state.name[0]}
                            name={this.state.name}
                            role={this.state.role}
                            company={this.state.company}
                            floor={`No reservation on this date`}
                            desk="No reservation on this date"
                            seat="No reservation on this date"
                            building="No reservation on this date"
                          />
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          }
        />
      </Box>
    );
  }
}
