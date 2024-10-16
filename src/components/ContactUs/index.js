import React from 'react';
import { TextField, Button,Tooltip, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem, Select, InputLabel, Container, Typography, Box, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';

const ContactUsForm = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        packageType: 'Umrah Package',
        numTravelers: '',
        arrivalDate: '',
        departureDate: '',
        flight: 'No',
        hotelClass: '5 Star',
        roomType: 'Single',
        transfer: 'No',
        transport: 'No',
        activities: 'No',
        specialRequests: '',
        contactMethod: 'Email'
    });
    const roomTypes = {
        Single: { persons: 1, color: '#4CAF50' }, // Green
        Double: { persons: 2, color: '#2196F3' }, // Blue
        Triple: { persons: 3, color: '#FF9800' }, // Orange
        Quad: { persons: 4, color: '#E91E63' }, // Pink
      };
      
      // Function to render a specified number of PersonIcons with a given color
      const renderPersons = (count, color) => {
        return Array.from({ length: count }, (_, index) => (
          <PersonIcon key={index} sx={{ color, fontSize: '1.5rem' }} />
        ));
      };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        alert('Form submitted successfully!');
    };

    // Common styling for inputs to ensure consistent look and feel
    const inputStyle = {
        height: '56px',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#004e8c' }, // Blue border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange on hover
            '&.Mui-focused fieldset': { borderColor: '#FF8C42' }, // Orange when focused
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#004e8c', // Blue color
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF8C42', // Orange on hover
        },
    };

    const radioStyle = {
        color: '#004e8c', // Blue for inactive radio
        '&.Mui-checked': { color: '#FF8C42' }, // Orange for checked radio
    };

    const starColors = {
        5: '#FFD700', // Gold
        4: '#C0C0C0', // Silver
        3: '#CD7F32', // Bronze
      };
      
      // Function to render a specified number of stars with a given color
      const renderStars = (count, color) => {
        return Array.from({ length: count }, (_, index) => (
          <StarIcon key={index} sx={{ color }} />
        ));
      };

    return (
        <Container maxWidth="md" sx={{ padding: 4, borderRadius: 3, marginTop: 5 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: '#F0F0F0', padding: 4, borderRadius: 2, boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: "#004e8c", fontWeight: "bold", mb: 4 }}>
                    Contact Us
                </Typography>
                <Divider sx={{ my: 4, borderBottom: '2px solid #FF8C42' }} /> {/* Orange divider */}

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {/* Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Package Type */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant='standard'>
                            <InputLabel sx={{ color: '#004e8c' }}>Package Type</InputLabel>
                            <Select
                                name="packageType"
                                value={formData.packageType}
                                onChange={handleChange}
                                sx={inputStyle}
                            >
                                <MenuItem value="Umrah Package">Umrah Package</MenuItem>
                                <MenuItem value="Land Package">Land Package</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Number of Travelers */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Number of Travelers"
                            name="numTravelers"
                            type="number"
                            value={formData.numTravelers}
                            onChange={handleChange}
                            required
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Arrival Date */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Arrival Date"
                            name="arrivalDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.arrivalDate}
                            onChange={handleChange}
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Departure Date */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Departure Date"
                            name="departureDate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formData.departureDate}
                            onChange={handleChange}
                            sx={inputStyle}
                        />
                    </Grid>

                    {/* Flight Tickets */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ color: "#004e8c" }}>Do you already have flight tickets?</FormLabel>
                            <RadioGroup row name="flight" value={formData.flight} onChange={handleChange}>
                                <FormControlLabel value="Yes" control={<Radio sx={radioStyle} />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio sx={radioStyle} />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Hotel Class */}
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel sx={{ color: '#004e8c' }}>Hotel Class</InputLabel>
                        <Select
                        name="hotelClass"
                        value={formData.hotelClass}
                        onChange={handleChange}
                        sx={inputStyle}
                        renderValue={(selected) => {
                            if (selected === 'Economy') {
                            return (
                                <Tooltip title="Economy">
                                <AccountBalanceIcon
                                    sx={{ color: '#8B4513', fontSize: '1.5rem' }}
                                    aria-label="Economy"
                                />
                                </Tooltip>
                            );
                            }

                            const starCount = parseInt(selected, 10);
                            const color = starColors[starCount] || '#FFD700'; // Default to gold if undefined

                            return (
                            <Tooltip title={`${starCount} Star`}>
                                <Box display="flex" alignItems="center">
                                {renderStars(starCount, color)}
                                </Box>
                            </Tooltip>
                            );
                        }}
                        >
                        {/* 5 Star */}
                        <MenuItem value="5">
                            <Tooltip title="5 Star">
                            <Box display="flex" alignItems="center">
                                {renderStars(5, starColors[5])}
                            </Box>
                            </Tooltip>
                        </MenuItem>

                        {/* 4 Star */}
                        <MenuItem value="4">
                            <Tooltip title="4 Star">
                            <Box display="flex" alignItems="center">
                                {renderStars(4, starColors[4])}
                            </Box>
                            </Tooltip>
                        </MenuItem>

                        {/* 3 Star */}
                        <MenuItem value="3">
                            <Tooltip title="3 Star">
                            <Box display="flex" alignItems="center">
                                {renderStars(3, starColors[3])}
                            </Box>
                            </Tooltip>
                        </MenuItem>

                        {/* Economy */}
                        <MenuItem value="Economy">
                            <Tooltip title="Economy">
                            <AccountBalanceIcon
                                sx={{ color: '#8B4513', fontSize: '1.5rem' }}
                                aria-label="Economy"
                            />
                            </Tooltip>
                        </MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>


                    {/* Room Type */}
                    <Grid item xs={12} sm={6}>
      <FormControl fullWidth variant="standard">
        <InputLabel sx={{ color: '#004e8c' }}>Room Type</InputLabel>
        <Select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          sx={inputStyle}
          renderValue={(selected) => {
            if (!selected) return '';

            const room = roomTypes[selected];
            if (!room) return '';

            const { persons, color } = room;

            // Tooltip title based on number of persons
            const tooltipTitle =
              persons === 1 ? '1 Person' : `${persons} Persons`;

            return (
              <Tooltip title={tooltipTitle}>
                <Box display="flex" alignItems="center">
                  {renderPersons(persons, color)}
                </Box>
              </Tooltip>
            );
          }}
        >
          {/* Single Room */}
          <MenuItem value="Single">
            <Tooltip title="1 Person">
              <Box display="flex" alignItems="center">
                {renderPersons(roomTypes.Single.persons, roomTypes.Single.color)}
              </Box>
            </Tooltip>
          </MenuItem>

          {/* Double Room */}
          <MenuItem value="Double">
            <Tooltip title="2 Persons">
              <Box display="flex" alignItems="center">
                {renderPersons(roomTypes.Double.persons, roomTypes.Double.color)}
              </Box>
            </Tooltip>
          </MenuItem>

          {/* Triple Room */}
          <MenuItem value="Triple">
            <Tooltip title="3 Persons">
              <Box display="flex" alignItems="center">
                {renderPersons(roomTypes.Triple.persons, roomTypes.Triple.color)}
              </Box>
            </Tooltip>
          </MenuItem>

          {/* Quad Room */}
          <MenuItem value="Quad">
            <Tooltip title="4 Persons">
              <Box display="flex" alignItems="center">
                {renderPersons(roomTypes.Quad.persons, roomTypes.Quad.color)}
              </Box>
            </Tooltip>
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>

                    {/* Transfers */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ color: "#004e8c" }}>Do you need airport transfers?</FormLabel>
                            <RadioGroup row name="transfer" value={formData.transfer} onChange={handleChange}>
                                <FormControlLabel value="Yes" control={<Radio sx={radioStyle} />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio sx={radioStyle} />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Transport During Stay */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ color: "#004e8c" }}>Do you need transport during your stay?</FormLabel>
                            <RadioGroup row name="transport" value={formData.transport} onChange={handleChange}>
                                <FormControlLabel value="Yes" control={<Radio sx={radioStyle} />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio sx={radioStyle} />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Special Requests */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Special Requests or Additional Information"
                            name="specialRequests"
                            multiline
                            rows={4}
                            value={formData.specialRequests}
                            onChange={handleChange}
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#004e8c',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#FF8C42',
                                },
                            }}
                        />
                    </Grid>

                    {/* Preferred Method of Contact */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel sx={{ color: "#004e8c", fontWeight: "bold" }}>Preferred Method of Contact</FormLabel>
                            <RadioGroup row name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                                <FormControlLabel value="Email" control={<Radio sx={radioStyle} />} label={<EmailIcon sx={{ color: '#1E90FF' }} />} />
                                <FormControlLabel value="Phone" control={<Radio sx={radioStyle} />} label={<PhoneIcon sx={{ color: '#32CD32' }} />} />
                                <FormControlLabel value="WhatsApp" control={<Radio sx={radioStyle} />} label={<WhatsAppIcon sx={{ color: '#25D366' }} />} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{
                            backgroundColor: "#FF8C42",
                            color: "white",
                            padding: 2,
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#FF7321',
                            },
                        }} fullWidth>
                            Submit Your Request
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ContactUsForm;
