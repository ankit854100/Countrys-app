import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IFilterProps } from '../../interfaces';
import { Grid, useTheme } from '@mui/material';

export default function Filter(props: IFilterProps) {
  const { fetchCountriesByRegion } = props;
  const [country, setCountry] = React.useState('Filter By Region');
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    fetchCountriesByRegion(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '100%' }} >
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          placeholder='Filter by region'
          onChange={handleChange}
          variant='standard'
          disableUnderline
          sx={{
            boxShadow: '1px 1px 4px -1px rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '0.25rem', backgroundColor: theme.palette.primary.main
          }}
        >
          <MenuItem value='Filter By Region' disabled sx={{ display: 'none' }}>Filter By Region</MenuItem>
          <MenuItem value='asia'>Asia</MenuItem>
          <MenuItem value='europe'>Europe</MenuItem>
          <MenuItem value='america'>America</MenuItem>
          <MenuItem value='africa'>Africa</MenuItem>
          <MenuItem value='oceania'>Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
