import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'


const CharacterId = ({data} : any) => {

  return (
    <div>
      <h1>{data.data.results[0].name}</h1> 
      <Image
                    src={`${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`}
                    alt={data.data.results[0].name}
                    width={300}
                    height={300}
                />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.MARVEL_API_URL}/characters/${params?.id}?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data} }

}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.MARVEL_API_URL}/characters?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
    const data = await res.json()
  const paths = data.data.results?.map((comic : any) => {
    return { params: { id: comic.id.toString() } }
  })
  
  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}


export default CharacterId;

