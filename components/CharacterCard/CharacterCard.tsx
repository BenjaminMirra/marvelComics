import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CharacterCard({ character, comics }: any) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar alt={character.name} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                }
                title={character.name}
                subheader={`ID: ${character.id}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {character.description}
                </Typography>
            </CardContent>
            <CardContent>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Comics:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {comics?.map((comic: any) => {
                                return (
                                    <Link
                                        key={comic.id}
                                        href={`/comics/${comic.id}`}
                                        rel="noopener noreferrer"
                                        color={'#00000'}
                                        sx={{ textDecoration: 'none' }}
                                    >{` ${comic.title}, `}</Link>

                                )
                            })}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    )
}