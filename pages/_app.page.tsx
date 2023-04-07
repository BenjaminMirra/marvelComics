import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "dh-marvel/styles/material-theme";
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import BuyContextProvider from 'dh-marvel/components/Provider/BuyProvider';


export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<unknown>
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ThemeProvider theme={theme}>
      <BuyContextProvider>
        <CssBaseline />

        {getLayout(<Component {...pageProps} />)}
        <style jsx global>{`
              /* Other global styles such as 'html, body' etc... */

              #__next {
                height: 100%;
              }
            `}</style>
      </BuyContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
