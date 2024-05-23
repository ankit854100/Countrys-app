import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Snackbar, Typography } from '@mui/material'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { ICountryContainerProps, ICountryDetails } from '../../interfaces'
import CustomTypography from '../CustomTypography';
import axios from 'axios';
import CountryDetailsPageSkeleton from '../CountryDetailsPageSkeleton';
import CustomSnackBar from '../CustomSnackBar';

function CountryDetailsContainer(props: ICountryContainerProps) {
    const { name, backNavigation } = props;
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState<any>();
    const [countryDetails, setCountryDetails] = useState<ICountryDetails>()

    const fetchCountryDetails = async () => {
        setFetching(true);
        setError(true);
        console.log(props);
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
                languages: Object.values(country.languages).map((item) => item),
                image: country.flags.png
            }
            console.log({ values });
            setCountryDetails(values);
            setError(null);
        } catch (error) {
            console.log("Something unexpected issue happened!")
            console.log({ error });
            setError(error);
        }

        setFetching(false);
    }

    useEffect(() => {
        fetchCountryDetails();
    }, [])



    return (
        <>
            {fetching ?
                <CountryDetailsPageSkeleton /> :
                error ?
                    <CustomSnackBar /> :
                    <Grid container sx={{ padding: '3rem' }}>
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
                                    <Typography variant='h1' component={'h1'} sx={{ fontWeight: '600', fontSize: '2rem' }}>
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
                                <Grid container alignItems={'center'}>
                                    <Grid lg={3} component="span" sx={{ marginBottom: '0.5rem' }}><b>Border Countries:</b> </Grid>
                                    <Grid lg={9} container gap={1.5} sx={{ marginBottom: '0.5rem' }}>
                                        <Button variant="contained">France</Button>
                                        <Button variant="contained">Germany</Button>
                                        <Button variant="contained">Netherlands</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default CountryDetailsContainer