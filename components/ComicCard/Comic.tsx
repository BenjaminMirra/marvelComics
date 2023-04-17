import React, { useCallback, useEffect } from 'react'
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { useBuyContext } from '../Provider/BuyProvider';
import { useRouter } from 'next/router';
import { Comic, Item } from 'types/comic';
import { Character, Characters } from 'types/character';

const Img = styled('img')({
    display: 'flex',
    maxWidth: '100%',
    maxHeight: '100%',
    paddingRight: '20px'
});

interface Props {
    comic: Comic,
    characters: Characters
}

const ComicCard = ({ comic, characters }: Props) => {

    const { setOrder } = useBuyContext();
    const router = useRouter()

    const addOrder = () => {
        setOrder({
            name: comic.title,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.price
        })
        router.push("/checkout")
    }

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                justifyContent: 'space-around',
                maxWidth: '80%',
                flexGrow: 1,
                backgroundColor: '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 250, height: '100%' }}>
                        <Img alt={comic.title} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            {comic.creators.items.map((item: Item) => {
                                return (
                                    <Typography key={comic.id} variant="body2" gutterBottom>
                                        {`${item.role[0].toUpperCase() + item.role.substring(1)}: ${item.name}`}
                                    </Typography>
                                )
                            })}
                            <Typography variant="body2" gutterBottom>
                                <span style={{ color: "gray" }}>
                                    Description: {`"${comic.description}"`}
                                </span>
                            </Typography>


                            <Typography variant="subtitle1" color="text.secondary">
                                <span style={{ fontWeight: 1000 }}>Personajes:</span>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {characters.map((char: Character) => {
                                    return (
                                        <Link
                                            key={char.id}
                                            href={`/personajes/${char.id}`}
                                            rel="noopener noreferrer"
                                            color={'#00000'}
                                            sx={{ textDecoration: 'none' }}
                                        >{` ${char.name}, `}</Link>
                                    )
                                })}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                {comic.stock != 0 ?
                                    <Button onClick={addOrder} variant="contained">
                                        COMPRAR
                                    </Button>
                                    :
                                    <Button variant="contained" disabled>
                                        SIN STOCK DISPONIBLE
                                    </Button>}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {comic.price != comic.oldPrice ?
                                <Typography sx={{ color: 'red', textDecoration: "line-through" }} variant="body2">
                                    ${comic.oldPrice}.00
                                </Typography>
                                : ""

                            }
                            <Typography sx={{ color: 'green' }} variant="body1">
                                ${comic.price}.00
                            </Typography>

                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default ComicCard