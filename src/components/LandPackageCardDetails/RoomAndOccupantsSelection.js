import React from 'react';
import { 
  Button, 
  Grid, 
  IconButton, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  Divider, 
  Box, 
  Tooltip 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const RoomAndOccupantsSelection = ({ 
  selectedHotel, 
  selectedRoom, 
  adults, 
  infants, 
  handleRoomChange, 
  handleIncrease, 
  handleDecrease, 
  errorMessage, 
  mealPlans, 
  selectedMealPlan, 
  handleMealPlanChange 
}) => {

  // Function to remove duplicate meal plans based on 'Mean_Plans'
  const uniqueMealPlans = mealPlans.filter(
    (meal, index, self) =>
      index === self.findIndex((m) => m.Mean_Plans === meal.Mean_Plans)
  );

  // Function to render person icons based on the number of occupants
  const renderPersonIcons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <PersonIcon key={index} sx={{ color: '#003366', fontSize: '1.2rem' }} />
    ));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Room Selection */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mt: 2, fontWeight: 'bold', color: '#003366' }} // Darker blue for heading
      >
        Select Room Type:
      </Typography>
      <Grid container spacing={2}>
        {selectedHotel?.hotelRoomPrice?.map((room) => {
          // Calculate total occupants
          const totalOccupants = room.totalAdults;
          return (
            <Grid item xs={6} sm={3} key={room._id}>
              <Tooltip title={room.RoomTypes} arrow>
                <Button
                  variant={selectedRoom?._id === room._id ? 'contained' : 'outlined'}
                  onClick={() => handleRoomChange(room)}
                  fullWidth
                  sx={{
                    backgroundColor: selectedRoom?._id === room._id ? '#FF8C42' : 'transparent', // Orange for selected
                    color: selectedRoom?._id === room._id ? '#0C0C0C' : '#003366', // Black text on orange, dark blue text otherwise
                    borderColor: '#003366', // Dark blue border
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      backgroundColor: selectedRoom?._id === room._id ? '#B87231' : '#f1f1f1', // Slightly darker orange on hover
                    },
                  }}
                  aria-label={`Select ${room.RoomTypes} room`}
                >
                  {room.RoomTypes.toLowerCase() === 'share' 
                    ? <GroupIcon sx={{ color: '#003366', fontSize: '1.2rem' }} /> 
                    : renderPersonIcons(totalOccupants)}
                </Button>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      {/* Error Message for Room Selection */}
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
          {errorMessage}
        </Typography>
      )}

      {/* Occupant Selection */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#003366' }} // Darker blue for heading
      >
        Select Occupants:
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Adults Selection */}
        <Grid item xs={6} sm={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Adults
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton
              onClick={() => handleDecrease('adults')}
              disabled={adults <= 1}
              sx={{
                backgroundColor: '#FF8C42', // Orange background
                color: '#004e8c', // Black icon
                '&:disabled': {
                  backgroundColor: '#ccc', // Grey when disabled
                },
              }}
              aria-label="Decrease adults"
            >
              <RemoveCircleIcon />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 2 }}>
              {adults}
            </Typography>
            <IconButton
              onClick={() => handleIncrease('adults')}
              sx={{
                backgroundColor: '#FF8C42', // Orange background
                color: '#004e8c', // Black icon
              }}
              aria-label="Increase adults"
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Infants Selection */}
        <Grid item xs={6} sm={4}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Infants
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <IconButton
              onClick={() => handleDecrease('infants')}
              disabled={infants <= 0}
              sx={{
                backgroundColor: '#FF8C42', // Orange background
                color: '#004e8c', // Black icon
                '&:disabled': {
                  backgroundColor: '#ccc', // Grey when disabled
                },
              }}
              aria-label="Decrease infants"
            >
              <RemoveCircleIcon />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 2 }}>
              {infants}
            </Typography>
            <IconButton
              onClick={() => handleIncrease('infants')}
              sx={{
                backgroundColor: '#FF8C42', // Orange background
                color: '#004e8c', // Black icon
              }}
              aria-label="Increase infants"
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Meal Plan Selection */}
      {uniqueMealPlans.length > 0 && (
        <Box>
          <Divider sx={{ my: 3, borderColor: '#003366' }} /> {/* Darker blue divider */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#003366' }} // Darker blue for heading
          >
            Select Meal Plan:
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedMealPlan?._id || ''}
              onChange={handleMealPlanChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                borderColor: '#003366', // Dark blue border
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#003366', // Ensure border color
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#003366', // Hover border color
                },
                '& .MuiSelect-select': {
                  fontWeight: 'bold',
                  color: '#003366', // Dark blue text
                },
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Meal Plan' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {uniqueMealPlans?.map((meal) => (
                <MenuItem key={meal._id} value={meal._id}>
                  {meal.Mean_Plans}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default RoomAndOccupantsSelection;
