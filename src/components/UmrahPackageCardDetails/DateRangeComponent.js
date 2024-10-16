import React from 'react';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateRangePickerComponent = ({ dateRange }) => {
  const renderDay = (date, selectedDates, pickersDayProps) => {
    const isHighlighted = date.isSameOrAfter(dateRange.start) && date.isSameOrBefore(dateRange.end);
    return (
      <PickersDay
        {...pickersDayProps}
        disabled={!isHighlighted}
        sx={isHighlighted ? { backgroundColor: '#004225', color: '#FFFFFF', borderRadius: '50%' } : {}}
      />
    );
  };

  const shouldDisableDate = (date) => !date.isBetween(dateRange.start, dateRange.end, null, '[]');

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

export default DateRangePickerComponent;
