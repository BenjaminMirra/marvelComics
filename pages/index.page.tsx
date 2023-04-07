import type { NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Comics from 'dh-marvel/components/Comics/Comics';
import { NextPageWithLayout } from './_app.page';
import { ReactElement } from 'react';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

const Index: NextPageWithLayout<[]> = () => {

    return (
        <>
            <Head>
                <title>Proyecto Final Front End</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BodySingle title={"Comics"}>
                
                <Comics />
            </BodySingle >
        </>
    )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Index