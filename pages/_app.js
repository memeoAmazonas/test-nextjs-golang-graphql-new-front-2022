import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import theme from 'theme';
import createEmotionCache from 'theme/emotionCache';
import {ApolloProvider} from "@apollo/client";
import client from "graphql/client";
import 'styles/globals.css'

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

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
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
