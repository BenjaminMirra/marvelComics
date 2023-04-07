import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FaqsType, faqsData } from 'dh-marvel/components/faqs/faqsData'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import styles from './faqs.module.css'
import { NextPageWithLayout } from '../_app.page';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

interface Faq{
    id: string,
    question: string,
    answer: string
}

const Faqs : NextPageWithLayout<any> = ({data} : any) => {
    return (
        <div className={styles.container}>
            <Typography variant="h4">Preguntas Frecuentes</Typography>
            <div>
                {data?.map((faqs: Faq) => {
                    return (<>
                        <Accordion key={faqs.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{faqs.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {faqs.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </>
                    )
                })}
            </div>
        </div>
    )
}

Faqs.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGeneral>{page}</LayoutGeneral>
  }

export const getStaticProps: GetStaticProps = async () => {
    const data = faqsData;
    // Pass data to the page via props
    return { props: { data } }

}

export default Faqs