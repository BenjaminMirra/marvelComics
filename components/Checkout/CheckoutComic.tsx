import React from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { OrderType } from 'types/order';

interface Props {
  order: OrderType
}

const CheckoutComic = (order: Props) => {

  return (
    <Grid sx={{ width: "100%", paddingBottom: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{
        minWidth: 400, maxWidth: 300, minHeight: "100%", maxHeight: "100%",
      }}>
        <CardContent sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Image
            src={ order ? order?.order.image : ""}
            alt={order?.order.name}
            width={250}
            height={250}
          />
          <Typography variant="h4">
            {order?.order.name}
          </Typography>
          <Typography variant="subtitle2">
            ${order?.order.price}.00
          </Typography>
        </CardContent>
      </Card>
    </Grid >
  )
}

export default CheckoutComic
