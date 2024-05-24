import React, { useCallback, useState } from 'react'
import { Grid, InputAdornment, TextField, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { throttle } from 'lodash'
import { ISearchBarProps } from '../../interfaces';

function SearchBar(props: ISearchBarProps) {
  const { setCountriesFromSearch, setIsFetching, setError } = props;
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const searchURL: string = 'https://restcountries.com/v3.1/name/'

  // Throttling API call for search text
  const throttledSearch = useCallback(
    throttle((searchQuery: string) => {
      if (searchQuery) {
        setIsFetching(true);
        fetch(`${searchURL}${searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            if(!Array.isArray(data)){
              setError(new Error(data.message))
            } else {
              setCountriesFromSearch(data);
            }
            setIsFetching(false);
          })
          .catch((error) => {
            setIsFetching(false);
            setError(error);
          });
      } 
    }, 1000),
    []
  );

  const handleChange = (event: any) => {
    const value = event.target.value;
    setQuery(value);
    throttledSearch(value);
  };

  return (
    <TextField
      id="outlined-basic"
      variant="standard"
      sx={{ width: '100%', boxShadow: '1px 1px 4px -1px rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '0.25rem', backgroundColor: theme.palette.primary.main }}
      placeholder='search for countries...'
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      value={query}
    />
  )
}

export default SearchBar