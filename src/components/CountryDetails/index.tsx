import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Snackbar, Typography } from '@mui/material'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { ICountryContainerProps, ICountryDetails } from '../../interfaces'
import CustomTypography from '../CustomTypography';
import axios from 'axios';
import CountryDetailsPageSkeleton from '../CountryDetailsPageSkeleton';
import CustomSnackBar from '../CustomSnackBar';
const countries = require('i18n-iso-countries')

function CountryDetailsContainer(props: ICountryContainerProps) {
    const { name, backNavigation } = props;
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState<any>();
    const [countryDetails, setCountryDetails] = useState<ICountryDetails>()

    const fetchCountryDetails = async () => {
        setFetching(true);
        setError(true);
        try {
            const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            let country = res.data[0];
            const values = {
                commonName: country.name.common,
                nativeName: country.name.official,
                population: country.population,
                region: country.region,
                subRegion: country.subregion,
                capital: country.capital[0],
                topLevelDomain: country.tld[0],
                currencies: country.currencies[Object.keys(country.currencies)[0]].name,
                languages: Object.values(country.languages).map((item) => item + " , "),
                image: country.flags.png,
                borders: country.borders
            }

            setCountryDetails(values);
            setError(null);
        } catch (error) {
            setError(error);
        }

        setFetching(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCountryDetails();
    }, [])

    return (
        <>
            {fetching ?
                <CountryDetailsPageSkeleton /> :
                error ?
                    <CustomSnackBar message={error.message} buttonText='back' backNavigation={backNavigation} /> :
                    <Grid container sx={{ padding: '3rem', marginTop: '4rem' }}>
                        <Grid sx={{ marginBottom: '2rem' }}>
                            <Button variant="contained" onClick={() => backNavigation()} sx={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                <KeyboardBackspaceOutlinedIcon fontSize='medium' sx={{ marginRight: '0.5rem' }} />
                                Back
                            </Button>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Grid lg={5} container justifyContent={'flex-start'} alignItems={'center'}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: '18rem',
                                        width: '28rem',
                                        borderRadius: '0.25rem',
                                        maxHeight: { xs: '16rem', lg: '18rem' },
                                        maxWidth: { xs: '100%', lg: '28rem' },
                                    }}
                                    alt="The house from the offer."
                                    src={countryDetails?.image}
                                />
                            </Grid>
                            <Grid lg={7} container justifyContent={'flex-start'} sx={{ padding: '1rem' }} >
                                <Grid lg={12} sx={{ marginBottom: '1rem' }}>
                                    <Typography variant='h1' component={'h1'} color='text.primary' sx={{ fontWeight: '600', fontSize: '2rem' }}>
                                        <strong>{countryDetails?.commonName}</strong>
                                    </Typography>
                                </Grid>
                                <Grid container gap={3}>
                                    <Grid lg sx={{ marginBottom: '1rem' }}>
                                        <CustomTypography name="Native Name" value={countryDetails && countryDetails.nativeName ? countryDetails.nativeName : ""} />
                                        <CustomTypography name="Population" value={countryDetails && countryDetails.population ? countryDetails.population : 0} />
                                        <CustomTypography name="Region" value={countryDetails && countryDetails.region ? countryDetails.region : ""} />
                                        <CustomTypography name="Sub Region" value={countryDetails && countryDetails.subRegion ? countryDetails.subRegion : ""} />
                                        <CustomTypography name="Capital" value={countryDetails && countryDetails.capital ? countryDetails.capital : ""} />
                                    </Grid>
                                    <Grid lg sx={{ marginBottom: '1rem' }}>
                                        <CustomTypography name="Top Level Domain" value={countryDetails && countryDetails.topLevelDomain ? countryDetails.topLevelDomain : ""} />
                                        <CustomTypography name="Curriencies" value={countryDetails && countryDetails.currencies ? countryDetails.currencies : ""} />
                                        <CustomTypography name="Languages" value={countryDetails && countryDetails.languages ? countryDetails.languages : ""} />
                                    </Grid>
                                </Grid>
                                <Grid container alignItems={{xs:'flex-start', lg:'center'}}>
                                    {countryDetails?.borders ?
                                        <>
                                            <Grid xs={4} lg={2.5} component="span" sx={{ marginBottom: '0.5rem' }} color='text.primary'><b>Border Countries:</b> </Grid>
                                            <Grid xs={8} lg={9} container gap={1.5} sx={{ marginBottom: '0.5rem' }}>
                                                {
                                                    countryDetails?.borders.map((item: string) => {
                                                        return <Button variant="contained" sx={{ paddingTop: '1px', paddingBottom: '1px' }}>{item}</Button>
                                                    })
                                                }
                                            </Grid>
                                        </> :
                                        <Grid xs={12} lg={12} component="span" sx={{ marginBottom: '0.5rem' }} color='text.primary'><b>Border Countries: Do not share border with any country.</b> </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default CountryDetailsContainer