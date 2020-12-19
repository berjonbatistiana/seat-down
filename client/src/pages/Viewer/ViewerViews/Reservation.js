import React, { forwardRef, useCallback, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import {
  doesUserHaveSeatDate,
  findUserByUsername,
  getAvailableSeats,
  removeSeatDate,
  reserveSeat,
} from "../../../utils";
import { convertDate, getLocalDate } from "../../../utils/tools";
import { SeatingTable } from "../../common/components/";

import { DatePicker } from "../../common";

export const Reservation = () => {
  const [userId, setUserId] = React.useState("");
  const [hasSeat, setHasSeat] = React.useState(false);
  const [areSeatsLoading, setSeatsLoading] = React.useState(false);
  const [availableSeats, setAvailableSeats] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(getLocalDate());

  const fetchData = useCallback(async () => {
    const date = convertDate(selectedDate);
    setSeatsLoading(true);
    const { data: user } = await findUserByUsername(
      localStorage.getItem("user")
    );
    setUserId(user.id);
    const { data: seat } = await doesUserHaveSeatDate({
      userId: user.id,
      date,
    });
    setHasSeat(!!seat);
    if (!seat) {
      const { data: seats } = await getAvailableSeats({
        companyId: user.companyId,
        date,
      });
      setAvailableSeats(seats);
    } else {
      setAvailableSeats([]);
    }

    setSeatsLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    fetchData().catch((e) => {
      console.error(e);
    });
  }, [fetchData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReserveSeat = async (event, rowData) => {
    const { chairId } = rowData;
    const date = convertDate(selectedDate);

    await reserveSeat({ userId, chairId, date });
    setHasSeat(true);
    fetchData().catch((e) => {
      console.error(e);
    });
  };

  const handleRemoveSeat = async () => {
    const date = convertDate(selectedDate);
    await removeSeatDate({ date, userId });
    fetchData().catch((e) => {
      console.error(e);
    });
  };

  const renderTableTitle = () => {
    return (
      <Box pt={3}>
        <Typography variant="h5">
          <ScheduleIcon
            color="secondary"
            fontSize="large"
            style={{ verticalAlign: "middle" }}
          />{" "}
          Date
        </Typography>
        <Box ml={3} mr={3} mb={4}>
          <DatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            disablePast={true}
          />
        </Box>
        <Typography variant="h5">
          <RoomIcon
            color="secondary"
            fontSize="large"
            style={{ verticalAlign: "middle" }}
          />{" "}
          Location
        </Typography>
      </Box>
    );
  };

  return (
    <form>
      <Box m={3} component={Paper} variant="outlined">
        <SeatingTable
          hasSeat={hasSeat}
          areSeatsLoading={areSeatsLoading}
          renderTableTitle={renderTableTitle}
          handleRemoveSeat={handleRemoveSeat}
          handleReserveSeat={handleReserveSeat}
          handleDateChange={handleDateChange}
          availableSeats={availableSeats}
        />
      </Box>
    </form>
  );
};
