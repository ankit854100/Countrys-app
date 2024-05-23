import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Skeleton } from '@mui/material'
import Card from '../Card'
import data from '../../data.json'
import axios from 'axios';
import { ICardContainerProps } from '../../interfaces';
import CustomCardSkeleton from '../CardSkeleton';

export default function CardContainer(props: ICardContainerProps) {

  const {isFetching, countries, onCardClick} = props;

  return (
    <Grid container sx={{ width: "100%" }}>
              { isFetching ? 
                 Array(8).fill("Skeleton", 0).map((item, index) => {
                  return <Grid key={index} xs={12} lg={3} sx={{ padding: '1rem'}}>
                          <CustomCardSkeleton />
                        </Grid>
                 }) :
                <>
                  {countries.map((item: any) => {
                    return (
                        <Grid key={item.name.common} xs={12} lg={3} sx={{ padding: '1rem'}}>
                            <Card onCardClick={onCardClick} name={item.name.common} population={item.population} region={item.region} capital={item.capital ? item.capital[0] : ""} src={item.flags? item.flags.png : ''}/>
                        </Grid>
                    )
                })}
                </>
              }
        </Grid>
      
    )
}
