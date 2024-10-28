import React from 'react';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DateRangePickerComponent = ({ dateRange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderDay = (date, selectedDates, pickersDayProps) => {
    const isSelected = date.isSameOrAfter(dateRange.start) && date.isSameOrBefore(dateRange.end);
    
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          width: isMobile ? 28 : 36, // Smaller day size for mobile
          height: isMobile ? 28 : 36,
          fontSize: isMobile ? '0.75rem' : '1rem', // Smaller font for mobile
          ...(isSelected && {
            backgroundColor: '#004e8c', // Blue color for the selected range
            color: '#FFFFFF',
            borderRadius: '50%',
            transition: 'background-color 0.3s ease',
          }),
          '&:hover': {
            backgroundColor: isSelected ? '#003f70' : '#f0f0f0', // Slightly darker blue on hover
            cursor: 'pointer',
          },
        }}
      />
    );
  };

  const shouldDisableDate = (date) => !date.isBetween(dateRange.start, dateRange.end, null, '[]');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: isMobile ? 1 : 2 }}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={dateRange.start}
          renderDay={renderDay}
          shouldDisableDate={shouldDisableDate}
          disableHighlightToday
          readOnly
          sx={{
            '.MuiPickersDay-root': {
              minWidth: isMobile ? 28 : 36,
              minHeight: isMobile ? 28 : 36,
            },
            '.MuiTypography-root': {
              fontSize: isMobile ? '0.875rem' : '1rem',
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
