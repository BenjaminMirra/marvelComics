import React from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticPaths, GetStaticProps } from 'next';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const confirmacionCompra = ({ data }: any) => {
  return (
    <BodySingle title="">
      <Box
        sx={{
          width: "90%",
          paddingTop: 5,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <Stack sx={{ width: '80%' }} spacing={2}>
          <Alert severity="success">¡Que disfrutes tu compra!</Alert>
          <Typography sx={{ fontWeight: 'bold' }} variant="h4">
            Datos del Usuario
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Nombre:</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Apellido:</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Email:</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Dirección de Entrega:</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Estado de entrega:</span> despachado.
          </Typography>
        </Stack>
        <Stack>
          <Card sx={{
            minWidth: 350, maxWidth: 350, minHeight: "100%", maxHeight: "100%",
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
              <Typography variant="h5">
                {data.title}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </BodySingle>
  )
}

export default confirmacionCompra

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id?.toString() || '0'
  const comic = await getComic(parseInt(id))
  return {
    props: {
      data: comic
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getComics();
  const paths = data.data.results.map((data: any) => {
    return { params: { id: data.id.toString() } }
  })
  return {
    paths,
    fallback: 'blocking'
  }

}