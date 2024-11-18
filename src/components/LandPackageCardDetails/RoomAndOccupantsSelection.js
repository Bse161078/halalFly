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
  Tooltip ,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import Translation_german from '../Translation/translation_german';

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
      <PersonIcon key={index} sx={{ color: '#003366', fontSize: isMobile?'0.65rem':'1.2rem' }} />
    ));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F7FAFC', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
      
      {/* Room Selection Section */}
      <Typography
        variant={isMobile?'body2':"h6"}
        gutterBottom
        sx={{ mt: 2, fontWeight: 'bold', color: '#003366', textAlign: 'center' }} // Center align for a cleaner look
      >
        {Translation_german.SELECT_ROOM}
      </Typography>
      
      <Grid container spacing={2} justifyContent="center">
        {selectedHotel?.hotelRoomPrice?.map((room) => {
          // Calculate total occupants
          const totalOccupants = room.totalAdults;
          return (
            <Grid 
              item 
              xs={6} 
              sm={3} 
              key={room._id} 
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Center the button
            >
            <Tooltip title={room.RoomTypes} arrow>
              <Button
                variant={selectedRoom?._id === room._id ? 'contained' : 'outlined'}
                onClick={() => handleRoomChange(room)}
                sx={{
                  backgroundColor: selectedRoom?._id === room._id ? '#FF8C42' : 'transparent', // Orange for selected
                  color: selectedRoom?._id === room._id ? '#FAF3E0' : '#003366', // Light text on orange, dark blue text otherwise
                  borderColor: selectedRoom?._id === room._id ? '#FF8C42' : '#003366', // Border color for outlined buttons
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  justifyContent: 'center',
                  width: isMobile ? '80%' : '100%', // Center and slightly reduce width for mobile
                  maxWidth: '250px', // Optional: set max width to keep button from stretching too far
                  textTransform: 'capitalize', // Make room types readable
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: selectedRoom?._id === room._id ? '#D97A36' : '#f1f1f1', // Slightly darker orange on hover
                    boxShadow: selectedRoom?._id === room._id ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                  },
                }}
                aria-label={`Select ${room.RoomTypes} room`}
              >
                {room.RoomTypes.toLowerCase() === 'share' 
                  ? <GroupIcon sx={{ color: '#003366', fontSize: isMobile ? '0.65rem' : '1.2rem' }} /> 
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

      {/* Occupants Section */}
      <Divider sx={{ my: 3, borderColor: '#003366' }} />

      <Typography
        variant={isMobile?'body2':"h6"}
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#003366', textAlign: 'center' }} // Centered heading
      >
        {Translation_german.SELECT_OCCUPANTS}
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        
        {/* Adults Selection */}
        <Grid item xs={6} sm={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant={isMobile?'caption':"body1"} sx={{ fontWeight: 'bold', color: '#003366', mb: 1 }}>
              {Translation_german.ADULTS}
            </Typography>
            <Box display="flex" alignItems="center">
              <Tooltip title="Erwachsene entfernen">
                <IconButton
                  onClick={() => handleDecrease('adults')}
                  disabled={adults <= 1}
                  sx={{
                    backgroundColor: adults <= 1 ? '#f1f1f1' : '#FF8C42', // Grey when disabled
                    color: adults <= 1 ? '#aaa' : '#FAF3E0',
                    '&:hover': {
                      backgroundColor: adults <= 1 ? '#f1f1f1' : '#D97A36',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Kleinkinder entfernen"
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 2, color: '#003366' }}>
                {adults}
              </Typography>
              <Tooltip title=" Erwachsene hinzufügen">
                <IconButton
                  onClick={() => handleIncrease('adults')}
                  sx={{
                    backgroundColor: '#FF8C42', // Orange background
                    color: '#FAF3E0', // Light icon color
                    '&:hover': {
                      backgroundColor: '#D97A36',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Increase adults"
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>

        {/* Infants Selection */}
        <Grid item xs={6} sm={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant={isMobile?'caption':"body1"} sx={{ fontWeight: 'bold', color: '#003366', mb: 1 }}>
              {Translation_german.INFANTS}
            </Typography>
            <Box display="flex" alignItems="center">
              <Tooltip title="Decrease Infants">
                <IconButton
                  onClick={() => handleDecrease('infants')}
                  disabled={infants <= 0}
                  sx={{
                    backgroundColor: infants <= 0 ? '#f1f1f1' : '#FF8C42', // Grey when disabled
                    color: infants <= 0 ? '#aaa' : '#FAF3E0',
                    '&:hover': {
                      backgroundColor: infants <= 0 ? '#f1f1f1' : '#D97A36',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Decrease infants"
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mx: 2, color: '#003366' }}>
                {infants}
              </Typography>
              <Tooltip title="Kleinkinder hinzufügen">
                <IconButton
                  onClick={() => handleIncrease('infants')}
                  sx={{
                    backgroundColor: '#FF8C42', // Orange background
                    color: '#FAF3E0', // Light icon color
                    '&:hover': {
                      backgroundColor: '#D97A36',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Increase infants"
                >
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Meal Plan Section */}
      {uniqueMealPlans.length > 0 && (
        <Box >
          <Divider sx={{ my: 3, borderColor: '#003366' }} />
          <Typography
            variant={isMobile?'body2':"h6"}
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#003366', textAlign: 'center' }}
          >
            {Translation_german.SELECT_MEAL_PLAN}
          </Typography>
          <FormControl sx={{display:"flex",alignItems:'center',justifyContent:'center'}} fullWidth>
            <Select
              value={selectedMealPlan?._id || ''}
              onChange={handleMealPlanChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                borderColor: '#003366', // Dark blue border
                width: isMobile ? '70%' : '100%', // Adjust width for mobile
                display:"flex",
                justifyContent:'center',
                alignItems:'center',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#003366', // Ensure border color
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#003366', // Hover border color
                },
                '& .MuiSelect-select': {
                  fontWeight: 'bold',
                  color: '#003366', // Dark blue text
                  fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font for mobile
                  padding: isMobile ? '8px' : '12px', // Adjust padding for mobile
                },
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Meal Plan' }}
            >
              <MenuItem value="">
                <em>{Translation_german.NONE}</em>
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
