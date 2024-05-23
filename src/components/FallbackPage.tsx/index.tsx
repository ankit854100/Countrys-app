import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

function FallbackPage() {
  return (
    <Grid>
        <Typography variant='h1' component={'h1'}>Something went wrong.</Typography>
        <Typography variant='h5' component={'h4'}>Please try again</Typography>
        <Grid>
            <Button>Reload</Button>
        </Grid>
    </Grid>
  )
}

export default FallbackPage