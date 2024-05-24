import { Grid, Button, Box, Typography, Skeleton } from '@mui/material'
import React from 'react'
import CustomTypography from '../CustomTypography'

function CountryDetailsPageSkeleton() {
    return (
        <Grid container sx={{ padding: '3rem', width: '100%', marginTop: '4rem' }}>
            <Grid sx={{ marginBottom: '2rem' }}>
                <Skeleton variant='rectangular' width={'5rem'} height={'2rem'} />
            </Grid>
            <Grid container justifyContent={'center'}>
                <Grid lg={5} container justifyContent={'flex-start'} alignItems={'center'}>
                    <Skeleton
                        variant='rectangular'
                        sx={{
                            height: '18rem',
                            width: '28rem',
                            borderRadius: '0.25rem',
                            maxHeight: { xs: '16rem', lg: '18rem' },
                            maxWidth: { xs: '100%', lg: '28rem' },
                        }}
                    />
                </Grid>
                <Grid lg={7} container justifyContent={'flex-start'} sx={{ padding: '1rem' }} >
                    <Grid lg={12} sx={{ marginBottom: '1rem' }}>
                        <Typography variant='h1' component={'h1'} sx={{ fontWeight: '600', fontSize: '2rem' }}>
                            <Skeleton variant='rectangular' width={'100%'} />
                        </Typography>
                    </Grid>
                    <Grid container gap={3}>
                        <Grid lg sx={{ marginBottom: '1rem' }}>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                        </Grid>
                        <Grid lg sx={{ marginBottom: '1rem' }}>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                            <Typography variant='subtitle2'>
                                <Skeleton variant='rectangular' width={'100%'} />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems={'center'}>
                        <Grid lg={3} component="span" sx={{ marginBottom: '0.5rem' }}>
                            <Skeleton variant='rectangular' width={'5rem'}/>
                        </Grid>
                        <Grid lg={9} container gap={1.5} sx={{ marginBottom: '0.5rem' }}>
                            <Skeleton variant='rectangular' width={'5rem'} height={'2rem'} />
                            <Skeleton variant='rectangular' width={'5rem'} height={'2rem'} />
                            <Skeleton variant='rectangular' width={'5rem'} height={'2rem'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CountryDetailsPageSkeleton