import CheckoutForm from "dh-marvel/components/Checkout/CheckoutForm";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import CheckoutComic from "dh-marvel/components/Checkout/CheckoutComic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from "next";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import styles from './Checkout.module.css'

const Checkout = ({ data }: any) => {

  const router = useRouter();

  useEffect(() => {
    if (data.stock === 0) {
      router.push("/")
    }
  }, [data, router]);

  return (
    <BodySingle title={"Checkout"}>
      <Box
        className={styles.container}
      >
        <CheckoutForm />
        <CheckoutComic comic={data} />
      </Box>
    </BodySingle>
  )
}

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


export default Checkout;