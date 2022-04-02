import {Box, Container, Grid} from "@mui/material";
import Header from "components/Header";
import * as React from "react";
import Head from "next/head";

const Content = ({ children }) => (
        <Box sx={{flexGrow: 1, bgcolor:"#98d58b"}}>
            <Head>
                <title>Marawaka</title>

            </Head>
            <Header />
            <Container color="secondary" sx={{pt: 6, bgcolor: (t) => t.palette.primary.main}} maxWidth="sm">
                <Grid sx={{minHeight: 'calc(100vh - 80px)', pt: 2, pb: 2}} container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
export default Content;
