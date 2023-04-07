import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { getCharacter, getComicsCharacter } from 'dh-marvel/services/marvel/marvel.service';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import CharacterCard from 'dh-marvel/components/CharacterCard/CharacterCard';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { NextPageWithLayout } from '../_app.page';
import { Character } from 'types/character';
import { Comics } from 'types/comic';

interface Props{
  data: Character,
  comics: Comics
}

const CharacterId: NextPageWithLayout<Props> = ({ data, comics }: Props) => {

  return (
    <BodySingle title={data.name}>
      <CharacterCard character={data} comics={comics}/>
    </BodySingle>
  )
}

CharacterId.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id?.toString() || '0'
  const data = await getCharacter(parseInt(id))
  const comics = await getComicsCharacter(parseInt(id));
  return {
    props: {
      data, comics
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.MARVEL_API_URL}/characters?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`)
  const data = await res.json()
  const paths = data.data.results?.map((character: Character) => {
    return { params: { id: character.id.toString() } }
  })

  return {
    paths: paths || [],
    fallback: 'blocking'
  }
}


export default CharacterId;

