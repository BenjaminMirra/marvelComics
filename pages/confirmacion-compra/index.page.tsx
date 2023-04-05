import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useBuyContext } from 'dh-marvel/components/Provider/BuyProvider';
import { useRouter } from 'next/router';

const ConfirmacionCompra = () => {

  const { customer, order } = useBuyContext();
  const router = useRouter();
  const [redirect, setRedirect] = useState(true)

  useEffect(() => {
    if (order.name === "") {
      setRedirect(true)
    }
    setTimeout(()=>{
      router.push("/")
    },1000)
  }, [order, router, redirect, setRedirect]);

  return (
    <BodySingle title="">
      {!redirect ? <Box
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
            <span style={{ fontWeight: 'bold' }}>Nombre: {customer.name}</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Apellido: {customer.lastname}</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Email: {customer.email}</span>
          </Typography>
          <Typography variant="subtitle2">
            <span style={{ fontWeight: 'bold' }}>Dirección de Entrega: {customer.address.address1}, {customer.address.city}, {customer.address.state}</span>
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
                src={order.image}
                alt={order.name}
                width={250}
                height={250}
              />
              <Typography variant="h5">
                {order.name}
              </Typography>
              <Typography>
                ${order.price}.00
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box> :
    <CircularProgress />}
    </BodySingle>
  )
}

export default ConfirmacionCompra
