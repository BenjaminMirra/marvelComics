import React, { ReactElement } from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { NextPageWithLayout } from '../_app.page';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { useBuyContext } from 'dh-marvel/components/Provider/BuyProvider';
import styles from './index.module.css'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const ConfirmacionCompra: NextPageWithLayout<[]> = () => {

  const { order, customer } = useBuyContext();
  
  return (
    <BodySingle title="">
      <Box className={styles.container}
        sx={{
          width: "90%",
          paddingTop: 5,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <Stack sx={{ paddingRight: 2,  paddingBottom: 4,}} spacing={2}>
          <Alert severity="success">¡Que disfrutes tu compra!</Alert>
          <Typography sx={{ fontWeight: 'bold' }} variant="h4">
            Datos del Usuario
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Nombre: </span> {customer.name}
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Apellido: </span> {customer.lastname}
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Email: </span> {customer.email}
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Dirección de Entrega:</span> {customer.address.address1}, {customer.address.city}, {customer.address.state}.
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Estado de entrega:</span> despachado.
          </Typography>
        </Stack>
        <Stack sx={{display: "flex", alignItems: "center", paddingBottom: 4}}>
          <Card sx={{
            minWidth: 350, maxWidth: 350, minHeight: "100%", maxHeight: "100%",
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
              <Typography variant="h5">
                {order?.name}
              </Typography>
              <Typography sx={{color: "green", fontWeight: 1000}}> 
                ${order?.price}.00
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </BodySingle>
  )
}

ConfirmacionCompra.getLayout = function getLayout(page: ReactElement) {
  return <LayoutCheckout>{page}</LayoutCheckout>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const referer = req.headers.referer;
  // if (!referer || !referer.includes('/confirmacion-compra')) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  }
}

export default ConfirmacionCompra