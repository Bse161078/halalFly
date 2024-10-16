import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D5B782', // Default border color
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C01718', // Hover border color
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C01718', // Focused border color
  },
  '& .MuiSelect-select': {
    color: '#FAF3E0', // Text color
  },
}));

