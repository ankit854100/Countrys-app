import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import AppBar from './components/AppBar'
import CardContainer from './components/CardContainer'
import SubHeader from './components/SubHeader';
import CountryDetailsContainer from './components/CountryDetails';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CustomSnackBar from './components/CustomSnackBar';
import './App.css'

const lightPalette = {
  primary: {
    main: 'hsl(0, 0%, 100%)', 
  },
  secondary: {
    main: 'hsl(0, 0%, 52%)',
  },
  background: {
    default: 'hsl(0, 0%, 98%)', 
    paper: 'hsl(0, 0%, 100%)',
  },
  text: {
    primary: 'hsl(200, 15%, 8%)', 
    secondary: 'hsl(0, 0%, 52%)',
  },
};
 
const darkPalette = {
  primary: {
    main: 'hsl(209, 23%, 22%)',
  },
  secondary: {
    main: 'hsl(0, 0%, 100%)',
  },
  background: {
    default: 'hsl(207, 26%, 17%)', 
    paper: 'hsl(209, 23%, 22%)',
  },
  text: {
    primary: 'hsl(0, 0%, 100%)', 
    secondary: 'hsl(0, 0%, 52%)',
  },
};

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>()
  const [mode, setMode] = useState<string>('light');
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [countryDetailsContainerProps, setCountryDetailsContainerProps] = useState<string>("");

  const countriesURL = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags';
  const countriesBaseURL = 'https://restcountries.com/v3.1/region';

  const theme = useMemo(() => createTheme({
    typography: {
      allVariants: {
        fontFamily: "Nunito Sans",
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '100'
      }
    },
    palette: {
      mode: mode === 'light' ? 'light' : 'dark',
      ...(mode === 'light' ? lightPalette : darkPalette),
    }
  }), [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  // For fetching the country details when App is loaded
  const fetchCountries = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const res = await axios.get(countriesURL)
      setCountries([...res.data]);
    } catch (error) {
      setError(error)
    }
    setIsFetching(false);
  }

  // For fetching country details when we select a region from dropdown
  const fetchCountriesByRegion = async (region: string) => {
    setIsFetching(true);
    setError(null);
    try {
      const res = await axios.get(`${countriesBaseURL}/${region}`)
      setCountries([...res.data]);
    } catch (error) {
      setError(error)
    }
    setIsFetching(false);
  }

  const onCardClick = async (name: string) => {
    setCountryDetailsContainerProps(name);
    setShowCardDetails(true);
  }

  const redirectToHomepage = () => {
    setShowCardDetails(false);
  }

  const setCountriesFromSearch = (country: any[]) => {
    setCountries(country);
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {/* For applying custom css styles in MUI */}
      <CssBaseline />
      <Grid>
        <AppBar mode={mode} toggleTheme={toggleTheme} />
        {showCardDetails ?
          <CountryDetailsContainer name={countryDetailsContainerProps ? countryDetailsContainerProps : ""} backNavigation={redirectToHomepage} /> :
          <Grid sx={{ padding: '3rem' }}>
            <SubHeader fetchCountriesByRegion={fetchCountriesByRegion} setCountriesFromSearch={setCountriesFromSearch} setIsFetching={setIsFetching} setError={setError} />
            {error && <CustomSnackBar message={error.message} />}
            <CardContainer isFetching={isFetching} countries={countries} onCardClick={onCardClick} />
          </Grid>
        }
      </Grid>
    </ThemeProvider>
  );
}

export default App;
