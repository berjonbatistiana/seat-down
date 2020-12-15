import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Grid, Box, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import { SeatingDetail } from "../../common/components";
import { convertDate } from "../../../utils/tools";

const DATE_PATTERN = /^(.*?)-(.*?)-(.*?)$/;

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(convertDate(new Date()));
  const [unformattedDate, setUnformattedDate] = useState(new Date());
  const [userId, setUserId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [currentOccupancy, setcurrentOccupancy] = useState({});
  const [currentData, setCurrentData] = useState({});

  const init = async () => {
    const user = localStorage.getItem("user");
    await axios.get(`/api/users/username/${user}`).then(({ data }) => {
      setUserId(data.id);
    });
  };

  init();

  const parseDate = (date) => {
    const match = date.match(DATE_PATTERN);
    if (!match) {
      return;
    }
    return new Date(match[1], match[2] - 1, match[3]);
  };

  useEffect(() => {
    let found = false;
    if (!reservations.length) {
      return;
    }
    reservations.forEach((reservation) => {
      if (reservation.occupancyDate === selectedDate) {
        setcurrentOccupancy(reservation);
        found = true;
      }
      if (!found) {
        setcurrentOccupancy({});
      }
    });
  }, [selectedDate]);

  const getCompanyAndRoleData = async () => {
    let roleName = "";
    let companyName = "";
    await axios.get(`/api/users/${userId}`).then(async ({ data }) => {
      await axios
        .all([
          axios.get(`/api/roles/${data.roleId}`),
          axios.get(`/api/company/${data.companyId}`),
        ])
        .then((res) => {
          roleName = res[0].data.name;
          companyName = res[1].data.name;
        });
    });
    return { roleName, companyName };
  };

  const getReservationData = async () => {
    let building = "";
    let floor = "";
    let desk = "";
    let seat = "";
    await axios
      .get(`/api/chairs/${currentOccupancy.chairId}`)
      .then(async ({ data }) => {
        seat = data.name;
        await axios.get(`/api/desks/${data.deskId}`).then(async ({ data }) => {
          desk = data.name;
          await axios
            .get(`/api/floor/${data.floorId}`)
            .then(async ({ data }) => {
              floor = data.name;
              await axios
                .get(`/api/building/${data.buildingId}`)
                .then(({ data }) => {
                  building = data.name;
                });
            });
        });
      });
    return { building, floor, desk, seat };
  };

  useEffect(async () => {
    if (userId === "") {
      return;
    }
    const data = { username: localStorage.getItem("user") };
    const userData = await getCompanyAndRoleData();
    const locationalData = await getReservationData();
    data.roleName = userData.roleName;
    data.companyName = userData.companyName;
    data.building = locationalData.building;
    data.floor = locationalData.floor;
    data.desk = locationalData.desk;
    data.seat = locationalData.seat;
    setCurrentData(data);
  }, [currentOccupancy]);

  const handleDateChange = (date) => {
    setSelectedDate(convertDate(date));
    setUnformattedDate(date);
  };

  useEffect(async () => {
    await axios
      .get(`/api/occupy/employee/${userId}`)
      .then(({ data }) => {
        setReservations(data);
      });
  }, [userId]);

  return (
    <Grid container>
      <Grid item>
        <Box mt={3} ml={3} mr={3}>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={unformattedDate}
            onChange={handleDateChange}
            renderDay={(
              day,
              _selectedDate,
              _isInCurrentMonth,
              dayComponent
            ) => {
              let badge = false;
              if (reservations.length) {
                reservations.forEach((reservation) => {
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
          {Object.keys(currentOccupancy).length !== 0 ? (
            <SeatingDetail reservationData={currentData} />
          ) : (
            <Typography variant="h6">No reservation on this date</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
