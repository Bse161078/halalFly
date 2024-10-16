import React, { useState } from 'react';
import { Grid, Typography, FormControl, Select, MenuItem } from '@mui/material';

const AdditionalOptions = ({selectedFlights,flightDetails,handleFlightChanges,selectedActivity,selectedTransfer, activityDetails,transferDetails,handleTransferChange,handleActivityChange }) => {
 
  return (
    <Grid container spacing={2} alignItems="center">
  {/* Activity Options */}
  <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#004e8c' }}> {/* Blue for heading */}
      Activity Options:
    </Typography>
    <FormControl fullWidth>
      <Select
        value={selectedActivity?.id || ''}
        onChange={handleActivityChange}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          borderColor: '#004e8c', // Blue border
          '& .MuiSelect-select': {
            fontWeight: 'bold',
            color: '#004e8c', // Blue text
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#004e8c', // Blue outline
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00336a', // Darker blue on hover
          },
        }}
      >
        {activityDetails?.map((activity) => (
          <MenuItem key={activity.id} value={activity.id}>
            {activity.activities}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  {/* Transfer Options */}
  <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#004e8c' }}> {/* Blue for heading */}
      Transfer Options:
    </Typography>
    <FormControl fullWidth>
      <Select
        value={selectedTransfer?.id || ''}
        onChange={handleTransferChange}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          borderColor: '#004e8c', // Blue border
          '& .MuiSelect-select': {
            fontWeight: 'bold',
            color: '#004e8c', // Blue text
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#004e8c', // Blue outline
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00336a', // Darker blue on hover
          },
        }}
      >
        {transferDetails?.map((transfer) => (
          <MenuItem key={transfer.id} value={transfer.id}>
            {transfer.trsnsfers}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  {/* Flight Options */}
  <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#004e8c' }}> {/* Blue for heading */}
      Flight Options:
    </Typography>
    <FormControl fullWidth>
      <Select
        value={selectedFlights?.id || ''}
        onChange={handleFlightChanges}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          borderColor: '#004e8c', // Blue border
          '& .MuiSelect-select': {
            fontWeight: 'bold',
            color: '#004e8c', // Blue text
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#004e8c', // Blue outline
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00336a', // Darker blue on hover
          },
        }}
      >
        {flightDetails?.map((flight) => (
          <MenuItem key={flight.id} value={flight.id}>
            {flight.flights}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
</Grid>


  );
};

export default AdditionalOptions;
