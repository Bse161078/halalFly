import React from 'react';
import { Button, Grid, IconButton, Typography, FormControl, Select, MenuItem, Divider, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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

  return (
    <Box sx={{ padding: '20px' }}>
    {/* Room Selection */}
    <Typography
      variant="h6"
      gutterBottom
      sx={{ mt: 2, fontWeight: 'bold', color: '#004e8c' }} // Blue color for heading
    >
      Select Room Type:
    </Typography>
    <Grid container spacing={2}>
      {selectedHotel?.hotelRoomPrice?.map((room) => (
        <Grid item xs={6} sm={3} key={room._id}>
          <Button
            variant={selectedRoom?._id === room._id ? 'contained' : 'outlined'}
            onClick={() => handleRoomChange(room)}
            fullWidth
            sx={{
              backgroundColor: selectedRoom?._id === room._id ? '#FF8C42' : 'transparent', // Orange for selected
              color: selectedRoom?._id === room._id ? '#0C0C0C' : '#004e8c', // Black text on orange, blue text otherwise
              borderColor: '#004e8c', // Blue border
              borderRadius: '8px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: selectedRoom?._id === room._id ? '#B87231' : '#f1f1f1', // Slightly darker orange on hover
              },
            }}
          >
            {room.RoomTypes}
          </Button>
        </Grid>
      ))}
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
      sx={{ fontWeight: 'bold', color: '#004e8c' }} // Blue color for heading
    >
      Select Occupants:
    </Typography>
    <Grid container spacing={2} alignItems="center">
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
              color: '#0C0C0C', // Black icon
              '&:disabled': {
                backgroundColor: '#ccc', // Grey when disabled
              },
            }}
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
              color: '#0C0C0C', // Black icon
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Grid>
  
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
              color: '#0C0C0C', // Black icon
              '&:disabled': {
                backgroundColor: '#ccc', // Grey when disabled
              },
            }}
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
              color: '#0C0C0C', // Black icon
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  
  
    {/* Meal Plan Selection */}
    {uniqueMealPlans.length > 0 && (
      
      <div>
            <Divider sx={{ my: 3, borderColor: '#004e8c' }} /> {/* Blue divider */}

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#004e8c' }} // Blue color for heading
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
              borderColor: '#004e8c', // Blue border
              '& .MuiSelect-select': {
                fontWeight: 'bold',
                color: '#004e8c', // Blue text
              },
            }}
          >
            {uniqueMealPlans?.map((meal) => (
              <MenuItem key={meal._id} value={meal._id}>
                {meal.Mean_Plans}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )}
  </Box>
  

  );
};

export default RoomAndOccupantsSelection;
