import React, {useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {AppBar, Box, Tab, Tabs, Typography} from '@material-ui/core';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouteLink, useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#5fc5d1',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 70,
    marginLeft: theme.spacing(3),
    fontWeight: theme.typography.fontWeightRegular,
    '&:focus': {
      color: '#5fc5d1',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export const UserNavbar = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    location.pathname === '/dashboard' ? setValue(0) : location.pathname === '/reserve' ? setValue(1) : location.pathname === '/directory' ? setValue(2) : setValue(3);
  }, [location.pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return token && (location.pathname === '/dashboard' || location.pathname === '/reserve' || location.pathname === '/directory' || location.pathname === '/configure') ? (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <AntTabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange}>
          <AntTab
            style={{color: location.pathname === '/dashboard' ? '#5fc5d1' : ''}}
            component={RouteLink} to="/dashboard" label={<div><PermContactCalendarIcon fontSize="small" style={{verticalAlign: 'middle'}}/> {user}'s Calendar</div>} {...a11yProps(0)}
          />
          <AntTab
            style={{color: location.pathname === '/reserve' ? '#5fc5d1' : ''}}
            component={RouteLink} to="/reserve" label={<div><EventAvailableIcon fontSize="small" style={{verticalAlign: 'middle'}}/> Reserve Seat</div>} {...a11yProps(1)}
          />
          <AntTab
            style={{color: location.pathname === '/directory' ? '#5fc5d1' : ''}}
            component={RouteLink} to="/directory" label={<div><SearchIcon fontSize="small" style={{verticalAlign: 'middle'}}/> Employee Directory</div>} {...a11yProps(2)}
          />
          <AntTab
            style={{color: location.pathname === '/configure' ? '#5fc5d1' : ''}}
            component={RouteLink} to="/configure" label={<div><SearchIcon fontSize="small" style={{verticalAlign: 'middle'}}/> Configure Company</div>} {...a11yProps(3)}
          />
        </AntTabs>
      </AppBar>
    </div>
  ) : "";
}
