
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Character = {
    id: number,
    name: string,
    image: string
}

const Character = ({data} : any) => {

    return (
        <div>
            <h1>Listado personajes</h1>
            <br></br>
            {data.data.results?.map((character : any)=>{
                return (
                <li key={character.id}>
                    <Link href={"/personajes/" + character.id}>
                        {character.name}
                    </Link>
                </li>
                )
            })}
        </div>
    )
}

export default Character;

export async function getServerSideProps(context : any) {

    const res = await fetch(`${process.env.MARVEL_API_URL}/characters?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`);
    const data = await res.json();
  
    return {
      props: { data }, 
    }
  }