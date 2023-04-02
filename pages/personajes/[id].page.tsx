import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import React from 'react'


const CharacterId = ({ data }: any) => {

  return (
    <>
    {data?.name}
    </>
    // <Container maxWidth="sm">
    //   <Box>
    //     <Image
    //       src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
    //       alt={data.name}
    //       width={300}
    //       height={300}
    //     />
    //   </Box>
    //   <Box>
    //     <Typography variant="h4" >
    //     {data.name}
    //   </Typography>

    //     <Accordion>
    //       <AccordionSummary
    //         expandIcon={<ExpandMoreIcon />}
    //         aria-controls="panel1a-content"
    //         id="panel1a-header"
    //       >
    //         <span style={{ fontWeight: 1000 }}>Descripción:</span>
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <Typography>
    //           {data.description ? data.description : "-"}
    //         </Typography>
    //       </AccordionDetails>
    //     </Accordion></Box>
    // </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.MARVEL_API_URL}/characters/${params?.id}?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data: data.data.results } }

}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.MARVEL_API_URL}/characters?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
  const data = await res.json()
  const paths = data.data.results?.map((character: any) => {
    return { params: { id: character.id.toString() } }
  })

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}


export default CharacterId;

