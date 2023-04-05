import type { AppProps } from 'next/app'
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { theme } from "dh-marvel/styles/material-theme";
import Index1 from './index1.page';
import BuyContextProvider from 'dh-marvel/components/Provider/BuyProvider';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ThemeProvider theme={theme}>
      <BuyContextProvider>

        <CssBaseline />
        <LayoutGeneral>
          
          <Component {...pageProps}/>
        </LayoutGeneral>
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
