
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const CardHero = ({ data }: any) => {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 275, minHeight: 400, maxHeight: 400 }}>
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
            <CardActions>
                <Button size="small">Comprar</Button>
                <Button href={`/comics/${data.id}`} size="small">Ver Detalle</Button>
            </CardActions>
        </Card>
    )
}

export default CardHero
