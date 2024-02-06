import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CustomDatepicker() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label=""
        renderInput={(params) => <TextField {...params} />}
        autoFocus={true}
      />
    </LocalizationProvider>
  );
}
