import React, {forwardRef} from "react";
import MaterialTable, {MTableToolbar} from "material-table";

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
  ViewColumn
} from '@material-ui/icons';
import EventSeatIcon from "@material-ui/icons/EventSeat";
import {Box, Button, Typography} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import {DatePicker} from "./DatePicker";
import RoomIcon from "@material-ui/icons/Room";


export const SeatingTable = (props) => {
  
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref}/>
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref}/>
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
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
  
  const renderTableTitle = () => {
    return (
      <Box pt={3}>
        <Typography variant="h5">
          <ScheduleIcon
            color="secondary"
            fontSize="large"
            style={{verticalAlign: "middle"}}
          />{" "}
          Date
        </Typography>
        <Box ml={3} mr={3} mb={4}>
          <DatePicker
            selectedDate={props.selectedDate}
            handleDateChange={props.handleDateChange}
            fullWidth={false}
            disablePast={true}
          />
        </Box>
        <Typography variant="h5">
          <RoomIcon
            color="secondary"
            fontSize="large"
            style={{verticalAlign: "middle"}}
          />{" "}
          Location
        </Typography>
      </Box>
    );
  };
  
  return (
    <MaterialTable
      pr={3}
      icons={tableIcons}
      title={renderTableTitle()}
      columns={columns}
      data={props.availableSeats}
      actions={
        !props.hasSeat
          ? [
            {
              icon: EventSeatIcon,
              tooltip: "Reserve Seat",
              onClick: props.handleReserveSeat,
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
          emptyDataSourceMessage: props.areSeatsLoading ? (
            <Typography variant="h6">
              Loading seats, please wait.
            </Typography>
          ) : !props.hasSeat ? (
            <Typography variant="h6">
              Sorry, no seats are available for this day.
            </Typography>
          ) : (
            <Typography variant="h6">
              You already have a seat.
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
                onClick={props.handleRemoveSeat}
              >
                Click here
              </Button>
              to remove previous reservation.
            </Typography>
          ),
        },
      }}
      components={{
        Toolbar: (toolBarProps) => (
          <div style={{paddingRight: "40px"}}>
            <MTableToolbar {...toolBarProps} />
          </div>
        ),
      }}
    />
  );
}
