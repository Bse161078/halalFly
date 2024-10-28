import React from 'react';
import { 
  Grid, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  Divider, 
  Box, 
  Tooltip, 
  Radio, 
  RadioGroup, 
  FormControlLabel 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const AdditionalOptions = ({ 
  selectedFlights,
  flightDetails,
  handleFlightChanges,
  selectedActivity,
  selectedTransfer,
  activityDetails,
  transferDetails,
  handleTransferChange,
  handleActivityChange,
  // Insurance props
  activityInsurance,
  handleActivityInsuranceChange,
  transferInsurance,
  handleTransferInsuranceChange,
  flightInsurance,
  handleFlightInsuranceChange,
}) => {
 console.log('transferDetails',transferDetails)
  return (
    <Grid container spacing={4}>
      {/* Activity Options */}
      <Grid item xs={12} sm={6}>
  {/* Activity Insurance Yes/No */}
  <Box mt={2}>
    <Typography 
      variant="subtitle1" 
      sx={{ fontWeight: 'bold', color: '#004e8c' }}
    >
      Do you need Activity Options?
    </Typography>
    <RadioGroup
      row
      value={activityInsurance}
      onChange={handleActivityInsuranceChange}
      aria-label="Activity Travel Insurance"
      name="activityInsurance"
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
  </Box>

  {/* Conditionally Render Activity Options */}
  {activityInsurance === 'yes' && activityDetails.some(activity => activity.isActivityIncluded) && (
    <>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#004e8c' }}
      >
        Activity Options:
      </Typography>
      <FormControl fullWidth>
        
        <Select
          labelId="activity-select-label"
          value={selectedActivity?.id || ''}
          onChange={handleActivityChange}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#004e8c',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00336a',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF8C42',
            },
            '& .MuiSelect-select': {
              fontWeight: 'bold',
              color: '#004e8c',
            },
          }}
          displayEmpty
          label="Select Activity"
          inputProps={{ 'aria-label': 'Select Activity Option' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {activityDetails
            .filter(activity => activity.isActivityIncluded)
            .map(activity => (
              <MenuItem key={activity.id} value={activity.id}>
                {activity.activities}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )}

  {/* Optional: Handle Case When No Activities Are Included */}
  {activityInsurance === 'yes' && !activityDetails.some(activity => activity.isActivityIncluded) && (
    <Typography variant="body2" color="textSecondary" mt={2}>
      No available Activity Options at this time.
    </Typography>
  )}
</Grid>


      {/* Transfer Options */}
      <Grid item xs={12} sm={6}>
  {/* Transfer Insurance Yes/No */}
  <Box mt={2}>
    <Typography 
      variant="subtitle1" 
      sx={{ fontWeight: 'bold', color: '#004e8c' }}
    >
      Do you need Transfer Options?
    </Typography>
    <RadioGroup
      row
      value={transferInsurance}
      onChange={handleTransferInsuranceChange}
      aria-label="Transfer Travel Insurance"
      name="transferInsurance"
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
  </Box>

  {/* Conditionally Render Transfer Options */}
  {transferInsurance === 'yes' && transferDetails.some(transfer => transfer.isTransferIncluded) && (
    <>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#004e8c' }}
      >
        Transfer Options:
      </Typography>
      <FormControl fullWidth>
        
        <Select
          labelId="transfer-select-label"
          value={selectedTransfer?.id || ''}
          onChange={handleTransferChange}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#004e8c',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00336a',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF8C42',
            },
            '& .MuiSelect-select': {
              fontWeight: 'bold',
              color: '#004e8c',
            },
          }}
          displayEmpty
          label="Select Transfer"
          inputProps={{ 'aria-label': 'Select Transfer Option' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {transferDetails
            .filter(transfer => transfer.isTransferIncluded)
            .map(transfer => (
              <MenuItem key={transfer.id} value={transfer.id}>
                {transfer.Transport} - €{transfer.price}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )}

  {/* Optional: Handle Case When No Transfers Are Included */}
  {transferInsurance === 'yes' && !transferDetails.some(transfer => transfer.isTransferIncluded) && (
    <Typography variant="body2" color="textSecondary" mt={2}>
      No available Transfer Options at this time.
    </Typography>
  )}
</Grid>

      {/* Flight Options */}
      <Grid item xs={12} sm={6}>
      {flightInsurance==='yes'&&<> <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: '#004e8c' }}
        >
          Flight Options:
        </Typography>
        <FormControl fullWidth>
          <Select
            value={selectedFlights?.id || ''}
            onChange={handleFlightChanges}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              borderColor: '#004e8c',
              '& .MuiSelect-select': {
                fontWeight: 'bold',
                color: '#004e8c',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#004e8c',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00336a',
              },
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Flight Option' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {flightDetails?.map((flight) => (
              <MenuItem key={flight.id} value={flight.id}>
                {flight.flights}
              </MenuItem>
            ))}
          </Select>
        </FormControl></>}

        {/* Travel Insurance for Flight */}
        <Box mt={2}>
          <Typography 
            variant="subtitle1" 
            sx={{ fontWeight: 'bold', color: '#004e8c' }}
          >
            Do you need travel insurance for Flight Options?
          </Typography>
          <RadioGroup
            row
            value={flightInsurance}
            onChange={handleFlightInsuranceChange}
            aria-label="Flight Travel Insurance"
            name="flightInsurance"
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdditionalOptions;
