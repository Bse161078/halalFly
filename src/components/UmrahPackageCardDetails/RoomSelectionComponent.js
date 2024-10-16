import React from 'react';
import { Grid, Button } from '@mui/material';

const RoomSelection = ({ selectedHotel, selectedRoom, onRoomChange }) => {
  return (
    <div>
      <Grid container spacing={2}>
        {selectedHotel?.hotelRoomPrice?.map((room) => (
          <Grid item xs={6} sm={3} key={room._id}>
            <Button
              variant={selectedRoom?._id === room._id ? 'contained' : 'outlined'}
              onClick={() => onRoomChange(room)}
            >
              {room.RoomTypes}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomSelection;
