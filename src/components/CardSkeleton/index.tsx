import React from 'react';
import { Card, CardContent, CardMedia, Typography, Skeleton, Box, CardActions, Button } from '@mui/material';
 
const CustomCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardMedia>
        <Skeleton variant="rectangular" height={180} />
      </CardMedia>
      <CardContent>
        <Typography variant="h2">
          <Skeleton width="100%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width="100%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width="100%" />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Skeleton width="100%" />
        </Typography>
      </CardContent>
    </Card>
  );
};
 
export default CustomCardSkeleton;