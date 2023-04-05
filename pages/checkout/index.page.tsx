import CheckoutForm from "dh-marvel/components/Checkout/CheckoutForm";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import CheckoutComic from "dh-marvel/components/Checkout/CheckoutComic";
import { useBuyContext } from 'dh-marvel/components/Provider/BuyProvider';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from '@mui/material';

const Checkout = () => {

  const { order } = useBuyContext();
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
    <BodySingle title={"Checkout"}>
      {!redirect ? <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start"
        }}
      >
        <CheckoutForm />
        <CheckoutComic order={order} />
      </Box> :
    <CircularProgress />}
  </BodySingle>
  )
}

export default Checkout