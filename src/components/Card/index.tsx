import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ICard } from '../../interfaces/'

export default function ActionAreaCard(props : ICard) {
    const {name, population, region, capital, src, onCardClick } = props;

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea onClick={() => { onCardClick(name)}}>
        <CardMedia
          component="img"
          height="180"
          image={src}
          alt="green iguana"
          sx={{ marginBottom: '1rem'}}
        />
        <CardContent sx={{ paddingBottom: "2rem"}}>
          <Typography gutterBottom variant="h2" component="h2" sx={{ fontWeight: '600', fontSize: '1.2rem', marginBottom: '1rem'}}>
          <strong>{name.length <= 15 ? name: (name.substr(0, 15) + "...")}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Population: </b> {population}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>region: </b> {region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Capital: </b> {capital}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
