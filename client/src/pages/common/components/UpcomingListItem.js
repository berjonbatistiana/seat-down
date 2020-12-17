import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
}));

export const UpcomingListItem = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText>
          {props.date}
        </ListItemText>
        <ListItemAvatar>
          <IconButton size="small" onClick={props.onClick}>
            <ChevronRightIcon/>
          </IconButton>
        </ListItemAvatar>
      </ListItem>
      <Divider component="li" />
    </List>
  );
}
