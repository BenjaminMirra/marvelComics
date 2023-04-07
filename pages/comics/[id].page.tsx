import { getCharactersComic, getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { ReactElement } from 'react'
import ComicCard from 'dh-marvel/components/ComicCard/Comic';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { useBuyContext } from 'dh-marvel/components/Provider/BuyProvider';
import { NextPageWithLayout } from '../_app.page';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Comic } from 'types/comic';
import { Characters } from 'types/character';

interface Props{
  comic: Comic,
  characters: Characters
}

const ComicId: NextPageWithLayout<Props> = ({ comic , characters }: Props) => {

  const { order } = useBuyContext();

  return (
    <BodySingle title={comic.title}>
      <ComicCard comic={comic} characters={characters}/>
    </BodySingle>
  )
}

ComicId.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
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
  const paths = data.data.results.map((data: Comic) => {
    return { params: { id: data.id.toString() } }
  })
  return {
    paths,
    fallback: 'blocking'
  }

}

export default ComicId;