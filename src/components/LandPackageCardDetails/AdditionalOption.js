import React,{useState} from 'react';
import { 
  Grid, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  useTheme,
  useMediaQuery, 
  Box, 
  Tooltip, 
  Radio, 
  RadioGroup, 
  FormControlLabel,Slide,
  IconButton,
  Dialog,
  Stack, Button,
  DialogActions,DialogContent,DialogTitle
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Translation_german from '../Translation/translation_german';

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
  
  // Travel Insurance-related props
  travelInsurance,
  handleTravelInsuranceChange,
  selectedInsurances,
  handleAddInsurance,
  handleRemoveInsurance,
  NeedActivity,
  NeedTransfer,
  NeedFlights,
  //insuranceOptions
  insuranceOptions,

  //NeedInsurance
  NeedInsurance
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
  console.log('needactivity',NeedActivity,NeedFlights,NeedTransfer,transferDetails)
 // Handlers for Insurance Details Dialog

 const handleDialogOpen = (type) => {

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
     {NeedActivity&& <Grid item xs={12} sm={6}>
  {/* Activity Insurance Yes/No */}
  <Box mt={2}>
    <Typography 
      variant="subtitle1" 
      sx={{ fontWeight: 'bold', color: '#004e8c' }}
    >
        {Translation_german.ACTIVITY_OPTIONS_TITLE}
        </Typography>
    <RadioGroup
      row
      value={activityInsurance}
      onChange={handleActivityInsuranceChange}
      aria-label="Activity Travel Insurance"
      name="activityInsurance"
    >
      <FormControlLabel value="yes" control={<Radio />}   label={Translation_german.YES_OPTION}
      />
      <FormControlLabel value="no" control={<Radio />}   label={Translation_german.NO_OPTION}
 />
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
        {Translation_german.ACTIVITY_OPTIONS_TITLE}
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
            <em>{Translation_german.NONE}</em>
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
      {Translation_german.NO_ACTIVITY_AVAILABLE}
      </Typography>
  )}
</Grid>}


      {/* Transfer Options */}
     { NeedTransfer&&<Grid item xs={12} sm={6}>
  {/* Transfer Insurance Yes/No */}
  <Box mt={2}>
    <Typography 
      variant="subtitle1" 
      sx={{ fontWeight: 'bold', color: '#004e8c' }}
    >
      {Translation_german.NEED_TRANSFER_OPTIONS}
      </Typography>
    <RadioGroup
      row
      value={transferInsurance}
      onChange={handleTransferInsuranceChange}
      aria-label="Transfer Travel Insurance"
      name="transferInsurance"
    >
      <FormControlLabel value="yes" control={<Radio />}   label={Translation_german.YES_OPTION}
 />
      <FormControlLabel value="no" control={<Radio />}   label={Translation_german.NO_OPTION}
 />
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
      {Translation_german.TRANSFER_OPTIONS_TITLE}     
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
            <em>{Translation_german.NONE}</em>
          </MenuItem>
          {transferDetails
            .filter(transfer => transfer.isTransferIncluded)
            .map(transfer => (
              <MenuItem key={transfer.id} value={transfer.id}>
                {transfer.Transport} 
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )}

  {/* Optional: Handle Case When No Transfers Are Included */}
  {transferInsurance === 'yes' && !transferDetails.some(transfer => transfer.isTransferIncluded) && (
    <Typography variant="body2" color="textSecondary" mt={2}>
      {Translation_german.NO_TRANSFER_AVAILABLE}
      </Typography>
  )}
</Grid>}

      {/* Flight Options */}
      {NeedFlights&&<Grid item xs={12} sm={6}>
  {/* Reiseversicherung für Flug */}
  <Box mt={2}>
    <Typography 
      variant="subtitle1" 
      sx={{ fontWeight: 'bold', color: '#004e8c' }}
    >
      Benötigen Sie Flugoptionen?
    </Typography>
    <RadioGroup
      row
      value={flightInsurance}
      onChange={handleFlightInsuranceChange}
      aria-label="Flugreiseversicherung"
      name="flightInsurance"
    >
      <FormControlLabel value="yes" control={<Radio />} label="Ja" />
      <FormControlLabel value="no" control={<Radio />} label="Nein" />
    </RadioGroup>
  </Box>
  {flightInsurance === 'yes' && (
    <>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#004e8c' }}
      >
        Flugoptionen:
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
          inputProps={{ 'aria-label': 'Flugoption auswählen' }}
        >
          <MenuItem value="">
            <em>Keine</em>
          </MenuItem>
          {flightDetails?.map((flight) => (
            <MenuItem key={flight.id} value={flight.id}>
              {flight.flights}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )}
</Grid>}

      {/* Travel Insurance Section */}
      {NeedInsurance&&<Grid item xs={12}>
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
          {Translation_german.TRAVEL_INSURANCE_TITLE}
          </Typography>

        {/* Travel Insurance Yes/No */}
        <FormControl component="fieldset">
          <Typography 
            variant={isMobile ? 'body2' : 'subtitle1'} 
            sx={{ fontWeight: 'bold', color: '#004e8c' }}
          >
            {Translation_german.NEED_TRAVEL_INSURANCE}
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
              label={<Typography sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
                                {Translation_german.YES_OPTION}

              </Typography>}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label={<Typography sx={{ fontSize: isMobile ? '0.75rem' : '1rem' }}>
                                {Translation_german.NO_OPTION}

              </Typography>}
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
              {Translation_german.SELECTED_INSURANCE_TYPES}
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
                  <Tooltip title="Details anzeigen">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleDialogOpen(insurance.InsuranceType)}
                      sx={{ ml: 1 }}
                    >
                      <InfoIcon fontSize={isMobile ? 'small' : 'medium'} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Versicherung entfernen">
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
                {Translation_german.NO_INSURANCE_SELECTED}
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
                {Translation_german.ADD_INSURANCE}
                </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>}

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
    {Translation_german.SELECTED_INSURANCE_TYPES}
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
          {insuranceOptions?.map((option) => (
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
            {Translation_german.CANCEL_BUTTON}

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
            {Translation_german.ADD_SELECTED_INSURANCE}

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
    {Translation_german.INSURANCE_DETAILS_DIALOG_TITLE}
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
            {Translation_german.CLOSE_BUTTON}

    </Button>
  </DialogActions>
</Dialog>
    </Grid>
  );
};

export default AdditionalOptions;
