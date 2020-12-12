import React, { forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import { getAvailableSeats, reserveSeat } from "../../../utils/API";
import { convertDate } from "../../../utils/tools";
import MaterialTable from "material-table";
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

const useStyles = makeStyles((theme) => ({
  contained: {
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    "&:hover": {
      backgroundColor: "#5fc5d1",
    },
  },
}));
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
const buildings = ["Hightower", "Mediumtower", "Lowtower"];
const floors = [1, 2, 3];
const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Reservation = () => {
  const classes = useStyles();

  const [companyId, setCompanyId] = React.useState("1fn50i1187kiidrmqu");
  const [availableSeats, setAvailableSeats] = React.useState([]);
  const [building, setBuilding] = React.useState("");
  const [floor, setFloor] = React.useState("");
  const [seat, setSeat] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    const date = convertDate(selectedDate);

    async function fetchData() {
      const { data } = await getAvailableSeats({ companyId, date });
      setAvailableSeats(data);
    }

    fetchData().catch((e) => {
      console.error(e);
    });
  }, [companyId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value);
  };

  const handleFloorChange = (event) => {
    setFloor(event.target.value);
  };

  const handleSeatChange = (event) => {
    setSeat(event.target.value);
  };

  const handleReserveSeat = async (event, rowData) => {
    // get userId from localhost
    const userId = "1fn50i1187kiidrmw2";
    const { chairId } = rowData;
    const date = convertDate(selectedDate);

    const row = await reserveSeat({ userId, chairId, date });
    const { data } = await getAvailableSeats({ companyId, date });
    setAvailableSeats(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ date: selectedDate, building, floor, seat });
  };

  const renderTableTitle = () => {
    return (
      <Typography variant="h5">
        <RoomIcon
          color="secondary"
          fontSize="large"
          style={{ verticalAlign: "middle" }}
        />{" "}
        Location
      </Typography>
    );
  };
  return (
    <form>
      <Box
        ml={3}
        mt={3}
        mr={3}
        pt={3}
        pl={3}
        component={Paper}
        variant="outlined"
      >
        <Typography m={3} variant="h5">
          <ScheduleIcon
            color="secondary"
            fontSize="large"
            style={{ verticalAlign: "middle" }}
          />{" "}
          Date
        </Typography>
        <Grid item xs={12} sm={4}>
          <Box ml={3} mr={3} mb={3}>
            <DatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              fullWidth={false}
            />
          </Box>
        </Grid>
      </Box>
      <Box mb={3} ml={3} mr={3} component={Paper} variant="outlined">
        <MaterialTable
          pr={3}
          icons={tableIcons}
          title={renderTableTitle()}
          columns={columns}
          data={availableSeats}
          actions={[
            {
              icon: EventSeatIcon,
              tooltip: "Reserve Seat",
              onClick: handleReserveSeat,
            },
          ]}
          options={{
            doubleHorizontalScroll: true,
            detailPanelType: "single",
            actionsColumnIndex: -1,
            actionsCellStyle: {
              paddingRight: "25px",
            },
          }}
          localization={{
            header: {
              actions: "Reserve",
            },
            body: {
              emptyDataSourceMessage: "No seats available to this day",
            },
          }}
        />
      </Box>
      {/*<Grid item container>*/}
      {/*  <Grid item xs={12} sm={4}>*/}
      {/*    <Box ml={3} mr={3}>*/}
      {/*      <TextField*/}
      {/*        select*/}
      {/*        label="Building"*/}
      {/*        value={building}*/}
      {/*        onChange={handleBuildingChange}*/}
      {/*        fullWidth*/}
      {/*      >*/}
      {/*        {buildings.map((option) => (*/}
      {/*          <MenuItem key={option} value={option}>*/}
      {/*            {option}*/}
      {/*          </MenuItem>*/}
      {/*        ))}*/}
      {/*      </TextField>*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} sm={4}>*/}
      {/*    <Box ml={3} mr={3}>*/}
      {/*      <TextField*/}
      {/*        select*/}
      {/*        label="Floor"*/}
      {/*        value={floor}*/}
      {/*        onChange={handleFloorChange}*/}
      {/*        fullWidth*/}
      {/*      >*/}
      {/*        {floors.map((option) => (*/}
      {/*          <MenuItem key={option} value={option}>*/}
      {/*            {option}*/}
      {/*          </MenuItem>*/}
      {/*        ))}*/}
      {/*      </TextField>*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} sm={4}>*/}
      {/*    <Box ml={3} mr={3}>*/}
      {/*      <TextField*/}
      {/*        select*/}
      {/*        label="Seat"*/}
      {/*        value={seat}*/}
      {/*        onChange={handleSeatChange}*/}
      {/*        fullWidth*/}
      {/*      >*/}
      {/*        {seats.map((option, index) => (*/}
      {/*          <MenuItem key={option} value={option} disabled={index===0|| index=== 3}>*/}
      {/*            {option}*/}
      {/*          </MenuItem>*/}
      {/*        ))}*/}
      {/*      </TextField>*/}
      {/*    </Box>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      <Grid container justify="flex-end">
        <Box mr={3}>
          <Button onClick={handleSubmit} className={classes.contained}>
            Reserve
          </Button>
        </Box>
      </Grid>
    </form>
  );
};
