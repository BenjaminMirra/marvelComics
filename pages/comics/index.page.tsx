
import Link from 'next/link';
import React from 'react'

const Comic = ({data}: any) => {

    return (
        <div>
            <h1>Listado Comics</h1>
            <br></br>
            {data.data.results?.map((comic : any)=>{
                return (
                <li key={comic.id}>
                    <Link href={"/comics/" + comic.id}>
                        {comic.title}
                    </Link>
                </li>
                )
            })}
        </div>
    )
}

export default Comic;

export async function getServerSideProps(context : any) {

    const res = await fetch(`${process.env.MARVEL_API_URL}/comics?ts=1&apikey=${process.env.MARVEL_API_PUBLIC_KEY}&hash=639d2aec78a37199a9a9e83331302cac`);
    const data = await res.json();
  
    return {
      props: { data }, 
    }
  }