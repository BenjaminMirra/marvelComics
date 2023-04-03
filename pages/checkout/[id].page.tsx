import CheckoutForm from "dh-marvel/components/Checkout/CheckoutForm";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps } from "next";
import CheckoutComic from "dh-marvel/components/Checkout/CheckoutComic";
import Box from '@mui/material/Box';

const Checkout = ({ data }: any) => {

  return (
    <BodySingle title={"Checkout"}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start"
        }}
      >
        <CheckoutForm comic={data} />
        <CheckoutComic data={data} />
      </Box>
    </BodySingle >
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

export default Checkout