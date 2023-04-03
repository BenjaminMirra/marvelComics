import React from 'react'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import HomeComicCard from '../HomeComicCard/HomeComicCard';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { Hero } from 'types';

const Comics = () => {

    const [page, setPage] = useState(1)
    const [comics, setComics] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPageOffset, setCurrentPageOffset] = useState(0);


    useEffect(() => {
        setComics([])
        const setNewComics = async () => {
            const res = await fetch(`/api/comics?offset=${currentPageOffset}`)
            const data = await res.json()
            setTotalPage(Math.round(data?.total / 12))
            setComics(data?.results)
        }
        setNewComics()
    }, [currentPageOffset])


    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection='column'
    >
        <Pagination page={page} onChange={(e, value) => {
            setPage(value)
            setCurrentPageOffset((value - 1) * 12);
        }} count={totalPage} color="primary" />
        <br />
        {
        comics.length > 0 ? 
        <Grid container spacing={8}
        >
            {comics?.map((hero: Hero) => {
                return (
                    <Grid key={hero.id} item xs={3} md={4}>
                        <HomeComicCard data={hero} />
                    </Grid>
                )
            })}
        </Grid>
        :
        <CircularProgress />
        }
        <br/>
        <Pagination page={page} onChange={(e, value) => {
            setPage(value)
            setCurrentPageOffset((value - 1) * 12);
        }} count={totalPage} color="primary" />
        <br/>
    </Box>
    )
}

export default Comics