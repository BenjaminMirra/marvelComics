import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { getCharactersComic, getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ComicId = ({ comic , characters }: any) => {

  // function recorrerHasta(frase : any, caracter : any) {
  //   let resultado = "";
  //   frase = frase.split("").reverse().join("");
  //   for (let i = 0; i < frase.length; i++) {
  //     if (frase[i] === caracter) {
  //       break;
  //     }
  //     resultado += frase[i];
  //   }
  //   resultado = resultado.split("").reverse().join("");
  //   return resultado;
  // }

  // function idCharacter(url:string) {
  //   return url.split('/').pop()
  // }


  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          minHeight: 400,
          maxWidth: '90%',
          flexGrow: 1,
          backgroundColor: '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Image
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.name}
                width={400}
                height={400}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {comic.title}
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <span style={{ fontWeight: 1000 }}>Descripción:</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {comic.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <span style={{ fontWeight: 1000 }}>Personajes:</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    {characters?.length > 0 ?
                      (characters?.map((char: any) => {
                        return (
                          <Link
                            key={char.name}
                            href={`/personajes/${char.id}`}
                            rel="noopener noreferrer"
                            color={'#00000'}
                            sx={{ textDecoration: 'none' }}
                          >
                            {` ${char.name} - `}
                          </Link>
                        )
                      }))
                      :
                      ("")
                    }
                  </AccordionDetails>
                </Accordion>

              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  {(comic?.stock != 0) ?
                    (<Button variant="contained">COMPRAR</Button>)
                    :
                    (<Button variant="contained" disabled>SIN STOCK DISPONIBLE</Button>)
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {(comic?.price != comic?.oldPrice) ? (
                <Typography style={{ color: '#dddddd' }} variant="subtitle1" component="div">
                  ${comic.oldPrice}.00
                </Typography>
              ) : ""
              }
              <Typography style={{ color: 'green' }} variant="subtitle1" component="div">
                ${comic.price}.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id?.toString() || '0'
  const comic = await getComic(parseInt(id))
  const characters = await getCharactersComic(parseInt(id));
  return {
    props: {
      characters, comic
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

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const res = await fetch(`${process.env.MARVEL_API_URL}/comics/${params?.id}?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
//   const data = await res.json()
//   // Pass data to the page via props
//   return { props: { data } }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${process.env.MARVEL_API_URL}/comics?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
//     const data = await res.json()
//   const paths = data.data.results?.map((comic : any) => {
//     return { params: { id: comic.id.toString() } }
//   })

//   return {
//     paths: paths || [],
//     fallback: 'blocking'
//   }
// }


export default ComicId;