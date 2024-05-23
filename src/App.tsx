import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AppBar from './components/AppBar'
import CardContainer from './components/CardContainer'
import SubHeader from './components/SubHeader';
import CountryDetailsContainer from './components/CountryDetails';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import { SettingsSystemDaydream } from '@mui/icons-material';
import CustomSnackBar from './components/CustomSnackBar';

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>()
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [countryDetailsContainerProps, setCountryDetailsContainerProps] = useState<string>("");
  const countriesURL = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags';
  const countriesBaseURL = 'https://restcountries.com/v3.1/region';

  const light = {
    main: 'hsl(0, 0%, 100%)',
    light: 'hsl(0, 0%, 100%)',
    dark: 'hsl(0, 0%, 98%))',
    contrastText: '#000',
    text: {
      primary: 'hsl(200, 15%, 8%)',
      secondary: 'hsl(200, 15%, 8%)',
    },
  };

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "Nunito Sans",
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '100'
      }
    },
    palette: {
      mode: 'light',
      primary: light,
      background: {
        default: 'hsl(0, 0%, 98%)'
      }
    }
  })


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
      <Grid sx={{ backgroundColor: theme.palette.background.default, height: '100%'}}>
        <AppBar />
        {showCardDetails ?
          <CountryDetailsContainer name={countryDetailsContainerProps ? countryDetailsContainerProps : ""} backNavigation={redirectToHomepage} /> :
          <Grid sx={{ padding: '3rem' }}>
            <SubHeader fetchCountriesByRegion={fetchCountriesByRegion} setCountriesFromSearch={setCountriesFromSearch} setIsFetching={setIsFetching} />
            {error ? <CustomSnackBar /> :
              <CardContainer isFetching={isFetching} countries={countries} onCardClick={onCardClick} />
            }
          </Grid>
        }
      </Grid>
    </ThemeProvider>
  );
}

export default App;
