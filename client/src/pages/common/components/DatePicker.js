import React from 'react';
import TextField from '@material-ui/core/TextField';

export function DatePicker() {
  let defaultDate = new Date();
  const dd = String(defaultDate.getDate()).padStart(2, '0');
  const mm = String(defaultDate.getMonth() + 1).padStart(2, '0');
  const yyyy = defaultDate.getFullYear();
  defaultDate = yyyy + '-' + mm + '-' + dd;

  return (
    <TextField
      id="date"
      variant="outlined"
      type="date"
      defaultValue={defaultDate}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
