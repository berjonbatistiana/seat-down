import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// Input/populate roles
const roles = [
  {
    value: 'Software Engineer',
    label: 'Software Engineer',
  },
  {
    value: 'Associate',
    label: 'Associate',
  },
  {
    value: 'President',
    label: 'President',
  },
  {
    value: 'Chief Executive Officer',
    label: 'Chief Executive Officer',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const SelectDropdown = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select"
          select
          label="Select"
          value={props.value}
          onChange={props.onChange}
          helperText="Please select your role"
          // labelWidth={80}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}
