
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const HomeComicCard = ({ data }: any) => {
    return (
        <Card sx={{
        display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <CardContent>
                <Image
                    src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                    alt={data.title}
                    width={250}
                    height={250}
                />
                <Typography variant="subtitle2">
                    {data.title}
                </Typography>
            </CardContent>
            <CardActions sx={{minwidth:400, justifyContent: "space-around"}}>
                <Button href={`/checkout/${data.id}`}>Comprar</Button>
                <Button href={`/comics/${data.id}`}>Ver Detalle</Button>
            </CardActions>
        </Card>
    )
}

export default HomeComicCard
