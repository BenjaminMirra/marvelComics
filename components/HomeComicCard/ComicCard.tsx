
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useBuyContext } from '../Provider/BuyProvider';
import { useRouter } from 'next/router';

const HomeComicCard = ({ comic }: any) => {

    const {order, setOrder} = useBuyContext()
    const router = useRouter()

    const addOrder = () =>{
        setOrder({
            name: comic.title,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.price
        })
        router.push("/checkout")
        console.log(order);
        
    }

    return (
        <Card sx={{
        display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <CardContent>
                <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    width={250}
                    height={250}
                />
                <Typography variant="subtitle2">
                    {comic.title}
                </Typography>
            </CardContent>
            <CardActions sx={{minwidth:400, justifyContent: "space-around"}}>
                <Button onClick={addOrder}>Comprar</Button>
                <Button href={`/comics/${comic.id}`}>Ver Detalle</Button>
            </CardActions>
        </Card>
    )
}

export default HomeComicCard
