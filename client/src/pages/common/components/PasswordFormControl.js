import React from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
}));

export const PasswordFormControl = (props) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth variant="outlined" className={classes.form}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        autoComplete={props.id}
        id={props.id}
        label={props.label}
        color="primary"
        variant="outlined"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.onClick}
              edge="end"
            >
              {props.icon}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
