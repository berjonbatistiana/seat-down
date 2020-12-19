import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
          {children}
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '600px',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const AntTabs = withStyles({
  indicator: {
    backgroundColor: '#5fc5d1',
  },
})(Tabs);

export const UpcomingMenu = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AntTabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        onClick={props.onClick}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Box mt={2} ml={2} mr={2} style={{textAlign: 'center'}}>
          <Box>
            <Typography>
              Upcoming
            </Typography>
          </Box>
          <Box>
            <Typography>
              Dates
            </Typography>
          </Box>
        </Box>
        {props.dates}
      </AntTabs>
        {props.content}
    </div>
  );
}
