import React from 'react';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DatePicker = ({ dateRange, shouldDisableDate, renderDay }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={dateRange.start}
        renderDay={renderDay}
        shouldDisableDate={shouldDisableDate}
        disableHighlightToday
        readOnly
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
