import React from 'react'
import { Typography } from '@mui/material'
import { ICustomTypography } from '../../interfaces'

function CustomTypography(props: ICustomTypography) {
    const {name, value} = props;
  return (
      Array.isArray(value) ?
      <Typography variant='subtitle2' color='text.primary'>
          <b>{name}: </b> {value.map(item => item)}
      </Typography> :
      <Typography variant='subtitle2' color='text.primary'>
        <b>{name}: </b> {value}
    </Typography>
    )
}

export default CustomTypography