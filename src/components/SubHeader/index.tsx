import { Grid } from '@mui/material';
import React from 'react'
import SearchBar from '../SearchBar';
import Filter from '../Filter';
import { ISubHeaderProps } from '../../interfaces';

function SubHeader(props : ISubHeaderProps) {
  const { setCountriesFromSearch, fetchCountriesByRegion, setIsFetching } = props;
  return (
    <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between', padding: '1rem'}}>
        <Grid xs={12} lg={5} sx={{ marginBottom: '2rem'}}>
          <SearchBar setCountriesFromSearch={setCountriesFromSearch} setIsFetching={setIsFetching}/>
        </Grid>
        <Grid xs={12} lg={2.5} sx={{ marginBottom: '2rem'}}>
          <Filter fetchCountriesByRegion={fetchCountriesByRegion}/>
        </Grid>
    </Grid>
  )
}

export default SubHeader;