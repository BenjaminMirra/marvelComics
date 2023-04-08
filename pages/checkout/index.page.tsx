import CheckoutForm from "dh-marvel/components/Checkout/CheckoutForm";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import CheckoutComic from "dh-marvel/components/Checkout/CheckoutComic";
import { ReactElement } from "react";
import { Box } from '@mui/material';
import styles from './Checkout.module.css'
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPageWithLayout } from "../_app.page";
import { useBuyContext } from "dh-marvel/components/Provider/BuyProvider";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Checkout: NextPageWithLayout<[]> = () => {

  const { order } = useBuyContext()

  return (
    <>
      <BodySingle title={"Checkout"}>
        <Box
          className={styles.container}
        >
          <CheckoutForm />
          <CheckoutComic order={order} />
        </Box>
      </BodySingle>
    </>
  )
}

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <LayoutCheckout>{page}</LayoutCheckout>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const referer = req.headers.referer;
  if (!referer || !referer.includes('/')) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      };
  }
  return {
      props: {},
  }
}

export default Checkout;