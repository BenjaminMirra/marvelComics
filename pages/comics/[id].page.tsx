import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import React from 'react'
import {useEffect} from 'react'


const ComicId = ({ data }: any) => {

  return (
    <div>
      <h1>{data.title}</h1>
      <Image
        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
        alt={data.name}
        width={300}
        height={300}
      />
    </div>
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