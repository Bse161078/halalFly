// AdditionalOptions.jsx
import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  FormControl, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  IconButton, 
  Tooltip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Slide,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';

const AdditionalOptions = ({ 
  // Activity-related props
  activityInsurance,
  handleActivityInsuranceChange,
  selectedActivity,
  handleActivityChange,
  activityDetails,
  
  // Transfer-related props
  transferInsurance,
  handleTransferInsuranceChange,
  selectedTransfer,
  handleTransferChange,
  transferDetails,
  
  // Travel Insurance-related props
  travelInsurance,
  handleTravelInsuranceChange,
  selectedInsurances,
  handleAddInsurance,
  handleRemoveInsurance,
  
  // Insurance options
  insuranceOptions
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // State for Insurance Details Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [currentInsuranceType, setCurrentInsuranceType] = useState('');
  // State for Insurance Selection Dialog
  const [openInsuranceSelection, setOpenInsuranceSelection] = useState(false);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState('');

  // Handlers for Insurance Details Dialog
  const handleDialogOpen = (type) => {
    console.error("type",type);

    if (!type) {
      setDialogContent("insuranceDetail");
      setOpenDialog(true);
      return;
    }

    const insuranceDetail = insuranceOptions.find(option => option.InsuranceType === type);
    if (insuranceDetail) {
      setDialogContent(`${formatInsuranceType(insuranceDetail.InsuranceType)} costs €${insuranceDetail.InsurancePrice}. ${insuranceDetail.InsuranceDetails}`);
    } else {
      setDialogContent('No details available for this insurance type.');
    }
    setOpenDialog(true);
    setCurrentInsuranceType(type);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent('');
    setCurrentInsuranceType('');
  };

  // Helper function to format insurance type (e.g., 'doubleInsurance' to 'Double Insurance')
  const formatInsuranceType = (type) => {
    if (typeof type !== 'string') return '';
    return type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  // Handlers for Insurance Selection Dialog
  const handleInsuranceSelectionChange = (event) => {
    setSelectedInsuranceType(event.target.value);
  };

  const handleInsuranceSelectionConfirm = () => {
    if (selectedInsuranceType) {
      const selectedOption = insuranceOptions.find(option => option.InsuranceType === selectedInsuranceType);
      if (selectedOption) {
        handleAddInsurance(selectedOption);
      } else {
        console.error('Selected insurance type not found:', selectedInsuranceType);
      }
      setSelectedInsuranceType('');
      setOpenInsuranceSelection(false);
    }
  };

  const handleInsuranceSelectionCancel = () => {
    setSelectedInsuranceType('');
    setOpenInsuranceSelection(false);
  };

  return (
    <Grid container spacing={4}>
      {/* Activity Options */}
      {/* Activity Options */}
      <Grid item xs={12} sm={6}>
  {/* Activity Insurance Yes/No */}
  <Box mt={2} ml={isMobile?3:0}>
    <Typography 
      variant={isMobile?'caption':"subtitle1"} 
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
      <FormControlLabel
  sx={{
    '& .MuiFormControlLabel-label': {
      fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for the label
    },
  }}
  value="yes"
  control={<Radio sx={{ transform: isMobile ? 'scale(0.8)' : 'scale(1)' }} />} // Adjust Radio size for mobile
  label="Yes"
/>
<FormControlLabel
  sx={{
    '& .MuiFormControlLabel-label': {
      fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for the label
    },
  }}
  value="no"
  control={<Radio sx={{ transform: isMobile ? 'scale(0.8)' : 'scale(1)' }} />} // Adjust Radio size for mobile
  label="No"
/>

    </RadioGroup>
  </Box>

  {/* Conditionally Render Activity Options */}
  {activityInsurance === 'yes' && activityDetails.some(activity => activity.isActivityIncluded) && (
    <>
      <Typography 
        variant={isMobile?'body2':"h6"} 
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
            width:isMobile?'70%':"100%",
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
            <em style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>None</em>
          </MenuItem>
          {activityDetails
            .filter(activity => activity.isActivityIncluded)
            .map(activity => (
              <MenuItem sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }} key={activity.id} value={activity.id}>
                {activity.activities}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )}

  {/* Optional: Handle Case When No Activities Are Included */}
  {activityInsurance === 'yes' && !activityDetails.some(activity => activity.isActivityIncluded) && (
    <Typography variant={isMobile?'caption':"body2"} color="textSecondary" mt={2}>
      No available Activity Options at this time.
    </Typography>
  )}
</Grid>


      {/* Transfer Options */}
      <Grid item xs={12} sm={6}>
  {/* Transfer Insurance Yes/No */}
  <Box mt={2}ml={isMobile?3:0}>
    <Typography 
      variant={isMobile?'caption':"subtitle1"} 
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
      <FormControlLabel  sx={{
    '& .MuiFormControlLabel-label': {
      fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for the label
    },
  }}
  value="yes"
  control={<Radio sx={{ transform: isMobile ? 'scale(0.8)' : 'scale(1)' }} />} // Adjust Radio size for mobile
  label="Yes"
/>
      <FormControlLabel sx={{
    '& .MuiFormControlLabel-label': {
      fontSize: isMobile ? '0.75rem' : '1rem', // Adjust font size for the label
    },
  }}
  value="no"
  control={<Radio sx={{ transform: isMobile ? 'scale(0.8)' : 'scale(1)' }} />} // Adjust Radio size for mobile
  label="No"
/>
    </RadioGroup>
  </Box>

  {/* Conditionally Render Transfer Options */}
  {transferInsurance === 'yes' && transferDetails.some(transfer => transfer.isTransferIncluded) && (
    <>
      <Typography 
        variant={isMobile?'body2':"h6"} 
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
      width: '100%',
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
        fontSize: isMobile ? '0.875rem' : '1rem', // Smaller font for mobile
      },
    }}
    displayEmpty
    label="Select Transfer"
    inputProps={{ 'aria-label': 'Select Transfer Option' }}
  >
    <MenuItem value="">
      <em style={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>None</em>
    </MenuItem>
    {transferDetails
      .filter(transfer => transfer.isTransferIncluded)
      .map(transfer => (
        <MenuItem key={transfer.id} value={transfer.id} sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
          {transfer.Transport} - €{transfer.price}
        </MenuItem>
      ))}
  </Select>
</FormControl>

    </>
  )}

  {/* Optional: Handle Case When No Transfers Are Included */}
  {transferInsurance === 'yes' && !transferDetails.some(transfer => transfer.isTransferIncluded) && (
    <Typography variant={isMobile?'caption':"body2"} color="textSecondary" mt={2}>
      No available Transfer Options at this time.
    </Typography>
  )}
</Grid>

      {/* Travel Insurance Section */}
      <Grid item xs={12}>
      <Box
        sx={{
          padding: isMobile ? '16px' : '24px',
          borderRadius: '12px',
          backgroundColor: '#e0f7fa',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: '#004e8c' }}
        >
          Travel Insurance:
        </Typography>

        {/* Travel Insurance Yes/No */}
        <FormControl component="fieldset">
          <Typography 
            variant={isMobile ? 'body2' : 'subtitle1'} 
            sx={{ fontWeight: 'bold', color: '#004e8c' }}
          >
            Do you need travel insurance?
          </Typography>
          <RadioGroup
            row
            value={travelInsurance}
            onChange={handleTravelInsuranceChange}
            aria-label="Travel Insurance"
            name="travelInsurance"
            sx={{ gap: isMobile ? 1 : 2 }}
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label={<Typography sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>Yes</Typography>}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label={<Typography sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>No</Typography>}
            />
          </RadioGroup>
        </FormControl>

        {/* Insurance Options */}
        {travelInsurance === 'yes' && (
          <Box mt={2}>
            <Typography 
              variant={isMobile ? 'body2' : 'subtitle1'} 
              sx={{ fontWeight: 'bold', color: '#004e8c' }}
            >
              Selected Insurance Types:
            </Typography>

            {selectedInsurances.length > 0 ? (
              selectedInsurances.map((insurance, idx) => (
                <Box 
                  key={idx} 
                  sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                >
                  <Typography variant="body2" sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
                    {formatInsuranceType(insurance.InsuranceType)} - €{insurance.InsurancePrice}
                  </Typography>
                  <Tooltip title="View Details">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleDialogOpen(insurance.InsuranceType)}
                      sx={{ ml: 1 }}
                    >
                      <InfoIcon fontSize={isMobile ? 'small' : 'medium'} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove Insurance">
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveInsurance(idx)}
                      sx={{ ml: 1 }}
                    >
                      <RemoveCircleIcon fontSize={isMobile ? 'small' : 'medium'} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: isMobile ? '0.7rem' : '1rem' }}>
                No insurance types selected.
              </Typography>
            )}

            {/* Add Insurance Button */}
            <Box mt={2}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddCircleIcon />}
                onClick={() => setOpenInsuranceSelection(true)}
                sx={{
                  fontSize: isMobile ? '0.75rem' : '1rem',
                  padding: isMobile ? '4px 8px' : '6px 16px',
                }}
              >
                Add Insurance
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>

      {/* Insurance Selection Dialog */}
      {/* Insurance Selection Dialog */}
<Dialog
  open={openInsuranceSelection}
  onClose={handleInsuranceSelectionCancel}
  aria-labelledby="insurance-selection-dialog-title"
  TransitionComponent={Slide}
  keepMounted
  fullWidth
  maxWidth="sm"
>
  <DialogTitle
    id="insurance-selection-dialog-title"
    sx={{
      bgcolor: '#004e8c',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    Select Insurance Type
    <IconButton
      aria-label="close"
      onClick={handleInsuranceSelectionCancel}
      sx={{
        color: '#fff',
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  
  <DialogContent dividers>
    <FormControl component="fieldset">
      <RadioGroup
        value={selectedInsuranceType}
        onChange={handleInsuranceSelectionChange}
        aria-label="Insurance Type"
        name="insuranceType"
      >
        <Stack spacing={2}>
          {insuranceOptions.map((option) => (
            <FormControlLabel 
              key={option.id} 
              value={option.InsuranceType} 
              control={<Radio color="primary" />} 
              label={
                <Typography variant="body1" sx={{ color: '#004e8c' }}>
                  {`${formatInsuranceType(option.InsuranceType)} - €${option.InsurancePrice}`}
                </Typography>
              } 
            />
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  </DialogContent>
  
  <DialogActions sx={{ padding: '16px 24px' }}>
    <Button
      onClick={handleInsuranceSelectionCancel}
      color="secondary"
      variant="outlined"
      startIcon={<CancelIcon />}
      sx={{
        borderColor: '#ff8c42',
        color: '#ff8c42',
        '&:hover': {
          backgroundColor: 'rgba(255, 140, 66, 0.08)',
          borderColor: '#ff8c42',
        },
      }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleInsuranceSelectionConfirm} 
      color="primary" 
      variant="contained"
      startIcon={<CheckCircleOutlineIcon />}
      disabled={!selectedInsuranceType}
      sx={{
        bgcolor: '#ff8c42',
        color: '#fff',
        '&:hover': {
          bgcolor: '#e07b39',
        },
      }}
    >
      Add
    </Button>
  </DialogActions>
</Dialog>


      {/* Insurance Details Dialog */}
      {/* Insurance Details Dialog */}
<Dialog
  open={openDialog}
  onClose={handleDialogClose}
  aria-labelledby="insurance-details-dialog-title"
  aria-describedby="insurance-details-dialog-description"
  TransitionComponent={Slide}
  keepMounted
  fullWidth
  maxWidth="sm"
>
  <DialogTitle
    id="insurance-details-dialog-title"
    sx={{
      bgcolor: '#004e8c',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    Insurance Details
    <IconButton
      aria-label="close"
      onClick={handleDialogClose}
      sx={{
        color: '#fff',
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  
  <DialogContent dividers>
    <Typography
      id="insurance-details-dialog-description"
      variant="body1"
      sx={{ color: '#333', lineHeight: 1.6 }}
    >
      {dialogContent}
    </Typography>
  </DialogContent>
  
  <DialogActions sx={{ padding: '16px 24px' }}>
    <Button
      onClick={handleDialogClose}
      color="primary"
      variant="contained"
      sx={{
        bgcolor: '#004e8c',
        color: '#fff',
        '&:hover': {
          bgcolor: '#003b73',
        },
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

    </Grid>
  );
};

export default AdditionalOptions;
