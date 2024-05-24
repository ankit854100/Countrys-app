import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Card from '../Card'
import { ICardContainerProps } from '../../interfaces';
import CustomCardSkeleton from '../CardSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CardContainer(props: ICardContainerProps) {

  const [items, setItems] = useState<any>([]);

  const {isFetching, countries, onCardClick} = props;
 
  useEffect(() => {
    // Load initial items
    setItems([...countries.slice(0, 8)]);
  }, [countries]);
 
  const fetchMoreData = () => {
 
    setTimeout(() => {
      setItems((prevItems: any[]) => [
        ...prevItems,
        ...countries.slice(prevItems.length, prevItems.length + 8),
      ]);
    }, 100);  
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={items.length !== countries.length}
      loader={<Typography sx={{ textAlign: 'center' }}>Loading...</Typography>}
      // endMessage={<p style={{ textAlign: 'center' }}><b>You have seen it all!</b></p>}
    >
      <Grid container sx={{ width: "100%" }}>
                { isFetching ? 
                  Array(8).fill("Skeleton", 0).map((item, index) => {
                    return <Grid key={index} xs={12} lg={3} sx={{ padding: '1rem'}}>
                            <CustomCardSkeleton />
                          </Grid>
                  }) :
                  <>
                    {items.map((item: any) => {
                      return (
                          <Grid key={item.name.common} xs={12} lg={3} sx={{ padding: '1rem'}}>
                              <Card onCardClick={onCardClick} name={item.name.common} population={item.population} region={item.region} capital={item.capital ? item.capital[0] : ""} src={item.flags? item.flags.png : ''}/>
                          </Grid>
                      )
                  })}
                  </>
                }
      </Grid>
    </InfiniteScroll>
      
    )
}
