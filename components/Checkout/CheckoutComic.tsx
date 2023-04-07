
import React from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const CheckoutComic = ({comic} : any) => {

  return (
     <Grid sx={{width: "100%", paddingBottom: 4, display: "flex", justifyContent: "center"}}>
      <Card sx={{
        minWidth: 400, maxWidth: 300, minHeight: "100%", maxHeight: "100%",
      }}>
        <CardContent sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Image
            src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
            alt={comic?.title}
            width={250}
            height={250}
          />
          <Typography variant="h4">
            {comic?.title}
          </Typography>
          <Typography variant="subtitle2">
            ${comic?.price}.00
          </Typography>
        </CardContent>
      </Card>
    </Grid > 
  )
}

export default CheckoutComic
