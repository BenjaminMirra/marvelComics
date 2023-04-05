
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const CheckoutComic = ({order} : any) => {

  return (
     <Grid>
      <Card sx={{
        minWidth: 400, maxWidth: 300, minHeight: "100%", maxHeight: "100%",
      }}>
        <CardContent sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Image
            src={order?.image}
            alt={order?.name}
            width={250}
            height={250}
          />
          <Typography variant="h4">
            {order?.name}
          </Typography>
          <Typography variant="subtitle2">
            {order?.price}
          </Typography>
        </CardContent>
      </Card>
    </Grid > 
  )
}

export default CheckoutComic
