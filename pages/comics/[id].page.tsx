import { getCharactersComic, getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import ComicCard from 'dh-marvel/components/ComicCard/Comic';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';

const ComicId = ({ comic , characters }: any) => {

  return (
    <BodySingle title={comic.title}>
      <ComicCard comic={comic} characters={characters}/>
    </BodySingle>
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