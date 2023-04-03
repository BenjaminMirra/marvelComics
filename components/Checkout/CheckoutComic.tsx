
import React from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const CheckoutComic = ({ data }: any) => {
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
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.title}
            width={250}
            height={250}
          />
          <Typography variant="h4">
            {data.title}
          </Typography>
          <Typography variant="subtitle2">
            {data.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid >
  )
}

export default CheckoutComic
