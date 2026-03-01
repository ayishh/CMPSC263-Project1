import Head from 'next/head' //use instead of head
import { StateContext } from "@/context/StateContext"
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>JUAL</title>
          <meta name='description' content='Put a description here about your app'/>
          <meta name='robots' content='index, follow'/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon_package/site.webmanifest"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>

        <GlobalStyle />

      <StateContext>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StateContext>
    </>
  )
}
