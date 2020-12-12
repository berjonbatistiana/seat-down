import React, {forwardRef, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';
import RoomIcon from '@material-ui/icons/Room';
import {getAvailableSeats, reserveSeat} from "../../../utils/API";
import {convertDate} from "../../../utils/tools";
import MaterialTable, {MTableToolbar} from "material-table";
import EventSeatIcon from '@material-ui/icons/EventSeat';

import {DatePicker} from "../../common"
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
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const useStyles = makeStyles((theme) => ({
  contained: {
    color: "white",
    backgroundColor: "#6bd5e1",
    borderRadius: 25,
    "&:hover": {
      backgroundColor: "#5fc5d1",
    }
  }
}))
const columns = [
  {
    title: 'Building',
    field: 'buildingName'
  },
  {
    title: 'Floor',
    field: 'floorName',
  },
  {
    title: 'Chair',
    field: 'chairName'
  },
]

export const Reservation = () => {
  
  const [companyId, setCompanyId] = React.useState('1fn50i1187kiidrmqu');
  const [availableSeats, setAvailableSeats] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  useEffect(() => {
    
    const date = convertDate(selectedDate);
    
    async function fetchData() {
      const {data} = await getAvailableSeats({companyId, date});
      setAvailableSeats(data);
    }
    
    fetchData().catch(e => {
      console.error(e)
    });
    
  }, [companyId])
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleReserveSeat = async (event, rowData) => {
    // get userId from localhost
    const userId = '1fn50i1187kiidrmw2'
    const {chairId} = rowData;
    const date = convertDate(selectedDate);
    
    const row = await reserveSeat({userId, chairId, date});
    console.log(row);
    const {data} = await getAvailableSeats({companyId, date});
    setAvailableSeats(data);
    
  }
  
  const renderTableTitle = () => {
    return (
      <Box pt={3}>
        <Typography variant="h5">
          <ScheduleIcon color="secondary" fontSize="large" style={{verticalAlign: 'middle'}}/> Date
        </Typography>
        <Box ml={3} mr={3} mb={4}>
          <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} fullWidth={false}/>
        </Box>
        <Typography variant="h5">
          <RoomIcon color="secondary" fontSize="large" style={{verticalAlign: 'middle'}}/> Location
        </Typography>
      </Box>
    )
  }
  return (
    <form>
      <Box m={3} component={Paper} variant="outlined">
        <MaterialTable
          pr={3}
          icons={tableIcons}
          title={renderTableTitle()}
          columns={columns}
          data={availableSeats}
          actions={[
            {
              icon: EventSeatIcon,
              tooltip: 'Reserve Seat',
              onClick: handleReserveSeat
            }
          ]}
          options={{
            doubleHorizontalScroll: true,
            detailPanelType: 'single',
            actionsColumnIndex: -1,
            searchFieldAlignment: "right",
            actionsCellStyle: {
              paddingRight: '25px'
            },
            rowStyle: {
              hover: {
                "&:hover": {
                  backgroundColor: 'lightgrey'
                }
              }
            }
          }}
          localization={{
            header: {
              actions: 'Reserve'
            },
            body: {
              emptyDataSourceMessage: 'No seats available to this day'
            }
          }}
          components={{
            Toolbar: props => (
              <div style={{paddingRight: '40px'}}>
                <MTableToolbar {...props} />
              </div>
            )
          }}
        
        />
      </Box>
    </form>
  );
}
