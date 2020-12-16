import React, { forwardRef, useEffect } from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import {
  doesUserHaveSeatDate,
  getAvailableSeats,
  reserveSeat,
  removeSeatDate,
  findUserByUsername,
  findCompanyById
} from "../../../utils";
import { convertDate } from "../../../utils/tools";
import MaterialTable, { MTableToolbar } from "material-table";
import EventSeatIcon from "@material-ui/icons/EventSeat";

import { DatePicker } from "../../common";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const columns = [
  {
    title: "Building",
    field: "buildingName",
  },
  {
    title: "Floor",
    field: "floorName",
  },
  {
    title: "Chair",
    field: "chairName",
  },
];

export const Reservation = () => {
  const [userId, setUserId] = React.useState('');
  const [companyId, setCompanyId] = React.useState('');
  const [hasSeat, setHasSeat] = React.useState(false);
  const [areSeatsLoading, setSeatsLoading] = React.useState(false);
  const [availableSeats, setAvailableSeats] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  async function fetchData() {
    const date = convertDate(selectedDate);
    setSeatsLoading(true);
    
    const {data:user} = await findUserByUsername(localStorage.getItem('user'));
    
    setUserId(user.id);
    setCompanyId(user.companyId)
    
    const { data: seat } = await doesUserHaveSeatDate({ userId:user.id, date });
    setHasSeat(!!seat);
    if (!seat) {
      const { data: seats } = await getAvailableSeats({ companyId:user.companyId, date });
      setAvailableSeats(seats);
    } else {
      setAvailableSeats([]);
    }
    
    setSeatsLoading(false);
  }

  useEffect(() => {
    fetchData().catch((e) => {
      console.error(e);
    });
  }, [selectedDate]);

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
    const removedSeat = await removeSeatDate({ date, userId });
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
            fullWidth={false}
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
        <MaterialTable
          pr={3}
          icons={tableIcons}
          title={renderTableTitle()}
          columns={columns}
          data={availableSeats}
          actions={
            !hasSeat
              ? [
                  {
                    icon: EventSeatIcon,
                    tooltip: "Reserve Seat",
                    onClick: handleReserveSeat,
                  },
                ]
              : []
          }
          options={{
            doubleHorizontalScroll: true,
            detailPanelType: "single",
            actionsColumnIndex: -1,
            searchFieldAlignment: "right",
            actionsCellStyle: {
              padding: "25px",
            },
          }}
          localization={{
            header: {
              actions: "Reserve",
            },
            body: {
              emptyDataSourceMessage: areSeatsLoading ? (
                <Typography variant="h6">
                  Loading seats, please wait.
                </Typography>
              ) : !hasSeat ? (
                <Typography variant="h6">
                  Sorry, no seats are available for this day.
                </Typography>
              ) : (
                <Typography variant="h6">
                  Sorry, You already have a seat.
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      color: "white",
                      backgroundColor: "#fd8369",
                      borderRadius: 25,
                      "&:hover": {
                        backgroundColor: "#fd8369",
                      },
                    }}
                    onClick={handleRemoveSeat}
                  >
                    Click here
                  </Button>
                  to remove previous reservation.
                </Typography>
              ),
            },
          }}
          components={{
            Toolbar: (props) => (
              <div style={{ paddingRight: "40px" }}>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
        />
      </Box>
    </form>
  );
};
