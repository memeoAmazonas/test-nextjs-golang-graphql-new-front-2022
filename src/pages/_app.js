import 'styles/globals.css'
import * as React from 'react';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from 'theme';
import createEmotionCache from 'theme/emotionCache';
import {ApolloProvider} from "@apollo/client";
import client from "../graphql/client";

const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}) {

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <link rel="shortcut icon" href="/public/favicon.ico"/>
                <meta name="viewport"
                      content="initial-scale=1, width=device-width"/>
                      <title>Marawaka</title>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp
