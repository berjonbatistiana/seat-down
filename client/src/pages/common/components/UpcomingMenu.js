import React from "react";
import PropTypes from "prop-types";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import {Tab} from "@material-ui/core";

function TabPanel(props) {
  const {children, value, index, ...other} = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && {children}}
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
    display: "flex",
    height: "600px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#5fc5d1",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 70,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))((props) => <Tab disableRipple {...props} />);


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
        <AntTab
          key={'header'}
          label={'Upcoming\nDates'}
        />
        
        {props.dates}
      </AntTabs>
      {props.content}
    </div>
  );
};
