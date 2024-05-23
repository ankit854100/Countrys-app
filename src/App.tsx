import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import AppBar from './components/AppBar'
import CardContainer from './components/CardContainer'
import SubHeader from './components/SubHeader';
import CountryDetailsContainer from './components/CountryDetails';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import { SettingsSystemDaydream } from '@mui/icons-material';
import CustomSnackBar from './components/CustomSnackBar';

const lightPalette = {
  primary: {
    main: 'hsl(0, 0%, 100%)', // White (Light Mode Elements)
  },
  secondary: {
    main: 'hsl(0, 0%, 52%)', // Dark Gray (Light Mode Input)
  },
  background: {
    default: 'hsl(0, 0%, 98%)', // Very Light Gray (Light Mode Background)
    paper: 'hsl(0, 0%, 100%)', // White (Light Mode Paper Elements)
  },
  text: {
    primary: 'hsl(200, 15%, 8%)', // Very Dark Blue (Light Mode Text)
    secondary: 'hsl(0, 0%, 52%)', // Dark Gray (Secondary Text)
  },
};
 
const darkPalette = {
  primary: {
    main: 'hsl(209, 23%, 22%)', // Dark Blue (Dark Mode Elements)
  },
  secondary: {
    main: 'hsl(0, 0%, 100%)', // White (Dark Mode Text)
  },
  background: {
    default: 'hsl(207, 26%, 17%)', // Very Dark Blue (Dark Mode Background)
    paper: 'hsl(209, 23%, 22%)', // Dark Blue (Dark Mode Paper Elements)
  },
  text: {
    primary: 'hsl(0, 0%, 100%)', // White (Dark Mode Text)
    secondary: 'hsl(0, 0%, 52%)', // Dark Gray (Secondary Text)
  },
};

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>()
  const [mode, setMode] = useState('light');
  const [showCardDetails, setShowCardDetails] = useState(false);
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



  const fetchCountries = async () => {
    setIsFetching(true);
    setError(null);
    try {
      const res = await axios.get(countriesURL)
      setCountries([...res.data]);
    } catch (error) {
      setError(error)
      console.log({ error });
    }
    setIsFetching(false);
  }

  const fetchCountriesByRegion = async (region: string) => {
    setIsFetching(true);
    setError(null);
    try {
      const res = await axios.get(`${countriesBaseURL}/${region}`)
      setCountries([...res.data]);
    } catch (error) {
      console.log({ error });
      setError(error)
    }
    setIsFetching(false);
  }

  const onCardClick = async (name: string) => {
    console.log({ name });
    setCountryDetailsContainerProps(name);
    setShowCardDetails(true);
  }

  const redirectToHomepage = () => {
    setShowCardDetails(false);
  }

  const setCountriesFromSearch = (country: any[]) => {
    setCountries(country);
    // console.log({country});
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  return (
    <ThemeProvider theme={theme}>
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
